package hr.fer.progi.ferllowship.geofighter.security;

import javax.servlet.http.HttpSession;

import org.apache.http.HttpStatus;
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

//				UPUTE:
//				- kod lokalnog developmenta zakomentirati 2) i otkomentirati 1)
//				- tako neka i ostane, 2) otkomentirati samo kada je stvarno potrebno
//				==================
//				1)
				resp.sendRedirect("/");
//				------------------
//				2)
//				resp.setStatus(HttpStatus.SC_OK);
//				==================
			})
			.failureHandler((req, resp, ex) -> {
//				UPUTE:
//				- kod lokalnog developmenta zakomentirati 2) i otkomentirati 1)
//				- tako neka i ostane, 2) otkomentirati samo kada je stvarno potrebno
//				==================
//				1)
				resp.sendRedirect("/login");
//				------------------
//				2)
//				resp.setStatus(HttpStatus.SC_UNAUTHORIZED);
//				==================
			})
        .and()
        	.logout()
        	.logoutSuccessHandler((req, resp, auth) -> {
				HttpSession session = req.getSession();

				if (session != null) {
					session.removeAttribute("user");
				}

//				UPUTE:
//				- kod lokalnog developmenta zakomentirati 2) i otkomentirati 1)
//				- tako neka i ostane, 2) otkomentirati samo kada je stvarno potrebno
//				==================
//				1)
				resp.sendRedirect("/");
//				------------------
//				2)
//				resp.setStatus(HttpStatus.SC_OK);
//				==================
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
	
}
