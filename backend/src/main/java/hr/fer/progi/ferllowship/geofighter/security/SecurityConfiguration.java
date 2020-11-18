package hr.fer.progi.ferllowship.geofighter.security;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
    @Autowired
    private CustomAuthenticationProvider customAuthProvider;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf().disable()
		.requestCache().disable()
		.authorizeRequests()
			.antMatchers("/register").permitAll()
			.antMatchers("/confirm").permitAll()
			.antMatchers("/").hasRole("ADMIN")
		.anyRequest().authenticated()
		.and()
			.formLogin()
			.successHandler((req, resp, auth) -> resp.setStatus(HttpStatus.SC_OK))
			.failureHandler((req, resp, ex) -> resp.setStatus(HttpStatus.SC_UNAUTHORIZED))
        .and()
        	.logout()
	        .deleteCookies("JSESSIONID");
	}
	
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthProvider);
        auth.inMemoryAuthentication()
	        .withUser("admin")
	        .password("{noop}admin")
	        .roles("ADMIN");
    }
	
}
