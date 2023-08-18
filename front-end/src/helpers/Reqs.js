export const getApiCnpj = async (cnpj) => {
  const URL = 'https://multidesk.up.railway.app'
  // const URL = 'http://localhost:3001'

  const response = await fetch(URL + '/consult-cnpj', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cnpj })
  }).then(async res => {
    const aux = await res.json()
    return aux
  })

  return response[0]
}

export const getApiPgtoEcac = async (obj) => {
  // const URL = 'https://multidesk.up.railway.app'
  const URL = 'http://localhost:3001'
  console.log('Req, obj', obj);

  const response = await fetch(URL + '/pgto-ecac', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  }).then(async res => {
    const aux = await res.json()
    return aux
  })

  return response[0]
}

export const getApiSituaFiscal = async (obj) => {
  // const URL = 'https://multidesk.up.railway.app'
  const URL = 'http://localhost:3001'

  const response = await fetch(URL + '/situa-fiscal', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  }).then(async res => {
    const aux = await res.json()
    return aux
  })

  return response[0]
}