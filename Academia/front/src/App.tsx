// Academia/front/src/App.tsx (MODIFICADO)

import React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ListarAluno from "./components/pages/aluno/ListarAluno.tsx";
import CadastrarAluno from "./components/pages/aluno/CadastrarAluno.tsx";
import Home from "./components/pages/Home.tsx"; 
import './App.css';
import AlunoMenu from "./components/pages/aluno/AlunoMenu.tsx";

function App(){
  return (
    <BrowserRouter>
      <div className="App">

        {/* CABEÇALHO ATUALIZADO */}
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
                
                
                {/* Demais Rotas de Exemplo (Módulos CRUD) */}
                <Route path="/pages/exercicio/listar" element={
                    <div className="page-container">
                        <h2 className="content-title">Biblioteca de Exercícios</h2>
                        <p>Aqui será a página CRUD para o gerenciamento de Exercícios.</p>
                    </div>} 
                />
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

                <Route path="/pages/aluno/atualizarAluno" element={
                    <div className="page-container">
                        <h2 className="content-title">Atualizar Aluno</h2>
                        <p>Tela futura para editar informações do aluno.</p>
                    </div>} 
                />
                <Route path="/pages/aluno/deletarAluno" element={
                    <div className="page-container">
                        <h2 className="content-title">Remover Aluno</h2>
                        <p>Tela futura para exclusão de registro do aluno.</p>
                    </div>} 
                />

            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;