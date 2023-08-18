const express = require('express');
const cors = require('cors');
const fs = require('fs');
const request = require("request");
const AES256 = require('aes-everywhere');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => console.log('Server online na porta ', PORT));

app.get('/check', async (_, res) => res.send('Tudo certo, server funcionando.'));

app.post('/pgto-ecac', (req, res) => {
  // console.log('req.params', req.params);
  const { certificado, senha, cnpj, dataI, dataF } = req.body
  const args = {
    pkcs12_cert: AES256.encrypt(certificado, "KM2wFAJVip01kGgCYNlwOsAsy97iQo_1dsQSFD14"),
    pkcs12_pass: AES256.encrypt(senha, "KM2wFAJVip01kGgCYNlwOsAsy97iQo_1dsQSFD14"),
    perfil_procurador_cnpj: cnpj,
    data_inicio: dataI,
    data_fim: dataF,
    documento_numero: "",
    token: "wnjho-hliXdbamLxh2DxUWoKhQHF5M6EFbxx2d3E",
    timeout: 300
  };
  
  const options = {
    method: 'POST',
    url: 'https://api.infosimples.com/api/v2/consultas/ecac/comprovante-pagamento',
    form: args
  };
  
  console.log('Iniciando request');
  request(options, function (error, _, body) {
    if (error) {
      console.log('Requisição concluída com erros');
      return res.status(400).send(error)
    }
    const response = JSON.parse(body)

    if (response.code > 200) {
      console.log('Requisição concluída com erros', response);
      return res.status(response.code).send(response)
    }
  
    // parseResponse(response);
    console.log('Requisição concluída com sucesso');
    console.log(response);
    return res.send(response)
  });
})

app.post('/consulta-cnpj', (_req, res) => {
  const args = {
    cnpj: "24081779000185",
    origem: "",
    token: "wnjho-hliXdbamLxh2DxUWoKhQHF5M6EFbxx2d3E",
    timeout: 300
  };

  const options = {
    method: 'POST',
    url:    'https://api.infosimples.com/api/v2/consultas/receita-federal/cnpj',
    form:   args
  };

  console.log('Iniciando request');
  request(options, function (error, _, body) {
    if (error) {
      console.log('Requisição concluída com erros');
      return res.send(error)
    }
    const response = JSON.parse(body)
  
    console.log('Requisição concluída com sucesso');
    return res.send(response)
  });
})