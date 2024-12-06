package com.sp.somdiaa.grci.lib.security.jwt;

import java.util.ArrayList;
import java.util.Collection;

import com.sp.somdiaa.grci.lib.dto.response.ResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sp.somdiaa.grci.lib.client.ConfigurationClient;
import com.sp.somdiaa.grci.lib.exception.UserNotAuthorizeException;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private ConfigurationClient configurationClient;

	private JwtTokenUtils jwtTokenUtils;

   public UserDetailsServiceImpl(ConfigurationClient configurationClient, JwtTokenUtils jwtTokenUtils) {
		super();
		this.configurationClient = configurationClient;
		this.jwtTokenUtils = jwtTokenUtils;
	}

	@Override
	public UserDetails loadUserByUsername(String token) throws UsernameNotFoundException {
        ResponseEntity<ResponseMessage> response = configurationClient.checktokenofuser(token);
        ResponseMessage message = response.getBody();
        
        if(response.getStatusCode()!= HttpStatus.OK) {
        	throw new UserNotAuthorizeException(message.getMessage());
        }
        
        String jwtToken = token.substring(7);
        String username = jwtTokenUtils.getUsernameFromToken(jwtToken);
        
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        jwtTokenUtils.getRolesFormToken(jwtToken).forEach(permission->{
        	authorities.add(new SimpleGrantedAuthority(permission));
        });
        
		return new User(username, username,authorities );
	}
}

