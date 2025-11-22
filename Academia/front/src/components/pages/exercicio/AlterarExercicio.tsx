import { useEffect, useState } from "react";
import Exercicio from "../../../models/Exercicio";
import { preconnect } from "react-dom";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function AlterarExercicio(){
    const { exercicioId } = useParams<{ exercicioId: string }>();
    const [exercicioNome, setExercicioNome] = useState("");
    const [exercicioDescricao, setExercicioDescricao] = useState("");
    const [equipamento, setEquipamento] = useState("");
     const navigate = useNavigate();


    useEffect(()=>{
    if (exercicioId) {
            BuscarAluno(exercicioId);
        }
    }, [exercicioId]);

    async function BuscarAluno(id : string) {
        try {
            const resposta = await axios.get<Exercicio>(`http://localhost:5064/api/exercicios/buscar/${id}`);
            setExercicioNome(resposta.data.exercicioNome);
            setExercicioDescricao(resposta.data.exercicioDescricao);
            setEquipamento(resposta.data.equipamento);

        } catch (error) {
            console.log(error);
        }
    }


    async function SubmeterCadastro(e:any){
        e.preventDefault();
        if (exercicioId) {
            EnviarParaAPI(exercicioId);
        }
    }

    async function EnviarParaAPI(id : string){
        try {
           const exercicio : Exercicio = {
            exercicioNome,
            exercicioDescricao,
            equipamento,
           } 
           const resposta = await axios.patch(`http://localhost:5064/api/exercicios/atualizar/${id}`, exercicio);
           navigate("/");
        }
        catch(error){
            console.log("Erro ao atualizar o aluno: " + error);
        }
    }

   return (
    <div className="page-container">
        <h1 className="content-title">Alterar Exercicio</h1> 
        
        <form onSubmit={SubmeterCadastro} className="form-aluno">
            
            <div className="form-group">
                <label>Nome:</label>
                <input value={exercicioNome} type="text" onChange={(e: any) => setExercicioNome(e.target.value)}/>
            </div>
            
            <div className="form-group">
                <label>Descrição:</label>
                <input value={exercicioDescricao} type="text" onChange={(e:any) => setExercicioDescricao(e.target.value)}/>
            </div>
            
            <div className="form-group">
                <label>Equipamento: </label>
                <input value={equipamento} type="text" onChange={(e:any) => setEquipamento(e.target.value)}/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn-submit">Atualizar</button>
            </div>
            
        </form>
    </div>
);
}

export default AlterarExercicio;