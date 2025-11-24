import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Treino } from "../../../models/Treino";

interface DetalheExecucao {
    exercicioId: number;
    series: number;
    repeticoes: number;
    carga: number;
}

function CriarRegistro() {
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [treinoId, setTreinoId] = useState(0);
    const [treinos, setTreinos] = useState<Treino[]>([]);
    const [treinoSelecionado, setTreinoSelecionado] = useState<Treino | null>(null);
    const [detalhes, setDetalhes] = useState<DetalheExecucao[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5064/api/treinos")
            .then((resposta: { data: { $values: any; }; }) => {
                const dados = (resposta.data as any).$values || resposta.data;
                if (Array.isArray(dados)) {
                    setTreinos(dados);
                }
            })
            .catch((erro: any) => {
                console.log(erro);
            });
    }, []);

    function handleTreinoChange(id: number) {
        setTreinoId(id);
        const treino = treinos.find(t => t.treinoId === id);
        setTreinoSelecionado(treino || null);

        if (treino && (treino.exercicios as any)?.$values) {
            const exercicios = (treino.exercicios as any).$values;
            const detalhesIniciais = exercicios.map((ex: any) => ({
                exercicioId: ex.exercicioId,
                series: 3,
                repeticoes: 10,
                carga: 0
            }));
            setDetalhes(detalhesIniciais);
        } else {
            setDetalhes([]);
        }
    }

    function atualizarDetalhe(index: number, campo: keyof DetalheExecucao, valor: number) {
        const novosDetalhes = [...detalhes];
        novosDetalhes[index] = { ...novosDetalhes[index], [campo]: valor };
        setDetalhes(novosDetalhes);
    }

    async function enviarCadastro(e: any) {
        e.preventDefault();
        
    try{
        const registroDTO = {
            data: data,
            treinoId: treinoId > 0 ? treinoId : undefined 
        };


        const resposta = await axios.post("http://localhost:5064/api/registros", registroDTO);
        const registroCriado = resposta.data;
         
        if (registroCriado && registroCriado.registroTreinoId) {
                for (const detalhe of detalhes) {
                    await axios.post(`http://localhost:5064/api/registros/${registroCriado.registroTreinoId}/detalhes`, detalhe);
                }
            }
        
        alert("Treino registrado com sucesso!");
        navigate("/pages/registro/listar");
    } catch(erro) {
                console.log(erro);
                alert("Erro ao registrar treino.");
            };
    }

    return (
        <div id="componente_criar_registro">
            <h1 className="content-title">Registrar Execução de Treino</h1>

            <form onSubmit={enviarCadastro} className="form-aluno">
                <div className="form-group">
                    <label htmlFor="data">Data do Treino:</label>
                    <input 
                        type="date" 
                        id="data" 
                        value={data}
                        required
                        onChange={(e) => setData(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="treino">Qual treino foi realizado?</label>
                    <select 
                        id="treino" 
                        value={treinoId}
                        onChange={(e) => handleTreinoChange(parseInt(e.target.value))}
                    >
                        <option value="0">Selecione um treino...</option>
                        {treinos.map((treino) => (
                            <option key={treino.treinoId} value={treino.treinoId}>
                                {treino.nomeTreino}
                            </option>
                        ))}
                    </select>
                </div>
                
                {treinoSelecionado && detalhes.length > 0 && (
                    <div className="form-group">
                        <h3>Detalhes dos Exercícios</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="alunos-tabela">
                                <thead>
                                    <tr>
                                        <th>Exercício</th>
                                        <th>Séries</th>
                                        <th>Repetições</th>
                                        <th>Carga (kg)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(treinoSelecionado.exercicios as any).$values.map((ex: any, index: number) => (
                                        <tr key={ex.exercicioId}>
                                            <td>{ex.exercicioNome}</td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    style={{ width: '60px', padding: '5px' }}
                                                    value={detalhes[index]?.series}
                                                    onChange={(e) => atualizarDetalhe(index, 'series', parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    style={{ width: '60px', padding: '5px' }}
                                                    value={detalhes[index]?.repeticoes}
                                                    onChange={(e) => atualizarDetalhe(index, 'repeticoes', parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    style={{ width: '60px', padding: '5px' }}
                                                    value={detalhes[index]?.carga}
                                                    onChange={(e) => atualizarDetalhe(index, 'carga', parseInt(e.target.value))}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <button type="submit" className="btn-submit">Registrar</button>
                </div>
            </form>
        </div>
    );
}

export default CriarRegistro;