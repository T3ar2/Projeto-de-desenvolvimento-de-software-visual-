import React from "react";
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// import do Menu principal
import Home from "./components/pages/Home.tsx"; 

// importes de Alunos

import ListarAluno from "./components/pages/aluno/ListarAluno.tsx";
import CadastrarAluno from "./components/pages/aluno/CadastrarAluno.tsx";
import AlunoMenu from "./components/pages/aluno/AlunoMenu.tsx";
import AlterarAluno from "./components/pages/aluno/AlterarAluno.tsx";

// imports de Exercicio

import ExercicioMenu from "./components/pages/exercicio/ExercicioMenu.tsx";
import ListarExercicio from "./components/pages/exercicio/ListarExercicio.tsx";
import CadastrarExercicio from "./components/pages/exercicio/CadastrarExercicio.tsx";
import AlterarExercicio from "./components/pages/exercicio/AlterarExercicio.tsx";

// imports de Treino

import TreinoMenu from "./components/pages/treino/TreinoMenu.tsx";
import AlterarTreino from "./components/pages/treino/AlterarTreino.tsx";
import ListarTreino from "./components/pages/treino/ListarTreino.tsx";
import CadastrarTreino from "./components/pages/treino/CadastrarTreino.tsx";

// imports de Registros dos Treinos

import CriarRegistro from "./components/pages/registro/CriarRegistro.tsx";
import ListarRegistro from "./components/pages/registro/ListarRegistro.tsx";
import RegistroDeTreinoMenu from "./components/pages/registro/RegistroDeTreinoMenu.tsx"; 


// Começo da Página

function App(){
  return (
    <BrowserRouter>
      <div className="App">

        <header className="App-header-top">
          <Link to="/" className="App-logo-link">=
            <h1>GYM <span>FLOW</span></h1> 
          </Link>
          <div className="App-nav-links">
             <Link to="/" className="App-home-button">Menu Principal</Link>
          </div>
        </header>

        <div id="Conteudo">
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/pages/aluno/menu" element={<AlunoMenu />} />
                <Route path="/pages/aluno/listarAluno" element={<div className="page-container"><ListarAluno /></div>} />
                <Route path="/pages/aluno/cadastrarAluno" element={<div className="page-container"><CadastrarAluno /></div>} />
                <Route path="aluno/alterar/:alunoId" element={<div className="page-container"><AlterarAluno /></div>}/>

                <Route path="/pages/exercicio/menu" element={<ExercicioMenu/>} />
                <Route path="/pages/exercicio/listarExercicio" element={<div className="page-container"><ListarExercicio /></div>} />
                <Route path="/pages/exercicio/cadastrarExercicio" element={<div className="page-container"><CadastrarExercicio /></div>} />
                <Route path="exercicio/alterar/:exercicioId" element={<div className="page-container"><AlterarExercicio /></div>}/>

                <Route path="/pages/treino/menu" element={<TreinoMenu />} />
                <Route path="/pages/treino/listar" element={<div className="page-container"><ListarTreino /></div>} />
                <Route path="/pages/treino/cadastrar" element={<div className="page-container"><CadastrarTreino /></div>} />
                <Route path="/pages/treino/alterar/:id" element={<div className="page-container"><AlterarTreino /></div>} />

                <Route path="/pages/registro/listar" element={<div className="page-container"><ListarRegistro /></div>} />
                <Route path="/pages/registro/cadastrar" element={<div className="page-container"><CriarRegistro /></div>} />
                <Route path="/pages/registro/menu" element={<div className="page-container"><RegistroDeTreinoMenu /></div>}/>
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;