// Academia/front/src/components/pages/Home.tsx (ATUALIZADO)

import React from 'react';
import { Link } from 'react-router-dom';

// NOTA: Recomendo instalar a biblioteca 'react-icons' (npm install react-icons)
// para substituir os emojis por ícones profissionais, como FaUsers, FaDumbbell, etc.

const Home = () => {
    const menuItems = [
        {
            title: "Gerenciar Alunos",
            description: "Acesso total aos perfis, histórico e informações de contato dos alunos.",
            icon: "👥", // Ícone de Usuários/Pessoas
            link: "/pages/aluno/menu",
            action: "Acessar Módulo", 
        },
        {
            title: "Planos de Treino",
            description: "Crie, edite e personalize as rotinas semanais de treino para a sua equipe.",
            icon: "🏋️", // Ícone de Haltere/Treino
            link: "/pages/treino/listar",
            action: "Gerenciar Treinos",
        },
        {
            title: "Biblioteca de Exercícios",
            description: "Mantenha um catálogo completo de exercícios com detalhes técnicos e vídeos.",
            icon: "💪", // Ícone de Músculo/Força
            link: "/pages/exercicio/menu",
            action: "Gerenciar Exercícios",
        },
        {
            title: "Registro de Treinos",
            description: "Monitore a frequência e o desempenho dos alunos nos treinos agendados.",
            icon: "📊", // Ícone de Gráfico/Acompanhamento
            link: "/pages/registro/listar",
            action: "Ver Progresso",
        },
    ];

    return (
        <div className="DashboardCardGrid">
            {menuItems.map((item, index) => (
                <div key={index} className="DashboardCard">
                    {/* Linha colorida no topo, estilo barra de carregamento ou destaque */}
                    <div className="CardHeaderGradient"></div> 
                    
                    <div className="DashboardCard-icon">{item.icon}</div>
                    
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    
                    <div className="CardActionLabel">
                        {item.action}
                    </div>
                    
                    {/* Link invisível que cobre o card inteiro para facilitar o clique */}
                    <Link to={item.link}></Link> 
                </div>
            ))}
        </div>
    );
};

export default Home;