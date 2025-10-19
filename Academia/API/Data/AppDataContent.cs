using Microsoft.EntityFrameworkCore;
using API.Models; 

namespace API.Data;

public class AppDataContent : DbContext
{

    public AppDataContent(DbContextOptions<AppDataContent> options) : base(options) { }
    public AppDataContent() { }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "academia.db");
            optionsBuilder.UseSqlite($"Data Source={path}");
        }
    }


    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<Treino> Treinos { get; set; }
    public DbSet<PlanoDeTreino> PlanosDeTreino { get; set; }
    public DbSet<Exercicio> Exercicios { get; set; } 
    public DbSet<RegistroTreino> RegistrosTreino { get; set; }
    public DbSet<DetalheRegistro> DetalhesRegistro { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PlanoDeTreino>()
                .HasOne(pt => pt.Aluno)
                .WithMany()
                .HasForeignKey(pt => pt.AlunoId);

            modelBuilder.Entity<PlanoDeTreino>()
               .HasOne(pt => pt.Treino)
               .WithMany()
               .HasForeignKey(pt => pt.TreinoId);

            modelBuilder.Entity<RegistroTreino>()
               .HasOne(rt => rt.Treino)
               .WithMany()
               .HasForeignKey(rt => rt.TreinoId)
               .IsRequired(false);

            modelBuilder.Entity<RegistroTreino>()
               .HasMany(rt => rt.Detalhes)
               .WithOne(dr => dr.RegistroTreino)
               .HasForeignKey(dr => dr.RegistroTreinoId);

            modelBuilder.Entity<DetalheRegistro>()
               .HasOne(dr => dr.Exercicio)
               .WithMany()
               .HasForeignKey(dr => dr.ExercicioId);
        }

}