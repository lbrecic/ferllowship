package hr.fer.progi.ferllowship.geofighter.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
    @Autowired
    private CustomAuthenticationProvider customAuthProvider;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf().disable()
		.authorizeRequests()
			.antMatchers("/register").permitAll()
			.antMatchers("/confirm").permitAll()
			.antMatchers(
				"/",
				"/h2-console",
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
		.anyRequest().authenticated()
		.and()
			.formLogin()
			.successHandler((req, resp, auth) -> resp.sendRedirect("/"))
			.failureHandler((req, resp, ex) -> resp.sendRedirect("/login"))
        .and()
        	.logout()
        	.logoutSuccessHandler((req, resp, auth) -> resp.sendRedirect("/"))
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
