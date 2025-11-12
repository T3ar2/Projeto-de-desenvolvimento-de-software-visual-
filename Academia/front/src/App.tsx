import React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ListarAluno from "./components/pages/aluno/ListarAluno.tsx";


function App(){
  return (
    <BrowserRouter>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/pages/aluno/listarAluno">Alunos Cadastrados</Link>
                        </li>
                    </ul>
                </nav>
                <div id="Conteudo">
                    <Routes>
                        <Route path="/" element={<ListarAluno />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
  );
}
export default App;