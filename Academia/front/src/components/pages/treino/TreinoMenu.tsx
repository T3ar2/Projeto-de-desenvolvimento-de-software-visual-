import React from 'react';
import { Link } from 'react-router-dom';

const TreinoMenu = () => {
    const menuItems = [
        {
            title: "Cadastrar Novo Treino",
            description: "Criar um novo plano de treino definindo nome, descrição e foco muscular.",
            icon: "💪", 
            link: "/pages/treino/cadastrar", 
            action: "Novo Cadastro",
        },
        {
            title: "Listar Treinos",
            description: "Visualizar, editar e excluir os planos de treino disponíveis no sistema.",
            icon: "📋", 
            link: "/pages/treino/listar", 
            action: "Visualizar Lista",
        },
        
    ];

    return (
        <div className="page-container"> 
            <h2 className="content-title">Gerenciamento de Treinos</h2>
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
        </div>
    );
};

export default TreinoMenu;