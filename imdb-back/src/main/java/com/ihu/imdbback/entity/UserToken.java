package com.ihu.imdbback.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity(name = "USER_TOKEN")
@EntityListeners(AuditingEntityListener.class)
public class UserToken {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private String id;

  @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  @JoinColumn(name = "auth_user_id")
  private AuthUser authUser;

  @Column(name = "token", unique = true)
  private String token;

  @LastModifiedDate
  @Column(name = "created_on")
  private Instant createdOn;

  @Column(name = "expired_date")
  private Instant expiredDate;
}
