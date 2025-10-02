using System;

namespace API.Models;

public class Treino
{

    public int treinoId { set; get; } = 0;
    public string nomeTreino { set; get; } = "";
    public string descricaoTreino { set; get; } = "";
    public string FocoMuscular { set; get; } = "";
}