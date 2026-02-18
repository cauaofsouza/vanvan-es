import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotoristaEditComponent } from './components/motorista-edit/motorista-edit.component';
import { MotoristaAdd } from './components/motorista-add/motorista-add';

interface Motorista {
  id: number;
  nome: string;
  status: 'Ativo' | 'Em análise' | 'Recusado';
  identidade?: string;
  cnh?: string;
  placa?: string;
  modelo?: string;
  email?: string;
  senha?: string;
  foto?: string;
}

@Component({
  selector: 'app-motoristas',
  standalone: true,
  imports: [CommonModule, FormsModule, MotoristaEditComponent, MotoristaAdd],
  templateUrl: './motoristas.component.html',
})
export class MotoristasComponent {
  filtro = '';
  modalEditarAberto = false;  
  modalAdicionarAberto = false;
  motoristaSelecionado: Motorista | null = null;

  motoristas: Motorista[] = [
    { id: 1, nome: 'João Silva de oleiveira santos da comadre', status: 'Ativo' },
    { id: 2, nome: 'Maria Oliveira', status: 'Em análise' },
    { id: 3, nome: 'Carlos Pereira', status: 'Recusado' },
    { id: 4, nome: 'Ana Souza', status: 'Ativo' },
    { id: 5, nome: 'Pedro Santos', status: 'Em análise' },
    { id: 6, nome: 'Luiza Costa', status: 'Recusado' },
    { id: 7, nome: 'Rafael Lima', status: 'Ativo' },
    { id: 8, nome: 'Fernanda Alves', status: 'Em análise' },
    { id: 9, nome: 'Bruno Rodrigues', status: 'Recusado' },
    { id: 10, nome: 'Carla Mendes', status: 'Ativo' },
    { id: 11, nome: 'Gustavo Ferreira', status: 'Em análise' },
    { id: 12, nome: 'Mariana Gomes', status: 'Recusado' },
    { id: 13, nome: 'Ricardo Barbosa', status: 'Ativo' },
    { id: 14, nome: 'Aline Ribeiro', status: 'Em análise' },
    { id: 15, nome: 'Felipe Martins', status: 'Recusado' },
  ];

  get motoristasFiltrados(): Motorista[] {
    return this.motoristas.filter((m) =>
      m.nome.toLowerCase().includes(this.filtro.toLowerCase()) || m.id.toString().includes(this.filtro)
    );
  }

  editar(motorista:Motorista){
    console.log('Editar motorista', motorista);
    this.motoristaSelecionado = { ...motorista }; // cópia
    this.modalEditarAberto = true;
  }

  excluir(motorista:Motorista){
    console.log('Excluir motorista', motorista);
    // AQUI ABRE O MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
  }

  adicionar(){
    console.log('Adicionar motorista');
    this.modalAdicionarAberto = true;
    // AQUI ABRE O MODAL DE ADIÇÃO DE MOTORISTA
  }

  fecharModal() {
  this.modalEditarAberto = false;
  this.modalAdicionarAberto = false;
  this.motoristaSelecionado = null;
  }


  salvarEdicao(motoristaEditado: Motorista) {
    const index = this.motoristas.findIndex((m) => m.id === motoristaEditado.id);
    if (index !== -1) {
      this.motoristas[index] = motoristaEditado;
    }
    this.fecharModal();
  }

  salvarNovoMotorista(novoMotorista: any) {
    console.log('Recebido do modal:', novoMotorista);

    const novoId = this.motoristas.length > 0 ? Math.max(...this.motoristas.map(m => m.id)) + 1 : 1;

    // Cria o objeto completo
    const motoristaPronto: Motorista = {
      id: novoId,
      nome: novoMotorista.nome,
      status: 'Ativo', // Status padrão
      ...novoMotorista
    };

    this.motoristas.push(motoristaPronto);
    
    // Fecha o modal
    this.fecharModal();
  }

}
