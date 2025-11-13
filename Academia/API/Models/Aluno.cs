using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Aluno
{


    [key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int AlunoId { set; get; }
    public string NomeAluno { set; get; }
    public string EmailAluno { set; get; }
    public string DataNascimento { set; get; }
    public string StatusMatricula { set; get; }
    public Aluno(String nomeAluno, string emailAluno, string dataNascimento, string statusMatricula)
    {
        NomeAluno = nomeAluno;
        EmailAluno = emailAluno;
        DataNascimento = dataNascimento;
        StatusMatricula = statusMatricula;
    }
}
