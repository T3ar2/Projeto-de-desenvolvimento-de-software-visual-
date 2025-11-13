import { useEffect, useState } from "react";
import Aluno from "../../../models/Aluno";
import axios from "axios";

function ListarAluno(){
    const [alunos, setAluno] = useState<Aluno[]>([]);
    useEffect(() =>{listarAlunoAPI();},[])

        async function listarAlunoAPI(){
            try{
                const resposta = await axios.get("http://localhost:5064/api/alunos/listar");
                const dados = resposta.data.$values;

                console.log("DADOS RECEBIDOS:", dados);
                if (Array.isArray(dados)) {
                    setAluno(dados);
                    console.log("SUCESSO: Lista de alunos contém dados.");
                } else {
                    setAluno([]);
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
            <h1 className="content-title">Alunos Cadastrados</h1>
            
            {/* Aplica a classe de estilo à tabela */}
            <table className="alunos-tabela"> 
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th> {/* Mantendo a ordem do seu código */}
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Status</th>
                        <th>Ações</th> {/* Coluna para botões de edição/exclusão */}
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((alunoItem) => (
                    <tr key={alunoItem.alunoId}>
                        <td>{alunoItem.alunoId}</td>
                        <td>{alunoItem.emailAluno}</td>
                        <td>{alunoItem.nomeAluno}</td>
                        {/* Garante que a data de nascimento seja exibida */}
                        <td>{alunoItem.dataNascimento}</td> 
                        
                        {/* Aplica classe de cor condicional ao status */}
                        <td className={getStatusClass(alunoItem.statusMatricula)}>
                            {alunoItem.statusMatricula}
                        </td>
                        
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

export default ListarAluno;