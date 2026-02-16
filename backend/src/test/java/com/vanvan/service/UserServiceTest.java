package com.vanvan.service;

import com.vanvan.dto.DriverRegisterRequestDTO;
import com.vanvan.dto.RegisterDTO;
import com.vanvan.dto.RegisterRequestDTO;
import com.vanvan.exception.EmailAlreadyExistsException;
import com.vanvan.model.Driver;
import com.vanvan.model.Passenger;
import com.vanvan.model.User;
import com.vanvan.repository.DriverRepository;
import com.vanvan.repository.PassengerRepository;
import com.vanvan.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks private UserService userService;
    
    @Mock private UserRepository userRepository;
    @Mock private PassengerRepository passengerRepository;
    @Mock private DriverRepository driverRepository;
    @Mock private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("Deve salvar Passageiro corretamente")
    void shouldRegisterPassenger() {
        // ARRANGE
        // Simulando o Record RegisterRequestDTO (Role = passenger)
        var dto = new RegisterRequestDTO(
            "passenger", "Carlos", "carlos@email.com", "123456", "11122233344", "81999999999", LocalDate.parse("2026-02-16")
        );

        when(userRepository.findByEmail(dto.getEmail())).thenReturn(null);
        when(userRepository.findByCpf(dto.getCpf())).thenReturn(null);
        when(passwordEncoder.encode(dto.getPassword())).thenReturn("hashed_pass");
        
        // Quando salvar passageiro, retorna um objeto Passenger preenchido
        when(passengerRepository.save(any(Passenger.class))).thenAnswer(i -> i.getArgument(0));

        // ACT
        var result = userService.register(dto);

        // ASSERT
        assertInstanceOf(Passenger.class, result);
        assertEquals("hashed_pass", result.getPassword());
        verify(passengerRepository, times(1)).save(any(Passenger.class));
        verify(driverRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve salvar Motorista com CNH e Pix")
    void shouldRegisterDriver() {
        // ARRANGE
        // Simulando o Record DriverRegisterRequestDTO (Role = driver)
        RegisterDTO dto = new DriverRegisterRequestDTO(
            "Vanvan",
                "van@email.com",
                "senha123",
                "12345678900",
                "99988877700",
                "driver",
                LocalDate.parse("13/10/2003", DateTimeFormatter.ofPattern("dd-MM-yyyy")),
                "81988888888"

        );

        when(userRepository.findByEmail(dto.getEmail())).thenReturn(null);
        when(userRepository.findByCpf(dto.getCpf())).thenReturn(null);
        // Importante: mockar verificação de CNH
        when(driverRepository.existsByCnh( ((DriverRegisterRequestDTO) dto).getCnh())).thenReturn(false);
        when(passwordEncoder.encode(dto.getPassword())).thenReturn("hashed_pass");
        
        when(driverRepository.save(any(Driver.class))).thenAnswer(i -> i.getArgument(0));

        // ACT
        var result = userService.register(dto);

        // ASSERT
        assertInstanceOf(Driver.class, result);
        verify(driverRepository, times(1)).save(any(Driver.class));
    }

    @Test
    @DisplayName("Deve lançar erro se Email já existe")
    void shouldThrowIfEmailExists() {
        // ARRANGE
        var dto = new RegisterRequestDTO("passenger", "Ana", "dup@email.com", "123", "000", "111", LocalDate.parse("2026-02-16"));
        
        // Simula que achou alguém no banco
        when(userRepository.findByEmail(dto.getEmail())).thenReturn(mock(User.class));

        // ACT & ASSERT
        assertThrows(EmailAlreadyExistsException.class, () -> userService.register(dto));
        verify(passengerRepository, never()).save(any());
    }
}