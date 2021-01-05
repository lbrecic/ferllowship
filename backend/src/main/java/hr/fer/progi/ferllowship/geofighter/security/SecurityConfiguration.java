package hr.fer.progi.ferllowship.geofighter.security;

import javax.servlet.http.HttpSession;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableScheduling
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
    @Autowired
    private CustomAuthenticationProvider customAuthProvider;

    @Autowired
	private ActiveUserStore activeUserStore;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf().disable()
		.authorizeRequests()
			.antMatchers("/register").permitAll()
			.antMatchers("/login").permitAll()
			.antMatchers("/confirm").permitAll()
			.antMatchers(
				"/",
				"/h2-console/**",
				"/profile",
				"/admins",
				"/bans",
				"/cards",
				"/cartographs",
				"/categories",
				"/confirmationTokens",
				"/fights",
				"/locations",
				"/players",
				"/shortestPaths"
			).hasRole("ADMIN")
		.anyRequest()
			.authenticated()
		.and()
			.formLogin()
			.successHandler((req, resp, auth) -> {
				HttpSession session = req.getSession(false);
				if (session != null) {
					LoggedUser user = new LoggedUser(auth.getName(), activeUserStore);
					session.setAttribute("user", user);
				}
				resp.setStatus(HttpStatus.SC_OK);
			})
			.failureHandler((req, resp, ex) -> {
				resp.setStatus(HttpStatus.SC_UNAUTHORIZED);
			})
        .and()
        	.logout()
        	.logoutSuccessHandler((req, resp, auth) -> {
				HttpSession session = req.getSession();
				if (session != null) {
					session.removeAttribute("user");
				}
				resp.setStatus(HttpStatus.SC_OK);
        	})
	        .deleteCookies("JSESSIONID")
		.and()
			.headers()
			.frameOptions()
			.disable();
	}
	
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthProvider);
    }

    @Scheduled(fixedDelay = 60 * 1000, initialDelay = 60 * 1000)
    public void removeInactiveUsers() {
		activeUserStore.getUsers().removeIf(user ->
			System.currentTimeMillis() - user.getLastTimeWhenActive() > 5 * 60 * 1000
		);
	}
	
}
