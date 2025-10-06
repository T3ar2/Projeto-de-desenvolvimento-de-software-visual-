using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class DetalheRegistro
{
    public int DetalheRegistroId { get; set; }

    public int Series { get; set; }
    public int Repeticoes { get; set; }
    public double Carga { get; set; }

    public int RegistroTreinoId { get; set; }
    public RegistroTreino RegistroTreino { get; set; } = default!; 
    
    public int ExercicioId { get; set; }
    public Exercicio Exercicio { get; set; } = default!; 
}