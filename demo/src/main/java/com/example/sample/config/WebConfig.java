package com.example.sample.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow CORS for all routes
                .allowedOrigins("http://localhost:5173")  // Allow your front-end origin
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow these methods
                .allowedHeaders("*");  // Allow all headers
    }
}
