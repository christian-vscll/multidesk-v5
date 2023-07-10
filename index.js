const request = require("request");
const fs = require("fs");
const AES256 = require('aes-everywhere');

const args = {
  pkcs12_cert: AES256.encrypt(Buffer.from(fs.readFileSync("AMV senha 0112358.pfx")).toString("base64"), "INFORME_A_CHAVE_DE_CRIPTOGRAFIA"),
  pkcs12_pass: AES256.encrypt("SENHA_DO_CERTIFICADO", "INFORME_A_CHAVE_DE_CRIPTOGRAFIA"),
  perfil_procurador_cnpj: "VALOR_DO_PARAMETRO_PERFIL_PROCURADOR_CNPJ",
  data_inicio: "VALOR_DO_PARAMETRO_DATA_INICIO",
  data_fim: "VALOR_DO_PARAMETRO_DATA_FIM",
  documento_numero: "VALOR_DO_PARAMETRO_DOCUMENTO_NUMERO",
  token: "INFORME_AQUI_O_TOKEN_DA_CHAVE_DE_ACESSO",
  timeout: 300,
};

const options = {
  method: 'POST',
  url:    'https://api.infosimples.com/api/v2/consultas/ecac/comprovante-pagamento',
  form:   args
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  parseResponse(JSON.parse(body));
});

function parseResponse(response) {
  if (response.code == 200) {
    console.log(`Retorno com sucesso: ${response.data}`);
  } else if (response.code >= 600 && response.code <= 799) {
    let mensagem = "Resultado sem sucesso. Leia para saber mais:\n";
    mensagem += `Código: ${response['code']} (${response['code_message']})\n`;
    if (response.errors) mensagem += response.errors.join("; ");
    console.log(mensagem);
  }

  console.log(`Cabeçalho da consulta: ${response.header}`);
  console.log(`URLs com arquivos de visualização (HTML/PDF): ${response.site_receipts}`);
}