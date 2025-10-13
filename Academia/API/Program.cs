using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using API.Endpoints;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var path = Path.Combine(Directory.GetCurrentDirectory(), "academia.db");

builder.Services.AddDbContext<AppDataContent>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapGet("/", () => "API Academia está rodando!");

app.MapExerciciosRoutes();


app.Run();  