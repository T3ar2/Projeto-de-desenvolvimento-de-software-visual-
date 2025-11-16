import { useEffect, useState } from "react";
import axios from "axios";
import Exercicio from "../../../models/Exercicio";

function ListarExercicio(){
    const [exercicios, setExercicios] = useState<Exercicio[]>([]);
    useEffect(() =>{listarAlunoAPI();},[])

        async function listarAlunoAPI(){
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
   return(
        <div id="componente_listar_alunos">
            {/* Aplica a classe de título grande e estilizado */}
            <h1 className="content-title">Exercicios Cadastrados</h1>
            
            {/* Aplica a classe de estilo à tabela */}
            <table className="alunos-tabela"> 
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th> {/* Mantendo a ordem do seu código */}
                        <th>Descrição</th>
                        <th>Equipamento</th>
                        <th>Ações</th> {/* Coluna para botões de edição/exclusão */}
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
                            <button className="action-button">Editar</button>
                            <button className="action-button">Excluir</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarExercicio;