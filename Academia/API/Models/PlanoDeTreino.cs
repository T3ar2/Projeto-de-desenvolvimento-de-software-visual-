using System;
using System.ComponentModel.DataAnnotations; 
using API.Models; 


namespace API.Models;

public class PlanoDeTreino
{

    [Key]
    public int planoId { set; get; } = 0;
    public DateTime DataAtribuicao { get; set; } = DateTime.Now;



    public int alunoId { set; get; } = 0;
    public int treinoId { set; get; } = 0;


    public Aluno Aluno { get; set; } = default!; 
    public Treino Treino { get; set; } = default!;
}  