import Exercicio from "./Exercicio";

export interface Treino {
    treinoId: number;
    nomeTreino: string;
    descricaoTreino: string;
    focoMuscular: string;
    exercicios?: Exercicio[];
}