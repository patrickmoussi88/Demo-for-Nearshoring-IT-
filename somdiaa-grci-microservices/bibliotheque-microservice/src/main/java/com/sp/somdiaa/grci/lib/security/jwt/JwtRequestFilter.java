package com.sp.somdiaa.grci.lib.security.jwt;

import java.io.IOException;
import java.util.Arrays;

import com.sp.somdiaa.grci.lib.dto.response.ResponseMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sp.somdiaa.grci.lib.exception.UserNotAuthorizeException;
import com.sp.somdiaa.grci.lib.security.web.WebSecurityConfig;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

	private UserDetailsServiceImpl userDetailsService;	

	private JwtTokenUtils jwtTokenUtil;
	
	private ObjectMapper objectMapper;

	@Value("${security.jwt.header-name}")
	private String JWT_HEADER_NAME;

	@Value("${security.jwt.header-prefix}")
	private String HEADER_PREFIX;
	
	public JwtRequestFilter(UserDetailsServiceImpl userDetailsService, JwtTokenUtils jwtTokenUtil,
			ObjectMapper objectMapper) {
		super();
		this.userDetailsService = userDetailsService;
		this.jwtTokenUtil = jwtTokenUtil;
		this.objectMapper = objectMapper;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		final String token = request.getHeader(JWT_HEADER_NAME);
		String username = null;
		String jwtToken = null;
         
		if (token != null && token.startsWith(HEADER_PREFIX + " ")) {
			jwtToken = token.substring(7);
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);

			} catch (IllegalArgumentException e) {
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				response.getWriter().write(objectMapper.writeValueAsString(new ResponseMessage(403,"Impossible d'obtenir Access Token, veuillez verifier qu'elle est bien fomatter")));
				log.warn("authentification failed: Unable to get JWT Token");
				return;
			} catch (ExpiredJwtException e) {
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				response.getWriter().write(objectMapper.writeValueAsString(new ResponseMessage(403, "votre Access-Token a expirer")));
				log.warn("authentification failed: JWT Token has expired");
				return;
			}catch(SignatureException e) {
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				response.getWriter().write(objectMapper.writeValueAsString(new ResponseMessage(403, "signature tu token incorrecte")));
				log.warn("violation de sécurité : "+e.getMessage());
			}
		} else {
			if (Arrays.asList(WebSecurityConfig.APP_WHITELIST).stream().anyMatch(m -> {
				if (m.endsWith("**"))
					m = m.replace("**", "");
				return request.getRequestURI().contains(m);
			})) {
				chain.doFilter(request, response);
				return;
			} else {
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				response.getWriter().write(objectMapper.writeValueAsString(new ResponseMessage(403,"Une authentification complète est requise pour accéder à cette ressource: votre token d'access n'est pas présent")));
				log.warn("authentification failed: JWT Token does not begin with Bearer String");
				return;
			}
		}

		try {
			if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = this.userDetailsService.loadUserByUsername(token);

				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
						new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				log.info("test :: dkkdkkdkdkdkk");
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
   
			}
		} catch (UserNotAuthorizeException  e) {
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			response.getWriter().write(objectMapper.writeValueAsString(new ResponseMessage(403, e.getMessage())));
			log.warn("authentification failed: " + e.getMessage());
			return;
		}
		chain.doFilter(request, response);
	}
}