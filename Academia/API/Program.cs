using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


var path = Path.Combine(Directory.GetCurrentDirectory(), "academia.db");

builder.Services.AddDbContext<AppDataContent>(options =>
    options.UseSqlite($"Data Source={path}")
);

var Alunos = new List<Aluno>() { };
var Exercicios = new List<Ecercicio>() { };
var Treinos = new List<Treino>() { };
var PlanoDeTreino = new List<PlanoDeTreino>() { };


app.MapGet("/", () => "API Academia está rodando!");

// LISTAGENS: GET /api/academia/listar/
app.MapGet("/api/academia/listar/alunos", () =>
{
    if (Alunos.Count > 0) { return Results.Ok(Alunos); };
    return Results.NotFound("Alista de Alunos está vazia.");
});
app.MapGet("/api/academia/listar/exercicio", () =>
{ 
    if (Exercicios.Count > 0) { return Results.Ok(Exerciciosw); };
    return Results.NotFound("Alista de exercicios está vazia.");
});
app.MapGet("/api/academia/listar/treino", () =>
{
    if (Treinos.Count > 0) { return Results.Ok(Treinos); };
    return Results.NotFound("Alista de treinos está vazia.");
 });
app.MapGet("/api/academia/listar/plano_de_treino", () =>
{
    if (PlanoDeTreino.Count > 0) { return Results.Ok(PlanoDeTreino); }
    ;
    return Results.NotFound("Alista de plano de treino está vazia.");
});

// BUSCADORES: GET /api/academia/buscar/
app.MapGet("/api/academia/buscar/alunos/{}", ([FromRoute]String alunoNome) =>{});
app.Run();  