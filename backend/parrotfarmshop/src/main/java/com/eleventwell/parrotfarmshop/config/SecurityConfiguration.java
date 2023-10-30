package com.eleventwell.parrotfarmshop.config;

import com.eleventwell.parrotfarmshop.Filter.JwtAuthecationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    @Autowired
    JwtAuthecationFilter jwtAuthFilter;

    @Autowired
    AuthenticationProvider authenticationProvider;



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf()
                .disable()

                .authorizeHttpRequests()
                //check bằng đường dẫn này trở về sau
                .requestMatchers("api/**").permitAll()
                .and()
//                .authorizeHttpRequests().requestMatchers("api/order/admin/**").authenticated()
//                .anyRequest()
//                .authenticated()
//                .and()
                .authorizeHttpRequests(customizer -> customizer
//                        .requestMatchers(adminUrlMatcher()).authenticated()
                                .requestMatchers("api/user/register","api/user/login-with-google/authenticate","api/user/authenticate","api/role").permitAll()
//                        .anyRequest().authenticated()
                                .anyRequest().permitAll()
                )
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }




    private RequestMatcher adminUrlMatcher() {
        return request -> request.getServletPath().contains("admin");
    }
    private RequestMatcher customerUrlMatcher() {
        return request -> request.getServletPath().contains("customer");
    }
    private RequestMatcher staffUrlMatcher() {
        return request -> request.getServletPath().contains("staff");
    }
    private RequestMatcher marketingUrlMatcher() {
        return request -> request.getServletPath().contains("marketing");
    }



    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000/"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
