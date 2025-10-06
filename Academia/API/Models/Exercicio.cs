using System;

namespace API.Models;

public class Exercicio
{
    // Id, Nome, Descricao, Equipamento

    public int ExercicioId { set; get; } = 0;
    public string ExercicioNome { set; get; } = "";
    public string ExercicioDescricao { set; get; } = "";
    public string Equipamento { set; get; } = "";
}