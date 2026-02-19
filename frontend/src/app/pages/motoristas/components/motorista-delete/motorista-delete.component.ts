import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, DriverAdmin } from '../../../../services/admin.service';
import { ToastService } from '../../../../components/toast/toast.service';
import { Toast } from '../../../../components/toast/toast';

@Component({
  selector: 'app-motorista-delete',
  standalone: true,
  imports: [CommonModule, Toast],
  templateUrl: './motorista-delete.component.html',
})
export class MotoristaDeleteComponent {

  // Recebe o motorista selecionado pelo componente pai
  @Input() motorista: DriverAdmin | null = null;

  // Emite evento para fechar o modal (true = excluiu, false = cancelou)
  @Output() aoFechar = new EventEmitter<boolean>();

  // Controle de estado para desabilitar botão durante o processo
  carregando = signal(false);

  constructor(
    private adminService: AdminService,
    private toastService: ToastService,
  ) {}

  // Fecha o modal sem fazer nada
  fechar() {
    if (!this.carregando()) {
      this.aoFechar.emit(false);
    }
  }

  // Chama o serviço para apagar o registro
  confirmarExclusao() {
    // Validação de segurança
    if (!this.motorista?.id) {
      this.toastService.error('Erro: motorista não identificado.');
      return;
    }

    this.carregando.set(true);

    this.adminService.deleteDriver(this.motorista.id).subscribe({
      next: () => {
        this.carregando.set(false);
        this.toastService.success('Motorista excluído com sucesso!');
        setTimeout(() => this.aoFechar.emit(true), 800);
      },
      error: (err: any) => {
        this.carregando.set(false);
        if (err?.error?.message) {
          this.toastService.error(err.error.message);
        } else if (typeof err?.error === 'string') {
          this.toastService.error(err.error);
        } else {
          this.toastService.error('Não foi possível excluir o motorista. Tente novamente.');
        }
      }
    });
  }
}
