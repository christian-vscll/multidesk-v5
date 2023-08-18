import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import Menu from "../components/Menu";
// import docIcon from "../icons/doc.png";
import { Buffer } from "buffer";
import "../App.css";
import { getApiPgtoEcac } from "../helpers/Reqs";

export default function PgtoEcac() {
  const {
    searchParams,
    setSearchParams,
    dataPgtoEcac,
    setDataPgtoEcac,
    groupCollapse,
    setGroupCollapse,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      cnpj: "",
      dataInicial: "2022-01-01",
      dataFinal: "",
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    setGroupCollapse({ ...groupCollapse, groupTitle: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataTable = () => (
    <table className="pgtoEcac-dataTable">
      <thead>
        <tr>
          <th>
            Data ref
          </th>
          <th>
            Data pgto
          </th>
          <th>Código</th>
          <th>Valor</th>
          {/* <th>PDF</th> */}
        </tr>
      </thead>
      {dataPgtoEcac !== undefined &&
        dataPgtoEcac.length !== 0 &&
        dataPgtoEcac.map((row, index) => (
          <tbody key={index}>
            <tr>
              <td>{row.apuracao}</td>
              <td>{row.arrecadacao}</td>
              <td>{row.codigo_receita}</td>
              <td>{row.valor_total}</td>
              {/* <td>
                <a href={row.comprovante_url}>
                  <img
                    src={docIcon}
                    alt=""
                    className="pgtoEcac-dataTableIcon"
                  />
                </a>
              </td> */}
            </tr>
          </tbody>
        ))}
    </table>
  );

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  
  const dataContent = () => (
    <div className="pgtoEcac-paramContainer">
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
            setLoading(false)
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
            <button
              type="reset"
              onClick={() => {
                setSearchParams({
                  certificado: "",
                  senhaCertificado: "",
                  cnpj: "",
                  dataInicial: "2022-01-01",
                  dataFinal: "",
                });
                setDataPgtoEcac("");
              }}
            >
              Limpar
            </button>
            <button type="submit" autoFocus={true}>
              Enviar
            </button>
          </div>
        </form>
      </header>
      <div className="pgtoEcac-dataTableContainer">
        {dataPgtoEcac !== undefined && dataPgtoEcac.length !== 0 && dataTable()}
      </div>
    </div>
  );

  return (
    <div className="pgtoEcac-container">
      <div className="pgtoEcac-containerMobile">
        <Menu />
        {dataContent()}
      </div>
      <div className="pgtoEcac-containerPc">
        <Menu />
        {dataContent()}
        {loading && <div className="custom-loader pgto-ecac"/>}
      </div>
    </div>
  );
}
