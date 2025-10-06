using System;
using System.ComponentModel.DataAnnotations; 
using API.Models; 


namespace API.Models;

public class PlanoDeTreino
{

    [Key]
    public int PlanoId { set; get; } = 0;
    public DateTime DataAtribuicao { get; set; } = DateTime.Now;



    public int AlunoId { set; get; } = 0;
    public int TreinoId { set; get; } = 0;


    public Aluno Aluno { get; set; } = default!; 
    public Treino Treino { get; set; } = default!;
}  