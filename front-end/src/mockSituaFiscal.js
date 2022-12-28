const obj = {
  code: 200,
  code_message: "A requisição foi processada com sucesso.",
  header: {
    api_version: "v2",
    service: "ecac/situacao-fiscal",
    parameters: {
      pkcs12_cert_md5: "f03dbb870faf284488de73e3cee70229",
      pkcs12_pass_md5: "4f4acd939b78981f5e809e30b3dbf866"
    },
    client_name: "Minha Empresa",
    token_name: "Token de Produção",
    billable: true,
    price: "0.26",
    requested_at: "2021-09-03T14:07:23.000-03:00",
    elapsed_time_in_milliseconds: 8508,
    remote_ip: "111.111.111.111",
    signature: "U2FsdGVkX18UfoT7w+7mQYXWhO9VCJVp/jEAlnk6teJoTjYYtsFa5jWigZbP/kSbfZzvL5lYrk59t9a1rey7TA=="
  },
  data_count: 1,
  data: [
    {
      certidao_emitida: {
        certidao_negativa: "1D1F.1AF1.D1E1.1111",
        data_emissao: "11/11/1111",
        data_validade: "11/11/1111",
        normalizado_data_emissao: "11/11/1111",
        normalizado_data_validade: "11/11/1111"
      },
      cpf_cnpj: "11.111.111/1111-11",
      dados_cadastrais_pf: {
        ua_domicilio: "",
        endereco: "",
        bairro: "",
        situacao: "",
        cep: "",
        municipio: "",
        data_nascimento: "",
        codigo_ua: "",
        uf: "",
        normalizado_data_nascimento: ""
      },
      dados_cadastrais_pj_matriz: {
        ua_domicilio: "DERAT SAO PAULO-SP",
        codigo_ua: "11.111.11",
        endereco: "Endereço de Exemplo",
        bairro: "Bairro de Exemplo",
        situacao: "ATIVA",
        cep: "12345-000",
        municipio: "São Paulo",
        uf: "SP",
        data_abertura: "11/11/1111",
        normalizado_data_abetura: "",
        natureza_juridica: "111-1 - SOCIEDADE EMPRESARIA LIMITADA",
        porte_empresa: "Nome de Exemplo",
        data_inclusao_simples_nacional: "11/11/1111",
        normalizado_data_inclusao_simples_nacional: "11/11/1111",
        data_exclusao_simples_nacional: "11/11/1111",
        normalizado_data_exclusao_simples_nacional: "11/11/1111",
        responsavel: "111.111.111-11 - Nome de Exemplo"
      },
      data_hora_consulta: "11/11/1111 11:11:11",
      nome: "Nome de Exemplo",
      normalizado_cnpj: "11111111111111",
      normalizado_cpf: "",
      normalizado_data_hora_consulta: "11/11/1111 11:11:11",
      pendencias_procuradoria_geral: [
        {
          tipo: "Pendência - Inscrição (SIDA)",
          inscricao: "11.1.11.111111-11",
          receita: "1507-SIMPLES",
          inscrito_em: "26/07/2021",
          ajuizado_em: "Nome de Exemplo",
          processo: "11111.111.111/1111-11",
          tipo_devedor: "Nome de Exemplo",
          devedor_principal: "Nome de Exemplo",
          situacao: "ATIVA A SER COBRADA"
        }
      ],
      pendencias_receita_federal: [],
      socios_e_administradores: [
        {
          cpf_cnpj: "111.111.111-11",
          nome: "Nome de Exemplo",
          qualificacao: "SOCIO ADMINISTRADOR",
          situacao_cadastral: "REGULAR",
          cap_social: "25,00%",
          cap_volante: ""
        },
        {
          cpf_cnpj: "111.111.111-11",
          nome: "Nome de Exemplo",
          qualificacao: "SOCIO ADMINISTRADOR",
          situacao_cadastral: "REGULAR",
          cap_social: "25,00%",
          cap_volante: ""
        },
        {
          cpf_cnpj: "111.111.111-11",
          nome: "Nome de Exemplo",
          qualificacao: "SOCIO",
          situacao_cadastral: "REGULAR",
          cap_social: "25,00%",
          cap_volante: ""
        },
        {
          cpf_cnpj: "111.111.111-11",
          nome: "Nome de Exemplo",
          qualificacao: "SOCIO",
          situacao_cadastral: "REGULAR",
          cap_social: "25,00%",
          cap_volante: ""
        }
      ],
      tipo_documento: "cnpj",
      site_receipt: "https://www.exemplo.com/exemplo-de-url"
    }
  ],
  errors: [],
  site_receipts: [
    "https://www.exemplo.com/exemplo-de-url"
  ]
}

module.exports = { obj };