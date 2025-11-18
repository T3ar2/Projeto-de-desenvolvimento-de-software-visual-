import { useEffect, useState } from "react";
import Aluno from "../../../models/Aluno";
import { preconnect } from "react-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function AlterarAluno(){
    const { alunoId } = useParams<{ alunoId: string }>();
    const [nomeAluno, setNomeAluno] = useState("");
    const [emailAluno, setEmailAluno] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [statusMatricula, setStatusMatricula] = useState("Ativo");


    useEffect(()=>{
    if (alunoId) {
            BuscarAluno(alunoId);
        }
    }, [alunoId]);

    async function BuscarAluno(id : string) {
        try {
            const resposta = await axios.get<Aluno>(`http://localhost:5064/api/alunos/buscar/id/${id}`);
            setNomeAluno(resposta.data.nomeAluno);
            setEmailAluno(resposta.data.emailAluno);
            setDataNascimento(resposta.data.dataNascimento);
            setStatusMatricula(resposta.data.statusMatricula);

        } catch (error) {
            console.log(error);
        }
    }






    async function SubmeterCadastro(e:any){
        e.preventDefault();
        if (alunoId) {
            EnviarParaAPI(alunoId);
        }
    }

    async function EnviarParaAPI(id : string){
        try {
           const aluno : Aluno = {
            nomeAluno,
            emailAluno,
            dataNascimento,
            statusMatricula,
           } 
           const resposta = await axios.patch(`http://localhost:5064/api/alunos/atualizar/${id}`, aluno);
           console.log(resposta.data);
        }
        catch(error){
            console.log("Erro ao atualizar o aluno: " + error);
        }
    }

   return (
    // Adiciona o container da página (definido no App.tsx) se ainda não estiver lá
    <div className="page-container">
        {/* Aplica a classe de título grande e estilizado */}
        <h1 className="content-title">Alterar Aluno</h1> 
        
        {/* Aplica a classe de formulário container */}
        <form onSubmit={SubmeterCadastro} className="form-aluno">
            
            {/* Campo Nome */}
            <div className="form-group">
                <label>Nome:</label>
                <input value={nomeAluno} type="text" onChange={(e: any) => setNomeAluno(e.target.value)}/>
            </div>
            
            {/* Campo Email */}
            <div className="form-group">
                <label>Email:</label>
                <input value={emailAluno} type="email" onChange={(e:any) => setEmailAluno(e.target.value)}/>
            </div>
            
            {/* Campo Data de Nascimento */}
            <div className="form-group">
                <label>Data de Nascimento:</label>
                <input value={dataNascimento} type="date" onChange={(e:any) => setDataNascimento(e.target.value)}/>
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
                <button type="submit" className="btn-submit">Atualizar</button>
            </div>
            
        </form>
    </div>
);
}

export default AlterarAluno;