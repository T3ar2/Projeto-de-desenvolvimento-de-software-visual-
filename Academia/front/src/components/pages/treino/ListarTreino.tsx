import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Treino } from "../../../models/Treino";

function ListarTreino() {
    const [treinos, setTreinos] = useState<Treino[]>([]);
    const [treinosExpandidos, setTreinosExpandidos] = useState<number[]>([]);

    useEffect(() => {
        listarTreinoAPI();
    }, []);

    async function listarTreinoAPI() {
        try {
            const resposta = await axios.get("http://localhost:5064/api/treinos");
            const dados = (resposta.data as any).$values;

            if (Array.isArray(dados)) {
                setTreinos(dados);
            } else {
                setTreinos([]);
            }
        } catch (error) {
            console.log("Erro: " + error);
        }
    }

    async function deletarTreinoAPI(id: number) {
        try {
            await axios.delete(`http://localhost:5064/api/treino/deletar/${id}`);
            listarTreinoAPI();
        } catch (error) {
            console.log(error);
        }
    }

    function deletarTreino(id: number) {
        if (window.confirm("Tem certeza que deseja excluir este treino?")) {
            deletarTreinoAPI(id);
        }
    }

    function alternarDetalhes(id: number) {
        setTreinosExpandidos(prev => 
            prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
        );
    }

    return (
        <div id="componente_listar_treinos">
            <h1 className="content-title">Planos de Treino</h1>

            <table className="alunos-tabela">
                <thead>
                    <tr id="header-list">
                        <th>Detalhes</th>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Foco</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {treinos.map((treino) => (
                        <>
                            <tr key={treino.treinoId}>
                                <td>
                                    <button 
                                        className="action-button" 
                                        style={{ minWidth: '40px', cursor: 'pointer' }}
                                        onClick={() => alternarDetalhes(treino.treinoId)}
                                    >
                                        {treinosExpandidos.includes(treino.treinoId) ? "▼" : "▶"}
                                    </button>
                                </td>
                                <td>{treino.treinoId}</td>
                                <td>{treino.nomeTreino}</td>
                                <td>{treino.descricaoTreino}</td>
                                <td>{treino.focoMuscular}</td>
                                <td>
                                    <button className="action-button" onClick={() => deletarTreino(treino.treinoId)}>Excluir</button>
                                    <Link className="action-button" to={`/pages/treino/alterar/${treino.treinoId}`}>Editar</Link>
                                </td>
                            </tr>
                            
                            {treinosExpandidos.includes(treino.treinoId) && (
                                <tr>
                                    <td colSpan={6} style={{ backgroundColor: '#f9f9f9', padding: '20px', textAlign: 'left' }}>
                                        <h3 style={{marginTop: 0}}>Exercícios deste Treino</h3>
                                        
                                        {(treino.exercicios as any)?.$values && (treino.exercicios as any).$values.length > 0 ? (
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                {(treino.exercicios as any).$values.map((exercicio: any) => (
                                                    <li key={exercicio.exercicioId} style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>
                                                        <strong>{exercicio.exercicioNome}</strong> 
                                                        {exercicio.equipamento ? ` - Equipamento: ${exercicio.equipamento}` : ""}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p style={{color: '#666', fontStyle: 'italic'}}>Nenhum exercício cadastrado neste treino.</p>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarTreino;