using System;

namespace API.Models;

public class Aluno
{


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
