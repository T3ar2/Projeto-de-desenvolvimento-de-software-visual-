import { useEffect, useState } from "react";
import axios from "axios";
import { Treino } from "../../../models/Treino.ts";
// dps entender o pq Treino.ts está funcional e sem ts não

interface RegistroTreino {
    data: string;
    treinoId?: number;
}
// atribuição de valores as vari
function CadastrarRegistroTreino() {
    const [data, setData] = useState("");
    const [treinoId, setTreinoId] = useState(0);
    const [treinos, setTreinos] = useState<Treino[]>([]);

    // pegar/puxar os treinos
    useEffect(() => {
        carregarTreinos();
    }, []);

    function carregarTreinos() {
        // não esquecer de verificar a porta
        axios.get<Treino[]>("http://localhost:5064/api/treinos/listar")
            .then((resposta) => {
                setTreinos(resposta.data);
            })
            .catch((erro) => {
                console.log("Erro ao carregar treinos:", erro);
            });
    }

    function SubmeterCadastro(e: any) {
        e.preventDefault();
        
        const registro: RegistroTreino = {
            data: data,
            //verificar tratamento id 0
            treinoId: treinoId > 0 ? treinoId : undefined 
        };

        axios.post("http://localhost:5064/api/registros", registro)
            .then((resposta) => {
                console.log("Registro cadastrado com sucesso!", resposta.data);
                alert("Treino registrado com sucesso!");
                // Opcional: Limpar formulário ou redirecionar
            })
            .catch((erro) => {
                console.log("Erro ao cadastrar registro:", erro);
                alert("Erro ao registrar treino.");
            });
    }

    return (
        <div className="page-container">
            <h1 className="content-title">Registrar Novo Treino</h1>

            <form onSubmit={SubmeterCadastro} className="form-aluno">
                
                {/* Campo Data */}
                <div className="form-group">
                    <label htmlFor="data">Data do Treino:</label>
                    <input 
                        type="date" 
                        id="data" 
                        required
                        onChange={(e) => setData(e.target.value)} 
                    />
                </div>

                {/* Campo Seleção de Treino */}
                <div className="form-group">
                    <label htmlFor="treino">Treino Realizado:</label>
                    <select 
                        id="treino" 
                        onChange={(e) => setTreinoId(parseInt(e.target.value))}
                    >
                        <option value="0">Selecione um treino...</option>
                        {treinos.map((treino) => (
                            <option key={treino.treinoId} value={treino.treinoId}>
                                {treino.nomeTreino}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn-submit">Registrar</button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarRegistroTreino;