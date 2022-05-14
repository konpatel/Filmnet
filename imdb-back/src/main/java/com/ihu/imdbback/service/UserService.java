package com.ihu.imdbback.service;

import com.ihu.imdbback.dto.*;
import com.ihu.imdbback.dto.authorisation.AuthUserDTO;
import com.ihu.imdbback.dto.authorisation.UserDetailsDTO;
import com.ihu.imdbback.entity.*;
import com.ihu.imdbback.exception.Constants;
import com.ihu.imdbback.exception.FilmNetException;
import com.ihu.imdbback.mapper.MovieMapper;
import com.ihu.imdbback.mapper.UserMapper;
import com.ihu.imdbback.mapper.authorisation.AuthUserMapper;
import com.ihu.imdbback.repository.MovieRepository;
import com.ihu.imdbback.repository.ReviewRepository;
import com.ihu.imdbback.repository.UserRepository;
import com.ihu.imdbback.repository.UserTokenRepository;
import com.ihu.imdbback.repository.authorisation.AuthUserRepository;
import com.ihu.imdbback.repository.authorisation.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

@Service
@AllArgsConstructor
public class UserService {

  private final AuthUserRepository authUserRepository;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private UserMapper userMapper;
  private final SecurityService securityService;
  private final MovieRepository movieRepository;
  private final MovieMapper movieMapper;
  private final ReviewRepository reviewRepository;
  private final UserTokenRepository userTokenRepository;
  private final AuthUserMapper authUserMapper;
  private final EmailService emailService;

  public UserDTO registerUser(UserDTO userDTO) throws FileNotFoundException, FilmNetException {
    boolean existsByEmail = userRepository.existsByEmail(userDTO.getEmail());
    boolean existsByUsername = userRepository.existsByUsername(userDTO.getUsername());

    if (!existsByEmail && !existsByUsername) {
      AuthUser authUser = new AuthUser();
      authUser.setUsername(userDTO.getEmail());
      authUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

      this.setAuthUserRoles(authUser);
      this.authUserRepository.save(authUser);

      User user = userMapper.map(userDTO);
      user.setAuthUser(authUser);
      return userMapper.map(userRepository.save(user));
    } else {
      if (existsByEmail) {
        throw new FilmNetException(Constants.EMAIL_EXISTS);
      } else {
        throw new FilmNetException(Constants.USERNAME_EXISTS);
      }
    }
  }

  public void setAuthUserRoles(AuthUser authUser) {
    Role role = roleRepository.findByName("ROLE_USER");
    Set roles = new HashSet();
    roles.add(role);

    authUser.setRoles(roles);
    authUser.setActive(true);
  }

  public UserDetailsDTO loginUser(UserLoginDTO userLoginDTO, HttpServletResponse response) throws FilmNetException {
    Optional<AuthUser> authUser = Optional.ofNullable(this.authUserRepository.findByUsername(userLoginDTO.getEmail()));
    if (authUser.isPresent() && authUser.get().isActive()) {
      securityService.userAuthentication(userLoginDTO.getEmail(), userLoginDTO.getPassword(), response);
      return securityService.getUserDetailsDTO(userLoginDTO.getEmail());
    } else {
      throw new FilmNetException(Constants.INACTIVE_USER_NOT_EXIST_USER);
    }
  }

  public void logoutUser(HttpServletResponse response) {
    securityService.setLogoutSuccessHeader(response);
  }

  public MovieDTO getNotifications(String count) {
    Pageable paging = PageRequest.of(2, 30);
    Page<Movie> pagedResult = movieRepository.findAll(paging);
    Movie m = new Movie();
    if (pagedResult.hasContent()) {
      m = pagedResult.getContent().get(Integer.parseInt(count));
    }
    return movieMapper.map(m);
  }

  public void closeAccount(String email) {
    Optional<AuthUser> authUser = Optional.ofNullable(this.authUserRepository.findByUsername(email));
    if (authUser.isPresent()) {
      authUser.get().setActive(false);
      this.authUserRepository.save(authUser.get());
    }
  }

  public UserDTO getUsername(String email) {
    Optional<User> user = Optional.ofNullable(this.userRepository.findByEmail(email));
    UserDTO userDTO = new UserDTO();
    if (user.isPresent()) {
      userDTO.setUsername(user.get().getUsername());
    }
    return userDTO;
  }

  public void saveReview(UserReviewDTO userReviewDTO) throws FilmNetException {
    Optional<User> user = Optional.ofNullable(userRepository.findByEmail(userReviewDTO.getEmail()));
    Optional<Movie> movie = movieRepository.findById(userReviewDTO.getMovieId());
    boolean reviewExists = reviewRepository.existsByUser_EmailAndMovieId(userReviewDTO.getEmail(), userReviewDTO.getMovieId());
    if (!reviewExists) {
      if (user.isPresent() && movie.isPresent()) {
        Review review = new Review();
        this.saveReview(review, user, movie, userReviewDTO);
        System.out.println("OK");
      }
    } else {
      throw new FilmNetException(Constants.REVIEW_EXISTS);
    }
  }

  public void saveReview(Review review, Optional<User> user, Optional<Movie> movie, UserReviewDTO userReviewDTO) {
    review.setAuthor(user.get().getUsername());
    review.setContent(userReviewDTO.getReview());
    review.setCreatedDate((java.time.Clock.systemUTC().instant()).toString());
    review.setRating(new Double(userReviewDTO.getRating()));
    review.setUser(user.get());
    review.setMovie(movie.get());
    this.reviewRepository.save(review);
  }

