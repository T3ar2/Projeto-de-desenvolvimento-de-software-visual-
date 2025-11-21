import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Treino } from "../../../models/Treino";
import Exercicio from "../../../models/Exercicio";

function CadastrarTreino() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [foco, setFoco] = useState("");
    const [exercicios, setExercicios] = useState<Exercicio[]>([]);
    const [exerciciosSelecionados, setExerciciosSelecionados] = useState<number[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5064/api/exercicios/listar")
            .then((resposta) => {
                const dados = resposta.data.$values || resposta.data;
                if (Array.isArray(dados)) {
                    setExercicios(dados);
                } else {
                    setExercicios([]);
                }
            })
            .catch((erro) => {
                console.log(erro);
            });
    }, []);

    function toggleExercicio(id: number) {
        setExerciciosSelecionados(prev => 
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }

    async function cadastrar(e: any) {
        e.preventDefault();

        const novoTreino: Treino = {
            treinoId: 0,
            nomeTreino: nome,
            descricaoTreino: descricao,
            focoMuscular: foco
        };

        try {
            // 1. Codifica o nome para aceitar espaços na URL (Ex: "Treino A" vira "Treino%20A")
            const nomeCodificado = encodeURIComponent(nome);
            
            const resposta = await axios.post(`http://localhost:5064/api/treino/cadastrar/${nomeCodificado}`, novoTreino);
            
            // 2. Pega o treino criado (Sua API retorna o objeto, então o ID já está aqui!)
            const treinoCriado = resposta.data;
            
            if (treinoCriado && treinoCriado.treinoId) {
                // 3. Faz a associação.
                // O ERRO ESTAVA AQUI: axios.post precisa de um objeto vazio {} como segundo argumento
                // para confirmar que é um POST sem corpo, senão ele pode falhar silenciosamente.
                for (const exercicioId of exerciciosSelecionados) {
                    await axios.post(
                        `http://localhost:5064/api/treinos/${treinoCriado.treinoId}/associar-exercicio/${exercicioId}`,
                        {} 
                    );
                }
            }

            alert("Treino cadastrado com sucesso!");
            navigate("/pages/treino/listar");

        } catch (erro) {
            console.log(erro);
            alert("Erro ao cadastrar treino.");
        }
    }

    return (
        <div className="page-container">
            <h1 className="content-title">Cadastrar Treino</h1>
            <form onSubmit={cadastrar} className="form-aluno">
                <div className="form-group">
                    <label>Nome do Treino:</label>
                    <input type="text" required onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <input type="text" required onChange={(e) => setDescricao(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Foco Muscular:</label>
                    <input type="text" required onChange={(e) => setFoco(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Selecionar Exercícios:</label>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', backgroundColor: '#fff' }}>
                        {exercicios.length > 0 ? (
                            exercicios.map(ex => (
                                <div key={ex.exercicioId} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="checkbox" 
                                        id={`ex-${ex.exercicioId}`}
                                        checked={exerciciosSelecionados.includes(ex.exercicioId!)}
                                        onChange={() => toggleExercicio(ex.exercicioId!)}
                                        style={{ marginRight: '8px', width: 'auto' }}
                                    />
                                    <label htmlFor={`ex-${ex.exercicioId}`} style={{ margin: 0, cursor: 'pointer' }}>
                                        <strong>{ex.exercicioNome}</strong> 
                                        {ex.equipamento ? ` - ${ex.equipamento}` : ""}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p style={{ padding: '10px', color: '#666' }}>Nenhum exercício encontrado.</p>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn-submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarTreino;