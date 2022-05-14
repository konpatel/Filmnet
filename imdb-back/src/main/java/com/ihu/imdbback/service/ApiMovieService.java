package com.ihu.imdbback.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ihu.imdbback.entity.*;
import com.ihu.imdbback.repository.CrewRepository;
import com.ihu.imdbback.repository.GenreRepository;
import com.ihu.imdbback.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class ApiMovieService {

  private final RestTemplate restTemplate;
  private final Environment environment;
  private static final String APIKEY = "app.api-key";
  private final MovieRepository movieRepository;
  private final GenreRepository genreRepository;
  private final CrewRepository crewRepository;
  private final ObjectMapper objectMapper = new ObjectMapper();
  int indexMovie = 0;


  public Object makeGetRequest(String endpoint) throws Exception {
    return restTemplate.getForObject(endpoint, Object.class);
  }

  public void getCreByFromApi() throws Exception {
    List<Crew> crews = this.crewRepository.findAll();
    crews.forEach(c -> {
      try {
        Crew crew = new Crew();
        this.implementCrewEntity(c, crew);
        this.crewRepository.save(crew);
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }

  public void implementCrewEntity(Crew c, Crew crew) throws Exception {
    crew = this.initialiseApiCrew(c.getId(), crew);
    crew.setId(c.getId());
    crew.setJob(c.getJob());
    crew.setKnownForDepartment(c.getKnownForDepartment());
    crew.setProfilePath(c.getProfilePath());
    crew.setPopularity(c.getPopularity());
    crew.setName(c.getName());
    crew.setGender(c.getGender());
  }

  public Crew initialiseApiCrew(Integer id, Crew crew) throws Exception {
    Map<String, Object> stringObjectMap = (Map<String, Object>) this.makeGetRequest("https://api.themoviedb.org/3/person/" + id + "?api_key=" +
      environment.getProperty(APIKEY) + "&language=en-US");
    if (((String) stringObjectMap.get("biography")).length() <= 4000) {
      crew.setBiography((String) stringObjectMap.get("biography"));
    }
    crew.setBirthday((String) stringObjectMap.get("birthday"));
    crew.setDeathday((String) stringObjectMap.get("deathday"));
    crew.setPlaceOfBirth((String) stringObjectMap.get("place_of_birth"));
    return crew;
  }

  public void getMoviesFromApi() throws Exception {
    Map<String, Object> movieMap = this.getMovieFromExternalApi(1);
    ApiMovie apiMovie = new ApiMovie();
    this.initialiseApiMovie(movieMap, apiMovie);

    while (this.indexMovie < 1000 && (Integer) movieMap.get("page") < (Integer) movieMap.get("total_pages") - 2 && (Integer) movieMap.get("page") < 499) {
      movieMap = this.getMovieFromExternalApi((Integer) movieMap.get("page") + 1);
      this.initialiseApiMovie(movieMap, apiMovie);
    }
  }

  private void initialiseApiMovie(Map<String, Object> movieMap, ApiMovie apiMovie) {
    this.getApiMovieResults(movieMap, apiMovie);
    this.processPageResults(apiMovie);
  }

  private void processPageResults(ApiMovie apiMovie) {
    apiMovie.getResults().forEach(res -> {
      boolean exists = movieRepository.existsById((Integer) res.get("id"));
      if (!exists) {
        try {
          Map<String, Object> enhancedMovieMap = this.getMovieWithAllInfo((Integer) res.get("id"));
          this.initialiseMovie(enhancedMovieMap);
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    });
  }

  @Transactional
  public void initialiseMovie(Map res) {
    Optional<Movie> checkMovie = movieRepository.findById((Integer) res.get("id"));
    if (!checkMovie.isPresent() && res.get("overview") != null && res.get("release_date") != null && !res.get("release_date").equals("") && res.get("title") != null
      && res.get("reviews") != null) {
      Optional<Map<String, Object>> vi = checkIfAtLeastOneVideoExists(res);
      if (vi.isPresent()) {
        Movie movie = new Movie();
        this.setMovie(res, vi, movie);
        this.saveMovie(movie);
      }
    }
  }

  private void setMovie(Map res, Optional<Map<String, Object>> vi, Movie movie) {
    this.setMovieInfo(res, movie);
    this.setMoviePopularity(res, movie);
    this.setMovieVoteAverage(res, movie);
    this.compareDatesForUpComingMovies(res, movie);
    this.setMovieGenres(res, movie);
    Set<Crew> crewSet = new HashSet<>();
    Map<String, List<Map<String, Object>>> creditsMap = (Map<String, List<Map<String, Object>>>) res.get("credits");
    this.setMovieCrew(movie, crewSet, creditsMap);
    this.setMovieVideo(vi, movie);
    this.setMovieReview(res, movie);
  }

  private Optional<Map<String, Object>> checkIfAtLeastOneVideoExists(Map res) {
    Map<String, List<Map<String, Object>>> videoMap = (Map<String, List<Map<String, Object>>>) res.get("videos");
    Optional<Map<String, Object>> vi = videoMap.get("results").stream().findFirst();
    return vi;
  }

  private void setMovieCrew(Movie movie, Set<Crew> crewSet, Map<String, List<Map<String, Object>>> creditsMap) {
    AtomicInteger actorIndex = new AtomicInteger();
    AtomicInteger directorIndex = new AtomicInteger();
    this.findJobIfCrewIsActor(crewSet, actorIndex, creditsMap);
    this.findJobIfCrewIsDirector(crewSet, directorIndex, creditsMap);
    movie.setCrewSet(crewSet);
  }

  public void findJobIfCrewIsActor(Set<Crew> crewSet, AtomicInteger actorIndex, Map<String, List<Map<String, Object>>> creditsMap) {
    creditsMap.get("cast").forEach(c -> {
      if (c.get("known_for_department") != null && c.get("known_for_department").equals("Acting") && c.get("profile_path") != null
        && actorIndex.get() < 2) {
        boolean isActor = true;
        this.setMovieActorOrDirector(crewSet, c, isActor);
        actorIndex.getAndIncrement();
      }
    });
  }

  public void findJobIfCrewIsDirector(Set<Crew> crewSet, AtomicInteger directorIndex, Map<String, List<Map<String, Object>>> creditsMap) {
    creditsMap.get("crew").forEach(c -> {
      boolean isActor = false;
      if (c.get("job") != null && c.get("job").equals("Director") && c.get("profile_path") != null && directorIndex.get() < 1) {
        this.setMovieActorOrDirector(crewSet, c, isActor);
        directorIndex.getAndIncrement();
      }
    });
  }

  private void setMovieReview(Map res, Movie movie) {
    AtomicInteger indexReview = new AtomicInteger();
    List<Review> reviewList = new ArrayList<>();
    Map<String, Object> reviewMap = (Map<String, Object>) res.get("reviews");
    List<Map<String, Object>> resultsList = (List<Map<String, Object>>) reviewMap.get("results");
    if ((Integer) reviewMap.get("page") == 1) {
      resultsList.forEach(v -> {
        if (!v.get("content").equals("") && ((String) v.get("content")).length() <= 4000 && indexReview.get() < 2) {
          indexReview.getAndIncrement();
          this.setReviewDetails(reviewList, v);
        }
      });
      movie.setReviews(reviewList);
    }
  }

  private void setReviewDetails(List<Review> reviewList, Map<String, Object> v) {
    Review review = new Review();
    review.setId((String) v.get("id"));
    review.setAuthor((String) v.get("author"));
    review.setContent((String) v.get("content"));
    review.setCreatedDate((String) v.get("created_at"));
    Map<String, Object> authorDetailsMap = (Map<String, Object>) v.get("author_details");
    review.setRating((Double) authorDetailsMap.get("rating"));
    reviewList.add(review);
  }

  private void setMovieVideo(Optional<Map<String, Object>> vi, Movie movie) {
    Video video = new Video();
    if (vi.isPresent()) {
      video.setId((String) vi.get().get("id"));
      video.setParam((String) vi.get().get("key"));
      movie.setVideo(video);
    }
  }

  private void setMovieActorOrDirector(Set<Crew> crewSet, Map<String, Object> c, boolean isActor) {
    Optional<Crew> optionalCrew = crewRepository.findById((Integer) c.get("id"));
    if (!optionalCrew.isPresent()) {
      Crew crew = new Crew();
      crew.setId((Integer) c.get("id"));
      crew.setName((String) c.get("name"));
      this.setCrewGender(c, crew);
      crew.setPopularity((Double) c.get("popularity"));
      crew.setProfilePath((String) c.get("profile_path"));
      this.setJobOrDepartment(c, isActor, crew);
      crewSet.add(crew);
      crewRepository.save(crew);
    }
  }

  private void setJobOrDepartment(Map<String, Object> c, boolean isActor, Crew crew) {
    if (isActor) {
      crew.setKnownForDepartment((String) c.get("known_for_department"));
    } else {
      crew.setJob((String) c.get("job"));
    }
  }

  private void setCrewGender(Map<String, Object> c, Crew crew) {
    if ((Integer) c.get("gender") == 1) {
      crew.setGender("F");
    } else {
      crew.setGender("M");
    }
  }

  private void setMovieGenres(Map res, Movie movie) {
    Set<Genre> genres = new HashSet<>();
    ((List<Map<Integer, String>>) res.get("genres")).forEach(g -> {
      Genre pojo = objectMapper.convertValue(g, Genre.class);
      Optional<Genre> genre = genreRepository.findById(pojo.getId());
      if (!genre.isPresent()) {
        genreRepository.save(pojo);
      }
      genres.add(pojo);
    });
    movie.setGenres(genres);
  }

  private void setMovieVoteAverage(Map res, Movie movie) {
    if (res.get("vote_average").getClass().getSimpleName().equals("Double")) {
      movie.setVoteAverage((Double) res.get("vote_average"));
    } else {
      movie.setVoteAverage(new Double((Integer) res.get("vote_average")));
    }
  }

  private void setMoviePopularity(Map res, Movie movie) {
    if (res.get("popularity").getClass().getSimpleName().equals("Double")) {
      movie.setPopularity((Double) res.get("popularity"));
    } else {
      movie.setPopularity(new Double((Integer) res.get("popularity")));
    }
  }

  private void setMovieInfo(Map res, Movie movie) {
    movie.setId((Integer) res.get("id"));
    movie.setTitle((String) res.get("title"));
    movie.setPosterPath((String) res.get("poster_path"));
    movie.setImdbId((String) res.get("imdb_id"));
    movie.setOverview((String) res.get("overview"));
    movie.setBudget((Integer) res.get("budget"));
    movie.setReleaseDate((String) res.get("release_date"));
    movie.setOriginalLanguage((String) res.get("original_language"));
    movie.setRuntime((Integer) res.get("runtime"));
    movie.setVoteCount((Integer) res.get("vote_count"));
  }

  @Transactional
  public void saveMovie(Movie movie) {
    movieRepository.save(movie);
    this.indexMovie++;
  }

  private ApiMovie getApiMovieResults(Map<String, Object> movieMap, ApiMovie apiMovie) {
    apiMovie.setResults((List) movieMap.get("results"));
    return apiMovie;
  }

  private Map<String, Object> getMovieFromExternalApi(Integer pageIndex) throws Exception {
    return (Map<String, Object>) this.makeGetRequest("https://api.themoviedb.org/3/movie/popular?api_key="
      + environment.getProperty(APIKEY) + "&language=en-US&page=" + pageIndex.toString());
  }

  public Map<String, Object> getMovieWithAllInfo(Integer id) throws Exception {
    return (Map<String, Object>) makeGetRequest("https://api.themoviedb.org/3/movie/" + id + "?api_key=" +
      environment.getProperty(APIKEY) + "&append_to_response=credits,images,lists,releases,reviews,similar,videos");
  }

  private void compareDatesForUpComingMovies(Map res, Movie movie) {
    if (!res.get("release_date").equals("") && res.get("release_date") != null) {
      LocalDate localDate = LocalDate.parse((String) res.get("release_date"));
      LocalDate currentDate = LocalDate.now();
      movie.setUpComing(localDate.isAfter(currentDate));
    } else {
      movie.setUpComing(false);
    }
  }

}
