using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaRegistroTreinoEDetalhes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Alunos",
                newName: "NomeAluno");

            migrationBuilder.RenameColumn(
                name: "AlunoNome",
                table: "Alunos",
                newName: "EmailAluno");

            migrationBuilder.AddColumn<int>(
                name: "TreinoId",
                table: "Exercicios",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DataNascimento",
                table: "Alunos",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.CreateTable(
                name: "RegistrosTreino",
                columns: table => new
                {
                    RegistroTreinoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TreinoId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrosTreino", x => x.RegistroTreinoId);
                    table.ForeignKey(
                        name: "FK_RegistrosTreino_Treinos_TreinoId",
                        column: x => x.TreinoId,
                        principalTable: "Treinos",
                        principalColumn: "TreinoId");
                });

            migrationBuilder.CreateTable(
                name: "DetalhesRegistro",
                columns: table => new
                {
                    DetalheRegistroId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Series = table.Column<int>(type: "INTEGER", nullable: false),
                    Repeticoes = table.Column<int>(type: "INTEGER", nullable: false),
                    Carga = table.Column<double>(type: "REAL", nullable: false),
                    RegistroTreinoId = table.Column<int>(type: "INTEGER", nullable: false),
                    ExercicioId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalhesRegistro", x => x.DetalheRegistroId);
                    table.ForeignKey(
                        name: "FK_DetalhesRegistro_Exercicios_ExercicioId",
                        column: x => x.ExercicioId,
                        principalTable: "Exercicios",
                        principalColumn: "ExercicioId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalhesRegistro_RegistrosTreino_RegistroTreinoId",
                        column: x => x.RegistroTreinoId,
                        principalTable: "RegistrosTreino",
                        principalColumn: "RegistroTreinoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercicios_TreinoId",
                table: "Exercicios",
                column: "TreinoId");

            migrationBuilder.CreateIndex(
                name: "IX_DetalhesRegistro_ExercicioId",
                table: "DetalhesRegistro",
                column: "ExercicioId");

            migrationBuilder.CreateIndex(
                name: "IX_DetalhesRegistro_RegistroTreinoId",
                table: "DetalhesRegistro",
                column: "RegistroTreinoId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrosTreino_TreinoId",
                table: "RegistrosTreino",
                column: "TreinoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicios_Treinos_TreinoId",
                table: "Exercicios",
                column: "TreinoId",
                principalTable: "Treinos",
                principalColumn: "TreinoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercicios_Treinos_TreinoId",
                table: "Exercicios");

            migrationBuilder.DropTable(
                name: "DetalhesRegistro");

            migrationBuilder.DropTable(
                name: "RegistrosTreino");

            migrationBuilder.DropIndex(
                name: "IX_Exercicios_TreinoId",
                table: "Exercicios");

            migrationBuilder.DropColumn(
                name: "TreinoId",
                table: "Exercicios");

            migrationBuilder.RenameColumn(
                name: "NomeAluno",
                table: "Alunos",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "EmailAluno",
                table: "Alunos",
                newName: "AlunoNome");

            migrationBuilder.AlterColumn<string>(
                name: "DataNascimento",
                table: "Alunos",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }
    }
}
