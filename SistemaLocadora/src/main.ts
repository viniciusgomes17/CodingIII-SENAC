import { Cliente } from "./models/Cliente";
import { Conta } from "./models/Conta";
import { Filme } from "./models/Filme";

// Criando filmes
const filmes = [
  new Filme("Matrix", 5.0),
  new Filme("Vingadores", 6.0),
  new Filme("Batman", 4.5),
  new Filme("Homem-Aranha", 5.5),
  new Filme("Toy Story", 3.5),
  new Filme("Interestelar", 7.0),
  new Filme("Avatar", 6.5),
  new Filme("Titanic", 4.0),
  new Filme("John Wick", 5.5),
  new Filme("Oppenheimer", 8.0),
];

// Criando clientes
const clientes = [
  new Cliente("Vinícius", new Conta()),
  new Cliente("Mosiah", new Conta()),
  new Cliente("Amanda", new Conta()),
];

// Fazendo locações
clientes[0].conta.locarFilmes([filmes[0], filmes[2]]);
clientes[0].conta.locarFilmes([filmes[5]]);
clientes[1].conta.locarFilmes([filmes[1], filmes[3], filmes[6]]);
clientes[2].conta.locarFilmes([filmes[4], filmes[7], filmes[8], filmes[9]]);

// Exibindo extratos
clientes.forEach(c => {
  console.log(c.conta.extratoHistorico(c.nome));
  console.log(`Saldo devedor: R$${c.conta.getSaldoDevedor().toFixed(2)}\n`);
});
