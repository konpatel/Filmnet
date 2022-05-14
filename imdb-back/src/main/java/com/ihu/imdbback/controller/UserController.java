package com.ihu.imdbback.controller;

import com.ihu.imdbback.dto.*;
import com.ihu.imdbback.dto.authorisation.AuthUserDTO;
import com.ihu.imdbback.dto.authorisation.UserDetailsDTO;
import com.ihu.imdbback.exception.FilmNetException;
import com.ihu.imdbback.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@AllArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping
  @RequestMapping("/user/login")
  public UserDetailsDTO userLogin(@Valid @RequestBody UserLoginDTO userLoginDTO, HttpServletResponse response) throws FilmNetException {
    return userService.loginUser(userLoginDTO, response);
  }

  @GetMapping
  @RequestMapping("/lock/user/sign-out-user")
  public void userLogout(HttpServletResponse response) {
    userService.logoutUser(response);
  }

  @PostMapping
  @RequestMapping("/user/register")
  public UserDTO userRegister(@Valid @RequestBody UserDTO userDTO) throws FileNotFoundException, FilmNetException {
    return this.userService.registerUser(userDTO);
  }

  @GetMapping
  @RequestMapping("/lock/user/notifications/{count}")
  public MovieDTO getNotifications(@PathVariable String count) {
    return this.userService.getNotifications(count);
  }

  @GetMapping("/lock/user/{email}")
  public void closeAccount(@PathVariable String email) {
    this.userService.closeAccount(email);
  }

  @GetMapping("/lock/get/user/{email}")
  public UserDTO getUsername(@PathVariable String email) {
    return this.userService.getUsername(email);
  }

  @PostMapping("/lock/user/save/review")
  public void saveReview(@Valid @RequestBody UserReviewDTO userReviewDTO) throws FilmNetException {
    this.userService.saveReview(userReviewDTO);
  }

  @PostMapping("/lock/user/remove/likes/movie")
  public void removeFromFavourites(@RequestBody UserMovieDTO userMovieDTO) throws FilmNetException {
    this.userService.removeFromFavourites(userMovieDTO);
  }

  @PostMapping("/lock/user/likes/movie")
  public void addToFavourites(@RequestBody UserMovieDTO userMovieDTO) throws FilmNetException {
    this.userService.addToFavourites(userMovieDTO);
  }

  @PostMapping("/lock/movies/likes")
  public UserLikesMovieDTO findIfAlreadyLikedByUser(@RequestBody UserLikesMovieDTO userLikesMovieDTO) throws FilmNetException {
    return this.userService.findIfAlreadyLikedByUser(userLikesMovieDTO);
  }

  @DeleteMapping("/lock/delete/post/{id}")
  public void deleteReview(@PathVariable String id) throws FilmNetException {
    this.userService.deleteReview(id);
  }

  @GetMapping("/lock/get/inactive/users")
  public List<AuthUserDTO> getAllInactiveUsers() {
    return this.userService.getAllInactiveUsers();
  }

  @GetMapping("/lock/user/get/liked/movies/{email}")
  public Set<MovieDTO> getFavouriteMovies(@PathVariable String email) {
    return this.userService.getFavouriteMovies(email);
  }

  @GetMapping("/lock/delete/user/{email}")
  public void deleteUser(@PathVariable String email) {
    this.userService.deleteUser(email);
  }

  @PostMapping("/user/forgot/password")
  public void sendEmail(@Valid @RequestBody UserEmailDTO userEmailDTO) throws FilmNetException, MessagingException {
    this.userService.createToken(userEmailDTO);
  }

  @PostMapping("/user/new/password")
  public void updatePassword(@Valid @RequestBody UserTokenDTO userTokenDTO) throws FilmNetException, MessagingException {
    this.userService.updatePassword(userTokenDTO);
  }

}
