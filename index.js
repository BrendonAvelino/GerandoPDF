const pdf = require("html-pdf");
const fs = require("fs");


function gerarBoletim() {
  const logoSenai = fs.readFileSync("./imgs/logo-senai.png").toString("base64");

  const materias = [
    { nome: "Programação Web", nota: 9.5 },
    { nome: "Banco de Dados", nota: 8.7 },
    { nome: "Priorização de Requisitos", nota: 8.9 },
    { nome: "Desenvolvimento Mobile", nota: 9.2 },
    
  ];

  let conteudoHTML = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .logo { text-align: center; margin-bottom: 20px; }
          .materias { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .materias th, .materias td { border: 1px solid black; padding: 10px; text-align: center; }
          .materias th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="logo">
          <img src="data:image/png;base64,${logoSenai}" alt="Logo SENAI" width="150"/>
        </div>
        <h1 style="text-align: center;">Boletim Escolar</h1>
        <h2 style="text-align: center;">Curso Técnico de Desenvolvimento de Sistemas</h2>
        <table class="materias">
          <tr>
            <th>Matéria</th>
            <th>Nota</th>
          </tr>`;

  materias.forEach((materia) => {
    conteudoHTML += `
          <tr>
            <td>${materia.nome}</td>
            <td>${materia.nota}</td>
          </tr>`;
  });

  conteudoHTML += `
        </table>
      </body>
    </html>`;

  return conteudoHTML;
}

// Criar o PDF
pdf.create(gerarBoletim(), {}).toFile("./boletim.pdf", (err, res) => {
  if (err) {
    console.log("UM ERRO ACONTECEU: (", err);
  } else {
    console.log("PDF gerado com sucesso:", res);
  }
});
