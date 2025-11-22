import { useEffect, useState } from "react";
import axios from "axios";
import { Treino } from "../../../models/Treino"; // Importamos o modelo existente

interface RegistroTreino {
    registroTreinoId: number;
    data: string;
    treinoId?: number;
}

function ListarRegistro() {
    const [registros, setRegistros] = useState<RegistroTreino[]>([]);
    const [treinos, setTreinos] = useState<Treino[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    function carregarDados() {
        // 1. Buscar a lista de Treinos para ter os nomes
        axios.get("http://localhost:5064/api/treinos")
            .then((resposta) => {
                // Tratamento para ReferenceHandler.Preserve ($values)
                const dadosTreinos = resposta.data.$values ? resposta.data.$values : resposta.data;
                setTreinos(dadosTreinos);
            })
            .catch((erro) => {
                console.log("Erro ao carregar treinos:", erro);
            });

        // 2. Buscar a lista de Registros
        axios.get("http://localhost:5064/api/registros")
            .then((resposta) => {
                // Tratamento para ReferenceHandler.Preserve ($values)
                const dadosRegistros = resposta.data.$values ? resposta.data.$values : resposta.data;
                setRegistros(dadosRegistros);
            })
            .catch((erro) => {
                // Tratamento para quando a lista vem vazia (404 no backend)
                if (erro.response && erro.response.status === 404) {
                    setRegistros([]);
                } else {
                    console.log(erro);
                }
            });
    }

    // Função auxiliar para encontrar o nome do treino pelo ID
    function getNomeTreino(id?: number) {
        if (!id) return "N/A";
        const treinoEncontrado = treinos.find(t => t.treinoId === id);
        return treinoEncontrado ? treinoEncontrado.nomeTreino : "Treino não encontrado";
    }

    return (
        <div id="componente_listar_registros">
            <h1 className="content-title">Histórico de Treinos Realizados</h1>
            <table className="alunos-tabela">
                <thead>
                    <tr id="header-list">
                        <th>#</th>
                        <th>Data</th>
                        <th>Treino Realizado</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((reg) => (
                        <tr key={reg.registroTreinoId}>
                            <td>{reg.registroTreinoId}</td>
                            <td>{new Date(reg.data).toLocaleDateString()}</td>
                            <td>{getNomeTreino(reg.treinoId)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarRegistro;