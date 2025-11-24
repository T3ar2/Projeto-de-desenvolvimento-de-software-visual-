import { useEffect, useState } from "react";
import axios from "axios";
import { Treino } from "../../../models/Treino";

interface DetalheRegistro {
    detalheRegistroId: number;
    series: number;
    repeticoes: number;
    carga: number;
    exercicio?: {
        exercicioNome: string;
    };
}

interface RegistroTreino {
    registroTreinoId: number;
    data: string;
    treinoId?: number;
    detalhes?: any; 
}

function ListarRegistro() {
    const [registros, setRegistros] = useState<RegistroTreino[]>([]);
    const [treinos, setTreinos] = useState<Treino[]>([]);
    const [registrosExpandidos, setRegistrosExpandidos] = useState<number[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    function carregarDados() {
        axios.get("http://localhost:5064/api/treinos")
            .then((resposta) => {
                const dados = resposta.data.$values || resposta.data;
                setTreinos(dados);
            }).catch(() => {});

        listarRegistrosAPI();
    }

    function listarRegistrosAPI() {
        axios.get("http://localhost:5064/api/registros")
            .then((resposta) => {
                const dados = resposta.data.$values || resposta.data;
                console.log("Registros carregados:", dados); // Para debug
                setRegistros(dados);
            })
            .catch((erro) => {
                if (erro.response?.status === 404) setRegistros([]);
            });
    }

    // Função Helper para extrair a lista de forma segura
    function getDetalhesList(reg: RegistroTreino): DetalheRegistro[] {
        if (!reg.detalhes) return [];
        if (Array.isArray(reg.detalhes)) return reg.detalhes;
        if (reg.detalhes.$values && Array.isArray(reg.detalhes.$values)) return reg.detalhes.$values;
        return [];
    }

    function deletarRegistro(id: number) {
        if (window.confirm("Tem certeza que deseja excluir este histórico?")) {
            axios.delete(`http://localhost:5064/api/registros/deletar/${id}`)
                .then(() => {
                    alert("Registro excluído!");
                    carregarDados();
                })
                .catch((erro) => alert("Erro ao excluir: " + erro.message));
        }
    }

    function getNomeTreino(id?: number) {
        if (!id) return "N/A";
        const treino = treinos.find(t => t.treinoId === id);
        return treino ? treino.nomeTreino : "Treino não encontrado";
    }

    function alternarDetalhes(id: number) {
        setRegistrosExpandidos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }

    return (
        <div id="componente_listar_registros">
            <h1 className="content-title">Histórico de Treinos Realizados</h1>
            <table className="alunos-tabela">
                <thead>
                    <tr id="header-list">
                        <th>Detalhes</th>
                        <th>#</th>
                        <th>Data</th>
                        <th>Treino Realizado</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((reg) => {
                        const detalhesLista = getDetalhesList(reg); 
                        return (
                            <>
                                <tr key={reg.registroTreinoId}>
                                    <td>
                                        <button className="action-button" style={{ minWidth: '40px' }} onClick={() => alternarDetalhes(reg.registroTreinoId)}>
                                            {registrosExpandidos.includes(reg.registroTreinoId) ? "▼" : "▶"}
                                        </button>
                                    </td>
                                    <td>{reg.registroTreinoId}</td>
                                    <td>{new Date(reg.data).toLocaleDateString()}</td>
                                    <td>{getNomeTreino(reg.treinoId)}</td>
                                    <td>
                                        <button className="action-button" onClick={() => deletarRegistro(reg.registroTreinoId)}>Excluir</button>
                                    </td>
                                </tr>

                                {registrosExpandidos.includes(reg.registroTreinoId) && (
                                    <tr>
                                        <td colSpan={5} style={{ backgroundColor: '#f9f9f9', padding: '15px' }}>
                                            <h4>Detalhes da Execução:</h4>
                                            {detalhesLista.length > 0 ? (
                                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                                    <thead>
                                                        <tr style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                                                            <th style={{ padding: '8px' }}>Exercício</th>
                                                            <th style={{ padding: '8px' }}>Séries</th>
                                                            <th style={{ padding: '8px' }}>Reps</th>
                                                            <th style={{ padding: '8px' }}>Carga (kg)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {detalhesLista.map((detalhe) => (
                                                            <tr key={detalhe.detalheRegistroId} style={{ borderBottom: '1px solid #eee' }}>
                                                                <td style={{ padding: '8px' }}>{detalhe.exercicio?.exercicioNome || "Exercício removido"}</td>
                                                                <td style={{ padding: '8px' }}>{detalhe.series}</td>
                                                                <td style={{ padding: '8px' }}>{detalhe.repeticoes}</td>
                                                                <td style={{ padding: '8px' }}>{detalhe.carga}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p style={{ color: '#666', fontStyle: 'italic' }}>Sem detalhes registrados.</p>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListarRegistro;