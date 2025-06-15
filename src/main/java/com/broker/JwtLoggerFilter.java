package com.broker;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
//This class is for debugging purposes
//@Component
public class JwtLoggerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null) {
            System.out.println("Authorization header: " + authHeader);
        } else {
            System.out.println("Authorization header is missing");
        }

        filterChain.doFilter(request, response);
    }
}
