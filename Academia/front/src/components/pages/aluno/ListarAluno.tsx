import { useEffect, useState } from "react";
import Aluno from "../../../models/Aluno";

function ListarAluno(){
    const [aluno, setAluno] = useState<Aluno[]>([]);
    useEffect(() =>{ListarAlunoAPI();},[])

        async listarAlunoAPI(){
            try{
                const resposta = 
            }
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

            </tbody>
        </div>
    }
}

export default ListarAluno;