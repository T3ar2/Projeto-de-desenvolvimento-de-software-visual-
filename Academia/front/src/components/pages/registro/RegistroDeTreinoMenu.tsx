import React from 'react';
import { Link } from 'react-router-dom';

const RegistroDeTreinoMenu = () => {
    const menuItems = [
        {
            title: "Cadastrar Novo Histórico de Treino",
            description: "Criar um novo Histórico de treino feito.",
            icon: "💪", 
            link: "/pages/registro/cadastrar", 
            action: "Novo Cadastro",
        },
        {
            title: "Listar seu Histórico de Treinos",
            description: "Visualizar todos os seus treinos feitos e registrados no sistema.",
            icon: "📋", 
            link: "/pages/registro/listar", 
            action: "Visualizar Lista",
        },
        
    ];

    return (
        <div> 
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

export default RegistroDeTreinoMenu;