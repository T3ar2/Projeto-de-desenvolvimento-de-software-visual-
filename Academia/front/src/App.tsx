// Academia/front/src/App.tsx (MODIFICADO)

import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ListarAluno from "./components/pages/aluno/ListarAluno.tsx";
import CadastrarAluno from "./components/pages/aluno/CadastrarAluno.tsx";
import Home from "./components/pages/Home.tsx"; 
import ExercicioMenu from "./components/pages/exercicio/ExercicioMenu.tsx";
import AlunoMenu from "./components/pages/aluno/AlunoMenu.tsx";
import ListarExercicio from "./components/pages/exercicio/ListarExercicio.tsx";
import CadastrarExercicio from "./components/pages/exercicio/CadastrarExercicio.tsx";
import AlterarAluno from "./components/pages/aluno/AlterarAluno.tsx";
import AlterarExercicio from "./components/pages/exercicio/AlterarExercicio.tsx";

function App(){
  return (
    <BrowserRouter>
      <div className="App">

        {/* CABEÇALHO */}
        <header className="App-header-top">
          <Link to="/" className="App-logo-link">
            {/* Título mais chamativo com destaque na cor ciano */}
            <h1>GYM <span>FLOW</span></h1> 
          </Link>
          <div className="App-nav-links">
             <Link to="/" className="App-home-button">Menu Principal</Link>
          </div>
        </header>

        <div id="Conteudo">
            <Routes>
                {/* Rota da Página Inicial (Menu de Cards) */}
                <Route path="/" element={<Home />} />
                
                {/* Rotas dos Módulos */}
                {/* Adicione a classe 'page-container' aos elementos que representam a página, para que o estilo de "card" seja aplicado ao conteúdo dela */}
                <Route path="/pages/aluno/menu" element={<AlunoMenu />} />
                <Route path="/pages/aluno/listarAluno" element={<div className="page-container"><ListarAluno /></div>} />
                <Route path="/pages/aluno/cadastrarAluno" element={<div className="page-container"><CadastrarAluno /></div>} />
                <Route path="aluno/alterar/:alunoId" element={<div className="page-container"><AlterarAluno /></div>}/>

                {/* Rotas de Módulos Exercicio */}
                <Route path="/pages/exercicio/menu" element={<ExercicioMenu/>} />
                <Route path="/pages/exercicio/listarExercicio" element={<div className="page-container"><ListarExercicio /></div>} />
                <Route path="/pages/exercicio/cadastrarExercicio" element={<div className="page-container"><CadastrarExercicio /></div>} />
                <Route path="exercicio/alterar/:exercicioId" element={<div className="page-container"><AlterarExercicio /></div>}/>

                
                <Route path="/pages/treino/listar" element={
                    <div className="page-container">
                        <h2 className="content-title">Planos de Treino</h2>
                        <p>Aqui será a página CRUD para Planos de Treino e PlanosDeTreino.</p>
                    </div>} 
                />
                <Route path="/pages/registro/listar" element={
                    <div className="page-container">
                        <h2 className="content-title">Registro de Treinos</h2>
                        <p>Aqui será a página CRUD para o acompanhamento e DetalheRegistro.</p>
                    </div>} 
                />
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;