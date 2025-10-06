using API.Data;
using Microsoft.EntityFrameworkCore;

// Classe estática para Extensão de Métodos
namespace API.Endpoints;

public static class ExerciciosEndpoints
{
    public static void MapExerciciosRoutes(this WebApplication app)
    {
        app.MapGet("/api/exercicios", async (AppDataContent context) =>
        {
            var exercicios = await context.Exercicios.ToListAsync();
            
            if (exercicios.Any())
            {
                return Results.Ok(exercicios);
            }
            return Results.NotFound("A lista de exercícios está vazia.");
        });

        // Futuramente, aqui você adicionará:
        // app.MapPost("/api/exercicios", ...)
        // app.MapPut("/api/exercicios/{id}", ...)
        // app.MapDelete("/api/exercicios/{id}", ...)
    }
}