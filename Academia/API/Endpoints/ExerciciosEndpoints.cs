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
        app.MapPost("/api/exercicios/cadastrar", async (Exercicio novoExercicio, AppDataContent context) =>
        {
            if (string.IsNullOrWhiteSpace(novoExercicio.ExercicioNome))
            {
                return Results.BadRequest("Nome do exercpício é obrigatório.");
            }
            ;

            bool jaExiste = await context.Exercicios.AnyAsync(e => e.ExercicioNome == novoExercicio.ExercicioNome);
            if (jaExiste)
            {
                return Results.Conflict("Já existe um exercício com este nome.");
            }
            context.Exercicios.Add(novoExercicio);
            await context.SaveChangesAsync();
            return Results.Created($"/api/exercicios/{novoExercicio.ExercicioId}", novoExercicio);
        });

        // TODO:
        // app.MapPut("/api/exercicios/{id}", ...)
        // app.MapDelete("/api/exercicios/{id}", ...)
    }
}