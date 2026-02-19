import { Component, OnInit, signal } from '@angular/core';
import { AdminService, DriverAdmin } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotoristaDeleteComponent } from './components/motorista-delete/motorista-delete.component';
import { MotoristaAdd } from './components/motorista-add/motorista-add';
import { MotoristaEditComponent } from './components/motorista-edit/motorista-edit.component';


@Component({
  selector: 'app-motoristas',
  standalone: true,
  imports: [CommonModule, FormsModule, MotoristaDeleteComponent, MotoristaAdd, MotoristaEditComponent],
  templateUrl: './motoristas.component.html',
})
export class MotoristasComponent implements OnInit {

  // --- VARIÁVEIS DE DADOS ---
  listaMotoristas: DriverAdmin[] = [];
  motoristasFiltrados = signal<DriverAdmin[]>([]);
  termoBusca: string = '';
  carregando = signal(false);
  erro = signal('');

  // --- CONTROLE DE MODAIS ---
  modalAdicionarAberto: boolean = false;
  modalEditarAberto: boolean = false;
  modalExcluirAberto: boolean = false;

  // --- MOTORISTA SELECIONADO (Para Edição ou Exclusão) ---
  motoristaSelecionado: DriverAdmin | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.carregarMotoristas();
  }

  // --- 1. CARREGAR DADOS ---
  carregarMotoristas(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.adminService.listDrivers(undefined, 0, 100).subscribe({
      next: (page) => {
        this.listaMotoristas = page.content;
        this.filtrarMotoristas();
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar motoristas:', err);
        this.erro.set('Erro ao carregar motoristas.');
        this.carregando.set(false);
      }
    });
  }

  // --- 2. FILTRO DE BUSCA ---
  filtrarMotoristas() {
    if (!this.termoBusca.trim()) {
      this.motoristasFiltrados.set([...this.listaMotoristas]);
    } else {
      const termo = this.termoBusca.toLowerCase();
      this.motoristasFiltrados.set(
        this.listaMotoristas.filter(m =>
          m.name.toLowerCase().includes(termo) ||
          m.cnh.includes(termo)
        )
      );
    }
  }

  // --- 3. LÓGICA DO MODAL ADICIONAR ---
  abrirModalAdicionar() {
    this.modalAdicionarAberto = true;
  }

  fecharModalAdicionar(sucesso: boolean) {
    this.modalAdicionarAberto = false;
    if (sucesso) {
      this.carregarMotoristas();
    }
  }

  // --- 4. LÓGICA DO MODAL EDITAR ---
  abrirModalEditar(motorista: DriverAdmin) {
    this.motoristaSelecionado = { ...motorista };
    this.modalEditarAberto = true;
  }

  fecharModalEditar(sucesso: boolean) {
    this.modalEditarAberto = false;
    this.motoristaSelecionado = null;
    if (sucesso) {
      this.carregarMotoristas();
    }
  }

  // --- 5. LÓGICA DO MODAL EXCLUIR ---
  abrirModalExcluir(motorista: DriverAdmin) {
    this.motoristaSelecionado = motorista;
    this.modalExcluirAberto = true;
  }

  fecharModalExcluir(sucesso: boolean) {
    this.modalExcluirAberto = false;
    this.motoristaSelecionado = null;
    if (sucesso) {
      this.carregarMotoristas();
    }
  }
}