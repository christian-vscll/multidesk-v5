import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import '../App.css'
import { getDatabase, ref, get, child, set } from 'firebase/database'

function Conversor() {
  const [db, setDb] = useState()
  const [tgAdd, setTgAdd] = useState({ es: false, em: false, ba: false })
  const [newElem, setNewElem] = useState()

  const getDb = async () => {
    const dbRef = ref(getDatabase())
    const response = await get(child(dbRef, '0'))
      .then((e) => e.val())
      .catch((erro) => ({ message: erro.message }))
    return response
  }

  const setdb = async () => {
    const dbRef = ref(getDatabase(), '0/dados')
    await set(dbRef, db.dados)
      .then((e) => {
        alert('Banco de dados atualizado')
      })
      .catch((erro) => {
        console.warn({ error: 'error', message: erro })
        alert('Erro: Verificar console')
      })
  }

  useEffect(() => {
    //Runs only on the first render
    const func1 = async () => {
      const response = await getDb()

      if (response.error) console.error(response)
      else setDb(response)
    }
    func1()
  }, [])

  const handleChangeClassify = (escritorio, empresa, banco, linhaI, elem, value) => {
    let newdb = db.dados
    // console.log(escritorio, empresa, banco, linhaI, elem, value);
    console.log(newdb[escritorio].empresas[empresa].classify[banco].linhas[linhaI]);
    if (elem === 'conta') newdb[escritorio].empresas[empresa].classify[banco].linhas[linhaI].conta = value
    if (elem === 'contem') newdb[escritorio].empresas[empresa].classify[banco].linhas[linhaI].contem = value
    if (elem === 'op') newdb[escritorio].empresas[empresa].classify[banco].linhas[linhaI].op = value
    setDb((prev) => ({ ...prev, dados: newdb }))
  }

  const makeClassifyTable = (content, i1, i2, i3) => {
    const escritorio = Object.keys(db.dados)[i1]
    const empresa = Object.keys(db.dados[escritorio].empresas)[i2]
    const banco = Object.keys(db.dados[escritorio].empresas[empresa].classify)[i3]
    const variable = db.dados[escritorio].empresas[empresa].classify[banco].linhas

    let table = [['BUSCA', 'OP', 'CONTA']]
    content.forEach(({ contem, op, conta }) => table.push([contem, op, conta]))

    return (
      <div className="db-divTabela">
        {table.map((linha, index) => {
          let toShow = undefined
          if (index === 0) {
            toShow = (
              <div className="db-headerTabela">
                <span>{linha[0]}</span>
                <span>{linha[1]}</span>
                <span>{linha[2]}</span>
              </div>
            )
          } else {
            toShow = (
              <div className="db-linhaTabela">
                {/* <textarea
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
                /> */}
                <textarea
                  className='fieldTableDb'
                  cols="30"
                  rows="10"
                  onChange={({ target }) => handleChangeClassify(escritorio, empresa, banco, index - 1, 'contem', target.value)}
                  value={variable[index - 1].contem}
                />
                {/* <input
                  type="text"
                  onChange={({ target }) => handleChangeClassify(escritorio, empresa, banco, index - 1, 'contem', target.value)}
                  value={variable[index - 1].contem}
                /> */}
                <input
                  className='fieldTableDb'
                  type="text"
                  onChange={({ target }) => handleChangeClassify(escritorio, empresa, banco, index - 1, 'op', target.value)}
                  value={variable[index - 1].op}
                />
                <input
                  className='fieldTableDb'
                  type="text"
                  onChange={({ target }) => handleChangeClassify(escritorio, empresa, banco, index - 1, 'conta', target.value)}
                  value={variable[index - 1].conta}
                />
                <div>
                  <button
                    className="convClass-table tableExcluir"
                    onClick={() => {
                      const newData = db.dados
                      const newClassify = newData[escritorio].empresas[empresa].classify[banco].linhas.filter((elem, i) => i !== index - 1 && elem)
                      newData[escritorio].empresas[empresa].classify[banco].linhas = newClassify
                      setDb((prev) => ({ ...prev, dados: newData }))
                    }}
                  >
                    <div className="convClass-tableIcon1 db" />
                    <div className="convClass-tableIcon2 db" />
                  </button>
                  <button
                    className="convClass-table tableAdd db"
                    onClick={() => {
                      let newData = db.dados
                      newData[escritorio].empresas[empresa].classify[banco].linhas.push({ contem: [''], op: '', conta: '' })
                      setDb((prev) => ({ ...prev, dados: newData }))
                    }}
                  >
                    <div className="convClass-tableIcon3 db" />
                    <div className="convClass-tableIcon4 db" />
                  </button>
                </div>
              </div>
            )
          }
          return toShow
        })}
      </div>
    )
  }

  const headerContent = () => (
    <div className="db-mainContainer">
      <div className="db-header">
        <span className="db-title">Database Classificador</span>
        <button className="db-confirm" onClick={() => setdb()}>
          Salvar e Finalizar
        </button>
      </div>
      <div className="db-content">
        {db !== undefined &&
          Object.keys(db.dados).map((escritorio, index1) => {
            return (
              <div className="db-divEscritorio">
                {(tgAdd.ba && newElem.index === index1) && newElem.elem}
                <div className="db-subDivHeader">
                  <span className="db-escritorioName">{escritorio.toUpperCase()}</span>
                  <div className="db-subDivBtns">
                    <button
                      className="convClass-table tableExcluir"
                      onClick={() => {
                        const newData = db.dados
                        delete newData[escritorio]
                        setDb((prev) => ({ ...prev, dados: newData }))
                      }}
                    >
                      <div className="convClass-tableIcon1 db" />
                      <div className="convClass-tableIcon2 db" />
                    </button>
                    <button
                      className="convClass-table tableAdd db"
                      onClick={() => {
                        setNewElem({
                          index: index1,
                          elem: <div className="dbAddContainer">
                            <label className="dbAddLabel" htmlFor="dbAddNomeEscritorio">
                              Nome do Escritorio: <input type="text" id="dbAddNomeEscritorio" />
                            </label>
                            <label className="dbAddLabel" htmlFor="dbAddCodEmpresa">
                              Cod da Empresa: <input type="text" id="dbAddCodEmpresa" />
                            </label>
                            <label className="dbAddLabel" htmlFor="dbAddNomeEmpresa">
                              Nome da Empresa: <input type="text" id="dbAddNomeEmpresa" />
                            </label>
                            <label className="dbAddLabel" htmlFor="dbAddContaBanco">
                              Conta contábil do Banco: <input type="text" id="dbAddContaBanco" />
                            </label>
                            <label className="dbAddLabel" htmlFor="dbAddNomeBanco">
                              Nome do Banco: <input type="text" id="dbAddNomeBanco" />
                            </label>
                            <div>
                              <button
                                className="dbAddConfirm"
                                onClick={() => {
                                  const nomeEscritorio = document.getElementById('dbAddNomeEscritorio').value
                                  const nomeEmpresa = document.getElementById('dbAddNomeEmpresa').value
                                  const codEmpresa = document.getElementById('dbAddCodEmpresa').value
                                  const nomeBanco = document.getElementById('dbAddNomeBanco').value
                                  const contaBanco = document.getElementById('dbAddContaBanco').value
                                  if ([nomeEscritorio, nomeEmpresa, codEmpresa, nomeBanco, contaBanco].some((elem) => elem === '')) {
                                    alert('Preencha todos os campos')
                                  } else {
                                    const newData = db.dados
                                    newData[nomeEscritorio] = { empresas: {} }
                                    newData[nomeEscritorio].empresas[codEmpresa] = { name: nomeEmpresa, planilhaDespesa: 'exemplo.url', classify: {} }
                                    newData[nomeEscritorio].empresas[codEmpresa].classify[nomeBanco] = {
                                      conta: contaBanco,
                                      linhas: { 0: { contem: [''], op: '', conta: '' } },
                                    }

                                    setDb((prev) => ({ ...prev, dados: newData }))
                                    setTgAdd({ ...tgAdd, es: false })
                                  }
                                }}
                              >
                                Confirmar
                              </button>
                              <button className="dbAddConfirm" onClick={() => setTgAdd({ ...tgAdd, es: false })}>
                                Cancelar
                              </button>
                            </div>
                          </div>
                        })
                        setTgAdd({ ...tgAdd, ba: !tgAdd.ba })
                      }}
                    >
                      <div className="convClass-tableIcon3 db" />
                      <div className="convClass-tableIcon4 db" />
                    </button>
                  </div>
                </div>
                {Object.keys(Object.values(db.dados)[index1].empresas).map((empresa, index2) => {
                  return (
                    <div className="db-divEmpresa">
                      <div className="db-subDivHeader">
                        <span className="db-empresaName">
                          {empresa.toUpperCase()} - {Object.values(Object.values(db.dados)[index1].empresas)[index2].name}
                        </span>
                        <div className="db-subDivBtns">
                          <button
                            className="convClass-table tableExcluir"
                            onClick={() => {
                              const newData = db.dados
                              delete newData[escritorio].empresas[empresa]
                              setDb((prev) => ({ ...prev, dados: newData }))
                            }}
                          >
                            <div className="convClass-tableIcon1 db" />
                            <div className="convClass-tableIcon2 db" />
                          </button>
                          <button
                            className="convClass-table tableAdd db"
                            onClick={() => {
                              setNewElem({
                                index: index1,
                                elem: <div className="dbAddContainer">
                                  <label className="dbAddLabel" htmlFor="dbAddCodEmpresa">
                                    Cod da Empresa: <input type="text" id="dbAddCodEmpresa" />
                                  </label>
                                  <label className="dbAddLabel" htmlFor="dbAddNomeEmpresa">
                                    Nome da Empresa: <input type="text" id="dbAddNomeEmpresa" />
                                  </label>
                                  <label className="dbAddLabel" htmlFor="dbAddContaBanco">
                                    Cod do Banco: <input type="text" id="dbAddContaBanco" />
                                  </label>
                                  <label className="dbAddLabel" htmlFor="dbAddNomeBanco">
                                    Nome do Banco: <input type="text" id="dbAddNomeBanco" />
                                  </label>
                                  <div>
                                    <button
                                      className="dbAddConfirm"
                                      onClick={() => {
                                        const nomeEmpresa = document.getElementById('dbAddNomeEmpresa').value
                                        const codEmpresa = document.getElementById('dbAddCodEmpresa').value
                                        const nomeBanco = document.getElementById('dbAddNomeBanco').value
                                        const contaBanco = document.getElementById('dbAddContaBanco').value
                                        if ([nomeEmpresa, codEmpresa, nomeBanco, contaBanco].some((elem) => elem === '')) {
                                          alert('Preencha todos os campos')
                                        } else {
                                          const newData = db.dados
                                          newData[escritorio].empresas[codEmpresa] = { name: nomeEmpresa, planilhaDespesa: 'exemplo.url', classify: {} }
                                          newData[escritorio].empresas[codEmpresa].classify[nomeBanco] = {
                                            conta: contaBanco,
                                            linhas: { 0: { contem: [''], op: '', conta: '' } },
                                          }

                                          setDb((prev) => ({ ...prev, dados: newData }))
                                          setTgAdd({ ...tgAdd, em: false })
                                        }
                                      }}
                                    >
                                      Confirmar
                                    </button>
                                    <button className="dbAddConfirm" onClick={() => setTgAdd({ ...tgAdd, em: false })}>
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              })
                              setTgAdd({ ...tgAdd, ba: !tgAdd.ba })
                            }}
                          >
                            <div className="convClass-tableIcon3 db" />
                            <div className="convClass-tableIcon4 db" />
                          </button>
                        </div>
                      </div>
                      {Object.keys(Object.values(Object.values(db.dados)[index1].empresas)[index2].classify).map((banco, index3) => {
                        return (
                          <div className="db-divBanco">
                            <div className="db-subDivHeader">
                              <span className="db-bancoName">
                                {db.dados[escritorio].empresas[empresa].classify[banco].conta} - {banco.toUpperCase()}
                              </span>
                              <div className="db-subDivBtns">
                                <button
                                  className="convClass-table tableExcluir"
                                  onClick={() => {
                                    const newData = db.dados
                                    delete newData[escritorio].empresas[empresa].classify[banco]
                                    setDb((prev) => ({ ...prev, dados: newData }))
                                  }}
                                >
                                  <div className="convClass-tableIcon1 db" />
                                  <div className="convClass-tableIcon2 db" />
                                </button>
                                <button
                                  className="convClass-table tableAdd db"
                                  onClick={() => {
                                    setNewElem({
                                      index: index1,
                                      elem: <div className="dbAddContainer">
                                        <label className="dbAddLabel" htmlFor="dbAddContaBanco">
                                          Código: <input type="text" id="dbAddContaBanco" />
                                        </label>
                                        <label className="dbAddLabel" htmlFor="dbAddNomeBanco">
                                          Nome: <input type="text" id="dbAddNomeBanco" />
                                        </label>
                                        <div>
                                          <button
                                            className="dbAddConfirm"
                                            onClick={() => {
                                              const conta = document.getElementById('dbAddContaBanco').value
                                              const banco = document.getElementById('dbAddNomeBanco').value
                                              if ([conta, banco].some((elem) => elem === '')) {
                                                alert('Preencha tods os campos')
                                              } else {
                                                // console.log(db.dados);
                                                const newData = db.dados
                                                newData[escritorio].empresas[empresa].classify[banco] = {
                                                  conta,
                                                  linhas: { 0: { contem: [''], op: '', conta: '' } },
                                                }
                                                setDb((prev) => ({ ...prev, dados: newData }))
                                                setTgAdd({ ...tgAdd, ba: false })
                                              }
                                            }}
                                          >
                                            Confirmar
                                          </button>
                                          <button className="dbAddConfirm" onClick={() => setTgAdd({ ...tgAdd, ba: false })}>
                                            Cancelar
                                          </button>
                                        </div>
                                      </div>
                                    })
                                    setTgAdd({ ...tgAdd, ba: !tgAdd.ba })
                                  }}
                                >
                                  <div className="convClass-tableIcon3 db" />
                                  <div className="convClass-tableIcon4 db" />
                                </button>
                              </div>
                            </div>
                            {makeClassifyTable(
                              Object.values(Object.values(Object.values(Object.values(db.dados)[index1].empresas)[index2].classify)[index3].linhas),
                              index1,
                              index2,
                              index3
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })}
      </div>
    </div>
  )

  return (
    <div className="db-container">
      <Menu />
      {headerContent()}
    </div>
  )
}

export default Conversor
