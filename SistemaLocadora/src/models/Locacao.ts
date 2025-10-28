import { Filme } from "./Filme";

export class Locacao {
  private listaFilmes: Filme[] = [];
  private valorTotalApagar: number = 0;
  private dataLocacao: Date;

  constructor() {
    this.dataLocacao = new Date();
  }

  addFilme(filme: Filme): void {
    this.listaFilmes.push(filme);
    this.valorTotalApagar += filme.valorLocacao;
  }

  getResumo(): string {
    const nomes = this.listaFilmes.map(f => f.titulo).join(", ");
    return `${this.dataLocacao.toLocaleString()} | ${nomes} | R$${this.valorTotalApagar.toFixed(2)}`;
  }

  getValorTotal(): number {
    return this.valorTotalApagar;
  }
}
