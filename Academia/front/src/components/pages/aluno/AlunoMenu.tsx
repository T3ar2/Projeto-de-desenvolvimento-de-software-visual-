import React from 'react';
import { Link } from 'react-router-dom';

const AlunoMenu = () => {
    // Itens de menu para as operações CRUD do Aluno
    const menuItems = [
        {
            title: "Cadastrar Novo Aluno",
            description: "Incluir um novo aluno, registrando dados pessoais e informações de contato.",
            icon: "➕", // Ícone de Adicionar
            // 💡 CORREÇÃO AQUI: Remova o .tsx para ser consistente com a rota do App.tsx
            link: "/pages/aluno/cadastrarAluno", 
            action: "Novo Cadastro",
        },
        {
            title: "Listar Alunos",
            description: "Visualizar, pesquisar e gerenciar a lista completa de alunos cadastrados.",
            icon: "📋", // Ícone de Lista/Tabela
            link: "/pages/aluno/listarAluno", 
            action: "Visualizar Lista",
        },
        
    ];

    return (
        // O page-container aplica o fundo branco e a sombra de cartão
        <div className="page-container"> 
            <h2 className="content-title">Gerenciamento de Alunos</h2>
            {/* O DashboardCardGrid aplica o layout responsivo de cards */}
            <div className="DashboardCardGrid">
                {menuItems.map((item, index) => (
                    <div key={index} className="DashboardCard">
                        <div className="CardHeaderGradient"></div> 
                        
                        <div className="DashboardCard-icon">{item.icon}</div>
                        
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        
                        <div className="CardActionLabel">
                            {item.action}
                        </div>
                        
                        {/* Link invisível que cobre o card inteiro */}
                        <Link to={item.link}></Link> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlunoMenu;