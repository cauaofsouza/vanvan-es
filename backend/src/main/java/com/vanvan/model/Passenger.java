package com.vanvan.model;

import com.vanvan.enums.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "passengers")
@NoArgsConstructor//construtor vazio
@SQLDelete(sql = "UPDATE user SET active = false WHERE id=?")
@SQLRestriction("active = true")
public class Passenger extends User {


    public Passenger(String name, String cpf, String phone, String email, String password, LocalDate birthDate) {
        super(name, cpf, phone, email, password, UserRole.PASSENGER, birthDate);
    }

}