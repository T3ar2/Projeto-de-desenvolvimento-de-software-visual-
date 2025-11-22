import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}


interface ErrorBoundaryProps {
    children: ReactNode;
}


class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.group("Captura de Erro de Aplicação");
        console.error("Erro:", error);
        console.error("Info:", errorInfo);
        console.groupEnd();
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
                    <h2>Ops! Algo deu errado.</h2>
                    <p>Tente recarregar a página.</p>
                    <details style={{ whiteSpace: 'pre-wrap', color: 'red' }}>
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}


const appConfig = {
    appName: 'Academia App',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    debugMode: true
};


const logAppInit = () => {
    if (appConfig.debugMode) {
        const style = 'background: #222; color: #bada55; padding: 4px; border-radius: 2px;';
        console.log(`%c Inicializando ${appConfig.appName} v${appConfig.version} `, style);
        console.log(`Ambiente: ${appConfig.environment}`);
    }
};


const reportWebVitals = (onPerfEntry?: Function) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
 
 
    }
};


const container = document.getElementById('root');

if (container) {
    logAppInit();
    const root = ReactDOM.createRoot(container);
    
    root.render(
        <React.StrictMode>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </React.StrictMode>
    );


    reportWebVitals(console.log);

} else {
    console.error("Elemento raiz 'root' não encontrado no documento HTML. A aplicação não pode ser montada.");
}