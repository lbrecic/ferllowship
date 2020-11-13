package hr.fer.progi.ferllowship.geofighter.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter {
	
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
		.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		.anyRequest().authenticated()
		.and()
		.formLogin()
        .successHandler((req, resp, auth) -> resp.setStatus(200))
        .failureHandler((req, resp, ex) -> resp.setStatus(403)).and()
        .sessionManagement()
        .invalidSessionStrategy((req, resp) -> resp.setStatus(401)).and()
        .logout()
        .deleteCookies("auth_code", "JSESSIONID").invalidateHttpSession(true)
        .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());
	}
	
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthProvider);
    }
	
}