  public void addToFavourites(UserMovieDTO userMovieDTO) throws FilmNetException {
    Optional<User> user = Optional.ofNullable(userRepository.findByEmail(userMovieDTO.getEmail()));
    Optional<Movie> movie = movieRepository.findById(userMovieDTO.getMovieId());
    if (user.isPresent() && movie.isPresent()) {
      Set<Movie> movieSet = new HashSet<>(user.get().getLikedMovies());
      movieSet.add(movie.get());
      user.get().setLikedMovies(movieSet);
      this.userRepository.save(user.get());
    }
  }

  public void removeFromFavourites(UserMovieDTO userMovieDTO) throws FilmNetException {
    Optional<User> user = Optional.ofNullable(userRepository.findByEmail(userMovieDTO.getEmail()));
    Optional<Movie> movie = movieRepository.findById(userMovieDTO.getMovieId());
    if (user.isPresent() && movie.isPresent()) {
      Set<Movie> movieSet = new HashSet<>(user.get().getLikedMovies());
      movieSet.remove(movie.get());
      user.get().setLikedMovies(movieSet);
      this.userRepository.save(user.get());
    }
  }

  public UserLikesMovieDTO findIfAlreadyLikedByUser(UserLikesMovieDTO userLikesMovieDTO) throws FilmNetException {
    Optional<User> user = Optional.ofNullable(userRepository.findByEmail(userLikesMovieDTO.getUserEmail()));
    if (user.isPresent()) {
      Set<Movie> movieSet = new HashSet<>(user.get().getLikedMovies());
      boolean hasLikedMovie = movieSet.stream().anyMatch(m -> Objects.equals(m.getId(), userLikesMovieDTO.getMovieId()));
      if (hasLikedMovie) {
        return userLikesMovieDTO;
      } else {
        return null;
      }
    } else {
      throw new FilmNetException(Constants.USER_NOT_EXISTS);
    }
  }

  public Set<MovieDTO> getFavouriteMovies(String email) {
    Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
    Set<Movie> movieSet = new HashSet<>(user.get().getLikedMovies());
    Set<MovieDTO> movieDTOSet = new HashSet<>();
    movieSet.forEach(m -> {
      movieDTOSet.add(movieMapper.map(m));
    });
    return movieDTOSet;
  }

  public void deleteReview(String id) {
    this.reviewRepository.deleteById(id);
  }

  public List<AuthUserDTO> getAllInactiveUsers() {
    return authUserMapper.mapToDtos(this.authUserRepository.findAllByActiveFalse());
  }

  public void deleteUser(String email) {
    Optional<AuthUser> authUser = Optional.ofNullable(this.authUserRepository.findByUsername(email));
    if (authUser.isPresent() && !authUser.get().isActive()) {
      this.authUserRepository.deleteById(authUser.get().getId());
    }
  }

  public void createToken(UserEmailDTO userEmailDTO) throws FilmNetException, MessagingException {
    AuthUser authUser = authUserRepository.findByUsername(userEmailDTO.getEmail());
    if (authUser != null && authUser.isActive()) {
      UserToken userToken = new UserToken();
      userToken.setAuthUser(authUser);
      userToken.setToken(UUID.randomUUID().toString());
      userToken.setExpiredDate(Instant.now().plus(Duration.ofHours(48)));
      UserToken existingToken = userTokenRepository.findByAuthUser_Username(userEmailDTO.getEmail());
      this.saveToken(existingToken, userToken);
      sendEmail(userEmailDTO.getEmail(), userToken.getToken());
    } else {
      throw new FilmNetException(Constants.INACTIVE_USER_NOT_EXIST_USER);
    }
  }

  @org.springframework.transaction.annotation.Transactional(rollbackFor = Exception.class)
  public void saveToken(UserToken existingToken, UserToken userToken) {
    if (existingToken != null) {
      existingToken.setToken(userToken.getToken());
      existingToken.setAuthUser(userToken.getAuthUser());
      existingToken.setExpiredDate(userToken.getExpiredDate());
      userTokenRepository.save(existingToken);
    } else {
      userTokenRepository.save(userToken);
    }
  }

  public void sendEmail(String email, String token) throws FilmNetException, javax.mail.MessagingException {
    User user = userRepository.findByEmail(email);
    emailService.sendEmailForResetPassword(user, token);
  }

  @org.springframework.transaction.annotation.Transactional(rollbackFor = Exception.class)
  public void updatePassword(UserTokenDTO userTokenDTO) throws FilmNetException {
    UserToken userToken = userTokenRepository.findByToken(userTokenDTO.getToken());
    Instant currentDate = Instant.now();
    if (userToken != null && currentDate.compareTo(userToken.getExpiredDate()) < 0) {
      AuthUser authUser = userToken.getAuthUser();
      authUser.setPassword(passwordEncoder.encode(userTokenDTO.getPassword()));
      authUserRepository.save(authUser);
    } else {
      throw new FilmNetException(Constants.EXPIRED_TOKEN);
    }
  }

  public void deleteUserToken(String id) {
    userTokenRepository.deleteById(id);
  }

}
