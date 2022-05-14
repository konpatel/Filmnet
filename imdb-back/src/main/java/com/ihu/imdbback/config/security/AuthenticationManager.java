package com.ihu.imdbback.config.security;

import com.ihu.imdbback.entity.AuthUser;
import com.ihu.imdbback.exception.Constants;
import com.ihu.imdbback.exception.FilmNetException;
import com.ihu.imdbback.repository.authorisation.AuthUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Order(Ordered.LOWEST_PRECEDENCE)
public class AuthenticationManager extends WebSecurityConfigurerAdapter {

  private final AuthUserRepository authUserRepository;

  public Authentication authenticate(Authentication authentication) throws FilmNetException {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    String username = authentication.getPrincipal().toString();
    String password = authentication.getCredentials().toString();

    AuthUser authUser = authUserRepository.findByUsername(username);
    if (authUser == null || !encoder.matches(password, authUser.getPassword())) {
      throw new FilmNetException(Constants.BAD_CREDENTIALS);
    }
    return new UsernamePasswordAuthenticationToken(username, password);
  }
}
