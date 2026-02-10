package com.vanvan.repository;

import com.vanvan.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministradorRepository extends JpaRepository<Administrador, String> {
    Administrador findByCpf(String cpf);
}