import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../components/toast/toast.service';

@Component({
  selector: 'app-register-driver-2',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-driver-2.html',
})
export class RegisterDriverTwo {
  cnh = '';
  chavePix = '';
  vehicle = '';
  licensePlate = '';
  birthdate = '';
  
  errorMessage = '';

  private dadosEtapa1: any = {};

    constructor(
        private router: Router,
        private authService: AuthService,
        private toastService: ToastService // Serviço injetado aqui
    ) {
        const nav = this.router.getCurrentNavigation();
        if (nav?.extras.state) {
            this.dadosEtapa1 = nav.extras.state['driver'];
        } else { 
            this.router.navigate(['/register-driver-1']);
        }
    }

    onCnhInput(event: any) {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        this.cnh = value;
        input.value = value;
    }

    onBirthdateInput(event: any) {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 8) value = value.slice(0, 8);
        
        if (value.length > 4) {
          value = value.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, '$1/$2/$3');
        } else if (value.length > 2) {
          value = value.replace(/^(\d{2})(\d{0,2}).*/, '$1/$2');
        }
    
        this.birthdate = value;
        input.value = value;
    }

    finalizarCadastro() {
        if (!this.cnh || !this.chavePix || !this.birthdate) {
            this.toastService.error('Preencha todos os campos obrigatórios (CNH, Chave PIX e Data de nascimento).');
            return;
        }

        if (this.cnh.length !== 11) {
            this.toastService.error('A CNH deve ter exatamente 11 dígitos.');
            return;
        }

        const dateParts = this.birthdate.split('/');
        if (dateParts.length !== 3) {
            this.toastService.error('Data de nascimento inválida. Use o formato dd/mm/aaaa.');
            return;
        }
        
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);
        
        if (year < 1920 || year > 2020) {
            this.toastService.error('O ano de nascimento deve ser entre 1920 e 2020.');
            return;
        }
        
        if (month < 1 || month > 12 || day < 1 || day > 31) {
            this.toastService.error('Data de nascimento inválida.');
            return;
        }

        this.errorMessage = '';

        const motoristaCompleto = {
            name: this.dadosEtapa1.name,
            email: this.dadosEtapa1.email,
            cpf: this.dadosEtapa1.cpf,
            telephone: this.dadosEtapa1.telephone,
            password: this.dadosEtapa1.password,
            cnh: this.cnh,
            pixKey: this.chavePix,
            birthDate: this.birthdate,
            role: 'driver',
            vehicle: this.vehicle,
            licensePlate: this.licensePlate,
        };

        console.log('Enviando para API:', motoristaCompleto);

        this.authService.register(motoristaCompleto).subscribe({
            next: () => {
                this.toastService.success('Motorista cadastrado com sucesso!');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.error('Erro no cadastro do motorista:', err);
                let msgErro = 'Falha ao realizar cadastro. Verifique os dados e tente novamente.';
                
                if (err.error && typeof err.error === 'object' && err.error.message) {
                    msgErro = err.error.message;
                } else if (typeof err.error === 'string') {
                    msgErro = err.error;
                }
                
                this.errorMessage = msgErro;
                this.toastService.error(msgErro); // Dispara o Toast com o erro da API
            }
        });
    }
}