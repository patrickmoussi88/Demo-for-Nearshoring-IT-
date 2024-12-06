package com.sp.somdiaa.grci.lib.security.jwt;

import java.io.Serializable;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
@SuppressWarnings("unchecked")
public class JwtTokenUtils implements Serializable{

	 private static final long serialVersionUID = -2550185165626007488L;
	    
	    @Value("${security.jwt.secret}")
	    private String JWT_SECRET;

	    public String getUsernameFromToken(String token) {
	        return getClaimFromToken(token, Claims::getSubject);
	    }

	    public Date getIssuedAtDateFromToken(String token) {
	        return getClaimFromToken(token, Claims::getIssuedAt);
	    }

	    public Date getExpirationDateFromToken(String token) {
	        return getClaimFromToken(token, Claims::getExpiration);
	    }
	    
		public List<String> getRolesFormToken(String token) {
	        Claims claims = getAllClaimsFromToken(token);
	        return (List<String>) claims.get("authorities");
	    }

	public List<Long> getPerimetreFormToken(String tokenHeader) {
		String token = tokenHeader.substring(7);
		Claims claims = getAllClaimsFromToken(token);

		List<Integer> perimetre= (List<Integer>) claims.get("perimetres");
		List<Long> perimetreIds=new ArrayList<>();
		perimetre.forEach(perimetreId->perimetreIds.add(perimetreId.longValue()));
		return perimetreIds;
	}

	public List<Long> getMetiersFormToken(String tokenHeader) {
		String token = tokenHeader.substring(7);
		Claims claims = getAllClaimsFromToken(token);
		List<Integer> metier= (List<Integer>) claims.get("metiers");
		List<Long> metierIds=new ArrayList<>();
		metier.forEach(metierId->metierIds.add(metierId.longValue()));
		return metierIds;
	}

	    public Long getSessionFormToken(String token) {
	        Claims claims = getAllClaimsFromToken(token);
	        Integer i=(int)claims.get("sessionId");
	        return i.longValue();
	    }
	    public Long getUserIdFormToken(String token) {
	        Claims claims = getAllClaimsFromToken(token);
	        Integer i=(int)claims.get("userId");
	        return i.longValue();
	    }
	    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
	        final Claims claims = getAllClaimsFromToken(token);
	        return claimsResolver.apply(claims);
	    }

	    private Claims getAllClaimsFromToken(String token) {
	        return Jwts.parserBuilder()
	        		.setSigningKey(getSignKey())
	        		.build()
	        		.parseClaimsJws(token)
	        		.getBody();
	    }

	    private Boolean isTokenExpired(String token) {
	        final Date expiration = getExpirationDateFromToken(token);
	        return expiration.before(new Date(System.currentTimeMillis()));
	    }

	    public Boolean canTokenBeRefreshed(String token) {
	        return !isTokenExpired(token);
	    }
	    
	    public Key getSignKey() {
	    	byte[] keyBytes= Decoders.BASE64.decode(JWT_SECRET);
	    	return Keys.hmacShaKeyFor(keyBytes);
	    }

}

