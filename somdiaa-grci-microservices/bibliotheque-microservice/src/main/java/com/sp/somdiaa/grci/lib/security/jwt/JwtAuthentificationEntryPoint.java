package com.sp.somdiaa.grci.lib.security.jwt;

import java.io.IOException;
import java.io.Serializable;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthentificationEntryPoint implements AuthenticationEntryPoint, Serializable  {
	private static final long serialVersionUID = -7858869558953243875L;

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		
		
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	    response.setContentType("application/json");
	    
	    //response.getWriter().write("{ \"message\": \"" + authException.getMessage() + "\" }");
		//response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized, You must authenticate!");
	}

}

