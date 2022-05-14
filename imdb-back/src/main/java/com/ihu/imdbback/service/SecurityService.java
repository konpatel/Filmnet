package com.ihu.imdbback.service;

import com.ihu.imdbback.config.security.AuthenticationManager;
import com.ihu.imdbback.config.security.TokenProvider;
import com.ihu.imdbback.dto.authorisation.UserDetailsDTO;
import com.ihu.imdbback.entity.AuthUser;
import com.ihu.imdbback.entity.Role;
import com.ihu.imdbback.exception.FilmNetException;
import com.ihu.imdbback.repository.authorisation.AuthUserRepository;
import com.ihu.imdbback.repository.authorisation.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SecurityService implements UserDetailsService {

  @Autowired
  private TokenProvider tokenProvider;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private AuthUserRepository authUserRepository;


  public UserDetailsDTO getUserDetailsDTO(String username) {
    UserDetails userDetails = loadUserByUsername(username);
    UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
    userDetailsDTO.setUsername(userDetails.getUsername());

    userDetailsDTO.setRoles(userDetails.getAuthorities().stream()
      .map(GrantedAuthority::getAuthority)
      .filter(authority -> authority.startsWith("ROLE_"))
      .collect(Collectors.toSet()));
    return userDetailsDTO;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    AuthUser authUser = authUserRepository.findByUsername(username);
    if (authUser == null) {
      throw new UsernameNotFoundException(username);
    }
    return org.springframework.security.core.userdetails.User
      .withUsername(authUser.getUsername())
      .password(authUser.getPassword())
      .authorities(getGrantedAuthorities(new ArrayList<>(authUser.getRoles())))
      .accountExpired(false)
      .accountLocked(false)
      .credentialsExpired(false)
      .disabled(false)
      .build();
  }

  public void userAuthentication(String username, String password, HttpServletResponse response) throws FilmNetException {
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
    this.authenticationManager.authenticate(authenticationToken);
    String token = tokenProvider.createToken(username);
    setAuthorizationHeader(response, token);
    setLoginSuccessHeader(response);
  }

  public void setAuthorizationHeader(HttpServletResponse response, String token) {
    response.addHeader("AUTH-TOKEN", token);
  }

  public void setLoginSuccessHeader(HttpServletResponse response) {
    response.addHeader("X-LOGIN-SUCCESS", "true");
  }

  public void setLogoutSuccessHeader(HttpServletResponse response) {
    response.addHeader("X-LOGOUT-SUCCESS", "true");
  }

  private List<GrantedAuthority> getGrantedAuthorities(List<Role> roles) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    roles
      .forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
    return authorities;
  }

}
