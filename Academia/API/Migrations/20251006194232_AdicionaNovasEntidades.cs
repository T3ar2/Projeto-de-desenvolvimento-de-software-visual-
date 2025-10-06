using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaNovasEntidades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanosDeTreino_Alunos_alunoId",
                table: "PlanosDeTreino");

            migrationBuilder.DropForeignKey(
                name: "FK_PlanosDeTreino_Treinos_treinoId",
                table: "PlanosDeTreino");

            migrationBuilder.RenameColumn(
                name: "nomeTreino",
                table: "Treinos",
                newName: "NomeTreino");

            migrationBuilder.RenameColumn(
                name: "descricaoTreino",
                table: "Treinos",
                newName: "DescricaoTreino");

            migrationBuilder.RenameColumn(
                name: "treinoId",
                table: "Treinos",
                newName: "TreinoId");

            migrationBuilder.RenameColumn(
                name: "treinoId",
                table: "PlanosDeTreino",
                newName: "TreinoId");

            migrationBuilder.RenameColumn(
                name: "alunoId",
                table: "PlanosDeTreino",
                newName: "AlunoId");

            migrationBuilder.RenameColumn(
                name: "planoId",
                table: "PlanosDeTreino",
                newName: "PlanoId");

            migrationBuilder.RenameIndex(
                name: "IX_PlanosDeTreino_treinoId",
                table: "PlanosDeTreino",
                newName: "IX_PlanosDeTreino_TreinoId");

            migrationBuilder.RenameIndex(
                name: "IX_PlanosDeTreino_alunoId",
                table: "PlanosDeTreino",
                newName: "IX_PlanosDeTreino_AlunoId");

            migrationBuilder.RenameColumn(
                name: "exercicioNome",
                table: "Exercicios",
                newName: "ExercicioNome");

            migrationBuilder.RenameColumn(
                name: "exercicioDescricao",
                table: "Exercicios",
                newName: "ExercicioDescricao");

            migrationBuilder.RenameColumn(
                name: "equipamento",
                table: "Exercicios",
                newName: "Equipamento");

            migrationBuilder.RenameColumn(
                name: "exercicioId",
                table: "Exercicios",
                newName: "ExercicioId");

            migrationBuilder.RenameColumn(
                name: "statusMatricula",
                table: "Alunos",
                newName: "StatusMatricula");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Alunos",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "dataNascimento",
                table: "Alunos",
                newName: "DataNascimento");

            migrationBuilder.RenameColumn(
                name: "alunoNome",
                table: "Alunos",
                newName: "AlunoNome");

            migrationBuilder.RenameColumn(
                name: "alunoId",
                table: "Alunos",
                newName: "AlunoId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanosDeTreino_Alunos_AlunoId",
                table: "PlanosDeTreino",
                column: "AlunoId",
                principalTable: "Alunos",
                principalColumn: "AlunoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlanosDeTreino_Treinos_TreinoId",
                table: "PlanosDeTreino",
                column: "TreinoId",
                principalTable: "Treinos",
                principalColumn: "TreinoId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanosDeTreino_Alunos_AlunoId",
                table: "PlanosDeTreino");

            migrationBuilder.DropForeignKey(
                name: "FK_PlanosDeTreino_Treinos_TreinoId",
                table: "PlanosDeTreino");

            migrationBuilder.RenameColumn(
                name: "NomeTreino",
                table: "Treinos",
                newName: "nomeTreino");

            migrationBuilder.RenameColumn(
                name: "DescricaoTreino",
                table: "Treinos",
                newName: "descricaoTreino");

            migrationBuilder.RenameColumn(
                name: "TreinoId",
                table: "Treinos",
                newName: "treinoId");

            migrationBuilder.RenameColumn(
                name: "TreinoId",
                table: "PlanosDeTreino",
                newName: "treinoId");

            migrationBuilder.RenameColumn(
                name: "AlunoId",
                table: "PlanosDeTreino",
                newName: "alunoId");

            migrationBuilder.RenameColumn(
                name: "PlanoId",
                table: "PlanosDeTreino",
                newName: "planoId");

            migrationBuilder.RenameIndex(
                name: "IX_PlanosDeTreino_TreinoId",
                table: "PlanosDeTreino",
                newName: "IX_PlanosDeTreino_treinoId");

            migrationBuilder.RenameIndex(
                name: "IX_PlanosDeTreino_AlunoId",
                table: "PlanosDeTreino",
                newName: "IX_PlanosDeTreino_alunoId");

            migrationBuilder.RenameColumn(
                name: "ExercicioNome",
                table: "Exercicios",
                newName: "exercicioNome");

            migrationBuilder.RenameColumn(
                name: "ExercicioDescricao",
                table: "Exercicios",
                newName: "exercicioDescricao");

            migrationBuilder.RenameColumn(
                name: "Equipamento",
                table: "Exercicios",
                newName: "equipamento");

            migrationBuilder.RenameColumn(
                name: "ExercicioId",
                table: "Exercicios",
                newName: "exercicioId");

            migrationBuilder.RenameColumn(
                name: "StatusMatricula",
                table: "Alunos",
                newName: "statusMatricula");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Alunos",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "DataNascimento",
                table: "Alunos",
                newName: "dataNascimento");

            migrationBuilder.RenameColumn(
                name: "AlunoNome",
                table: "Alunos",
                newName: "alunoNome");

            migrationBuilder.RenameColumn(
                name: "AlunoId",
                table: "Alunos",
                newName: "alunoId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanosDeTreino_Alunos_alunoId",
                table: "PlanosDeTreino",
                column: "alunoId",
                principalTable: "Alunos",
                principalColumn: "alunoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlanosDeTreino_Treinos_treinoId",
                table: "PlanosDeTreino",
                column: "treinoId",
                principalTable: "Treinos",
                principalColumn: "treinoId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
