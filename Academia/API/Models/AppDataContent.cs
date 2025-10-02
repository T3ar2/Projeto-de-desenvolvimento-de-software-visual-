using API.Models;
using Microsoft.EntityFrameworkCore;

public class AppDataContext : DbContext
{

    public DbSet<Aluno> Alunos {set; get;}
    public DbSet<Exercicio> Exercicios { set; get; }
    public DbSet<Treino> Treinos { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=.db");
    }
}