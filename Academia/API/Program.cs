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

app.MapGet("/", () => "API Academia está rodando!");
app.Run();  