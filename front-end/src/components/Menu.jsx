import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import iconArrow from "../icons/arrow-down.png";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const { groupCollapse, setGroupCollapse } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <div
        className="menu-titleContainer"
        style={{ cursor: "pointer" }}
        onClick={() =>
          setGroupCollapse({
            groupTitle: !groupCollapse.groupTitle,
            groupCadastro: true,
            groupEcac: true,
            groupSefaz: true,
            groupOutros: true,
            groupOp: true,
          })
        }
      >
        <h1 className="menu-title">Multidesk</h1>
        <div className="menu-separator" />
        <img
          src={iconArrow}
          alt=""
          className="menu-navIconTitle"
          style={
            groupCollapse.groupTitle === true
              ? { transform: "rotate(0deg)" }
              : { transform: "rotate(180deg)" }
          }
        />
      </div>
      {groupCollapse.groupTitle === false && (
        <nav className="menu-panel">
          <ul
            className="menu-navGroup"
            onClick={() =>
              setGroupCollapse({
                groupTitle: false,
                groupCadastro: !groupCollapse.groupCadastro,
                groupEcac: true,
                groupSefaz: true,
                groupOutros: true,
                groupOp: true,
              })
            }
          >
            <span className="menu-navGroupLabel">Consultas de Cadastro</span>
            <img
              src={iconArrow}
              alt=""
              className="menu-navIcons"
              style={
                groupCollapse.groupCadastro === true
                  ? { transform: "rotate(0deg)" }
                  : { transform: "rotate(180deg)" }
              }
            />
          </ul>
          {groupCollapse.groupCadastro === false && (
            <>
              <ul
                className="menu-navBtn"
                onClick={() => navigate("/consult-cnpj")}
              >
                <span className="menu-navLabel">CNPJ</span>
                {/* https://infosimples.com/consultas/receita-federal-cnpj/ */}
              </ul>
              <ul className="menu-navBtn" onClick={() => alert("ponto 2")}>
                <span className="menu-navLabel">Inscrição Estadual</span>
                {/* https://api.infosimples.com/consultas/docs/sintegra/rj */}
              </ul>
            </>
          )}
          <ul
            className="menu-navGroup"
            onClick={() =>
              setGroupCollapse({
                groupTitle: false,
                groupCadastro: true,
                groupEcac: !groupCollapse.groupEcac,
                groupSefaz: true,
                groupOutros: true,
                groupOp: true,
              })
            }
          >
            <span className="menu-navGroupLabel">Consultas ECAC</span>
            <img
              src={iconArrow}
              alt=""
              className="menu-navIcons"
              style={
                groupCollapse.groupEcac === true
                  ? { transform: "rotate(0deg)" }
                  : { transform: "rotate(180deg)" }
              }
            />
          </ul>
          {groupCollapse.groupEcac === false && (
            <>
              <ul
                className="menu-navBtn"
                onClick={(e) => alert("Está por vir")}
              >
                <span className="menu-navLabel">Caixa Postal / ECAC</span>
                {/* https://api.infosimples.com/consultas/docs/ecac/caixa-postal */}
              </ul>
              <ul
                className="menu-navBtn"
                onClick={(e) => alert("Está por vir")}
              >
                <span className="menu-navLabel">PGFN / CND Federal</span>
                {/* https://api.infosimples.com/consultas/docs/receita-federal/pgfn */}
              </ul>
              <ul
                className="menu-navBtn"
                onClick={(e) => navigate("/pgto-ecac")}
              >
                <span className="menu-navLabel">
                  Comprovantes de Pagamento / ECAC
                  {/* https://api.infosimples.com/consultas/docs/ecac/comprovante-pagamento */}
                </span>
              </ul>
              <ul
                className="menu-navBtn"
                onClick={(e) => navigate("/situa-fiscal")}
              >
                <span className="menu-navLabel">Situação Fiscal / ECAC</span>
                {/* https://api.infosimples.com/api/v2/consultas/ecac/situacao-fiscal */}
              </ul>
            </>
          )}
          <ul
            className="menu-navGroup"
            onClick={() =>
              setGroupCollapse({
                groupTitle: false,
                groupCadastro: true,
                groupEcac: true,
                groupSefaz: !groupCollapse.groupSefaz,
                groupOutros: true,
                groupOp: true,
              })
            }
          >
            <span className="menu-navGroupLabel">Consultas Sefaz</span>
            <img
              src={iconArrow}
              alt=""
              className="menu-navIcons"
              style={
                groupCollapse.groupSefaz === true
                  ? { transform: "rotate(0deg)" }
                  : { transform: "rotate(180deg)" }
              }
            />
          </ul>
          {groupCollapse.groupSefaz === false && (
            <>
              <ul className="menu-navBtn" onClick={() => alert("Está por vir")}>
                <span className="menu-navLabel">
                  Certidão Negativa de Débitos / CNPJ
                  {/* https://api.infosimples.com/consultas/docs/sefaz/rj/certidao-debitos */}
                </span>
              </ul>
              <ul className="menu-navBtn" onClick={() => alert("Está por vir")}>
                <span className="menu-navLabel">
                  Certidão Negativa de Débitos / Certificado
                  {/* https://api.infosimples.com/consultas/docs/sefaz/rj/certidao-debitos-cert */}
                </span>
              </ul>
              <ul className="menu-navBtn" onClick={() => alert("Está por vir")}>
                <span className="menu-navLabel">Caixa Postal / DEC</span>
                {/* https://api.infosimples.com/consultas/docs/sefaz/rj/dec/caixa-postal */}
              </ul>
              <ul className="menu-navBtn" onClick={() => alert("Está por vir")}>
                <span className="menu-navLabel">Dívida Ativa</span>
                {/* https://api.infosimples.com/consultas/docs/pge/rj/divida-ativa */}
              </ul>
            </>
          )}
          <ul
            className="menu-navGroup"
            onClick={() =>
              setGroupCollapse({
                groupTitle: false,
                groupCadastro: true,
                groupEcac: true,
                groupSefaz: true,
                groupOutros: !groupCollapse.groupOutros,
                groupOp: true,
              })
            }
          >
            <span className="menu-navGroupLabel">Outras consultas</span>
            <img
              src={iconArrow}
              alt=""
              className="menu-navIcons"
              style={
                groupCollapse.groupOutros === true
                  ? { transform: "rotate(0deg)" }
                  : { transform: "rotate(180deg)" }
              }
            />
          </ul>
          {groupCollapse.groupOutros === false && (
            <>
              <ul className="menu-navBtn" onClick={() => alert("Está por vir")}>
                <span className="menu-navLabel">
                  Acompanhamento de Protocolo / REDESIM
                  {/* https://api.infosimples.com/consultas/docs/receita-federal/redesim/acompa */}
                </span>
              </ul>
              <ul className="menu-navBtn" onClick={() => alert("Está por vir")}>
                <span className="menu-navLabel">
                  Regularidade do Empregador / FGTS
                  {/* https://api.infosimples.com/consultas/docs/caixa/regularidade */}
                </span>
              </ul>
            </>
          )}
          <ul
            className="menu-navGroup"
            onClick={() =>
              setGroupCollapse({
                groupTitle: false,
                groupCadastro: true,
                groupEcac: true,
                groupSefaz: true,
                groupOutros: true,
                groupOp: !groupCollapse.groupOp,
              })
            }
          >
            <span className="menu-navGroupLabel">Operações</span>
            <img
              src={iconArrow}
              alt=""
              className="menu-navIcons"
              style={
                groupCollapse.groupOp === true
                  ? { transform: "rotate(0deg)" }
                  : { transform: "rotate(180deg)" }
              }
            />
          </ul>
          {groupCollapse.groupOp === false && (
            <>
              <ul className="menu-navBtn" onClick={() => navigate('/conversor')}>
                <span className="menu-navLabel">Conversor OFX</span>
              </ul>
              <ul className="menu-navBtn" onClick={() => alert("Está por vir")}>
                <span className="menu-navLabel">Classificador Automático</span>
              </ul>
              <ul className="menu-navBtn" onClick={() => alert("Está por vir")}>
                <span className="menu-navLabel">
                  Correção Automática do Balancete
                </span>
              </ul>
            </>
          )}
          <div className="menu-spacer" />
        </nav>
      )}
    </div>
  );
}
