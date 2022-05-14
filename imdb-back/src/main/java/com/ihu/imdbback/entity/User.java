package com.ihu.imdbback.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity(name = "FILMNET_USERS")
@EntityListeners(AuditingEntityListener.class)
public class User {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private String id;

  @Column(name = "first_name")
  private String firstname;

  @Column(name = "last_name")
  private String lastname;

  @Column(name = "username")
  private String username;

  @Column(name = "email")
  private String email;

  @CreatedDate
  @Column(name = "created_on")
  private Instant createdOn;

  @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
  @JoinTable(
    name = "USER_LIKED_MOVIES",
    joinColumns = @JoinColumn(name = "user_id"),
    foreignKey = @ForeignKey(name = "FK_USER_TO_LIKED_MOVIE"),
    inverseJoinColumns = @JoinColumn(name = "movie_id",
      foreignKey = @ForeignKey(name = "FK_LIKED_MOVIES_TO_USER")))
  private Set<Movie> likedMovies;

  @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JoinColumn(name = "auth_user_id")
  private AuthUser authUser;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
  @LazyCollection(LazyCollectionOption.FALSE)
  @JsonIgnore
  private List<Review> reviews;

}
