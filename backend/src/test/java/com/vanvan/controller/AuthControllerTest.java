package com.vanvan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.vanvan.config.security.JwtService;
import com.vanvan.model.Passenger;
import com.vanvan.service.UserService;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock private AuthenticationManager authenticationManager;
    @Mock private UserService userService;
    @Mock private JwtService jwtService;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    private final Validator validator =
            Validation.buildDefaultValidatorFactory().getValidator();

    @BeforeEach
    void setUp() {
        AuthController authController = new AuthController(
                authenticationManager, userService, jwtService, objectMapper, validator);
        mockMvc = MockMvcBuilders.standaloneSetup(authController)
                .setControllerAdvice(new com.vanvan.exception.GlobalExceptionHandler())
                .build();
    }

    @Test
    void register_success_returns201() throws Exception {
        String body = """
                {
                  "name": "Allice Amorim",
                  "email": "allice@email.com",
                  "password": "senha123",
                  "cpf": "52998224725",
                  "phone": "81988888888",
                  "role": "passenger",
                  "birthDate": "01/01/2000"
                }
                """;

        Passenger passenger = new Passenger("Allice Amorim", "52998224725", "81988888888",
                "allice@email.com", "senha123", LocalDate.of(2000, 1, 1));

        when(userService.register(any())).thenReturn(passenger);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated());
    }

    @Test
    void login_success_returns200() throws Exception {
        String body = """
                {"email": "allice@email.com", "password": "senha123"}
                """;

        Passenger passenger = new Passenger("Allice", "52998224725", "81988888888",
                "allice@email.com", "senha123", LocalDate.of(2000, 1, 1));

        Authentication auth = mock(Authentication.class);
        when(auth.getPrincipal()).thenReturn(passenger);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(auth);
        when(jwtService.generateToken("allice@email.com")).thenReturn("mocked-jwt-token");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk());
    }

    @Test
    void login_badCredentials_returns401() throws Exception {
        String body = """
                {"email": "wrong@email.com", "password": "errada"}
                """;

        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("bad"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void register_driver_invalidJson_returns400() throws Exception {
        String invalidDriverJson = "{}";

        mockMvc.perform(post("/api/auth/register-driver")
                        .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                        .param("driver", invalidDriverJson))
                .andExpect(status().isBadRequest());
    }
}