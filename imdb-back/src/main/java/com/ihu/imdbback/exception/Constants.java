package com.ihu.imdbback.exception;

public class Constants {

  public static final String UNEXPECTED_ERROR = "Unexpected error";
  public static final String USERNAME_EXISTS = "A user already exists with this username";
  public static final String EMAIL_EXISTS = "A user already exists with this email";
  public static final String REVIEW_EXISTS = "You have already reviewed this movie before";
  public static final String INACTIVE_USER_NOT_EXIST_USER = "User does not exist or is inactive. Please contact with the administrator at filmnet@outlook.com.gr";
  public static final String EXPIRED_TOKEN = "Token has been expired";
  public static final String USER_NOT_EXISTS = "User does not exist";
  public static final String BAD_CREDENTIALS = "Your email or password is wrong";


  public static enum ErrorCode {
    UNAUTHORISED_ERROR,
    VALIDATION_ERROR
  }

}
