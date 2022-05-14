package com.ihu.imdbback.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity(name = "AUTH_USER")
public class AuthUser {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private String id;

  @Column(name = "username")
  private String username;

  @Column(name = "password")
  private String password;

  @Column(name = "active")
  private boolean active;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "AUTH_TO_ROLE", joinColumns = @JoinColumn(name = "auth_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;

}
