import { useEffect, useState } from "react";
import axios from "axios";
import { Treino } from "../../../models/Treino";

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
        axios.get("http://localhost:5064/api/treinos")
            .then((resposta) => {
                const dadosTreinos = resposta.data.$values || resposta.data;
                setTreinos(dadosTreinos);
            })
            .catch(() => {});

        axios.get("http://localhost:5064/api/registros")
            .then((resposta) => {
                const dadosRegistros = resposta.data.$values || resposta.data;
                setRegistros(dadosRegistros);
            })
            .catch((erro) => {
                if (erro.response && erro.response.status === 404) {
                    setRegistros([]);
                }
            });
    }

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