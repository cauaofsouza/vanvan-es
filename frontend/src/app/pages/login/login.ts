import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  showPassword = signal(false);

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  onLogin(): void {
    console.log('Login attempt', { email: this.email, password: this.password });
    // CHAMA O SERVIÇO DE AUTENTICAÇÃO POR AQUI
  }
}
