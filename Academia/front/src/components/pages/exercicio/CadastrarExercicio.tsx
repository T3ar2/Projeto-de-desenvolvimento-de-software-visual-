import { useEffect, useState } from "react";
import Exercicio from "../../../models/Exercicio";
import axios from "axios";

function CadastrarAluno(){
    const [exercicioNome, setExercicioNome] = useState("");
    const [exercicioDescricao, setExercicioDescricao] = useState("");
    const [equipamento, setEquipamento] = useState("");

    async function SubmeterCadastro(e:any){
        e.preventDefault();
        EnviarParaAPI();
        alert ("Cadastro feito com sucesso! ");
    }

    async function EnviarParaAPI(){
        try {
           const exercicio : Exercicio = {
            exercicioNome,
            exercicioDescricao,
            equipamento
           } 
           const resposta = await axios.post("http://localhost:5064/api/exercicios/cadastrar", exercicio);
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
                <label>Nome:</label>
                <input type="text" onChange={(e: any) => setExercicioNome(e.target.value)}/>
            </div>
            
            {/* Campo Descrição */}
            <div className="form-group">
                <label>Descrição:</label>
                <input type="text" onChange={(e:any) => setExercicioDescricao(e.target.value)}/>
            </div>
            
            {/* Campo de Equipamentos */}
            <div className="form-group">
                <label htmlFor="equipamento">Equipamento</label>
                <input id="equipamento" type="text" onChange={(e:any) => setEquipamento(e.target.value)}/>
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