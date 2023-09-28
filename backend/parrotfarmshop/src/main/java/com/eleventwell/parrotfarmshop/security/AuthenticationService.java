package com.eleventwell.parrotfarmshop.security;


import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import com.eleventwell.parrotfarmshop.entity.UserEntity;
import com.eleventwell.parrotfarmshop.repository.RoleRepository;
import com.eleventwell.parrotfarmshop.repository.UserRepository;
import com.eleventwell.parrotfarmshop.service.impl.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  @Autowired
  UserRepository repository;

  @Autowired
   PasswordEncoder passwordEncoder;

     @Autowired
     JwtService jwtService ;

     @Autowired
    RoleRepository roleRepository;


@Autowired
 AuthenticationManager authenticationManager ;
    public AuthenticationResponse register(RegisterRequest request) {

        RoleEntity role = roleRepository.findOneById(1L);
   var user = UserEntity.builder()
           .userName(request.getUserName())
           .fullName(request.getFullName())
           .email(request.getEmail())
           .password(passwordEncoder.encode(request.getPassword()))
           .role(role)
        .build();
   repository.save(user);
   var jwtToken = jwtService.generateToken(user);
   return AuthenticationResponse.builder()
           .token(jwtToken)
           .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
   //check login
        authenticationManager.authenticate(
           new UsernamePasswordAuthenticationToken(
                   request.getEmail(),
                   request.getPassword()

           )

   );
   var user = repository.findByEmail(request.getEmail()).orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
