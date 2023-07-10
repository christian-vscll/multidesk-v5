const express = require('express');
const cors = require('cors');
// const fetch = require('node-fetch');
const fs = require('fs');
const request = require("request");
const AES256 = require('aes-everywhere');

const app = express();
app.use(cors());

const PORT = 3001;

app.listen(PORT, () => console.log('Server online na porta ', PORT));

app.get('/check', async (_req, res) => res.send('Tudo certo, server funcionando.'));

app.post('/pgto-ecac', async (_req, res) => {
  const args = {
    pkcs12_cert: AES256.encrypt(Buffer.from(fs.readFileSync("AMV senha 0112358.pfx")).toString("base64"), 'KM2wFAJVip01kGgCYNlwOsAsy97iQo_1dsQSFD14'),
    pkcs12_pass: AES256.encrypt("0112358", "KM2wFAJVip01kGgCYNlwOsAsy97iQo_1dsQSFD14"),
    perfil_procurador_cnpj: "",
    data_inicio: "2023-01-01",
    data_fim: "",
    documento_numero: "",
    token: "wnjho-hliXdbamLxh2DxUWoKhQHF5M6EFbxx2d3E",
    timeout: 300,
  };
  
  const options = {
    method: 'POST',
    url: 'https://api.infosimples.com/api/v2/consultas/ecac/comprovante-pagamento',
    form: args
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
})
