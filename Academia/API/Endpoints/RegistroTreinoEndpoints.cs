using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace API.Endpoints;

public static class RegistroTreinoEndpoints
{
    public static void MapRegistroTreinoRoutes(this WebApplication app)
    {
        app.MapPost("/api/registros", async (AppDataContent ctx, RegistroTreino novoRegistro) =>
        {
            if (novoRegistro.Data == default)
            {
                return Results.BadRequest("A data do registro é obrigatória.");
            }

            if (novoRegistro.TreinoId.HasValue)
            {
                bool treinoExiste = await ctx.Treinos.AnyAsync(t => t.TreinoId == novoRegistro.TreinoId.Value);
                if (!treinoExiste)
                {
                    return Results.NotFound($"Plano de treino com ID {novoRegistro.TreinoId} não encontrado.");
                }
            }

            ctx.RegistrosTreino.Add(novoRegistro);
            await ctx.SaveChangesAsync();

            return Results.Created($"/api/registros/{novoRegistro.RegistroTreinoId}", novoRegistro);
        });

        app.MapPost("/api/registros/{registroId}/detalhes", async (AppDataContent ctx, int registroId, DetalheRegistro novoDetalhe) =>
        {
            RegistroTreino? registroPai = await ctx.RegistrosTreino.FindAsync(registroId);
            if (registroPai is null)
            {
                return Results.NotFound($"Registro de treino com ID {registroId} não encontrado.");
            }

            bool exercicioExiste = await ctx.Exercicios.AnyAsync(e => e.ExercicioId == novoDetalhe.ExercicioId);
            if (!exercicioExiste)
            {
                return Results.NotFound($"Exercício com ID {novoDetalhe.ExercicioId} não encontrado.");
            }

            if (novoDetalhe.Series <= 0 || novoDetalhe.Repeticoes <= 0 || novoDetalhe.Carga < 0)
            {
                return Results.BadRequest("Dados de séries, repetições ou carga inválidos.");
            }

            novoDetalhe.RegistroTreinoId = registroId;

            ctx.DetalhesRegistro.Add(novoDetalhe);
            await ctx.SaveChangesAsync();

            return Results.Created($"/api/registros/{registroId}/detalhes/{novoDetalhe.DetalheRegistroId}", novoDetalhe);
        });

        app.MapGet("/api/registros", async (AppDataContent ctx) =>
        {
            var registros = await ctx.RegistrosTreino
                                    .OrderByDescending(r => r.Data)
                                    .ToListAsync();

            if (registros.Any())
            {
                return Results.Ok(registros);
            }
            return Results.NotFound("Nenhum registro de treino encontrado.");
        });

        app.MapGet("/api/registros/{id}", async (AppDataContent ctx, int id) =>
        {
            RegistroTreino? registro = await ctx.RegistrosTreino
                                                .Include(r => r.Detalhes)
                                                    .ThenInclude(d => d.Exercicio)
                                                .Include(r => r.Treino)
                                                .FirstOrDefaultAsync(r => r.RegistroTreinoId == id);

            if (registro is null)
            {
                return Results.NotFound($"Registro de treino com ID {id} não encontrado.");
            }
            return Results.Ok(registro);
        });
    }
}