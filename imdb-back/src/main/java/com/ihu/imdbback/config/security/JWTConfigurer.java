package com.ihu.imdbback.config.security;

import lombok.AllArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class JWTConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

  private final TokenProvider tokenProvider;
  private final SecurityJWTFilter securityJWTFilter;

  public void configure(HttpSecurity http) {
    securityJWTFilter.setTokenProvider(tokenProvider);
    http.addFilterBefore(securityJWTFilter, UsernamePasswordAuthenticationFilter.class);
  }


}
