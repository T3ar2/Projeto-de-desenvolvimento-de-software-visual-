using API.Models;
using Microsoft.EntityFrameworkCore;

public class AppDataContext : DbContext
{

    public DbSet<Aluno> Alunos { set; get; }
    public DbSet<Exercicio> Exercicios { set; get; }
    public DbSet<Treino> Treinos { get; set; }
    public DbSet<PlanoDeTreino> PlanosDeTreino { get; set; }


    public DbSet<ResgistroTreino> RegistrosTreino { get; set; }
    public DbSet<DetalheRegistro> DetalhesTreino { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=academia.db");
    }
    
     protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
            modelBuilder.Entity<PlanoDeTreino>()
            .HasOne(pt => pt.Aluno)
            .WithMany()
            .HasForeignKey(pt => pt.AlunoId);
        
        modelBuilder.Entity<DetalheRegistro>()
            .HasKey(dr => dr.DetalheRegistroId); 
    }
}