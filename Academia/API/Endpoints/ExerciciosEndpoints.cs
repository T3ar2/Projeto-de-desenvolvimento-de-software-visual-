using API.Data;
using API.Models; 
using Microsoft.EntityFrameworkCore;


namespace API.Endpoints;

public static class ExerciciosEndpoints
{
    // Listagem: GET /api/exercicios/listar
    public static void MapExerciciosRoutes(this WebApplication app)
    {
        app.MapGet("/api/exercicios/listar", async (AppDataContent context) =>
        {
            var exercicios = await context.Exercicios.ToListAsync();

            if (exercicios.Any())
            {
                return Results.Ok(exercicios);
            }
            return Results.NotFound("A lista de exercícios está vazia.");
        });

        // Cadastro: POST /api/exercicios/cadastrar
        app.MapPost("/api/exercicios/cadastrar", async (Exercicio novoExercicio, AppDataContent ctx) =>
        {
            if (string.IsNullOrWhiteSpace(novoExercicio.ExercicioNome))
            {
                return Results.BadRequest("Nome do exercício é obrigatório.");
            }
            ;

            bool jaExiste = await ctx.Exercicios.AnyAsync(e => e.ExercicioNome == novoExercicio.ExercicioNome);
            if (jaExiste)
            {
                return Results.Conflict("Já existe um exercício com este nome.");
            }
            ctx.Exercicios.Add(novoExercicio);
            await ctx.SaveChangesAsync();
            return Results.Created($"/api/exercicios/{novoExercicio.ExercicioId}", novoExercicio);
        });


        // DELETE: /api/exercicios/deletar/{id}
        app.MapDelete("/api/exercicios/deletar/{id}", (AppDataContent ctx, int id) =>
        {
            Exercicio? resultado = ctx.Exercicios.Find(id);
            if (resultado is null) { return Results.NotFound("Não é possível deletar algo em que não está no banco de dados."); }
            ctx.Exercicios.Remove(resultado);
            ctx.SaveChanges();
            return Results.Ok(resultado + " deletado com sucesso.");
        });

        // UPDATE: /api/exercicios/atualizar/{id}
        app.MapPatch("/api/exercicios/atualizar/{id}", (AppDataContent ctx, int id, Exercicio exercicioAlterado) =>
        {
            Exercicio? resultado = ctx.Exercicios.Find(id);
            if (resultado is null) { return Results.NotFound("Exercicio não encontrado"); }
            resultado.ExercicioNome = exercicioAlterado.ExercicioNome;
            resultado.ExercicioDescricao = exercicioAlterado.ExercicioDescricao;
            ctx.Exercicios.Update(resultado);
            ctx.SaveChanges();
            return Results.Ok(resultado + " alterado com sucesso. ");
            
        });

         app.MapGet("/api/exercicios/buscar/{id}", async (AppDataContent ctx, int id) =>
        {
            Exercicio? resultado = await ctx.Exercicios.FirstOrDefaultAsync(x => x.ExercicioId == id);
            if (resultado is null) { return Results.NotFound("Exercicio não encontrado."); }
            return Results.Ok(resultado);
        });

        
    }
}