import app from "./app";
import { AppDataSource } from "./database/data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("Banco iniciado com sucesso!");
        app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    })
    .catch((err) => console.error("Erro ao iniciar banco:", err));
