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
            Treino? resultado = await ctx.Treinos.FindAsync(id); 
            if (resultado is null) { return Results.NotFound("Não é possivel deletar algo em que não está no banco de dados."); }
            ctx.Treinos.Remove(resultado);
            await ctx.SaveChangesAsync(); 
            return Results.Ok(resultado + " deletado com sucesso.");
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

                return Results.Ok(resultado + " criado com sucesso.");
            }
            return Results.Conflict("Exxiste o treino com o mesmo nome.");
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
    }
}