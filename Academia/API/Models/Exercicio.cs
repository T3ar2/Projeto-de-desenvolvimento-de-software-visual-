using System;
using System.ComponentModel.DataAnnotations; 
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Exercicio
{
    // Id, Nome, Descricao, Equipamento
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ExercicioId { set; get; } = 0;
    public string ExercicioNome { set; get; } = "";
    public string ExercicioDescricao { set; get; } = "";
    public string Equipamento { set; get; } = "";
}