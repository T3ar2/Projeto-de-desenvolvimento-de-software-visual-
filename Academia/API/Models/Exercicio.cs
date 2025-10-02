using System;

namespace API.Models;

public class Exercicio
{
    // Id, Nome, Descricao, Equipamento

    public int exercicioId { set; get; } = 0;
    public string exercicioNome { set; get; } = "";
    public string exercicioDescricao { set; get; } = "";
    public string equipamento { set; get; } = "";
}