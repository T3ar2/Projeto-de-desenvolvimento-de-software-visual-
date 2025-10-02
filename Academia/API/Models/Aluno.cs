using System;

namespace API.Models;

public class Aluno
{

    public int alunoId { set; get; } = 0;
    public string alunoNome { set; get; } = "";
    public string email { set; get; } = "";
    public string dataNascimento { set; get; } = "";

    public string statusMatricula { set; get; } = "";
}