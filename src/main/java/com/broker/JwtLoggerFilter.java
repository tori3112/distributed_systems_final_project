package com.broker;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtLoggerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth instanceof JwtAuthenticationToken jwtAuth) {
//            Jwt jwt = jwtAuth.getToken();
//            System.out.println("JWT Claims: " + jwt.getClaims());
//        }
//        filterChain.doFilter(request, response);


        String authHeader = request.getHeader("Authorization");

        if (authHeader != null) {
            System.out.println("Authorization header: " + authHeader);
        } else {
            System.out.println("Authorization header is missing");
        }

        filterChain.doFilter(request, response);
    }
}
