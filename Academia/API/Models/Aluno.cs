using System;

namespace API.Models;

public class Aluno
{

    public int AlunoId { set; get; } = 0;
    public string AlunoNome { set; get; } = "";
    public string Email { set; get; } = "";
    public string DataNascimento { set; get; } = "";

    public string StatusMatricula { set; get; } = "";
}