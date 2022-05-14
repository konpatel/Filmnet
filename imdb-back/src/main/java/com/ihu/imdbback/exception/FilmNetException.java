package com.ihu.imdbback.exception;

public class FilmNetException extends Exception {

  private String message;

  public FilmNetException(String message) {
    super(message);
    this.message = message;
  }

  public FilmNetException(Throwable t) {
    super(t);
    this.message = Constants.UNEXPECTED_ERROR;
  }

  public static FilmNetException rethrow(Throwable t) throws FilmNetException {
    if (FilmNetException.class.isAssignableFrom(t.getClass())) {
      throw (FilmNetException) t;
    }

    throw new FilmNetException(t);
  }

  public static FilmNetException wrap(Throwable t) {
    try {
      rethrow(t);
    } catch (FilmNetException se) {
      return se;
    }
    return null;
  }


  public String getMessage() {
    return this.message;
  }

}
