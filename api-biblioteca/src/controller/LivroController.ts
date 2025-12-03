import { Request, Response } from "express";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroController {

    async criar(req: Request, res: Response) {
        try {
            const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

            if (!titulo || !autor || !isbn || !anoPublicacao) {
                return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos" });
            }

            const livro = LivroRepository.create({
                titulo,
                autor,
                isbn,
                anoPublicacao,
                disponivel,
            });

            await LivroRepository.save(livro);
            return res.status(201).json(livro);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar livro" });
        }
    }

    async listar(req: Request, res: Response) {
        const livros = await LivroRepository.find();
        return res.json(livros);
    }

    async buscarPorId(req: Request, res: Response) {
        const { id } = req.params;
        const livro = await LivroRepository.findOneBy({ id: Number(id) });

        if (!livro) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        return res.json(livro);
    }

    async atualizar(req: Request, res: Response) {
        const { id } = req.params;

        const livro = await LivroRepository.findOneBy({ id: Number(id) });
        if (!livro) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        Object.assign(livro, req.body);
        await LivroRepository.save(livro);

        return res.json(livro);
    }

    async excluir(req: Request, res: Response) {
        const { id } = req.params;

        const livro = await LivroRepository.findOneBy({ id: Number(id) });

        if (!livro) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        await LivroRepository.remove(livro);

        return res.status(204).send();
    }
}
