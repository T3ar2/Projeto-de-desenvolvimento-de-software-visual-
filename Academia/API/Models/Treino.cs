using System;

namespace API.Models;

public class Treino
{

    public int TreinoId { set; get; } = 0;
    public string NomeTreino { set; get; } = "";
    public string DescricaoTreino { set; get; } = "";
    public string FocoMuscular { set; get; } = "";
}