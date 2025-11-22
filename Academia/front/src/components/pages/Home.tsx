import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    const menuItems = [
        {
            title: "Gerenciar Alunos",
            description: "Acesso total aos perfis, histórico e informações de contato dos alunos.",
            icon: "👥",
            link: "/pages/aluno/menu",
            action: "Acessar Módulo", 
        },
        {
            title: "Planos de Treino",
            description: "Crie, edite e personalize as rotinas semanais de treino para a sua equipe.",
            icon: "🏋️",
            link: "/pages/treino/menu",
            action: "Gerenciar Treinos",
        },
        {
            title: "Biblioteca de Exercícios",
            description: "Mantenha um catálogo completo de exercícios com detalhes técnicos e vídeos.",
            icon: "💪",
            link: "/pages/exercicio/menu",
            action: "Gerenciar Exercícios",
        },
        {
            title: "Registro de Treinos",
            description: "Monitore a frequência e o desempenho dos alunos nos treinos agendados.",
            icon: "📊",
            link: "/pages/registro/menu",
            action: "Ver Progresso",
        },
    ];

    return (
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
                    <Link to={item.link}></Link> 
                </div>
            ))}
        </div>
    );
};

export default Home;