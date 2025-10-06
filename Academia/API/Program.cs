using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

var builder = WebApplication.CreateBuilder(args);



var path = Path.Combine(Directory.GetCurrentDirectory(), "academia.db");

builder.Services.AddDbContext<AppDataContent>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddEndpointsApiExplorer();
var app = builder.Build();

if (app.Enviroment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapGet("/", () => "API Academia está rodando!");

app.MapExerciciosRoutes(); 


app.Run();  