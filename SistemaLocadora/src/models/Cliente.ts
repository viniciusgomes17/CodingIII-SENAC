import { Conta } from "./Conta";

export class Cliente {
  constructor(
    public nome: string,
    public conta: Conta
  ) {}
}
