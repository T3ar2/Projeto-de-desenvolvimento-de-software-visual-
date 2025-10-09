using API.Data;
using API.Models; 
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public static class TreinoEndpoints
{
    public static void MapTreinoEndpoints(this WebApplication app)
    {
        app.MapGet("/api/treino/listar", async (AppDataContent ctx) =>
        {
            var alunos = await ctx.Alunos.ToListAsync();

            if (alunos.Any())
            {
                return Results.Ok(alunos);
            }
            return Results.NotFound("A lista de treinos está vazia.");
        });

        app.MapGet("/api/treino/buscar", async (AppDataContent ctx, string nome) =>
        {
            var resultado = await ctx.Alunos.ToListAsync();
            if (resultado.Any())
            {
                return Results.Ok(resultado);
            }
            return Results.NotFound("Treino não encontrado na DataBase.");
        });

        app.MapDelete("/api/treino/deletar/{id}", async (AppDataContent ctx, int id) =>
        {
            Treino? resultado = ctx.Treinos.Find(id);
            if (resultado is null) { return Results.NotFound("Não é possivel deletar algo em que não está no banco de dados."); }
            ctx.Treinos.Remove(resultado);
            ctx.SaveChanges();
            return Results.Ok(resultado + " deletado com sucesso.");
        });

        app.MapPatch("/api/treino/atualizar/{id}", async (AppDataContent ctx, int id, Treino novoTreino) =>
        {
            Treino? resultado = ctx.Treinos.Find(id);
            if (resultado is null) { return Results.NotFound("Treino com a id {id}"); }
            resultado.NomeTreino = novoTreino.NomeTreino;
            resultado.DescricaoTreino = novoTreino.DescricaoTreino;
            resultado.FocoMuscular = novoTreino.FocoMuscular;
            ctx.Treinos.Update(resultado);
            ctx.SaveChanges();
            return Results.Ok(resultado + " atualizado com sucesso.");
        });

        app.MapPost("api/treino/cadastrar/{nome}", async(AppDataContent ctx,Treino treino) =>
        {
            Treino? resultado = ctx.Treinos.FirstOrDefault(x => x.NomeTreino == treino.NomeTreino);
            
            if (resultado is null)
            {
                ctx.Treinos.Add(treino);
                ctx.SaveChanges();

                return Results.Ok(resultado + " criado com sucesso.");
            }
            return Results.Conflict("Exxiste o treino com o mesmo nome.");
        });
    }
}