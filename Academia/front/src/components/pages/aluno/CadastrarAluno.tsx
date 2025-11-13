import { useEffect, useState } from "react";
import Aluno from "../../../models/Aluno";
import axios from "axios";

function CadastrarAluno(){
    const [alunoId, setAlunoId] = useState(0);
    const [nomeAluno, setNomeAluno] = useState("");
    const [emailAluno, setEmailAluno] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [statusMatricula, setStatusMatricula] = useState("");

    async function SubmeterCadastro(e:any){
        e.preventDefault();
        EnviarParaAPI();
    }

    async function EnviarParaAPI(){
        try {
           const aluno : Aluno = {
            alunoId,
            nomeAluno,
            emailAluno,
            dataNascimento,
            statusMatricula,
           } 
           const resposta = await axios.post("http://localhost:5064/api/alunos/cadastrar", aluno);
           console.log(resposta.data);
        }
        catch(error){
            console.log("Erro ao cadastrar o aluno: " + error);
        }
    }

    return (
        <div>
            <h1>Cadastrar Aluno</h1>
            <form onSubmit={SubmeterCadastro}>
                <div>
                    <label>Id:</label>
                    <input type="text" onChange={(e: any) => setAlunoId(e.target.value)}/>
                </div>
                <div>
                    <label>Nome:</label>
                <input type="text" onChange={(e: any) => setNomeAluno(e.target.value)}/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" onChange={(e:any) => setEmailAluno(e.target.value)}/>
                </div>
                <div>
                    <label>Data de Nascimento</label>
                    <input type="date" onChange={(e:any) => setDataNascimento(e.target.value)}/>
                </div>
                <div>
                    <label>Status:</label>
                    <input type="text" onChange={(e:any) => setStatusMatricula(e.target.value)}/>
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarAluno;