import React, { useContext } from "react";
// import Header from "../components/Header";
import AppContext from "../context/AppContext";
import { funcOfxXls } from "../helpers/Funcoes";
import Excel from "exceljs";
import * as FileSaver from 'file-saver';
import "../App.css";

function Conversor() {
  const {
    convertedFiles, setConvertedFiles,
    conversorForm, setConversorForm,
  } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(conversorForm.files === null) alert('Selecione o arquivo')
    else {
      let newFiles = [];
      for (const file of conversorForm.files) { //Percorre os arquivos
        const newFile = {
          name: file.name, content: await funcOfxXls(file),
        }
        newFiles.push(newFile);
      }
      setConvertedFiles(newFiles);
    }
  };

  // console.log(conversorForm.files);

  const download = async ({ name, content }) => {
    const sliceName = name.split('.');
    const justName = sliceName.slice(0, sliceName.length - 1);
    // const justExt = sliceName[sliceName.length-1];

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('My Sheet');
    for (const linha of content) ws.addRow(linha);
    wb.xlsx.writeBuffer().then(data => {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const blob = new Blob([data], { type: fileType });
      FileSaver.saveAs(blob, `${justName.join('.')}_convertido.xlsx`);
    });
  };

  const downloadAll = () => convertedFiles.forEach((file) => download(file));
  // console.log(conversorForm);
  
	return (
    <div className="conversor">
      {/* <Header/> */}
      <h1>Conversor</h1>
        {
          convertedFiles.length === 0 && (
            <form className="conversorForm" onSubmit={handleSubmit}>
              <label className="container-conv-input1" htmlFor="form-type" onChange={ ({target}) => setConversorForm({...conversorForm, type: target.value}) } >
                - Escolha o tipo -
                <br />
                <div className="conv-input1-displayrow">
                  <label
                    className="conv-input1 ofxxls"
                    htmlFor="ofx-xls"
                    style={ conversorForm.type === 'ofx-xls'
                      ? {"backgroundColor": "rgba(255, 255, 255, .3)"}
                      : {"background": "linear-gradient(rgba(219, 213, 224, .1), rgba(149, 128, 182, .1))"}
                    }
                  >
                    OFX → XLSX
                  </label>
                  {/* <label
                    className="conv-input1 pdfxls"
                    htmlFor="pdf-xls"
                    style={ conversorForm.type === 'pdf-xls'
                    ? {"backgroundColor": "rgba(255, 255, 255, .3)"}
                    : {"background": "linear-gradient(rgba(219, 213, 224, .1), rgba(149, 128, 182, .1))"}
                  }
                  >
                    PDF → XLSX
                  </label> */}
                  <input type="radio" name="form-type" id="ofx-xls" value="ofx-xls" style={{"display": "none"}} />
                  {/* <input type="radio" name="form-type" id="pdf-xls" value="pdf-xls" style={{"display": "none"}} /> */}
                </div>
              </label>

              <label className="conv-input2" htmlFor="form-file" onChange={ ({target}) => setConversorForm({...conversorForm, files: target.files}) } >
                - Faça o upload dos arquivos -
                <input type="file" id="form-file" accept=".ofx, .xlsx, .xls" multiple style={{"display": "none"}}/>
              </label>
              <div className="conv-fileNames">
                {
                  (conversorForm.files !== null && convertedFiles.length === 0 && conversorForm.type === 'ofx-xls') && (
                    Object.values(conversorForm.files).map((file, index) => (
                      <span key={index}>{index+1}º → {file.name}</span>
                    ))
                  )
                }
              </div>

              {/* <label htmlFor="form-separado" onChange={ ({target}) => setConversorForm({...conversorForm, separado: target.value}) } >
                Escolha a configuração de saída:
                <br />
                <label htmlFor="separado">
                  <input type="radio" name="form-separado" id="separado" value={true}/>
                  Arquivos Separados
                </label>
                <label htmlFor="unico">
                  <input type="radio" name="form-separado" id="unico" value={false}/>
                  Arquivos Unificados
                </label>
              </label> */}
              <input id="submitButton" type="submit" value="Converter" />
            </form>
          )
        }
        <div className="conv-fileNames">
          {
            (convertedFiles.length !== 0 && conversorForm.type === 'ofx-xls') && (
              convertedFiles.map((file, index) => (
                <div key={index}>
                  <span>{index+1}º → {file.name} </span>
                  <button className="conv-download-file" onClick={() => download(file)}>
                    Download
                  </button>
                </div>
              ))
            )
          }
          {
            (convertedFiles.length > 1 && conversorForm.type === 'ofx-xls') && (
              <button className="conv-download-all" onClick={ downloadAll }>
                Baixar todos de uma vez
              </button>
            )
          }
        </div>
    </div>
	);
};

export default Conversor;