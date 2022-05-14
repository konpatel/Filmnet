package com.ihu.imdbback.service;

import com.ihu.imdbback.entity.User;
import com.ihu.imdbback.exception.Constants;
import com.ihu.imdbback.exception.FilmNetException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
@AllArgsConstructor
public class EmailService {

  //  private final JavaMailSender mailSender;
  private final JavaMailSender mailSender;


  @Qualifier("emailTemplateEngine")
  private final TemplateEngine emailTemplateEngine;

  private final Environment environment;
  private static final String HOST = "app.url";
  private static final String EMAIL_SIMPLE_TEMPLATE_NAME = "mail/email.html";
  private static final String FROM = "filmnet@outlook.com.gr";


  public void sendEmailForResetPassword(User user, String token) throws FilmNetException, javax.mail.MessagingException {
    try {

      final Context ctx = new Context();
      this.initialiseJavaMailSender(user, token, ctx);
      final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
      final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

      this.createMimeMessage(mimeMessage, message, user);
      final String htmlContent = this.emailTemplateEngine.process(EMAIL_SIMPLE_TEMPLATE_NAME, ctx);
      message.setText(htmlContent, true);
      this.mailSender.send(mimeMessage);
    } catch (Exception e) {
      throw new FilmNetException(Constants.UNEXPECTED_ERROR);
    }
  }

  public void initialiseJavaMailSender(User user, String token, Context ctx) {
    JavaMailSenderImpl javaMailSender = (JavaMailSenderImpl) this.mailSender;
    javaMailSender.setHost("smtp-mail.outlook.com");
    ctx.setVariable("name", user.getFirstname());
    ctx.setVariable("link", environment.getProperty(HOST) + "/reset-password/" + token);
  }

  public MimeMessageHelper createMimeMessage(MimeMessage mimeMessage, MimeMessageHelper message, User user) throws MessagingException, UnsupportedEncodingException {
    message.setSubject("Filmnet Reset Password");
    message.setFrom(new InternetAddress(FROM, "filmnet"));
    message.setTo(user.getEmail());
    return message;
  }

}
