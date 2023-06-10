import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import Menu from "../components/Menu";
import { obj } from "../mockConsultaCNPJ";
import "../App.css";

export default function ConsultCnpj() {
  const {
    searchParams,
    setSearchParams,
    dataConsultCnpj,
    setDataConsultCnpj,
    groupConsultCnpj,
    setGroupConsultCnpj,
    setGroupCollapse,
    groupCollapse,
  } = useContext(AppContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setGroupCollapse({ ...groupCollapse, groupTitle: true }), []);

  const dataContent = () =>
    dataConsultCnpj !== undefined &&
    dataConsultCnpj.length !== 0 && (
      <div className="consultCnpj-dataContent">
        <div className="consultCnpj-dataGroup">
          <span>Data/Hora da consulta:</span>
          <div>{dataConsultCnpj.consulta_datahora}</div>
        </div>
        <div className="consultCnpj-dataContentSeparator">
          Informações Cadastrais
        </div>
        <div className="consultCnpj-dataGroup">
          <span>Nome Fantasia:</span>
          <div>{dataConsultCnpj.nome_fantasia}</div>
        </div>
        <div className="consultCnpj-dataGroup">
          <span>Razão Social:</span>
          <div>{dataConsultCnpj.razao_social}</div>
        </div>
        <div className="consultCnpj-dataGroup">
          <span>CNPJ:</span>
          <div>{dataConsultCnpj.cnpj}</div>
        </div>
        <div className="consultCnpj-dataGroup">
          <span>Data de Abertura:</span>
          <div>{dataConsultCnpj.abertura_data}</div>
        </div>
        <div className="consultCnpj-dataGroup">
          <span>Porte:</span>
          <div>{dataConsultCnpj.porte}</div>
        </div>
        <div className="consultCnpj-dataGroup">
          <span>Endereço:</span>
          <div>
            {dataConsultCnpj.endereco_logradouro},{" "}
            {dataConsultCnpj.endereco_numero} -{" "}
            {dataConsultCnpj.endereco_complemento}
          </div>
        </div>
        <div className="consultCnpj-dataGroup">
          <div>
            {dataConsultCnpj.endereco_cep}, {dataConsultCnpj.endereco_bairro},{" "}
            {dataConsultCnpj.endereco_municipio}, {dataConsultCnpj.endereco_uf}
          </div>
        </div>
        <div className="consultCnpj-dataGroup">
          <span style={{ color: "darkred" }}>Situação Cadastral:</span>
          <div style={{ color: "darkred" }}>
            {dataConsultCnpj.situacao_cadastral} -{" "}
            {dataConsultCnpj.situacao_cadastral_data}
          </div>
        </div>

        <div className="consultCnpj-dataContentSeparator">
          Atividades Econômicas
        </div>
        <div className="consultCnpj-dataGroup">
          <span>Atividade Principal:</span>
          <div>{dataConsultCnpj.atividade_economica}</div>
        </div>
        <div
          className="consultCnpj-dataGroup consultCnpj-atvSec"
          onClick={() => {
            setGroupConsultCnpj(!groupConsultCnpj);
          }}
        >
          <span>
            Atividades Secundárias
            <br />
            (Clique para expandir)
          </span>
          {groupConsultCnpj === false && (
            <div>
              {dataConsultCnpj !== undefined &&
                dataConsultCnpj.length !== 0 &&
                dataConsultCnpj.atividade_economica_secundaria_lista.map(
                  (atv, index) => (
                    <div style={{ display: "flex" }} key={index}>
                      {`${index + 1}º - ${atv}`}
                    </div>
                  )
                )}
            </div>
          )}
        </div>

        <div className="consultCnpj-dataContentSeparator">Informações QSA</div>
        <div className="consultCnpj-dataGroup">
          <span style={{ color: "darkred" }}>Capital Social:</span>
          <div style={{ color: "darkred" }}>
            {dataConsultCnpj.capital_social}
          </div>
        </div>
        <div className="consultCnpj-dataGroup consultCnpj-socios">
          <span>Sócios:</span>
          <div>
            {dataConsultCnpj !== undefined &&
              dataConsultCnpj.length !== 0 &&
              dataConsultCnpj.qsa.map((socio, index, qsa) => (
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
                    className="consultCnpj-socioGroup"
                  >
                    <span>Nome:</span>
                    <div style={{ marginLeft: "0.3rem" }}>{socio.nome}</div>
                  </div>
                  <div
                    style={{ display: "flex" }}
                    className="consultCnpj-socioGroup"
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
          </div>
        </div>
      </div>
    );

  const headerContent = () => (
    <div className="consultCnpj-paramContainer">
      <header className="consultCnpj-header">
        <span className="consultCnpj-paramTitle">Parâmetros de consulta</span>
        <form
          className="consultCnpj-paramGroupContainer"
          id="consultCnpjForm"
          onSubmit={(e) => {
            e.preventDefault();
            setDataConsultCnpj(obj.data[0]);
          }}
        >
          <div>
            <div className="consultCnpj-paramGroup">
              <label htmlFor="formCnpj" className="consultCnpj-paramLabel">
                CNPJ
              </label>
              <input
                type="text"
                className="consultCnpj-input cnpj-input"
                id="formCnpj"
                required
                value={searchParams.cnpj}
                onChange={(e) => {
                  setSearchParams({ ...searchParams, cnpj: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="consultCnpj-paramGroupBtns">
            <button
              onClick={() => {
                setSearchParams({ ...searchParams, cnpj: "" });
                setDataConsultCnpj("");
              }}
            >
              Limpar
            </button>
            <button type="submit">
              Enviar
            </button>
          </div>
        </form>
      </header>
      {dataConsultCnpj !== undefined && dataConsultCnpj.length !== 0 && (
        <div className="consultCnpj-dataContainer">{dataContent()}</div>
      )}
    </div>
  );

  return (
    <div className="consultCnpj-container">
      <div className="consultCnpj-containerMobile">
        <Menu />
        {headerContent()}
      </div>
      <div className="consultCnpj-containerPc">
        <Menu />
        {headerContent()}
      </div>
    </div>
  );
}
