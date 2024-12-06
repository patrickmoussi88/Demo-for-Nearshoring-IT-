package com.sp.somdiaa.grci.lib.security.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.sp.somdiaa.grci.lib.security.jwt.JwtAuthentificationEntryPoint;
import com.sp.somdiaa.grci.lib.security.jwt.JwtRequestFilter;
import com.sp.somdiaa.grci.lib.security.jwt.UserDetailsServiceImpl;


@Configuration
@EnableWebSecurity
//@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

	@Autowired
	private JwtAuthentificationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private UserDetailsServiceImpl jwtUserDetailsService;

	@Autowired
	private JwtRequestFilter jwtRequestFilter;

	public static final String[] APP_WHITELIST = new String[] { "/swagger-ui/**", "/swagger-ui.html",
			"/v3/api-docs", "/v3/api-docs/**" , "/api/v1/**"};
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {


		httpSecurity
		        .cors(Customizer.withDefaults())
		        . csrf(AbstractHttpConfigurer :: disable)
		        .authorizeHttpRequests(authorize -> authorize
				.requestMatchers(APP_WHITELIST).permitAll()
				.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.exceptionHandling(exceptions -> exceptions.authenticationEntryPoint(jwtAuthenticationEntryPoint))
				.authenticationProvider(authenticationProvider())
				.httpBasic(AbstractHttpConfigurer :: disable)
                .addFilterBefore(jwtRequestFilter,  UsernamePasswordAuthenticationFilter.class);

		return httpSecurity.build();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(jwtUserDetailsService);
		authProvider.setPasswordEncoder(new BCryptPasswordEncoder());

		return authProvider;
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
}


