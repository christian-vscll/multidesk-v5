export const funcOfxXls = async (file) => {
  const arquivoLido = await lerOfxXls(file);
  // console.log(arquivoLido);
  const arquivoTransformado = transformOfxXls(arquivoLido);
  // console.log(arquivoTransformado);
  return (arquivoTransformado);
};

const lerOfxXls = async (file) => {
  // console.log('Entrou lerOfxXls');
  const text = await (new Response(file)).text(); //Declara como objeto e transforma em .text para ler
  // console.log(text);
  let cont = 0; let linha = []; let arrayChar = []; //Contador de caracteres, Array de linhas do arquivo, Array de caracteres auxiliar
  for (const char of text) { //Percorre o texto inteiro letra a letra
    // console.log(char.charCodeAt(0), char);
    cont += 1; //Incrementa o contador de caracteres
    if (char.charCodeAt(0) !== 10 && char.charCodeAt(0) !== 13) arrayChar.push(char); //Se caracter !== '\n' e '\r', adiciona ao array auxiliar
    if (cont === text.length) linha.push(arrayChar.join('')); //Se fim do arquivo, adiciona o array auxiliar ao array de linhas do arquivo
    if (char.charCodeAt(0) === 10 || char.charCodeAt(0) === 13) {//Se fim da linha (caracter === '\n' ou '\r')
      linha.push(arrayChar.join(''));//Adiciona array auxiliar ao array de linhas do arquivo
      arrayChar = [];//Limpa array auxiliar
    }
    // console.log(arrayChar);
    // console.log(linha);
  }
  const arquivo = linha.filter((elem) => elem !== '');//Filtra elementos não vazios e adiciona ao array final do arquivo
  // console.log(arquivo);
  return arquivo;
};

const getBanco = (linha) => {
  let toReturn;
  if(linha.includes('001')) toReturn = '001';
  else if(linha.includes('0341')) toReturn = '0341';
  else if(linha.includes('033')) toReturn = '033';
  else if(linha.includes('0237')) toReturn = '0237';
  else toReturn = linha.substring(8,linha.length-9);
  return toReturn;
};

const getData = (codBanco, linha) => {
  let toReturn;
  if(codBanco === '001') toReturn = `${linha.substring(19,21)}/${linha.substring(17,19)}/${linha.substring(13,17)}`;
  else if(codBanco === '033') toReturn = `${linha.substring(40,42)}/${linha.substring(38,40)}/${linha.substring(34,38)}`;
  else toReturn = `${linha.substring(16,18)}/${linha.substring(14,16)}/${linha.substring(10,14)}`;
  return toReturn;
};

const getValor = (codBanco, linha) => {
  let toReturn;
  if(codBanco === '077' || codBanco === '0260' || codBanco === '756' || codBanco === '218') toReturn = linha.substring(8,linha.length-9);
  else if(codBanco === '001') toReturn = linha.substring(11,linha.length-1);
  else if(codBanco === '033') toReturn = linha.substring(32,linha.length);
  else toReturn = linha.substring(8,linha.length);
  toReturn.includes(',') && (toReturn = toReturn.replace(',', '.'));
  // console.log(toReturn);
  return toReturn;
};

const getHist = (codBanco, linha) => {
  let toReturn;
  if(codBanco === '077' || codBanco === '0260' || codBanco === '756' || codBanco === '218') toReturn = linha.substring(6,linha.length-7);
  else if(codBanco === '001') toReturn = linha.substring(9,34);
  else if(codBanco === '033') toReturn = linha.substring(30,linha.length);
  else toReturn = linha.substring(6,linha.length);
  return toReturn;
};

const transformOfxXls = (file) => {
  let data; let valor; let historico;
  let codBanco; let tabela = false; let tranBank;
  let arquivo = [];
  // console.log('Entrou transformOfxXls');
  
  const cabecalho = ['DATA', 'HISTORICO', 'VALOR'];//Declara cabeçalho
  arquivo.push(cabecalho);//Adiciona ao início do arquivo
  
  let contadorLinha = 0;
  for (const linha of file) {//Percorre o arquivo linha a linha
    contadorLinha += 1;
    // console.log(contadorLinha, linha);

    //Código do banco
    if(linha.includes('<BANKID>')) codBanco = getBanco(linha);
    if(linha.includes('<FID>')) {
      if(linha.includes('001')) codBanco = '001';
      else codBanco = linha.substring(5,linha.length-6);
    }

    if(linha.includes('<BANKTRANLIST>')) tabela = true;//Determina o início da lista de transações
    if(linha.includes('</BANKTRANLIST>')) tabela = false;//Determina o fim da lista de transações
    
    if(tabela === true) {//Se estiver dentro da lista de transações
      if(linha.includes('<STMTTRN>')) tranBank = true;//Determina o início de uma transação bancária
      if(linha.includes('</STMTTRN>')) tranBank = false;//Determina o fim de uma transação bancária

      if(tranBank === true) {//Se estiver dentro de uma transação
        //↓↓↓↓↓ DATA ↓↓↓↓↓
        if(linha.includes('DTPOSTED')) data = String(getData(codBanco, linha));
        //↓↓↓↓↓ VALOR ↓↓↓↓↓
        else if(linha.includes('TRNAMT')) valor = Number(getValor(codBanco, linha));
        //↓↓↓↓↓ HISTORICO ↓↓↓↓↓
        else if(linha.includes('MEMO')) historico = String(getHist(codBanco, linha));
      }
      else if(tranBank === false) {
        console.log(`--- Linha ${contadorLinha} ---`);
        console.log(`Data: ${data}`);
        console.log(`Valor: ${valor}`);
        console.log(`Historico: ${historico}`);
        console.log('');
        
        const transaçao = [data, historico, valor];//Declara cabeçalho
        arquivo.push(transaçao);//Adiciona ao início do arquivo
        data = ''; valor = ''; historico = '';
      }
    }
  }

  return arquivo;
};