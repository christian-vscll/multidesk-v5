import React, { useContext } from "react";
// import Header from "../components/Header";
import AppContext from "../context/AppContext";
import Excel from "exceljs";
import * as FileSaver from 'file-saver';
// import '../css/Login.css'
// import { funcClassifyFolhaCDL } from "../helpers/Funcoes";

function Classificador() {
  const {
    classifyForm, setClassifyForm,
  } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(classifyForm.bd === '' || classifyForm.file === '') alert('Selecione os arquivos');
    else if(classifyForm.type === '') alert('Selecione o tipo da classificação');
    else {
      if(classifyForm.type === 'folha-cdl') {
        // const result = await funcClassifyFolhaCDL(classifyForm.bd, classifyForm.file);
        const result = 'teste';
        setClassifyForm({...classifyForm, result});
      }
    }
  };

  const download = async () => {
    const sliceName = classifyForm.file.name.split('.');
    const justName = sliceName.slice(0, sliceName.length - 1);

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');
    let contLinha = 0;
    for (const linha of classifyForm.result) {
      contLinha += 1;
      if (contLinha === 1) {
        worksheet.columns = [
          { header: 'CD', key: 'cd', width: 5.5 },
          { header: 'CC', key: 'cc', width: 5.5 },
          { header: 'DATA', key: 'data', width: 11 },
          { header: 'VALOR', key: 'valor', width: 10 },
          { header: 'COD', key: 'cod', width: 7 },
          { header: 'COMPLEMENTO', key: 'comp', width: 56.43 },
        ];
      } else worksheet.addRow(linha);
      // worksheet.addRow(linha)
    }


    worksheet.getColumn(1).alignment = { horizontal: 'center' };
    worksheet.getColumn(2).alignment = { horizontal: 'center' };
    worksheet.getColumn(3).numFmt = 'dd/mm/yyyy';
    // worksheet.getColumn(4).numFmt = '0,00';
    worksheet.getColumn(5).alignment = { horizontal: 'center' };


    worksheet.getCell('A1').font = { bold: true };
    worksheet.getCell('A1').alignment = { horizontal: "left" };

    worksheet.getCell('B1').font = { bold: true };
    worksheet.getCell('B1').alignment = { horizontal: "left" };

    worksheet.getCell('C1').font = { bold: true };
    worksheet.getCell('C1').alignment = { horizontal: "center" };

    worksheet.getCell('D1').font = { bold: true };
    worksheet.getCell('D1').alignment = { horizontal: "left" };

    worksheet.getCell('E1').font = { bold: true };
    worksheet.getCell('E1').alignment = { horizontal: "left" };

    worksheet.getCell('F1').font = { bold: true };
    worksheet.getCell('F1').alignment = { horizontal: "center" };

    worksheet.autoFilter = 'A1:F1';

    workbook.xlsx.writeBuffer().then(data => {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const blob = new Blob([data], { type: fileType });
      FileSaver.saveAs(blob, `${justName.join('.')}_convertido.xlsx`);
    });
  };

  console.log(classifyForm);

  return (
    <div className="classificador">
      {/* <Header /> */}
      <h1>Classificador</h1>
      {
        classifyForm.result === '' && (
          <form className="classificadorForm" onSubmit={handleSubmit}>
            <label className="container-conv-input1" htmlFor="form-type" onChange={ ({target}) => setClassifyForm({...classifyForm, type: target.value}) } >
              - Escolha o tipo -
              <br />
              <label
                className="conv-input1"
                htmlFor="folha-cdl"
                style={ classifyForm.type === 'folha-cdl'
                  ? {"backgroundColor": "rgba(255, 255, 255, .3)"}
                  : {"background": "linear-gradient(rgba(219, 213, 224, .1), rgba(149, 128, 182, .1))"}
                }
              >
                Folha CDL
              </label>
              <input type="radio" name="form-type" id="folha-cdl" value="folha-cdl" style={{"display": "none"}} />
            </label>

            <br />
            <div className="class-input2">
              - Faça o upload dos arquivos -
              <div className="class-input3-container">
                <span>Banco de Dados → </span>
                <label className="class-input3" htmlFor="form-bd" onChange={ ({target}) => setClassifyForm({...classifyForm, bd: target.files[0]}) } >
                  {
                    classifyForm.bd === ''
                      ? ( 
                        <div>
                          Selecionar arquivo
                          <input type="file" id="form-bd" accept=".xlsx, .xls" style={{"display": "none"}}/> 
                        </div>
                      ) : ( <span> {classifyForm.bd.name} </span> )
                  }
                </label>
              </div>
              <div className="class-input3-container">
                <span>Planilha Folha → </span>
                <label className="class-input3" htmlFor="form-file" onChange={ ({target}) => setClassifyForm({...classifyForm, file: target.files[0]}) } >
                  {
                    classifyForm.file === ''
                      ? (
                        <div>
                          Selecionar arquivo
                          <input type="file" id="form-file" accept=".xlsx, .xls" style={{"display": "none"}}/> 
                        </div>
                      ) : ( <span> {classifyForm.file.name} </span> )
                  }
                </label>
              </div>
            </div>

            {
              (classifyForm.bd !== '' && classifyForm.file !== '') && (
                <input id="submitButton" type="submit" value="Classificar" />
              )
            }
          </form>
        )
      }
      {
        classifyForm.result !== '' && (
          <div className="download-classify-container">
            <button className="download-classify" onClick={download} >
              Download do arquivo classificado
            </button>
          </div>
        )
      }
    </div>
  );
};

export default Classificador;