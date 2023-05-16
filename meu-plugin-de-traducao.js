$(document).ready(function() {
  var json = {
    "pt": {
      "TITULO_CONSULTOR": "INTERCÂMBIO NO EXTERIOR",
      "FALE_CONSULTOR": "Fale com o nosso time de especialistas <b>online</b> para todo o Brasil! Para receber seu <b>ORÇAMENTO!</b>"
    },
    "en": {
      "TITULO_CONSULTOR": "STUDY ABROAD",
      "FALE_CONSULTOR": "Now talk to our team of <b>online</b> specialists throughout Brazil! To receive your <b>BUDGET!</b>"
    },
    "es": {
      "TITULO_CONSULTOR": "INTERCAMBIO EN EL EXTRANJERO",
      "FALE_CONSULTOR": "¡Hable ahora con nuestro equipo de especialistas <b>en línea</b> en todo Brasil! ¡Para recibir su <b>PRESUPUESTO!</b>"
    }
  };

  function validarCampoVazio(campo) {
    return campo.trim() !== "";
  }

  function gerarLinhasChaves() {
    var tabelaChaves = $("#chavesTable tbody");
    tabelaChaves.empty();
    $.each(json.pt, function(chave, valor) {
      var linha = "<tr>" +
        "<td>" + chave + "</td>" +
        "<td><input type='text' class='valor' data-chave='" + chave + "' value='" + valor + "'></td>" +
        "</tr>";

      tabelaChaves.append(linha);
    });
  }

  function gerarLinhasTabela(id, data) {
    var tabela = $("#" + id + "Table tbody");
    tabela.empty();
    $.each(data, function(chave, valor) {
      var linha = "<tr>" +
        "<td>" + chave + "</td>" +
        "<td><input type='text' class='valor' data-chave='" + chave + "' value='" + valor + "'></td>" +
        "</tr>";

      tabela.append(linha);
    });
  }

  function adicionarLinhasVazias(id, idioma) {
    var tabela = $("#" + id + "Table tbody");
    $.each(json.pt, function(chave) {
      var linha = "<tr>" +
        "<td>" + chave + "</td>" +
        "<td><input type='text' class='valor' data-chave='" + chave + "'></td>" +
        "</tr>";

      tabela.append(linha);
    });
  }

  gerarLinhasChaves();
  gerarLinhasTabela("portugues", json.pt);
  gerarLinhasTabela("ingles", json.en);
  gerarLinhasTabela("espanhol", json.es);

  $("#adicionarChave").click(function() {
    var novaChave = $("#novaChave").val();
    if (validarCampoVazio(novaChave)) {
      $.each(json, function(idioma, traducoes) {
        traducoes[novaChave] = "";
        gerarLinhasTabela(idioma.toLowerCase(), traducoes);
      });

      gerarLinhasChaves();
    }
  });

  $("#adicionarIdioma").click(function() {
    var novoIdioma= $("#novoIdioma").val();
    if (validarCampoVazio(novoIdioma)) {
    json[novoIdioma.toLowerCase()] = {};
  // Gerar linhas da tabela para o novo idioma
  gerarLinhasTabela(novoIdioma.toLowerCase(), json.pt);

  // Adicionar linhas vazias para as chaves existentes
  adicionarLinhasVazias(novoIdioma.toLowerCase(), novoIdioma);
}
});

$("#salvar").click(function() {
$(".valor").each(function() {
var chave = $(this).data("chave");
var valor = $(this).val();
var idioma = $(this).closest("table").attr("id");
if (validarCampoVazio(chave) && validarCampoVazio(valor)) {
json[idioma][chave] = valor;
}
});
console.log(json);
});

// Inicializar o DataTable
$('#chavesTable').DataTable();

// Abrir o modal de pesquisa
$("#pesquisarChave").click(function() {
$("#searchModal").modal("show");
});

// Pesquisar pela chave no modal
$("#searchModal").on("shown.bs.modal", function() {
$('#searchInput').focus();
});

$("#searchInput").keyup(function() {
var searchTerm = $(this).val();
$('#searchModalTable').DataTable().search(searchTerm).draw();
});
});