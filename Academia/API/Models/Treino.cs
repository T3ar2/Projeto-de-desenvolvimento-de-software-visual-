using System;
using System.Collections.Generic;
using API.Models;

namespace API.Models;

public class Treino
{

    public int TreinoId { set; get; } = 0;
    public string NomeTreino { set; get; } = "";
    public string DescricaoTreino { set; get; } = "";
    public string FocoMuscular { set; get; } = "";
    public List<Exercicio> Exercicios { get; set; } = new();
}