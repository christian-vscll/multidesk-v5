import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import Menu from "../components/Menu";
// import { obj } from "../mockSituaFiscal";
import { Buffer } from "buffer";
import "../App.css";
import { getApiSituaFiscal } from "../helpers/Reqs";

export default function SituaFiscal() {
  const {
    searchParams,
    setSearchParams,
    dataSituaFiscal,
    setDataSituaFiscal,
    setGroupCollapse,
    groupCollapse,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setGroupCollapse({ ...groupCollapse, groupTitle: true }), []);

  useEffect(() => {
    if (loading) document.body.style.cursor = "wait"
    else document.body.style.cursor = ""
  }, [loading, dataSituaFiscal])

  const dataContent = () =>
    dataSituaFiscal !== undefined &&
    dataSituaFiscal.length !== 0 && (
      // <div className="situaFiscal-dataContent"></div>
      <div className="situaFiscal-dataContent">
        <div className="situaFiscal-dataGroup">
          <span>Data/Hora da consulta:</span>
          <div>{dataSituaFiscal.data_hora_consulta}</div>
        </div>
        <div className="situaFiscal-dataContentSeparator">
          Informações Cadastrais
        </div>
        <div className="situaFiscal-dataGroup">
          <span>Nome Fantasia:</span>
          <div>{dataSituaFiscal.nome}</div>
        </div>
        <div className="situaFiscal-dataGroup">
          <span>Razão Social:</span>
          <div>{dataSituaFiscal.razao_social}</div>
        </div>
        <div className="situaFiscal-dataGroup">
          <span>CNPJ:</span>
          <div>{dataSituaFiscal.normalizado_cnpj}</div>
        </div>
        <div className="situaFiscal-dataGroup">
          <span>Data de Abertura:</span>
          <div>{dataSituaFiscal.dados_cadastrais_pj_matriz.data_abertura}</div>
        </div>
        <div className="situaFiscal-dataGroup">
          <span>Porte:</span>
          <div>{dataSituaFiscal.dados_cadastrais_pj_matriz.porte_empresa}</div>
        </div>
        <div className="situaFiscal-dataGroup">
          <span>Endereço:</span>
          <div>
            {dataSituaFiscal.dados_cadastrais_pj_matriz.endereco}
            {/* {dataSituaFiscal.endereco_numero} -{" "}
            {dataSituaFiscal.endereco_complemento} */}
          </div>
        </div>
        <div className="situaFiscal-dataGroup">
          <div>
            {dataSituaFiscal.dados_cadastrais_pj_matriz.cep}, {dataSituaFiscal.dados_cadastrais_pj_matriz.bairro},{" "}
            {dataSituaFiscal.dados_cadastrais_pj_matriz.municipio}, {dataSituaFiscal.dados_cadastrais_pj_matriz.uf}
          </div>
        </div>
        <div className="situaFiscal-dataGroup">
          <span style={{ color: "darkred" }}>Situação Cadastral:</span>
          <div style={{ color: "darkred" }}>
            {dataSituaFiscal.certidao_emitida.obs} -{" "}
            {dataSituaFiscal.certidao_emitida.data_emissao}
          </div>
        </div>

        <div className="situaFiscal-dataContentSeparator">
          Atividades Econômicas
        </div>
        {/* <div className="situaFiscal-dataGroup">
          <span>Atividade Principal:</span>
          <div>{dataSituaFiscal.atividade_economica}</div>
        </div>
        <div
          className="situaFiscal-dataGroup situaFiscal-atvSec"
          onClick={() => {
            setGroupCollapse(!groupCollapse);
          }}
        >
          <span>
            Atividades Secundárias
            <br />
            (Clique para expandir)
          </span>
          {groupCollapse === false && (
            <div>
              {dataSituaFiscal !== undefined &&
                dataSituaFiscal.length !== 0 &&
                dataSituaFiscal.atividade_economica_secundaria_lista.map(
                  (atv, index) => (
                    <div style={{ display: "flex" }} key={index}>
                      {`${index + 1}º - ${atv}`}
                    </div>
                  )
                )}
            </div>
          )}
        </div> */}

        {/* <div className="situaFiscal-dataContentSeparator">Informações QSA</div>
        <div className="situaFiscal-dataGroup">
          <span style={{ color: "darkred" }}>Capital Social:</span>
          <div style={{ color: "darkred" }}>
            {dataSituaFiscal.capital_social}
          </div>
        </div>
        <div className="situaFiscal-dataGroup situaFiscal-socios">
          <span>Sócios:</span>
          <div>
            {dataSituaFiscal !== undefined &&
              dataSituaFiscal.length !== 0 &&
              dataSituaFiscal.socios_e_administradores.map((socio, index, qsa) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "-1rem",
                  }}
                  key={index}
                >
                  <div
                    style={{ display: "flex" }}
                    className="situaFiscal-socioGroup"
                  >
                    <span>Nome:</span>
                    <div style={{ marginLeft: "0.3rem" }}>{socio.nome}</div>
                  </div>
                  <div
                    style={{ display: "flex" }}
                    className="situaFiscal-socioGroup"
                  >
                    <span>Qualificação:</span>
                    <div style={{ marginLeft: "0.3rem" }}>
                      {socio.qualificacao}
                    </div>
                  </div>
                  {index !== qsa.length - 1 && (
                    <div style={{ margin: "0.5rem 0rem" }} />
                  )}
                </div>
              ))}
          </div> */}
        {/* </div> */}
        <div className="situaFiscal-dataGroup situaFiscal-socios">
          <span>PDF gerado:</span>
          <a href={dataSituaFiscal.site_receipt} target="_blank" rel="noreferrer">Clique aqui</a>
        </div>
      </div>
    );

  // console.log(dataSituaFiscal);

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const headerContent = () => (
    <div className="situaFiscal-paramContainer">
      <header className="situaFiscal-header">
        <span className="situaFiscal-paramTitle">Parâmetros de consulta</span>
        <form
          className="situaFiscal-paramGroupContainer"
          id="situaFiscalForm"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true)
            const certificado = await toBase64(searchParams.certificado)
            const obj = {
              certificado: Buffer.from(certificado).toString('base64'),
              senha: searchParams.senhaCertificado,
              cnpj: searchParams.cnpj,
            }

            const res = await getApiSituaFiscal(obj)
            if (typeof res === 'object') {
              console.log(res);
              setDataSituaFiscal(res)
            }
            setLoading(false)
          }}
        >
          <div>
            <div className="situaFiscal-paramGroup">
              <label
                htmlFor="formCertificado"
                className="situaFiscal-paramLabel"
              >
                Certificado
              </label>
              <input
                type="file"
                required
                className="situaFiscal-input certify-input"
                id="formCertificado"
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    certificado: e.target.files[0],
                  })
                }
              />
            </div>
            <div className="situaFiscal-paramGroup">
              <label
                htmlFor="formSenhaCertificado"
                className="situaFiscal-paramLabel"
              >
                Senha do certificado
              </label>
              <input
                type="text"
                required
                id="formSenhaCertificado"
                className="situaFiscal-input senha-input"
                value={searchParams.senhaCertificado}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    senhaCertificado: e.target.value,
                  })
                }
              />
            </div>
            <div className="situaFiscal-paramGroup">
              <label htmlFor="formCnpj" className="situaFiscal-paramLabel">
                CNPJ
              </label>
              <input
                type="text"
                className="situaFiscal-input cnpj-input"
                id="formCnpj"
                value={searchParams.cnpj}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, cnpj: e.target.value })
                }
              />
            </div>
          </div>
          <div className="situaFiscal-paramGroupBtns">
            <button
              onClick={() => {
                setSearchParams({ ...searchParams, cnpj: "" });
                setDataSituaFiscal("");
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
      {dataSituaFiscal !== undefined && dataSituaFiscal.length !== 0 && (
        <div className="situaFiscal-dataContainer">{dataContent()}</div>
      )}
    </div>
  );

  return (
    <div className="situaFiscal-container">
      <div className="situaFiscal-containerMobile">
        <Menu />
        {headerContent()}
      </div>
      <div className="situaFiscal-containerPc">
        <Menu />
        {headerContent()}
        {loading && <div className="custom-loader situa-fiscal"/>}
      </div>
    </div>
  );
}
