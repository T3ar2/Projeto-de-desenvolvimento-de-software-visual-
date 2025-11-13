import React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ListarAluno from "./components/pages/aluno/ListarAluno.tsx";
import CadastrarAluno from "./components/pages/aluno/CadastrarAluno.tsx";


function App(){
  return (
    <BrowserRouter>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/pages/aluno/listarAluno">Alunos Cadastrados</Link>
                        </li>
                        <li>
                            <Link to="/pages/aluno/cadastrarAluno.tsx">Cadastrar Alunos</Link>
                        </li>
                    </ul>
                </nav>
                <div id="Conteudo">
                    <Routes>
                        <Route path="/pages/aluno/listarAluno" element={<ListarAluno />} />
                    </Routes>
                    <Routes>
                        <Route path="/pages/aluno/cadastrarAluno.tsx" element={<CadastrarAluno />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
  );
}
export default App;