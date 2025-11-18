using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public static class AlunoEndpoints
{
    public static void MapAlunosRoutes(this WebApplication app)
    {

        app.MapGet("/api/alunos/listar", async (AppDataContent ctx) =>
        {
            var Alunos = await ctx.Alunos.ToListAsync();

            if (Alunos.Any())
            {
                return Results.Ok(Alunos);
            }
            return Results.NotFound("A lista de alunos está vazia.");
        });

        app.MapGet("/api/alunos/buscar/id/{id}", async (AppDataContent ctx, int id) =>
        {
            Aluno? resultado = await ctx.Alunos.FirstOrDefaultAsync(x => x.AlunoId == id);
            if (resultado is null) { return Results.NotFound("Aluno não encontrado."); }
            return Results.Ok(resultado);
        });

        app.MapPost("/api/alunos/cadastrar", async (AppDataContent ctx, Aluno novoAluno) =>
        {
            if (string.IsNullOrWhiteSpace(novoAluno.NomeAluno))
            {
                return Results.BadRequest("Nome do aluno é obrigatório.");
            }

            bool jaExiste = await ctx.Alunos.AnyAsync(x => x.NomeAluno == novoAluno.NomeAluno);
            if (jaExiste is true) { return Results.Conflict("Aluno já cadastrado no bando de dados."); }
            ctx.Alunos.Add(novoAluno);
            await ctx.SaveChangesAsync();
            return Results.Created($"/api/alunos/buscar/id/{novoAluno.AlunoId}", novoAluno);
        });

        app.MapDelete("/api/alunos/deletar/{id}", async (AppDataContent ctx, int id) =>
        {
            Aluno? resultado = await ctx.Alunos.FindAsync(id);
            if (resultado is null) { return Results.NotFound("não é possivel deletar algo em que não está no banco de dados."); }
            ;
            ctx.Alunos.Remove(resultado);
            await ctx.SaveChangesAsync();
            return Results.Ok(resultado);
        });

        app.MapPatch(("/api/alunos/atualizar/{id}"), async (AppDataContent ctx, int id, Aluno alunoAlterado) =>
        {
            Aluno? resultado = await ctx.Alunos.FindAsync(id);
            if (resultado is null) { return Results.NotFound("Aluno não encontrado."); }
            resultado.NomeAluno = alunoAlterado.NomeAluno;
            resultado.EmailAluno = alunoAlterado.EmailAluno;
            resultado.DataNascimento = alunoAlterado.DataNascimento;
            resultado.StatusMatricula = alunoAlterado.StatusMatricula;
            ctx.Alunos.Update(resultado);
            await ctx.SaveChangesAsync();
            return Results.Ok(resultado);
        });
    }
}