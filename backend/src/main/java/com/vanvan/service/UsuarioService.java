package com.vanvan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vanvan.exception.CnhAlreadyExistsException;
import com.vanvan.exception.CpfAlreadyExistsException;
import com.vanvan.exception.EmailAlreadyExistsException;
import com.vanvan.model.Administrador;
import com.vanvan.model.Motorista;
import com.vanvan.model.Passageiro;
import com.vanvan.repository.AdministradorRepository;
import com.vanvan.repository.MotoristaRepository;
import com.vanvan.repository.PassageiroRepository;
import com.vanvan.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MotoristaRepository motoristaRepository;

    @Autowired
    private PassageiroRepository passageiroRepository;

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Motorista cadastrarMotorista(Motorista motorista) {
        //verifica se o email já está cadastrado
        if (usuarioRepository.findByEmail(motorista.getEmail()) != null) {
            throw new EmailAlreadyExistsException(motorista.getEmail());
        }
        //verifica se o cpf já está cadastrado
        if (motoristaRepository.findByCpf(motorista.getCpf()) != null) {
            throw new CpfAlreadyExistsException(motorista.getCpf());
        }
        //verifica se a cnh já está cadastrada
        if (motoristaRepository.existsByCnh(motorista.getCnh())) {
             throw new CnhAlreadyExistsException(motorista.getCnh());
        }
        //salva a senha criptografada
        String senhaCriptografada = passwordEncoder.encode(motorista.getPassword());
        motorista.setSenha(senhaCriptografada);
        return motoristaRepository.save(motorista);
    }

    public Passageiro cadastrarPassageiro(Passageiro passageiro) {
        //verifica se o email já está cadastrado
        if (usuarioRepository.findByEmail(passageiro.getEmail()) != null) {
            throw new EmailAlreadyExistsException(passageiro.getEmail());
        }
        //verifica se o cpf já está cadastrado
        if (passageiroRepository.findByCpf(passageiro.getCpf()) != null) {
            throw new CpfAlreadyExistsException(passageiro.getCpf());
        }
        //salva a senha criptografada
        String senhaCriptografada = passwordEncoder.encode(passageiro.getPassword());
        passageiro.setSenha(senhaCriptografada);
        return passageiroRepository.save(passageiro);
    }

    public Administrador cadastrarAdministrador(Administrador administrador) {
        //verifica se o email já está cadastrado
        if (usuarioRepository.findByEmail(administrador.getEmail()) != null) {
            throw new EmailAlreadyExistsException(administrador.getEmail());
        }
        //verifica se o cpf já está cadastrado
        if (administradorRepository.findByCpf(administrador.getCpf()) != null) {
            throw new CpfAlreadyExistsException(administrador.getCpf());
        }
        //salva a senha criptografada
        String senhaCriptografada = passwordEncoder.encode(administrador.getPassword());
        administrador.setSenha(senhaCriptografada);
        return administradorRepository.save(administrador);
    }
}

