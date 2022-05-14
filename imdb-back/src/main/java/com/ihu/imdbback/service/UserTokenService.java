package com.ihu.imdbback.service;

import com.ihu.imdbback.entity.UserToken;
import com.ihu.imdbback.repository.UserTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.List;

@EnableScheduling
@Transactional
@AllArgsConstructor
@Service
public class UserTokenService {

  private final UserTokenRepository userTokenRepository;
  private final UserService userService;

  /**
   * This method runs every day at 2 p.m and delete the tokens that have been expired.
   */
  @Scheduled(cron = "0 0 2 * * *", zone = "EET")
  @org.springframework.transaction.annotation.Transactional(rollbackFor = Exception.class)
  public void deleteUserToken() {
    List<UserToken> userTokenList = userTokenRepository.findAll();
    userTokenList.forEach(userToken -> {
      Instant currentDate = Instant.now();
      if (currentDate.compareTo(userToken.getExpiredDate()) > 0) {
        userService.deleteUserToken(userToken.getId());
      }
    });
  }

}
