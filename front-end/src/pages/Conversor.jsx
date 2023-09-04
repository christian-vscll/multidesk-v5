import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { funcOfxXls } from '../helpers/Funcoes'
import Excel from 'exceljs'
import * as FileSaver from 'file-saver'
import '../App.css'
import Menu from '../components/Menu'
import { getDatabase, ref, get, child } from 'firebase/database'
import arrow from '../icons/arrow.gif'
import { getApiPgtoEcac } from '../helpers/Reqs'
import { Buffer } from "buffer";

function Conversor() {
  const { conversorForm, setConversorForm } = useContext(AppContext)
  
  const [convertedFiles, setConvertedFiles] = useState([])
  const [saldo, setSaldo] = useState([])
  const [check, setCheck] = useState(false)
  const [classify, setClassify] = useState({ check: false, escritorio: '', empresa: '', banco: '' })
  // const [classify, setClassify] = useState({ check: false, escritorio: 'lm', empresa: '23', banco: 'itau' })
  const [db, setDb] = useState()
  const [classificado, setClassificado] = useState()
  const [loading, setLoading] = useState(false)
  const [pgtoEcacState, setPgtoEcacState] = useState(false)
  const [searchParams, setSearchParams] = useState({
    certificado: "",
    senhaCertificado: "",
    cnpj: "",
    dataInicial: "2023-01-01",
    dataFinal: "",
  })
  const [dataPgtoEcac, setDataPgtoEcac] = useState()
  
  useEffect(() => {
    if (loading) document.body.style.cursor = "wait"
    else document.body.style.cursor = ""
  }, [loading, convertedFiles, classify, classificado])

  const getDb = async () => {
    setLoading(true)
    const dbRef = ref(getDatabase())
    const response = await get(child(dbRef, '0'))
      .then((e) => e.val())
      .catch((erro) => ({ message: erro.message }))

    if (response.error) console.error(response)
    else setDb(response)
    setLoading(false)
    // console.log(escritorio, empresa, banco);
  }

  const handleUnifyFiles = (files) => {
    let newFile = [['DATA', 'HISTORICO', 'VALOR']]
    for (const file of files) {
      for (let i = 1; i < file.content.length; i++) newFile.push(file.content[i])
    }
    return [{ name: '', content: newFile }]
  }

  //! Função do form que lê o OFX e adiciona os dados no context
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (conversorForm.files === null) alert('Selecione o arquivo')
    else {
      let newFiles = []
      for (const file of conversorForm.files) {
        //Percorre os arquivos
        const newFile = { name: file.name, content: await funcOfxXls(file) }
        newFiles.push(newFile)
      }

      if (check) newFiles = handleUnifyFiles(newFiles)
      setConvertedFiles(newFiles)
    }
  }

  //! Função que transforma o arquivo pra XLS e baixa
  const download = async ({ name, content }) => {
    const sliceName = name ? name.split('.') : 'planilha.ofx'.split('.')
    const ext = ['pdf','ofx','xls','xlsx','csv','txt','PDF','OFX','XLS','XLSX','XLSX','CSV','CSV']
    const justName = sliceName.length === 1
      ? sliceName[0]
      : !ext.includes(sliceName[sliceName.length-1])
        ? sliceName.join('.')
        : sliceName.slice(0, sliceName.length - 1).join('.')

    const wb = new Excel.Workbook()
    const ws = wb.addWorksheet('My Sheet')
    for (const linha of content) ws.addRow(linha)
    ws.getColumn('A').numFmt = 'dd/mm/yyyy'
    wb.xlsx.writeBuffer().then((data) => {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const blob = new Blob([data], { type: fileType })
      FileSaver.saveAs(blob, `${justName}_convertido.xlsx`)
    })
  }

  //! Função para baixar todos de uma vez
  const downloadAll = () => convertedFiles.forEach((file) => download(file))

  const getLastDay = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const handleDate = (date) => {
    const date2 = date.split('/')
    return new Date(date2[1] + '-' + date2[0] + '-' + date2[2])
  }
  const funcSaldos = () => {
    convertedFiles.forEach((_file, index) => {
      const actualFileIndex = index
      const saldoI = saldo[actualFileIndex].saldoI.length === 0 ? 0 : parseFloat(saldo[actualFileIndex].saldoI)
      let soma1 = 0
      let soma2 = 0
      let soma3 = 0
      let soma4 = 0

      const aux2 = convertedFiles[actualFileIndex].content
      for (let i = 1; i < aux2.length; i++) {
        const mesAno = aux2[i][0].slice(3, 10)

        if (handleDate(aux2[i][0]) >= handleDate('01/' + mesAno) && handleDate(aux2[i][0]) <= handleDate('07/' + mesAno)) {
          if (aux2[i][2].length !== 0) soma1 = soma1 + parseFloat(aux2[i][2])
        } else if (handleDate(aux2[i][0]) >= handleDate('08/' + mesAno) && handleDate(aux2[i][0]) <= handleDate('14/' + mesAno)) {
          if (aux2[i][2].length !== 0) soma2 = soma2 + parseFloat(aux2[i][2])
        } else if (handleDate(aux2[i][0]) >= handleDate('15/' + mesAno) && handleDate(aux2[i][0]) <= handleDate('21/' + mesAno)) {
          if (aux2[i][2].length !== 0) soma3 = soma3 + parseFloat(aux2[i][2])
        } else if (handleDate(aux2[i][0]) >= handleDate('22/' + mesAno) && handleDate(aux2[i][0]) <= getLastDay(handleDate('23/' + mesAno))) {
          if (aux2[i][2].length !== 0) soma4 = soma4 + parseFloat(aux2[i][2])
        }
      }
      const saldoF =
        parseFloat(saldoI.toFixed(2)) +
        parseFloat(soma1.toFixed(2)) +
        parseFloat(soma2.toFixed(2)) +
        parseFloat(soma3.toFixed(2)) +
        parseFloat(soma4.toFixed(2))
      const aux3 = { saldoI, soma1, soma2, soma3, soma4, saldoF }
      // console.log(JSON.stringify(aux3) !== JSON.stringify(saldo));
      if (JSON.stringify(aux3) !== JSON.stringify(saldo[actualFileIndex])) {
        const aux4 = [...saldo]
        aux4[actualFileIndex] = aux3
        setSaldo(aux4)
      }
    })
  }

  const setContent = (index, newContent) => {
    const updatedFiles = [...convertedFiles] // Faz uma cópia dos arquivos existentes
    updatedFiles[index].content = newContent // Modifica o conteúdo do arquivo desejado
    setConvertedFiles(updatedFiles) // Atualiza o estado com os arquivos modificados
  }

  const order = ({ innerText }, index) => {
    let aux = convertedFiles[index].content.slice(1, convertedFiles[index].content.length)
    if (innerText === 'DATA') aux = aux.sort((a, b) => handleDate(a[0]) - handleDate(b[0]))
    if (innerText === 'HISTORICO')
      aux = aux.sort((a, b) => {
        if (a[1] < b[1]) return -1
        if (a[1] > b[1]) return 1
        return 0
      })
    if (innerText === 'VALOR')
      aux = aux.sort((a, b) => {
        if (a[2] < b[2]) return -1
        if (a[2] > b[2]) return 1
        return 0
      })
    setContent(index, [['DATA', 'HISTORICO', 'VALOR'], ...aux])
    funcSaldos()
  }

  const order2 = (value) => {
    let aux = classificado.slice(1, classificado.length)
    if (value === 'DATA') aux = aux.sort((a, b) => handleDate(a[0]) - handleDate(b[0]))
    if (value === 'HISTORICO')
      aux = aux.sort((a, b) => {
        if (a[1] < b[1]) return -1
        if (a[1] > b[1]) return 1
        return 0
      })
    if (value === 'VALOR')
      aux = aux.sort((a, b) => {
        if (a[2] < b[2]) return -1
        if (a[2] > b[2]) return 1
        return 0
      })
    if (value === 'CD')
      aux = aux.sort((a, b) => {
        if (a[3] < b[3]) return -1
        if (a[3] > b[3]) return 1
        return 0
      })
    if (value === 'CC')
      aux = aux.sort((a, b) => {
        if (a[4] < b[4]) return -1
        if (a[4] > b[4]) return 1
        return 0
      })
    setClassificado([classificado[0], ...aux])
  }

  const confirmCancel = () => {
    const bt = document.createElement('button')
    bt.innerText = 'Confirmar'
    bt.classList.add('convClass-downloadAll')
    bt.classList.add('cancelClassify')
    bt.addEventListener('click', () => {
      setConvertedFiles([])
      setSaldo([])
      setCheck(false)
      setClassify({ check: false, escritorio: '', empresa: '', banco: '' })
      setDb()
      setClassificado()
    })
    document.getElementById('convClass-endBt').appendChild(bt)
  }

  const verDetalhes = () => {
    const bt = document.createElement('button')
    bt.innerText = 'Detalhes do layout'
    bt.classList.add('convClass-downloadAll')
    bt.classList.add('downloadClassify')
    bt.addEventListener('click', () => {
      let valorAux = 0
      const linhas = classificado.length -1
      classificado.forEach(linha => {
        if (typeof linha[2] === 'number') valorAux += linha[2] < 0 ? linha[2] *-1 : linha[2]
      })
      const valorTotal = valorAux.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      alert(`Valor total no débito/crédito: R$${valorTotal}\nQuantidade de linhas: ${linhas}`)
    })
    document.getElementById('convClass-detalheLayout').appendChild(bt)
  }

  const layoutDownload = () => {
    const data = classificado
      .slice(1, classificado.length + 1)
      .map((linha) => {
        if (classify.escritorio.toLowerCase().includes('liberty')) {
          return [
            linha[0].slice(0, 2) + linha[0].slice(3, 5),
            ('000000' + linha[3]).slice(-6),
            ('000000' + linha[4]).slice(-6),
            '',
            linha[1],
            linha[2].toString().replace('.', ',').replace('-', ''),
          ].join(';')
        }
        if (classify.escritorio.toLowerCase().includes('lm')) {
          return [
            linha[0],
            linha[3],
            linha[4],
            '247',
            linha[2].toString().replace('.', ',').replace('-', ''),
            linha[2].toString().replace('.', ',').replace('-', ''),
            linha[1],
          ].join(';')
        } else return 'Escritorio não configurado'
      })
      .join('\r\n')

    if (data === 'Escritorio não configurado') return console.error('Escritório não configurado')
    else {
      const csvData = new Blob([data], { type: 'text/csv;charset=utf-8;' })
      FileSaver.saveAs(csvData, `importar ${convertedFiles[0].name} classificado.csv`)
    }

  }

  const changePosition = (arr, from, to) => {
    arr.splice(to, 0, arr.splice(from, 1)[0])
    return arr
  }

  const verifyClassify = () => {
    const escritorio = classify.escritorio
    const empresa = classify.empresa
    const banco = classify.banco
    const aux = classify

    if (escritorio)
      if (!db.dados[escritorio]) {
        aux.banco = ''
        aux.empresa = ''
        aux.escritorio = ''
      }
    if (empresa)
      if (!db.dados[escritorio].empresas[empresa]) {
        aux.banco = ''
        aux.empresa = ''
      }
    if (banco) if (!db.dados[escritorio].empresas[empresa].classify[banco]) aux.banco = ''

    if (JSON.stringify(aux) !== JSON.stringify(classify)) setClassify(aux)
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const handleDataPgtoEcac = () => {
    if (dataPgtoEcac) {
      dataPgtoEcac.forEach(pgto => {
        const data = pgto.arrecadacao
        const historico = `ECAC - Cod DARF ${pgto.codigo_receita} ref ${pgto.apuracao.slice(3)}`
        const valor = parseFloat(pgto.valor_total.replace(".", "").replace(",", "."))
        classificado.push([data, historico, valor, '', '5'])
      })
      setDataPgtoEcac()
      setLoading(false)
    }
  }

  const headerContent = () => (
    <div className="convClass-mainContainer">
      {
        pgtoEcacState && (
          <div>
            <header className="pgtoEcac-header">
              <span className="pgtoEcac-paramTitle">Parâmetros de consulta</span>
              <form
                className="pgtoEcac-paramGroupContainer"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true)
                  const certificado = await toBase64(searchParams.certificado)
                  const obj = {
                    certificado: Buffer.from(certificado).toString('base64'),
                    senha: searchParams.senhaCertificado,
                    cnpj: searchParams.cnpj,
                    dataI: searchParams.dataInicial,
                    dataF: searchParams.dataFinal,
                  }

                  const res = await getApiPgtoEcac(obj)
                  if (typeof res === 'object') {
                    console.log(res);
                    setDataPgtoEcac(res.documentos)
                  }
                  setPgtoEcacState(false)
                }}
              >
                <div>
                  <div className="pgtoEcac-paramGroup">
                    <label htmlFor="formCertificado" className="pgtoEcac-paramLabel">
                      Certificado
                    </label>
                    <input
                      type="file"
                      required
                      className="pgtoEcac-input certify-input"
                      id="formCertificado"
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          certificado: e.target.files[0],
                        })
                      }
                    />
                  </div>
                  <div className="pgtoEcac-paramGroup">
                    <label
                      htmlFor="formSenhaCertificado"
                      className="pgtoEcac-paramLabel"
                    >
                      Senha do certificado
                    </label>
                    <input
                      type="text"
                      required
                      id="formSenhaCertificado"
                      className="pgtoEcac-input senha-input"
                      value={searchParams.senhaCertificado}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          senhaCertificado: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pgtoEcac-paramGroup">
                    <label htmlFor="formCnpj" className="pgtoEcac-paramLabel">
                      CNPJ
                    </label>
                    <input
                      type="text"
                      className="pgtoEcac-input cnpj-input"
                      id="formCnpj"
                      value={searchParams.cnpj}
                      onChange={(e) =>
                        setSearchParams({ ...searchParams, cnpj: e.target.value })
                      }
                    />
                  </div>
                  <div className="pgtoEcac-paramGroup">
                    <label
                      htmlFor="formDataInicial"
                      className="pgtoEcac-paramLabel initDate-label"
                    >
                      Data inicial
                    </label>
                    <input
                      type="date"
                      className="pgtoEcac-input initDate-input"
                      id="formDataInicial"
                      value={searchParams.dataInicial}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          dataInicial: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pgtoEcac-paramGroup">
                    <label
                      htmlFor="formDataFinal"
                      className="pgtoEcac-paramLabel endDate-label"
                    >
                      Data final
                    </label>
                    <input
                      type="date"
                      className="pgtoEcac-input endDate-input"
                      id="formDataFinal"
                      value={searchParams.dataFinal}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          dataFinal: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="pgtoEcac-paramGroupBtns">
                  <button type="reset" onClick={() => setSearchParams({
                    certificado: "",
                    senhaCertificado: "",
                    cnpj: "",
                    dataInicial: "2023-01-01",
                    dataFinal: "",
                  })}>
                    Limpar
                  </button>
                  <button type="submit" autoFocus={true}>
                    Enviar
                  </button>
                </div>
              </form>
            </header>
          </div>
        )
      }
      {classificado !== undefined ? (
        <div className="convClass-tabelaClassificadoContainer">
          {classificado.map((linhaTabela, indexLinha) =>
            indexLinha === 0 ? (
              <div className="convClass-classificadoHeader">
                {linhaTabela.map((campoTabela) => (
                  <span onClick={({ target }) => order2(target.innerText)}>{campoTabela}</span>
                ))}
              </div>
            ) : (
              <div className="convClass-classificadoLinha">
                {linhaTabela.map((campoTabela, indexCampTabela) => (
                  <input
                    type="text"
                    value={campoTabela}
                    onChange={({ target }) => {
                      const newValue = classificado
                      newValue[indexLinha][indexCampTabela] = target.value
                      setClassificado(newValue)
                      setSaldo({ ...saldo, saldoI: saldo.saldoI + 1 })
                      funcSaldos()
                    }}
                  />
                ))}
                {
                  <div className="convClass-subDivBtns">
                    <button
                      className="convClass-table tableExcluir"
                      onClick={() => {
                        const newData = classificado.filter((e, index) => index !== indexLinha && e)
                        setClassificado(newData)
                      }}
                    >
                      <div className="convClass-tableIcon1" />
                      <div className="convClass-tableIcon2" />
                    </button>
                    <button
                      className="convClass-table tableAdd"
                      onClick={() => {
                        let newData = []
                        for (let i = 0; i < classificado.length; i++) {
                          if (i === indexLinha) {
                            newData.push(['', '', 0, '', ''])
                            newData.push(classificado[i])
                          } else newData.push(classificado[i])
                        }
                        setClassificado(newData)
                      }}
                    >
                      <div className="convClass-tableIcon3" />
                      <div className="convClass-tableIcon4" />
                    </button>
                  </div>
                }
              </div>
            )
          )}
          <div id="convClass-endBt" className="convClass-endButtonsContainer endButtonsClassify">
            <button className="convClass-downloadAll cancelClassify" onClick={() => setPgtoEcacState(true)}>
              Pgto ECAC
            </button>
            <button
              className="convClass-downloadAll downloadClassify"
              onClick={() => download({ name: convertedFiles[0].name, content: classificado })}
            >
              Baixar planilha
            </button>
            <button className="convClass-downloadAll downloadClassify" onClick={() => {
              layoutDownload()
              verDetalhes()
            }}>
              Baixar para o layout
            </button>
            <div id='convClass-detalheLayout'/>
            <button className="convClass-downloadAll cancelClassify" onClick={() => confirmCancel()}>
              Cancelar
            </button>
          </div>
        </div>
      ) : //! Array de arquivos pra converter não contém nada?? ↓↓↓↓
      convertedFiles.length === 0 ? (
        <form className="convClass-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <span className="convClass-formTitle">Conversor e Classificador</span>
          <label
            className="convClass-inputFiles"
            htmlFor="form-file"
            onChange={({ target }) => setConversorForm({ ...conversorForm, files: target.files })}
          >
            - Faça o upload dos arquivos -
            <input type="file" id="form-file" accept=".ofx, .xlsx, .xls" multiple style={{ display: 'none' }} />
          </label>

          <div className="convClass-filesGroup">
            <div className="convClass-fileNames">
              {conversorForm.files !== null &&
                convertedFiles.length === 0 &&
                Object.values(conversorForm.files).map((file, index) => (
                  <span key={index}>
                    {index + 1}º → {file.name}
                  </span>
                ))}
            </div>

            <input id="submitButton" type="submit" value="Converter" />
          </div>

          {conversorForm.files && conversorForm.files.length > 1 && (
            <div className="convClass-filesMerge">
              <input type="checkbox" checked={check} onChange={() => setCheck(!check)} />
              <label onClick={() => setCheck(!check)}>Unificar arquivos</label>
            </div>
          )}
        </form>
      ) : (
        convertedFiles.map((file, index) => {
          const actualFileIndex = index
          if (saldo[actualFileIndex] === undefined) saldo[actualFileIndex] = { saldoI: 0, soma1: 0, soma2: 0, soma3: 0, soma4: 0, saldoF: 0 }

          return (
            <div className="convClass-fileContainerGroup" key={index}>
              <div className="convClass-fileContainer">
                <div className="convClass-fileHeader">
                  {check ? (
                    <div className="convClass-fileName">
                      <label>Nome:</label>
                      <input
                        type="text"
                        id="convClass-fileName"
                        value={convertedFiles[0].name}
                        placeholder="Nome do arquivo"
                        onChange={({ target }) => {
                          const aux = [...convertedFiles]
                          // if (convertedFiles[0].name)
                          aux[0].name = target.value
                          setConvertedFiles(aux)
                        }}
                      />
                    </div>
                  ) : (
                    <h3>{file.name}</h3>
                  )}
                  <div>
                    <button
                      className="convClass-table tableExcluir conv-class-file-name"
                      onClick={() => {
                        const newConvertedFiles = convertedFiles.filter((elem, index) => index !== actualFileIndex && elem)
                        const newSaldo = saldo.filter((elem, index) => index !== actualFileIndex && elem)
                        setConvertedFiles(newConvertedFiles)
                        setSaldo(newSaldo)
                      }}
                    >
                      <div className="convClass-tableIcon1" />
                      <div className="convClass-tableIcon2" />
                    </button>
                    <label
                      htmlFor="form-file"
                      onChange={async ({ target }) => {
                        let aux = convertedFiles
                        for (const file of target.files) {
                          const newFile = { name: file.name, content: await funcOfxXls(file) }
                          aux.splice(actualFileIndex, 0, newFile)
                        }
                        setConvertedFiles(aux)
                        funcSaldos()
                      }}
                    >
                      <input
                        type="file"
                        id="form-file"
                        accept=".ofx, .xlsx, .xls"
                        multiple
                        style={{ display: 'none' }}
                        className="convClass-table tableAdd"
                      />
                      <div className="convClass-tableIcon3" />
                      <div className="convClass-tableIcon4" />
                    </label>
                  </div>
                </div>
                <div className="convClass-divSaldo">
                  <label className="convClass-labelSaldoI" htmlFor="convClass-inputSaldoI">
                    Saldo inicial:
                    <input
                      type="number"
                      className="convClass-inputSaldoI"
                      value={saldo[actualFileIndex].saldoI}
                      onChange={({ target }) => {
                        saldo[actualFileIndex].saldoI = target.value
                        funcSaldos()
                      }}
                    />
                  </label>
                  <label className="convClass-labelSaldoI" htmlFor="convClass-inputSaldoI">
                    Posição:
                    <input
                      type="number"
                      className="convClass-inputSaldoI"
                      value={actualFileIndex + 1}
                      onChange={({ target }) => {
                        const newPos = changePosition(convertedFiles, actualFileIndex, target.value - 1)
                        setConvertedFiles(newPos)
                        funcSaldos()
                      }}
                    />
                  </label>
                </div>

                {file.content.map((_linha, index) => {
                  const data = convertedFiles[actualFileIndex].content[index][0]
                  const hist = convertedFiles[actualFileIndex].content[index][1]
                  const valor = convertedFiles[actualFileIndex].content[index][2]
                  let soma = 0
                  const saldoInicial = saldo[actualFileIndex].saldoI ? parseFloat(saldo[actualFileIndex].saldoI) : 0
                  for (let i = 1; i <= index; i++) {
                    if (i === 1) soma = soma + saldoInicial + parseFloat(convertedFiles[actualFileIndex].content[i][2])
                    else soma = soma + parseFloat(convertedFiles[actualFileIndex].content[i][2])
                  }

                  return index === 0 ? (
                    <div className="convClass-tableHeader" key={index}>
                      <h5 onClick={({ target }) => order(target, actualFileIndex)}>DATA</h5>
                      <h5 onClick={({ target }) => order(target, actualFileIndex)}>HISTORICO</h5>
                      <h5 onClick={({ target }) => order(target, actualFileIndex)}>VALOR</h5>
                      <h5>SOMA</h5>
                    </div>
                  ) : (
                    <div className="convClass-tableRow" key={index}>
                      <input
                        type="text"
                        className="convClass-table tableData"
                        value={data}
                        onChange={({ target }) => {
                          const aux = convertedFiles[actualFileIndex].content
                          aux[index][0] = target.value
                          setContent(actualFileIndex, aux)
                          funcSaldos()
                        }}
                      />
                      <textarea
                        className="convClass-table tableHist"
                        cols="30"
                        rows="10"
                        value={hist}
                        onChange={({ target }) => {
                          const aux = convertedFiles[actualFileIndex].content
                          aux[index][1] = target.value
                          setContent(actualFileIndex, aux)
                          funcSaldos()
                        }}
                      />
                      {/* <input
                        type="text"
                        className="convClass-table tableHist"
                        value={hist}
                        onChange={({ target }) => {
                          const aux = convertedFiles[actualFileIndex].content
                          aux[index][1] = target.value
                          setContent(actualFileIndex, aux)
                          funcSaldos()
                        }}
                      /> */}
                      <input
                        type="number"
                        className="convClass-table tableValor"
                        value={valor}
                        onChange={({ target }) => {
                          const aux = convertedFiles[actualFileIndex].content
                          aux[index][2] = target.value.replace(',', '.')
                          setContent(actualFileIndex, aux)
                          funcSaldos()
                        }}
                      />
                      <input
                        type="number"
                        className="convClass-table tableSoma"
                        disabled
                        value={
                          (convertedFiles[actualFileIndex].content[index + 1] === undefined ||
                            convertedFiles[actualFileIndex].content[index][0] !== convertedFiles[actualFileIndex].content[index + 1][0]) &&
                          parseFloat(soma.toFixed(2))
                        }
                      />
                      <button
                        className="convClass-table tableExcluir conv-class-table"
                        onClick={() => {
                          const aux = convertedFiles[actualFileIndex].content
                          aux.splice(index, 1)
                          setContent(actualFileIndex, aux)
                          funcSaldos()
                        }}
                      >
                        <div className="convClass-tableIcon1" />
                        <div className="convClass-tableIcon2" />
                      </button>
                      <button
                        className="convClass-table tableAdd"
                        onClick={() => {
                          const updatedFiles = [...convertedFiles] // Faz uma cópia dos arquivos existentes
                          updatedFiles[actualFileIndex].content.splice(index + 1, 0, ['', '', 0]) // Modifica o conteúdo do arquivo desejado
                          setConvertedFiles(updatedFiles)
                        }}
                      >
                        <div className="convClass-tableIcon3" />
                        <div className="convClass-tableIcon4" />
                      </button>
                    </div>
                  )
                })}
                <h4>Saldo Final: {parseFloat(saldo[actualFileIndex].saldoF.toFixed(2))}</h4>
              </div>
              <div className="convClass-endButtonsContainer">
                {check ? (
                  <>
                    <button
                      className="convClass-downloadAll"
                      onClick={() => {
                        const aux = convertedFiles[0].content.filter(
                          (linhaFile) => !linhaFile[1].toLowerCase().includes('sdo ') && !linhaFile[1].toLowerCase().includes('saldo')
                        )
                        setConvertedFiles([{ ...convertedFiles, content: aux }])
                      }}
                    >
                      Remover saldos
                    </button>
                    <button className="convClass-downloadAll" onClick={downloadAll}>
                      Baixar planilha
                    </button>
                    <label
                      className="convClass-classify"
                      onClick={async () => {
                        if (convertedFiles[0].name === '') alert('Defina um nome para o arquivo')
                        else {
                          await getDb()
                          setClassify({ ...classify, check: !classify.check })
                        }
                      }}
                    >
                      Classificação
                    </label>
                  </>
                ) : (
                  <>
                    <button className="convClass-downloadAll" onClick={() => download(convertedFiles[actualFileIndex])}>
                      Baixar planilha
                    </button>
                    {convertedFiles.length === 1 && setCheck(true)}
                    {actualFileIndex === convertedFiles.length - 1 && !check && (
                      <button
                        className="convClass-downloadAll"
                        onClick={() => {
                          const aux = handleUnifyFiles(convertedFiles)
                          setCheck(true)
                          setConvertedFiles(aux)
                        }}
                      >
                        Unificar planilhas
                      </button>
                    )}
                  </>
                )}
                {classify.check &&
                  db &&
                  (verifyClassify(),
                  (
                    <div className="convClass-selectsContainer">
                      <label htmlFor="convClass-selectEscritorio">
                        Selecione o escritório →
                        <select
                          id="convClass-selectEscritorio"
                          className="convClass-selects"
                          onChange={({ target }) => setClassify({ ...classify, escritorio: target.value })}
                        >
                          <option value="-">-</option>
                          {Object.keys(db.dados).map((es, i) => (
                            <option value={es}>{es.charAt(0).toUpperCase() + es.slice(1)}</option>
                          ))}
                        </select>
                      </label>
                      {classify.escritorio && (
                        <label htmlFor="convClass-selectEmpresa">
                          Selecione a empresa →
                          <select
                            id="convClass-selectEmpresa"
                            className="convClass-selects"
                            onChange={({ target }) => setClassify({ ...classify, empresa: target.value })}
                          >
                            <option value="-">-</option>
                            {Object.keys(db.dados[classify.escritorio].empresas).map((em, i) => (
                              <option value={em}>
                                {em} - {db.dados[classify.escritorio].empresas[em].name}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                      {classify.empresa && (
                        <label htmlFor="convClass-selectBanco">
                          Selecione o banco →
                          <select
                            id="convClass-selectBanco"
                            className="convClass-selects"
                            onChange={({ target }) => setClassify({ ...classify, banco: target.value })}
                          >
                            <option value="-">-</option>
                            {Object.keys(db.dados[classify.escritorio].empresas[classify.empresa].classify).map((ba, i) => (
                              <option value={ba}>{ba.charAt(0).toUpperCase() + ba.slice(1)}</option>
                            ))}
                          </select>
                        </label>
                      )}
                      {classify.banco && (
                        <button className="convClass-confirm" onClick={() => makeClassify()}>
                          Confirmar
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )

  const makeClassify = () => {
    const file = convertedFiles[0].content
    const aux = db.dados[classify.escritorio].empresas[classify.empresa].classify[classify.banco]
    const contaBanco = aux.conta
    const contasClassify = aux.linhas

    const newFile = file.map((fileLine, fileIndex) => {
      let cd = ''
      let cc = ''
      const hist = fileLine[1]
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
      const valor = fileLine[2].toString().includes('-') ? fileLine[2].toString() : '+' + fileLine[2].toString()
      if (fileIndex === 0) fileLine.push('CD', 'CC')
      else {
        Object.values(contasClassify).forEach((classifyDb) => {
          if (typeof classifyDb.contem === 'string') classifyDb.contem = classifyDb.contem.split(',')
          if (valor.includes(classifyDb.op) && classifyDb.contem.some((f) => hist.includes(f))) {
            if (classifyDb.op === '-') {
              cd = classifyDb.conta
              cc = contaBanco
            }
            if (classifyDb.op === '+') {
              cd = contaBanco
              cc = classifyDb.conta
            }
          }
        })
        if (cd === '' && cc === '') {
          if (valor.includes('+')) {
            cd = contaBanco
            cc = ''
          } else {
            cd = ''
            cc = contaBanco.toString()
          }
        }
        fileLine.push(cd, cc)
      }
      return fileLine
    })

    setClassificado(newFile)
  }

  return (
    <div className="convClass-container">
      <div className="convClass-containerPc">
        <Menu />
        <div className="arrows">
          <img
            src={arrow}
            alt=""
            className="arrowCima"
            onClick={() => {
              const tela = document.getElementsByClassName('convClass-mainContainer')[0]
              tela.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
          <img
            src={arrow}
            alt=""
            className="arrowBaixo"
            onClick={() => {
              const tela = document.getElementsByClassName('convClass-mainContainer')[0]
              tela.scrollTo({ top: tela.scrollHeight, behavior: 'smooth' })
            }}
          />
        </div>
        {headerContent()}
        {handleDataPgtoEcac()}
      </div>
    </div>
  )
}

export default Conversor
