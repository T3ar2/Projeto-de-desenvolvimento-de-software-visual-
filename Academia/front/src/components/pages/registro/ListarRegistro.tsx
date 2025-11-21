import { useEffect, useState } from "react";
import axios from "axios";

interface RegistroTreino {
    registroTreinoId: number;
    data: string;
    treinoId?: number;
}

function ListarRegistro() {
    const [registros, setRegistros] = useState<RegistroTreino[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5064/api/registros")
            .then((resposta) => {
                setRegistros(resposta.data);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }, []);

    return (
        <div id="componente_listar_registros">
            <h1 className="content-title">Histórico de Treinos Realizados</h1>
            <table className="alunos-tabela">
                <thead>
                    <tr id="header-list">
                        <th>#</th>
                        <th>Data</th>
                        <th>ID do Treino</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((reg) => (
                        <tr key={reg.registroTreinoId}>
                            <td>{reg.registroTreinoId}</td>
                            <td>{new Date(reg.data).toLocaleDateString()}</td>
                            <td>{reg.treinoId ? reg.treinoId : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarRegistro;