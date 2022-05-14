package com.ihu.imdbback.config.security;

import com.ihu.imdbback.service.SecurityService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Component
public class TokenProvider {

  @Value("${app.secret}")
  private String secretKey;

  @Value("${app.token-validity-in-seconds}")
  private long tokenValidityInMilliseconds;

  @Autowired
  private SecurityService securityService;


  @PostConstruct
  public void init() {
    this.secretKey = Base64.getEncoder().encodeToString(this.secretKey.getBytes());
    this.tokenValidityInMilliseconds = 1000 * this.tokenValidityInMilliseconds;
  }

  public String createToken(String username) {
    Date now = new Date();
    Date validity = new Date(now.getTime() + this.tokenValidityInMilliseconds);

    return "Bearer " + Jwts.builder().setId(UUID.randomUUID().toString())
      .setSubject(username).setIssuedAt(now)
      .signWith(SignatureAlgorithm.HS512, this.secretKey).setExpiration(validity)
      .compact();
  }

  public Authentication getAuthentication(String token) {
    String username = Jwts.parser()
      .setSigningKey(this.secretKey)
      .parseClaimsJws(token)
      .getBody()
      .getSubject();
    UserDetails userDetails = this.securityService.loadUserByUsername(username);
    return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
  }

}
