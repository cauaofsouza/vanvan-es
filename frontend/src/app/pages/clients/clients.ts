import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Clients {
  id: number;
  nome: string;
  telephone: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.html',
})
export class ClientsList {
  filtro = '';
  clients: Clients[] = [
    { id: 1, nome: 'João Silva ', telephone: '1234567890' },
    { id: 2, nome: 'Maria Oliveira', telephone: '0987654321' },
    { id: 3, nome: 'Carlos Pereira', telephone: '0000000000' },
    { id: 4, nome: 'Ana Souza', telephone: '0000000000' },
    { id: 5, nome: 'Pedro Santos', telephone: '1111111111' },
    { id: 6, nome: 'Luiza Costa', telephone: '2222222222' },
    { id: 7, nome: 'Rafael Lima', telephone: '3333333333' },
    { id: 8, nome: 'Fernanda Alves', telephone: '4444444444' },
    { id: 9, nome: 'Bruno Rodrigues', telephone: '5555555555' },
    { id: 10, nome: 'Carla Mendes', telephone: '6666666666' },
    { id: 11, nome: 'Gustavo Ferreira', telephone: '7777777777' },
    { id: 12, nome: 'Mariana Gomes', telephone: 'Recusado' },
    { id: 13, nome: 'Ricardo Barbosa', telephone: 'Ativo' },
    { id: 14, nome: 'Aline Ribeiro', telephone: 'Em análise' },
    { id: 15, nome: 'Felipe Martins', telephone: 'Recusado' },
  ];

  get clientsFiltered(): Clients[] {
    return this.clients.filter((c) =>
      c.nome.toLowerCase().includes(this.filtro.toLowerCase()) || c.id.toString().includes(this.filtro)
    );
  }

  edit(client:Clients){
    console.log('Editar cliente', client);
    // AQUI ABRE O MODAL DE EDIÇÃO
  }

  exclude(client:Clients){
    console.log('Excluir cliente', client);
    // AQUI ABRE O MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
  }

  add(client:Clients){
    console.log('Adicionar cliente', client);
    // AQUI ABRE O MODAL DE ADIÇÃO DE CLIENTE
  }

}
