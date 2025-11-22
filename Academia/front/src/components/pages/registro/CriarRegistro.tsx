import { useEffect, useState } from "react";
import axios from "axios";
import { Treino } from "../../../models/Treino";

interface RegistroTreinoDTO {
    data: string;
    treinoId?: number;
}

function CriarRegistro() {
    const [data, setData] = useState("");
    const [treinoId, setTreinoId] = useState(0);
    const [treinos, setTreinos] = useState<Treino[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5064/api/treinos")
            .then((resposta) => {
                const dados = resposta.data.$values || resposta.data;
                setTreinos(dados);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }, []);

    function enviarCadastro(e: any) {
        e.preventDefault();
        
        const registro: RegistroTreinoDTO = {
            data: data,
            treinoId: treinoId > 0 ? treinoId : undefined 
        };

        axios.post("http://localhost:5064/api/registros", registro)
            .then((resposta) => {
                alert("Treino registrado com sucesso!");
                setData("");
                setTreinoId(0);
            })
            .catch((erro) => {
                console.log(erro);
                alert("Erro ao registrar treino.");
            });
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
                        onChange={(e) => setTreinoId(parseInt(e.target.value))}
                    >
                        <option value="0">Selecione um treino...</option>
                        {treinos.map((treino) => (
                            <option key={treino.treinoId} value={treino.treinoId}>
                                {treino.nomeTreino} - {treino.focoMuscular}
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

export default CriarRegistro;