import { Locacao } from "./Locacao";
import { Filme } from "./Filme";

export class Conta {
  private saldoDevedor: number = 0;
  private historicoLocacao: Locacao[] = [];

  locarFilmes(filmes: Filme[]): void {
    const locacao = new Locacao();
    filmes.forEach(filme => locacao.addFilme(filme));
    this.historicoLocacao.push(locacao);
    this.saldoDevedor += locacao.getValorTotal();
  }

  extratoHistorico(nomeCliente: string): string {
    let extrato = `.:: Histórico de Locações de ${nomeCliente} ::.\n`;
    this.historicoLocacao.forEach(loc => {
      extrato += loc.getResumo() + "\n";
    });
    return extrato;
  }

  pagarDebito(valor: number): void {
    this.saldoDevedor -= valor;
    if (this.saldoDevedor < 0) this.saldoDevedor = 0;
  }

  getSaldoDevedor(): number {
    return this.saldoDevedor;
  }
}
