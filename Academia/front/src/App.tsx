import React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ListarAluno from "./components/pages/aluno/ListarAluno";


const App: React.FC = () => {
  return (
    <BrowserRouter>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Alunos Cadastrados</Link>
                        </li>
                        <li>
                            <Link to="/cadastro">Cadastro de Produto</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<ListarAluno />} />
                </Routes>
            </div>
        </BrowserRouter>
  );
}
export default App;