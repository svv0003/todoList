package com.backend.common.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.server.SecurityWebFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(basic -> basic.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(
                        auth -> auth
                        .anyRequest().permitAll())
//                .sessionManagement(session -> session
//                        .maximumSessions(1)               // 동시 세션 1개만 허용
//                        .maxSessionsPreventsLogin(false)  // 새 로그인 시 기존 세 무효화
//                );
                // 로그인 아직 안 쓰니까 세션도 단순화
                 .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );
        return http.build();
    }

//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable())
//
//                .formLogin(AbstractHttpConfigurer::disable)
//
//                .httpBasic(basic -> basic.disable())
//
//                /*
//                세션을 아예 생성하지 않겠다.
//                서버는 로그인 상태를 기억하지 않고, 모든 인증을 클라이언트가 보내는 JWT 토큰으로만 판단한다.
//                 */
//                .sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//
//                // 권한 설정: 로그인, 회원가입, WebSocket은 누구나 접근
//                /*
//                다음 경로들은 로그인(인증) 없이도 접근 가능하게 열어둔다.
//                 */
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(
//                                "/api/auth/login",     // 로그인
//                                "/api/auth/signup",    // 회원가입
//                                "/api/auth/check",     // 로그인 상태 확인
//                                "/ws/**",              // WebSocket 엔드포인트
//                                "/info",               // SockJS 경로
//                                "/info/**"
//                        ).permitAll()
//                        /*
//                        나머지 모든 API는 현재 개발 중이라 인증 없이 허용한다.
//                        배포 전에 .anyRequest().authenticated()로 바꾸면 JWT 없으면 접근 불가능하다.
//                         */
//                        .anyRequest().permitAll()
//                )
//
//                /*
//                직접 만든 JwtAuthenticationFilter를 등록한다.
//                모든 요청이 들어올 때마다 이 필터가 먼저 실행되어 Authorization 헤더의 Bearer 토큰을 검사하고,
//                유효하면 SecurityContext에 사용자 정보(userId)를 넣어준다.
//                 */
//                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//
//        /*
//        React 프론트엔드가 다른 포트에서 백엔드 호출할 수 있게 CORS 허용 설정을 적용한다.
//         */
//        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
//
//        return http.build();
//    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://localhost:3001"
                // 배포 도메인도 추가
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}