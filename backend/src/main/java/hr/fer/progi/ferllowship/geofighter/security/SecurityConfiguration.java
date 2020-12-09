package hr.fer.progi.ferllowship.geofighter.security;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
    @Autowired
    private CustomAuthenticationProvider customAuthProvider;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
//		.exceptionHandling()
//		.authenticationEntryPoint((req, resp, auth) -> resp.sendError(HttpStatus.SC_UNAUTHORIZED))
//		.and()
		.csrf().disable()
		.requestCache().disable()
		.authorizeRequests()
			.antMatchers("/register").permitAll()
			.antMatchers("/confirm").permitAll()
			.antMatchers("/").hasAnyRole("ADMIN", "CARTOGRAPH", "PLAYER")
		.anyRequest().authenticated()
		.and()
			.formLogin()
			.successHandler((req, resp, auth) -> resp.setStatus(HttpStatus.SC_OK))
			.failureHandler((req, resp, ex) -> resp.setStatus(HttpStatus.SC_UNAUTHORIZED))
        .and()
        	.logout()
        	.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
	        .deleteCookies("JSESSIONID");
	}
	
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthProvider);
        auth.inMemoryAuthentication()
	        .withUser("admin")
	        .password("$2y$12$E8ydHaF/Cpzc.swbCOYz0eWrokcCz26I71kayzAXnBqYy0mc2PKJ.")
	        .roles("ADMIN");
    }
	
}
