package com.ihu.imdbback.config.exception;

import com.ihu.imdbback.exception.Constants;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SecurityException extends RuntimeException {

  private Constants.ErrorCode errorCode;

  public SecurityException(String message) {
    super(message);
  }

  public SecurityException(Throwable t) {
    super(t);
    errorCode = Constants.ErrorCode.UNAUTHORISED_ERROR;
  }

  public static SecurityException rethrow(Throwable t) throws SecurityException {
    if (SecurityException.class.isAssignableFrom(t.getClass())) {
      throw (SecurityException) t;
    }
    throw new SecurityException(t);
  }

  public static SecurityException wrap(Throwable t) {
    try {
      rethrow(t);
    } catch (SecurityException se) {
      return se;
    }
    return null;
  }

  public Constants.ErrorCode getErrorCode() {
    return errorCode;
  }
}
