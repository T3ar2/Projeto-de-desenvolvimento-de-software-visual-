import { useEffect, useState } from "react";
import Aluno from "../../../models/Aluno";
import axios from "axios";

function ListarAluno(){
    const [aluno, setAluno] = useState<Aluno[]>([]);
    useEffect(() =>{ListarAlunoAPI();},[])

        async function listarAlunoAPI(){
            try{
                const resposta = await axios.get("http://localhost:5064/api/alunos/listar");
                const dados = resposta.data;
                setAluno(dados);
            }
            catch(error){console.log("Erro: " + error)}
        }
    return{
        <div id="componente_listar_alunos">
            <h1>Alunos Cadastrados</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data de Narcimento</th>
                        <th>Status</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {aluno.map(aluno)=>()
                    <tr>
                        <td>{aluno.id}</td>
                        <td>{aluno.nome}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                }
            </tbody>
        </div>
    };
}

export default ListarAluno;