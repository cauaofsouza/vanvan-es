import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-motorista-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './motorista-add.html',
})
export class MotoristaAdd {

  // Eventos para avisar o componente pai
  @Output() aoFechar = new EventEmitter<void>();
  @Output() aoSalvar = new EventEmitter<any>();

  mostrarSenha = false;

  novoMotorista = {
    nome: '',
    identidade: '', // CPF/RG
    cnh: '',
    placa: '',
    veiculo: '',
    email: '',
    senha: ''
  };

  // Função para alternar o ícone do olho
  alternarVisualizacaoSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  fechar() {
    this.aoFechar.emit();
  }

  salvar() {
    if (!this.novoMotorista.nome) return;
    console.log('Dados preenchidos:', this.novoMotorista);
    this.aoSalvar.emit(this.novoMotorista);
  }
}