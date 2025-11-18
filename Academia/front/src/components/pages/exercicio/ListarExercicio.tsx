import { useEffect, useState } from "react";
import axios from "axios";
import Exercicio from "../../../models/Exercicio";
import { Link } from "react-router-dom";


function ListarExercicio(){
    const [exercicios, setExercicios] = useState<Exercicio[]>([]);
    useEffect(() =>{listarExercicioAPI();},[])

        async function listarExercicioAPI(){
            try{
                const resposta = await axios.get("http://localhost:5064/api/exercicios/listar");
                const dados = resposta.data.$values;

                console.log("DADOS RECEBIDOS:", dados);
                if (Array.isArray(dados)) {
                    setExercicios(dados);
                    console.log("SUCESSO: Lista de exercicios contém dados.");
                } else {
                    setExercicios([]);
                    console.warn("ALERTA: API retornou lista vazia ou não-array.");
                }
                }
            catch(error){console.log("Erro: " + error)}
        }
    const getStatusClass = (status: string) => {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus === "ativo") {
            return "status-ativo";
        }
    return "status-inativo";
    };


    async function deletarExercicioAPI(id: number) {
        try {
            const resposta = await axios.delete(`http://localhost:5064/api/exercicios/deletar/${id}`)
            listarExercicioAPI();
            console.log(`${id} deletado com sucesso.`);
        } catch (error) {
            console.log(error);
        }
    }
    function deletarExercicio(id : number){
        deletarExercicioAPI(id);
    }
   return(
        <div id="componente_listar_alunos">

            <h1 className="content-title">Exercicios Cadastrados</h1>
            
            <table className="alunos-tabela"> 
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Equipamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {exercicios.map((exercicioItem) => (
                    <tr key={exercicioItem.exercicioId}>
                        <td>{exercicioItem.exercicioId}</td>
                        <td>{exercicioItem.exercicioNome}</td>
                        <td>{exercicioItem.exercicioDescricao}</td>  
                        <td>{exercicioItem.equipamento}</td>  
                        {/* Coluna de Ações (Botões Estilizados) */}
                        <td>
                            <button className="action-button" onClick={() => deletarExercicio(exercicioItem.exercicioId!)}>Excluir</button>
                            <Link className="action-button" to={`/exercicio/alterar/${exercicioItem.exercicioId}`}>Editar</Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarExercicio;