package com.sp.somdiaa.grci.lib.config;

import java.time.Duration;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.StdTypeResolverBuilder;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Configuration
@ConditionalOnProperty(prefix = "spring.redis", name = "enable", havingValue = "true")
@ConfigurationProperties(prefix = "spring.redis")
@Setter
@Slf4j
@Import({RedisAutoConfiguration.class})
@EnableRedisRepositories
public class RedisConfig {

	 private String host;
	 private int port;
	 private String password;
	 private int ttl;

	    @Bean
	    @Primary
	    public RedisConnectionFactory reactiveRedisConnectionFactory(RedisStandaloneConfiguration defaultRedisConfig) {
	        
	    	JedisClientConfiguration clientConfiguration= JedisClientConfiguration
	    			.builder().usePooling()//.useSsl()
	    			.build();
	    	JedisConnectionFactory connectionFactory= new JedisConnectionFactory(defaultRedisConfig, clientConfiguration);
			
	        log.info("Creating Redis Connection Factory");
	        return connectionFactory;
	    }
	 
	    @Bean
	    public RedisCacheConfiguration cacheConfiguration() {
			
			ObjectMapper mapper = new ObjectMapper();
			mapper.registerModule(new JavaTimeModule());
			
			//mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            //mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
			mapper.registerModule(new Hibernate5Module().disable(Hibernate5Module.Feature.USE_TRANSIENT_ANNOTATION));
			
			StdTypeResolverBuilder resolverBuilder=ObjectMapper.DefaultTypeResolverBuilder
					.construct(ObjectMapper.DefaultTyping.EVERYTHING,mapper.getPolymorphicTypeValidator());
			resolverBuilder = resolverBuilder.init(JsonTypeInfo.Id.CLASS, null);
		    resolverBuilder = resolverBuilder.inclusion(JsonTypeInfo.As.PROPERTY);
		    mapper.setDefaultTyping(resolverBuilder);
		    //mapper.setVisibility(PropertyAccessor.GETTER, Visibility.ANY);
           
	        return RedisCacheConfiguration.defaultCacheConfig()
	          .entryTtl(Duration.ofMinutes(ttl))
	          .disableCachingNullValues()
	          .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer(mapper)));
	    }

	    @Bean
	    public RedisStandaloneConfiguration defaultRedisConfig() {
	        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
	        config.setHostName(host);
	        config.setPassword(RedisPassword.of(password));
	        config.setPort(port);
	        return config;
	    }
	    
		
		/*
		 * @Bean public RedisCacheManager cacheManager(RedisConnectionFactory
		 * connectionFactory,RedisCacheConfiguration redisCacheConfiguration) {
		 * RedisCacheWriter redisCacheWriter =
		 * RedisCacheWriter.nonLockingRedisCacheWriter(connectionFactory); return new
		 * RedisCacheManager(redisCacheWriter,redisCacheConfiguration); }
		 */
	}
