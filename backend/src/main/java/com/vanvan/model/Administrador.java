package com.vanvan.model;

import com.vanvan.enums.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "administradores")
public class Administrador extends Usuario {
    public Administrador() {
        super();
    }

    public Administrador(String nome, String cpf, String telefone, String email, String senha) {
        super(nome, cpf, telefone, email, senha, UserRole.ADMIN);
    }
}