import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { AdminService } from '../../../../services/admin.service';
import { ToastService } from '../../../../components/toast/toast.service';
import { Toast } from '../../../../components/toast/toast';

@Component({
  selector: 'app-motorista-add',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './motorista-add.html',
})
export class MotoristaAdd {

  @Output() aoFechar = new EventEmitter<boolean>();

  mostrarSenha = false;
  carregando = signal(false);

  novoMotorista = {
    name: '',
    email: '',
    password: '',
    cpf: '',
    telephone: '',
    birthDate: '',
    cnh: '',
    pixKey: '',
  };

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private toastService: ToastService,
  ) {}

  alternarVisualizacaoSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  onCpfInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    this.novoMotorista.cpf = value;
    input.value = value;
  }

  onPhoneInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1)$2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1)$2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d\d)(\d{0,5}).*/, '($1)$2');
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)/, '($1');
    }

    this.novoMotorista.telephone = value;
    input.value = value;
  }

  onCnhInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    this.novoMotorista.cnh = value;
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

    this.novoMotorista.birthDate = value;
    input.value = value;
  }

  fechar() {
    this.aoFechar.emit(false);
  }

  salvar() {
    const d = this.novoMotorista;

    if (!d.name || !d.email || !d.password || !d.cpf || !d.telephone || !d.birthDate || !d.cnh || !d.pixKey) {
      this.toastService.error('Preencha todos os campos obrigatórios.');
      return;
    }

    if (d.cpf.length !== 11) {
      this.toastService.error('O CPF deve ter exatamente 11 dígitos.');
      return;
    }

    if (d.cnh.length !== 11) {
      this.toastService.error('A CNH deve ter exatamente 11 dígitos.');
      return;
    }

    const dateParts = d.birthDate.split('/');
    if (dateParts.length !== 3 || dateParts[2].length !== 4) {
      this.toastService.error('Data de nascimento inválida. Use o formato dd/mm/aaaa.');
      return;
    }

    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[0], 10);
    if (year < 1920 || year > 2020 || month < 1 || month > 12 || day < 1 || day > 31) {
      this.toastService.error('Data de nascimento inválida.');
      return;
    }

    this.carregando.set(true);

    const payload = {
      name: d.name,
      email: d.email,
      password: d.password,
      cpf: d.cpf,
      telephone: d.telephone,
      birthDate: d.birthDate,
      cnh: d.cnh,
      pixKey: d.pixKey,
      role: 'driver',
    };

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        const driverId = res?.id;
        if (driverId) {
          this.adminService.updateDriverStatus(driverId, 'APPROVED').subscribe({
            next: () => {
              this.carregando.set(false);
              this.toastService.success('Motorista cadastrado com sucesso!');
              this.aoFechar.emit(true);
            },
            error: () => {
              this.carregando.set(false);
              this.toastService.success('Motorista cadastrado! Aprovação pendente.');
              this.aoFechar.emit(true);
            }
          });
        } else {
          this.carregando.set(false);
          this.toastService.success('Motorista cadastrado com sucesso!');
          this.aoFechar.emit(true);
        }
      },
      error: (err: any) => {
        this.carregando.set(false);
        if (err?.error?.message) {
          this.toastService.error(err.error.message);
        } else if (typeof err?.error === 'string') {
          this.toastService.error(err.error);
        } else {
          this.toastService.error('Erro ao cadastrar motorista. Verifique os dados e tente novamente.');
        }
      }
    });
  }
}
