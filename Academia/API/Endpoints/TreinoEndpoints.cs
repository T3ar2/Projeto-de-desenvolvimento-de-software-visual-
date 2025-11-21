using API.Data;
using API.Models; 
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public static class TreinoEndpoints
{
    public static void MapTreinoEndpoints(this WebApplication app)
    {
        app.MapGet("/api/treinos", async (AppDataContent ctx) =>
        {
            var treinos = await ctx.Treinos.Include(t => t.Exercicios).ToListAsync();

            if (treinos.Any())
            {
                return Results.Ok(treinos);
            }
            return Results.NotFound("A lista de treinos está vazia.");
        });

        app.MapGet("/api/treinos/{id}", async (AppDataContent ctx, int id) =>
        {
            Treino? treino = await ctx.Treinos.Include(t => t.Exercicios)
                                              .FirstOrDefaultAsync(t => t.TreinoId == id);
            if (treino is null)
            {
                return Results.NotFound("Treino não encontrado na DataBase.");
            }
            return Results.Ok(treino);
        });


        app.MapDelete("/api/treino/deletar/{id}", async (AppDataContent ctx, int id) =>
        {
            var treino = await ctx.Treinos
                .Include(t => t.Exercicios)
                .FirstOrDefaultAsync(t => t.TreinoId == id);

            if (treino is null) 
            { 
                return Results.NotFound("Treino não encontrado."); 
            }
            
            ctx.Treinos.Remove(treino);
            await ctx.SaveChangesAsync(); 
            return Results.Ok("Treino deletado com sucesso.");
        });

        app.MapPatch("/api/treino/atualizar/{id}", async (AppDataContent ctx, int id, Treino novoTreino) =>
        {
            Treino? resultado = await ctx.Treinos.FindAsync(id);
            if (resultado is null) { return Results.NotFound("Treino com a id {id}"); }
            resultado.NomeTreino = novoTreino.NomeTreino;
            resultado.DescricaoTreino = novoTreino.DescricaoTreino;
            resultado.FocoMuscular = novoTreino.FocoMuscular;
            ctx.Treinos.Update(resultado);
            await ctx.SaveChangesAsync();
            return Results.Ok(resultado + " atualizado com sucesso.");
        });

        app.MapPost("api/treino/cadastrar/{nome}", async (AppDataContent ctx, Treino treino) =>
        {
            Treino? resultado = await ctx.Treinos.FirstOrDefaultAsync(x => x.NomeTreino == treino.NomeTreino);

            if (resultado is null)
            {
                ctx.Treinos.Add(treino);
                await ctx.SaveChangesAsync();

                return Results.Created($"/api/treinos/{treino.TreinoId}", treino);
            }
            return Results.Conflict("Existe o treino com o mesmo nome.");
        });
        
        app.MapPost("/api/treinos/{treinoId}/associar-exercicio/{exercicioId}", async (int treinoId, int exercicioId, AppDataContent ctx) =>
        {
            var treino = await ctx.Treinos.Include(t => t.Exercicios).FirstOrDefaultAsync(t => t.TreinoId == treinoId);
            if (treino is null)
            {
                return Results.NotFound("Plano de treino não encontrado.");
            }

            var exercicio = await ctx.Exercicios.FindAsync(exercicioId);
            if (exercicio is null)
            {
                return Results.NotFound("Exercício não encontrado.");
            }

            foreach (var exercicioExistente in treino.Exercicios)
            {
                if (exercicioExistente.ExercicioId == exercicioId)
                {
                    return Results.Conflict("Este exercício já está associado a este plano de treino.");
                }
            }

            treino.Exercicios.Add(exercicio);
            await ctx.SaveChangesAsync();

            return Results.Ok(treino);
        });

        app.MapDelete("/api/treinos/{treinoId}/remover-exercicio/{exercicioId}", async (int treinoId, int exercicioId, AppDataContent ctx) =>
        {
            var treino = await ctx.Treinos.Include(t => t.Exercicios).FirstOrDefaultAsync(t => t.TreinoId == treinoId);
            if (treino is null) return Results.NotFound("Treino não encontrado.");

            var exercicio = treino.Exercicios.FirstOrDefault(e => e.ExercicioId == exercicioId);
            if (exercicio is null) return Results.NotFound("Exercício não encontrado neste treino.");

            treino.Exercicios.Remove(exercicio);
            await ctx.SaveChangesAsync();
            return Results.Ok("Exercício removido com sucesso.");
        });
    }
}