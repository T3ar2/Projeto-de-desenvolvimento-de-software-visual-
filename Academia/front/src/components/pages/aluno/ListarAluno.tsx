import { useEffect, useState } from "react";
import Aluno from "../../../models/Aluno";
import axios from "axios";

function ListarAluno(){
    const [alunos, setAluno] = useState<Aluno[]>([]);
    useEffect(() =>{listarAlunoAPI();},[])

        async function listarAlunoAPI(){
            try{
                const resposta = await axios.get("http://localhost:5064/api/alunos/listar");
                const dados = resposta.data;
                if (Array.isArray(dados)) {
                setAluno(dados); 
                }
                else {
                setAluno([]); 
                console.warn("API returned non-array data, but status was OK. List is likely empty.");
            }
            }
            catch(error){console.log("Erro: " + error)}
        }
    return(
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
                <tbody>
                    {alunos.map((alunoItem) => (
                    <tr key={alunoItem.alunoId}>
                        <td>{alunoItem.alunoId}</td>
                        <td>{alunoItem.nomeAluno}</td>
                        <td>{alunoItem.emailAluno}</td>
                        <td>{alunoItem.dataNascimento}</td>
                        <td>{alunoItem.statusMatricula}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarAluno;