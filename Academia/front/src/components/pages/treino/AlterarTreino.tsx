import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Treino } from "../../../models/Treino";
import Exercicio from "../../../models/Exercicio";

function AlterarTreino() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [foco, setFoco] = useState("");
    
    const [todosExercicios, setTodosExercicios] = useState<Exercicio[]>([]);
    const [idsSelecionados, setIdsSelecionados] = useState<number[]>([]);
    const [idsOriginais, setIdsOriginais] = useState<number[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5064/api/exercicios/listar")
            .then((res) => {
                const dados = res.data.$values || res.data;
                if (Array.isArray(dados)) setTodosExercicios(dados);
            })
            .catch(console.log);

        if (id) {
            axios.get<Treino>(`http://localhost:5064/api/treinos/${id}`)
                .then((res) => {
                    setNome(res.data.nomeTreino);
                    setDescricao(res.data.descricaoTreino);
                    setFoco(res.data.focoMuscular);

                    const exerciciosDoTreino = (res.data.exercicios as any)?.$values || [];
                    const ids = exerciciosDoTreino.map((e: any) => e.exercicioId);
                    setIdsSelecionados(ids);
                    setIdsOriginais(ids);
                })
                .catch(console.log);
        }
    }, [id]);

    function toggleExercicio(exercicioId: number) {
        setIdsSelecionados(prev => 
            prev.includes(exercicioId) ? prev.filter(id => id !== exercicioId) : [...prev, exercicioId]
        );
    }

    async function atualizar(e: any) {
        e.preventDefault();

        const treinoAtualizado = {
            treinoId: Number(id),
            nomeTreino: nome,
            descricaoTreino: descricao,
            focoMuscular: foco
        };

        try {
            await axios.patch(`http://localhost:5064/api/treino/atualizar/${id}`, treinoAtualizado);

            const paraAdicionar = idsSelecionados.filter(x => !idsOriginais.includes(x));
            const paraRemover = idsOriginais.filter(x => !idsSelecionados.includes(x));

            for (const exId of paraAdicionar) {
                await axios.post(`http://localhost:5064/api/treinos/${id}/associar-exercicio/${exId}`, {});
            }

            for (const exId of paraRemover) {
                await axios.delete(`http://localhost:5064/api/treinos/${id}/remover-exercicio/${exId}`);
            }

            alert("Treino atualizado com sucesso!");
            navigate("/pages/treino/listar");

        } catch (erro) {
            console.log(erro);
            alert("Erro ao atualizar treino.");
        }
    }

    return (
        <div className="page-container">
            <h1 className="content-title">Alterar Treino</h1>
            <form onSubmit={atualizar} className="form-aluno">
                <div className="form-group">
                    <label>Nome do Treino:</label>
                    <input 
                        type="text" 
                        value={nome}
                        required 
                        onChange={(e) => setNome(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <input 
                        type="text" 
                        value={descricao}
                        required 
                        onChange={(e) => setDescricao(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Foco Muscular:</label>
                    <input 
                        type="text" 
                        value={foco}
                        required 
                        onChange={(e) => setFoco(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label>Gerenciar Exercícios:</label>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', backgroundColor: '#fff' }}>
                        {todosExercicios.map(ex => (
                            <div key={ex.exercicioId} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type="checkbox" 
                                    id={`ex-${ex.exercicioId}`}
                                    checked={idsSelecionados.includes(ex.exercicioId!)}
                                    onChange={() => toggleExercicio(ex.exercicioId!)}
                                    style={{ marginRight: '8px', width: 'auto' }}
                                />
                                <label htmlFor={`ex-${ex.exercicioId}`} style={{ margin: 0, cursor: 'pointer' }}>
                                    <strong>{ex.exercicioNome}</strong> 
                                    {ex.equipamento ? ` - ${ex.equipamento}` : ""}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn-submit">Salvar Alterações</button>
                </div>
            </form>
        </div>
    );
}

export default AlterarTreino;