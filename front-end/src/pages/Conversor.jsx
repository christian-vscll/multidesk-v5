import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { funcOfxXls } from "../helpers/Funcoes";
import Excel from "exceljs";
import * as FileSaver from "file-saver";
import "../App.css";
import Menu from "../components/Menu";

function Conversor() {
  const { conversorForm, setConversorForm } = useContext(AppContext);

  const [convertedFiles, setConvertedFiles] = useState([]);
  const [saldo, setSaldo] = useState([]);
  const [check, setCheck] = useState(false);
  const [classify, setClassify] = useState({
    check: false,
    escritorio: "",
    empresa: "",
  });

  const handleUnifyFiles = (files) => {
    let newFile = [["DATA", "HISTORICO", "VALOR"]];
    for (const file of files) {
      for (let i = 1; i < file.content.length; i++)
        newFile.push(file.content[i]);
    }
    return [{ name: "", content: newFile }];
  }

  //! Função do form que lê o OFX e adiciona os dados no context
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (conversorForm.files === null) alert("Selecione o arquivo");
    else {
      let newFiles = [];
      for (const file of conversorForm.files) {
        //Percorre os arquivos
        const newFile = { name: file.name, content: await funcOfxXls(file) };
        newFiles.push(newFile);
      }

      if (check) newFiles = handleUnifyFiles(newFiles)
      setConvertedFiles(newFiles);
    }
  };

  //! Função que transforma o arquivo pra XLS e baixa
  const download = async ({ name, content }) => {
    const sliceName = name.split(".");
    const justName = sliceName.length === 1 ? sliceName[0] : sliceName.slice(0, sliceName.length - 1);

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet("My Sheet");
    for (const linha of content) ws.addRow(linha);
    wb.xlsx.writeBuffer().then((data) => {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const blob = new Blob([data], { type: fileType });
      FileSaver.saveAs(blob, `${justName}_convertido.xlsx`);
    });
  };

  //! Função para baixar todos de uma vez
  const downloadAll = () => convertedFiles.forEach((file) => download(file));

  const getLastDay = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const handleDate = (date) => {
    const date2 = date.split("/");
    return new Date(date2[1] + "-" + date2[0] + "-" + date2[2]);
  };
  const funcSaldos = () => {
    convertedFiles.forEach((_file, index) => {
      const actualFileIndex = index;
      const saldoI =
        saldo[actualFileIndex].saldoI.length === 0
          ? 0
          : parseFloat(saldo[actualFileIndex].saldoI);
      let soma1 = 0;
      let soma2 = 0;
      let soma3 = 0;
      let soma4 = 0;

      const aux2 = convertedFiles[actualFileIndex].content;
      for (let i = 1; i < aux2.length; i++) {
        const mesAno = aux2[i][0].slice(3, 10);

        if (
          handleDate(aux2[i][0]) >= handleDate("01/" + mesAno) &&
          handleDate(aux2[i][0]) <= handleDate("07/" + mesAno)
        ) {
          if (aux2[i][2].length !== 0) soma1 = soma1 + parseFloat(aux2[i][2]);
        } else if (
          handleDate(aux2[i][0]) >= handleDate("08/" + mesAno) &&
          handleDate(aux2[i][0]) <= handleDate("14/" + mesAno)
        ) {
          if (aux2[i][2].length !== 0) soma2 = soma2 + parseFloat(aux2[i][2]);
        } else if (
          handleDate(aux2[i][0]) >= handleDate("15/" + mesAno) &&
          handleDate(aux2[i][0]) <= handleDate("21/" + mesAno)
        ) {
          if (aux2[i][2].length !== 0) soma3 = soma3 + parseFloat(aux2[i][2]);
        } else if (
          handleDate(aux2[i][0]) >= handleDate("22/" + mesAno) &&
          handleDate(aux2[i][0]) <= getLastDay(handleDate("23/" + mesAno))
        ) {
          if (aux2[i][2].length !== 0) soma4 = soma4 + parseFloat(aux2[i][2]);
        }
      }
      const saldoF =
        parseFloat(saldoI.toFixed(2)) +
        parseFloat(soma1.toFixed(2)) +
        parseFloat(soma2.toFixed(2)) +
        parseFloat(soma3.toFixed(2)) +
        parseFloat(soma4.toFixed(2));
      const aux3 = { saldoI, soma1, soma2, soma3, soma4, saldoF };
      // console.log(JSON.stringify(aux3) !== JSON.stringify(saldo));
      if (JSON.stringify(aux3) !== JSON.stringify(saldo[actualFileIndex])) {
        const aux4 = [...saldo];
        aux4[actualFileIndex] = aux3;
        setSaldo(aux4);
      }
    });
  };

  const setContent = (index, newContent) => {
    const updatedFiles = [...convertedFiles]; // Faz uma cópia dos arquivos existentes
    updatedFiles[index].content = newContent; // Modifica o conteúdo do arquivo desejado
    setConvertedFiles(updatedFiles); // Atualiza o estado com os arquivos modificados
  };

  const order = ({ innerText }, index) => {
    let aux = convertedFiles[index].content.slice(
      1,
      convertedFiles[index].content.length
    );
    if (innerText === "DATA")
      aux = aux.sort((a, b) => handleDate(a[0]) - handleDate(b[0]));
    if (innerText === "HISTORICO")
      aux = aux.sort((a, b) => {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
      });
    if (innerText === "VALOR")
      aux = aux.sort((a, b) => {
        if (a[2] < b[2]) return -1;
        if (a[2] > b[2]) return 1;
        return 0;
      });
    setContent(index, [innerText, ...aux]);
    funcSaldos();
  };

  const headerContent = () => (
    <div className="convClass-mainContainer">
      {
        //! Array de arquivos pra converter não contém nada?? ↓↓↓↓
        convertedFiles.length === 0 ? (
          <form className="convClass-form" onSubmit={handleSubmit}>
            {/* //* Botão para escolher arquivos */}
            <span className="convClass-formTitle">
              Conversor e Classificador
            </span>
            <label
              className="convClass-inputFiles"
              htmlFor="form-file"
              onChange={({ target }) =>
                setConversorForm({ ...conversorForm, files: target.files })
              }
            >
              - Faça o upload dos arquivos -
              <input
                type="file"
                id="form-file"
                accept=".ofx, .xlsx, .xls"
                multiple
                style={{ display: "none" }}
              />
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
                <input type="checkbox" checked={check} onChange={() => setCheck(!check)}/>
                <label onClick={() => setCheck(!check)}>
                  Unificar arquivos
                </label>
              </div>
            )}
          </form>
        ) : (
          convertedFiles.map((file, index) => {
            const actualFileIndex = index;
            if (saldo[actualFileIndex] === undefined)
              saldo[actualFileIndex] = {
                saldoI: 0,
                soma1: 0,
                soma2: 0,
                soma3: 0,
                soma4: 0,
                saldoF: 0,
              };

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
                          placeholder="Nome do arquivo com extensão"
                          onChange={({ target }) => {
                            const aux = [...convertedFiles];
                            aux[0].name = target.value;
                            setConvertedFiles(aux);
                          }}
                        />
                      </div>
                    ) : (
                      <h3>{file.name}</h3>
                    )}
                    {/* <h3>{file.name}</h3> */}
                    <div>
                      <button
                        className="convClass-table tableExcluir"
                        onClick={() => {
                          const newConvertedFiles = convertedFiles.filter(
                            (elem, index) => index !== actualFileIndex && elem
                          );
                          const newSaldo = saldo.filter(
                            (elem, index) => index !== actualFileIndex && elem
                          );
                          setConvertedFiles(newConvertedFiles);
                          setSaldo(newSaldo);
                        }}
                      >
                        <div className="convClass-tableIcon1" />
                        <div className="convClass-tableIcon2" />
                      </button>
                      <label
                        htmlFor="form-file"
                        onChange={async ({ target }) => {
                          let aux = convertedFiles;
                          for (const file of target.files) {
                            const newFile = {
                              name: file.name,
                              content: await funcOfxXls(file),
                            };
                            aux.splice(actualFileIndex, 0, newFile);
                          }
                          setConvertedFiles(aux);
                          funcSaldos();
                        }}
                      >
                        <input
                          type="file"
                          id="form-file"
                          accept=".ofx, .xlsx, .xls"
                          multiple
                          style={{ display: "none" }}
                          className="convClass-table tableAdd"
                        />
                        <div className="convClass-tableIcon3" />
                        <div className="convClass-tableIcon4" />
                      </label>
                    </div>
                  </div>
                  <label
                    className="convClass-labelSaldoI"
                    htmlFor="convClass-inputSaldoI"
                  >
                    Saldo inicial:
                    <input
                      type="number"
                      className="convClass-inputSaldoI"
                      onChange={({ target }) => {
                        saldo[actualFileIndex].saldoI = target.value;
                        funcSaldos();
                      }}
                    />
                  </label>

                  {file.content.map((_linha, index) => {
                    const data =
                      convertedFiles[actualFileIndex].content[index][0];
                    const hist =
                      convertedFiles[actualFileIndex].content[index][1];
                    const valor =
                      convertedFiles[actualFileIndex].content[index][2];
                    let soma = 0;
                    for (let i = 1; i <= index; i++) {
                      soma =
                        soma +
                        parseFloat(
                          convertedFiles[actualFileIndex].content[i][2]
                        );
                    }

                    return index === 0 ? (
                      <div className="convClass-tableHeader" key={index}>
                        <h5
                          onClick={({ target }) =>
                            order(target, actualFileIndex)
                          }
                        >
                          DATA
                        </h5>
                        <h5
                          onClick={({ target }) =>
                            order(target, actualFileIndex)
                          }
                        >
                          HISTORICO
                        </h5>
                        <h5
                          onClick={({ target }) =>
                            order(target, actualFileIndex)
                          }
                        >
                          VALOR
                        </h5>
                        <h5>SOMA</h5>
                      </div>
                    ) : (
                      <div className="convClass-tableRow" key={index}>
                        <input
                          type="text"
                          className="convClass-table tableData"
                          value={data}
                          onChange={({ target }) => {
                            const aux = convertedFiles[actualFileIndex].content;
                            aux[index][0] = target.value;
                            setContent(actualFileIndex, aux);
                            funcSaldos();
                          }}
                        />
                        <input
                          type="text"
                          className="convClass-table tableHist"
                          value={hist}
                          onChange={({ target }) => {
                            const aux = convertedFiles[actualFileIndex].content;
                            aux[index][1] = target.value;
                            setContent(actualFileIndex, aux);
                            funcSaldos();
                          }}
                        />
                        <input
                          type="number"
                          className="convClass-table tableValor"
                          value={valor}
                          onChange={({ target }) => {
                            const aux = convertedFiles[actualFileIndex].content;
                            aux[index][2] = target.value.replace(",", ".");
                            setContent(actualFileIndex, aux);
                            funcSaldos();
                            console.log(convertedFiles);
                          }}
                        />
                        <input
                          type="number"
                          className="convClass-table tableSoma"
                          disabled
                          // pattern="^R\$\d{1,3}(?:\.\d{3})*(?:,\d{2})$"
                          value={
                            (convertedFiles[actualFileIndex].content[
                              index + 1
                            ] === undefined ||
                              convertedFiles[actualFileIndex].content[
                                index
                              ][0] !==
                                convertedFiles[actualFileIndex].content[
                                  index + 1
                                ][0]) &&
                            parseFloat(soma.toFixed(2))
                          }
                        />
                        <button
                          className="convClass-table tableExcluir"
                          onClick={() => {
                            const aux = convertedFiles[actualFileIndex].content;
                            aux.splice(index, 1);
                            setContent(actualFileIndex, aux);
                            funcSaldos();
                          }}
                        >
                          {/* Excluir */}
                          <div className="convClass-tableIcon1" />
                          <div className="convClass-tableIcon2" />
                        </button>
                        <button
                          className="convClass-table tableAdd"
                          onClick={() => {
                            const updatedFiles = [...convertedFiles]; // Faz uma cópia dos arquivos existentes
                            updatedFiles[actualFileIndex].content.splice(
                              index + 1,
                              0,
                              ["", "", 0]
                            ); // Modifica o conteúdo do arquivo desejado
                            // updatedFiles[actualFileIndex].c
                            setConvertedFiles(updatedFiles);
                          }}
                        >
                          {/* Adicionar */}
                          <div className="convClass-tableIcon3" />
                          <div className="convClass-tableIcon4" />
                        </button>
                      </div>
                    );
                  })}
                  <h4>
                    Saldo Final:{" "}
                    {parseFloat(saldo[actualFileIndex].saldoF.toFixed(2))}
                  </h4>
                </div>
                <div className="convClass-endButtonsContainer">
                  {
                    check ? (
                      <>
                        <button className="convClass-downloadAll" onClick={downloadAll}>
                          Baixar planilha
                        </button>
                        <label
                          className="convClass-classify"
                          onClick={() => { setClassify({ ...classify, check: !classify.check }) }}
                          >
                          Classificação
                          <input
                            type="checkbox"
                            checked={classify.check}
                            style={{ display: "none" }}
                            readOnly
                            />
                        </label>
                      </>
                    ) : (
                      <>
                        <button className="convClass-downloadAll" onClick={() => download(convertedFiles[actualFileIndex])}>
                          Baixar planilha
                        </button>
                        {
                          actualFileIndex === convertedFiles.length -1 && (
                            <button className="convClass-downloadAll" onClick={() => {
                              const aux = handleUnifyFiles(convertedFiles)
                              setCheck(true)
                              setConvertedFiles(aux)
                            }}>
                              Unificar planilhas
                            </button>
                          )
                        }
                      </>
                    )
                  }
                </div>
              </div>
            );
          })
        )
      }
    </div>
  );

  return (
    <div className="convClass-container">
      <div className="convClass-containerMobile">
        <Menu />
        {headerContent()}
      </div>
      <div className="convClass-containerPc">
        <Menu />
        {headerContent()}
      </div>
    </div>
  );
}

export default Conversor;
