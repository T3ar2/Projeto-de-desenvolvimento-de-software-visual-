using System;

namespace API.Models;

public class Aluno
{


    public int AlunoId { set; get; }
    public string NomeAluno { set; get; }
    public string EmailAluno { set; get; }
    public int DataNascimento { set; get; }
    public string StatusMatricula { set; get; }

    
}