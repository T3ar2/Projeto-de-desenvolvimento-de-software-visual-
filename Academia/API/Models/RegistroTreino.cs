using System;
using System.Collections.Generic;

namespace API.Models;

public class RegistroTreino
{
    public int RegistroTreinoId { get; set; }
    public DateTime Data { get; set; }
    public int? TreinoId { get; set; }
    public Treino? Treino { get; set; }
    public List<DetalheRegistro> Detalhes { get; set; } = new();
}