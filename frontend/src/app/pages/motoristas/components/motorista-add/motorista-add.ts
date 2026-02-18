import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-motorista-add',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importante para o ngModel funcionar
  templateUrl: './motorista-add.html',
  styleUrl: './motorista-add.css'
})
export class MotoristaAdd {

  // Eventos para avisar o componente pai
  @Output() aoFechar = new EventEmitter<void>();
  @Output() aoSalvar = new EventEmitter<any>();

  mostrarSenha = false;

  // Objeto vazio mapeando os campos do Figma
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
    // Aqui você pode adicionar validações simples antes de enviar
    // Ex: if (!this.novoMotorista.nome) return;

    console.log('Dados preenchidos:', this.novoMotorista);
    
    // Envia o objeto preenchido para o pai (que vai chamar o serviço)
    this.aoSalvar.emit(this.novoMotorista);
  }
}