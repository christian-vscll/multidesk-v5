import React, { useState } from "react";
import AppContext from "./AppContext";

function Provider({ children }) {
  const [loginVar, setLoginVar] = useState({ user: "", pasw: "" });
  const [actualConvertedFiles, setActualConvertedFiles] = useState([]);
  // const [convertedFiles, setConvertedFiles] = useState([]);
  const [conversorForm, setConversorForm] = useState({
    files: null,
    separado: "true",
  });
  const [groupCollapse, setGroupCollapse] = useState({
    groupTitle: true,
    groupCadastro: true,
    groupEcac: true,
    groupSefaz: true,
    groupOutros: true,
    groupOp: true,
  });
  const [searchParams, setSearchParams] = useState({
    certificado: "",
    senhaCertificado: "",
    cnpj: "",
    dataInicial: "2022-01-01",
    dataFinal: "",
  });
  const [dataPgtoEcac, setDataPgtoEcac] = useState("");
  const [dataConsultCnpj, setDataConsultCnpj] = useState("");
  const [groupConsultCnpj, setGroupConsultCnpj] = useState(true);
  const [dataSituaFiscal, setDataSituaFiscal] = useState("");

  const contextValue = {
    loginVar,
    setLoginVar,
    actualConvertedFiles,
    setActualConvertedFiles,
    // convertedFiles,
    // setConvertedFiles,
    conversorForm,
    setConversorForm,
    groupCollapse,
    setGroupCollapse,
    searchParams,
    setSearchParams,
    dataPgtoEcac,
    setDataPgtoEcac,
    dataConsultCnpj,
    setDataConsultCnpj,
    groupConsultCnpj,
    setGroupConsultCnpj,
    dataSituaFiscal,
    setDataSituaFiscal,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export default Provider;
