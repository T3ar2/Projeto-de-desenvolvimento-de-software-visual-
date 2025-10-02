using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class InitialModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alunos",
                columns: table => new
                {
                    alunoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    alunoNome = table.Column<string>(type: "TEXT", nullable: false),
                    email = table.Column<string>(type: "TEXT", nullable: false),
                    dataNascimento = table.Column<string>(type: "TEXT", nullable: false),
                    statusMatricula = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alunos", x => x.alunoId);
                });

            migrationBuilder.CreateTable(
                name: "Exercicios",
                columns: table => new
                {
                    exercicioId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    exercicioNome = table.Column<string>(type: "TEXT", nullable: false),
                    exercicioDescricao = table.Column<string>(type: "TEXT", nullable: false),
                    equipamento = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercicios", x => x.exercicioId);
                });

            migrationBuilder.CreateTable(
                name: "Treinos",
                columns: table => new
                {
                    treinoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    nomeTreino = table.Column<string>(type: "TEXT", nullable: false),
                    descricaoTreino = table.Column<string>(type: "TEXT", nullable: false),
                    FocoMuscular = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treinos", x => x.treinoId);
                });

            migrationBuilder.CreateTable(
                name: "PlanosDeTreino",
                columns: table => new
                {
                    planoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DataAtribuicao = table.Column<DateTime>(type: "TEXT", nullable: false),
                    alunoId = table.Column<int>(type: "INTEGER", nullable: false),
                    treinoId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanosDeTreino", x => x.planoId);
                    table.ForeignKey(
                        name: "FK_PlanosDeTreino_Alunos_alunoId",
                        column: x => x.alunoId,
                        principalTable: "Alunos",
                        principalColumn: "alunoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlanosDeTreino_Treinos_treinoId",
                        column: x => x.treinoId,
                        principalTable: "Treinos",
                        principalColumn: "treinoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlanosDeTreino_alunoId",
                table: "PlanosDeTreino",
                column: "alunoId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanosDeTreino_treinoId",
                table: "PlanosDeTreino",
                column: "treinoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exercicios");

            migrationBuilder.DropTable(
                name: "PlanosDeTreino");

            migrationBuilder.DropTable(
                name: "Alunos");

            migrationBuilder.DropTable(
                name: "Treinos");
        }
    }
}
