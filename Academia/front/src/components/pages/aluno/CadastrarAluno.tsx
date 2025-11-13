import { useEffect, useState } from "react";
import Aluno from "../../../models/Aluno";
import axios from "axios";

function CadastrarAluno(){
    const [nomeAluno, setNomeAluno] = useState("");
    const [emailAluno, setEmailAluno] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [statusMatricula, setStatusMatricula] = useState("Ativo");

    async function SubmeterCadastro(e:any){
        e.preventDefault();
        EnviarParaAPI();
    }

    async function EnviarParaAPI(){
        try {
           const aluno : Aluno = {
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
    // Adiciona o container da página (definido no App.tsx) se ainda não estiver lá
    <div className="page-container">
        {/* Aplica a classe de título grande e estilizado */}
        <h1 className="content-title">Cadastrar Novo Aluno</h1> 
        
        {/* Aplica a classe de formulário container */}
        <form onSubmit={SubmeterCadastro} className="form-aluno">
            
            {/* Campo Nome */}
            <div className="form-group">
                <label htmlFor="nomeAluno">Nome:</label>
                <input id="nomeAluno" type="text" onChange={(e: any) => setNomeAluno(e.target.value)}/>
            </div>
            
            {/* Campo Email */}
            <div className="form-group">
                <label htmlFor="emailAluno">Email:</label>
                <input id="emailAluno" type="email" onChange={(e:any) => setEmailAluno(e.target.value)}/>
            </div>
            
            {/* Campo Data de Nascimento */}
            <div className="form-group">
                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                <input id="dataNascimento" type="date" onChange={(e:any) => setDataNascimento(e.target.value)}/>
            </div>
            
            {/* NOVO CAMPO STATUS com Radio Buttons */}
                <div className="form-group">
                    <label>Status da Matrícula:</label>
                    <div className="radio-group-container">
                        
            {/* Opção ATIVO */}
                <label className="radio-label">
                    <input type="radio" name="statusMatricula" value="Ativo"onChange={(e) => setStatusMatricula(e.target.value)} defaultChecked />
                    Ativo
                </label>

                        {/* Opção DESATIVADO */}
                         <label className="radio-label">
                            <input type="radio" name="statusMatricula" value="Desativado" onChange={(e) => setStatusMatricula(e.target.value)} />
                             Desativado
                         </label>
                    </div>
             </div>
            
            {/* Botão de Submissão */}
            <div className="form-group">
                <button type="submit" className="btn-submit">Cadastrar</button>
            </div>
            
        </form>
    </div>
);
}

export default CadastrarAluno;