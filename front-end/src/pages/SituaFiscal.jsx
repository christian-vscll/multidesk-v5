import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import Menu from "../components/Menu";
import { obj } from "../mockSituaFiscal";
import "../App.css";

export default function SituaFiscal() {
  const {
    searchParams,
    setSearchParams,
    dataSituaFiscal,
    setDataSituaFiscal,
    setGroupCollapse,
    groupCollapse,
  } = useContext(AppContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setGroupCollapse({ ...groupCollapse, groupTitle: true }), []);

  const dataContent = () =>
    dataSituaFiscal !== undefined &&
    dataSituaFiscal.length !== 0 && (
      <div className="situaFiscal-dataContent"></div>
      // <div className="situaFiscal-dataContent">
      //   <div className="situaFiscal-dataGroup">
      //     <span>Data/Hora da consulta:</span>
      //     <div>{dataConsultCnpj.consulta_datahora}</div>
      //   </div>
      //   <div className="situaFiscal-dataContentSeparator">
      //     Informações Cadastrais
      //   </div>
      //   <div className="situaFiscal-dataGroup">
      //     <span>Nome Fantasia:</span>
      //     <div>{dataConsultCnpj.nome_fantasia}</div>
      //   </div>
      //   <div className="situaFiscal-dataGroup">
      //     <span>Razão Social:</span>
      //     <div>{dataConsultCnpj.razao_social}</div>
      //   </div>
      //   <div className="situaFiscal-dataGroup">
      //     <span>CNPJ:</span>
      //     <div>{dataConsultCnpj.cnpj}</div>
      //   </div>
      //   <div className="situaFiscal-dataGroup">
      //     <span>Data de Abertura:</span>
      //     <div>{dataConsultCnpj.abertura_data}</div>
      //   </div>
      //   <div className="situaFiscal-dataGroup">
      //     <span>Porte:</span>
      //     <div>{dataConsultCnpj.porte}</div>
      //   </div>
      //   <div className="situaFiscal-dataGroup">
      //     <span>Endereço:</span>
      //     <div>
      //       {dataConsultCnpj.endereco_logradouro},{" "}
      //       {dataConsultCnpj.endereco_numero} -{" "}
      //       {dataConsultCnpj.endereco_complemento}
      //     </div>
      //   </div>
      //   <div className="situaFiscal-dataGroup">
      //     <div>
      //       {dataConsultCnpj.endereco_cep}, {dataConsultCnpj.endereco_bairro},{" "}
      //       {dataConsultCnpj.endereco_municipio}, {dataConsultCnpj.endereco_uf}
      //     </div>
      //   </div>
      //   <div className="situaFiscal-dataGroup">
      //     <span style={{ color: "darkred" }}>Situação Cadastral:</span>
      //     <div style={{ color: "darkred" }}>
      //       {dataConsultCnpj.situacao_cadastral} -{" "}
      //       {dataConsultCnpj.situacao_cadastral_data}
      //     </div>
      //   </div>

      //   <div className="situaFiscal-dataContentSeparator">
      //     Atividades Econômicas
      //   </div>
      //   <div className="situaFiscal-dataGroup">
      //     <span>Atividade Principal:</span>
      //     <div>{dataConsultCnpj.atividade_economica}</div>
      //   </div>
      //   <div
      //     className="situaFiscal-dataGroup situaFiscal-atvSec"
      //     onClick={() => {
      //       setGroupConsultCnpj(!groupConsultCnpj);
      //     }}
      //   >
      //     <span>
      //       Atividades Secundárias
      //       <br />
      //       (Clique para expandir)
      //     </span>
      //     {groupConsultCnpj === false && (
      //       <div>
      //         {dataConsultCnpj !== undefined &&
      //           dataConsultCnpj.length !== 0 &&
      //           dataConsultCnpj.atividade_economica_secundaria_lista.map(
      //             (atv, index) => (
      //               <div style={{ display: "flex" }} key={index}>
      //                 {`${index + 1}º - ${atv}`}
      //               </div>
      //             )
      //           )}
      //       </div>
      //     )}
      //   </div>

      //   <div className="situaFiscal-dataContentSeparator">Informações QSA</div>
      //   <div className="situaFiscal-dataGroup">
      //     <span style={{ color: "darkred" }}>Capital Social:</span>
      //     <div style={{ color: "darkred" }}>
      //       {dataConsultCnpj.capital_social}
      //     </div>
      //   </div>
      //   <div className="situaFiscal-dataGroup situaFiscal-socios">
      //     <span>Sócios:</span>
      //     <div>
      //       {dataConsultCnpj !== undefined &&
      //         dataConsultCnpj.length !== 0 &&
      //         dataConsultCnpj.qsa.map((socio, index, qsa) => (
      //           <div
      //             style={{
      //               display: "flex",
      //               flexDirection: "column",
      //               paddingBottom: "-1rem",
      //             }}
      //             key={index}
      //           >
      //             <div
      //               style={{ display: "flex" }}
      //               className="situaFiscal-socioGroup"
      //             >
      //               <span>Nome:</span>
      //               <div style={{ marginLeft: "0.3rem" }}>{socio.nome}</div>
      //             </div>
      //             <div
      //               style={{ display: "flex" }}
      //               className="situaFiscal-socioGroup"
      //             >
      //               <span>Qualificação:</span>
      //               <div style={{ marginLeft: "0.3rem" }}>
      //                 {socio.qualificacao}
      //               </div>
      //             </div>
      //             {index !== qsa.length - 1 && (
      //               <div style={{ margin: "0.5rem 0rem" }} />
      //             )}
      //           </div>
      //         ))}
      //     </div>
      //   </div>
      // </div>
    );

  const headerContent = () => (
    <div className="situaFiscal-paramContainer">
      <header className="situaFiscal-header">
        <span className="situaFiscal-paramTitle">Parâmetros de consulta</span>
        <form
          className="situaFiscal-paramGroupContainer"
          id="situaFiscalForm"
          onSubmit={(e) => {
            e.preventDefault();
            setDataSituaFiscal(obj.data[0]);
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
      </div>
    </div>
  );
}
