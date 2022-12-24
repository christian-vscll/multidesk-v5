const obj = {
  code: 200,
  code_message: "A requisição foi processada com sucesso.",
  header: {
    api_version: "v2",
    service: "receita-federal/cnpj",
    parameters: {
      cnpj: "11111111111111"
    },
    client_name: "Minha Empresa",
    token_name: "Token de Produção",
    billable: true,
    price: "0.2",
    requested_at: "2020-06-24T11:05:52.000-03:00",
    elapsed_time_in_milliseconds: 720,
    remote_ip: "111.111.111.111",
    signature: "U2FsdGVkX19nClE1lnkGSycBCstt17c90GGGYK7r3HcINNOAinDNeUVn3wADps+tyhGHprP17NqCruMOgEuLKQ=="
  },
  data_count: 1,
  data: [
    {
      abertura_data: "11/11/1111",
      atividade_economica: "11.11-1-11 - Consultoria em tecnologia da informação (Dispensada *)",
      atividade_economica_secundaria: "11.11-1-11 - Desenvolvimento de programas de computador sob encomenda (Dispensada *); 11.11-1-11 - Desenvolvimento e licenciamento de programas de computador customizáveis (Dispensada *); 11.11-1-11 - Desenvolvimento e licenciamento de programas de computador não-customizáveis; 11.11-1-11 - Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet (Dispensada *); 11.11-1-11 - Outras atividades de prestação de serviços de informação não especificadas anteriormente; 11.11-1-11 - Correspondentes de instituições financeiras; 11.11-1-11 - Corretores e agentes de seguros, de planos de previdência complementar e de saúde; 11.11-1-11 - Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica (Dispensada *); 11.11-1-11 - Serviços combinados de escritório e apoio administrativo (Dispensada *); 11.11-1-11 - Preparação de documentos e serviços especializados de apoio administrativo não especificados anteriormente (Dispensada *); 11.11-1-11 - Salas de acesso à internet (Dispensada *)",
      atividade_economica_secundaria_lista: [
        "11.11-1-11 - Desenvolvimento de programas de computador sob encomenda (Dispensada *)",
        "11.11-1-11 - Desenvolvimento e licenciamento de programas de computador customizáveis (Dispensada *)",
        "11.11-1-11 - Desenvolvimento e licenciamento de programas de computador não-customizáveis",
        "11.11-1-11 - Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet (Dispensada *)",
        "11.11-1-11 - Outras atividades de prestação de serviços de informação não especificadas anteriormente",
        "11.11-1-11 - Correspondentes de instituições financeiras",
        "11.11-1-11 - Corretores e agentes de seguros, de planos de previdência complementar e de saúde",
        "11.11-1-11 - Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica (Dispensada *)",
        "11.11-1-11 - Serviços combinados de escritório e apoio administrativo (Dispensada *)",
        "11.11-1-11 - Preparação de documentos e serviços especializados de apoio administrativo não especificados anteriormente (Dispensada *)",
        "11.11-1-11 - Salas de acesso à internet (Dispensada *)"
      ],
      capital_social: "R$10.000,00 (Dez mil reais)",
      cnpj: "11.111.111/1111-11",
      consulta_datahora: "11/11/1111 11:11:11",
      efr: "*****",
      email: "empresa@email.com",
      endereco_bairro: "Jardins",
      endereco_cep: "01311-300",
      endereco_complemento: "Apto 100",
      endereco_logradouro: "Avenida Paulista",
      endereco_municipio: "São Paulo",
      endereco_numero: "Avenida Paulista",
      endereco_uf: "SP",
      licenciamento_dispensado: [
        {
          atividade_economica: "",
          orgao: "Corpo de Bombeiros",
          abrangencia: "FEDERAL",
          condicoes: "Desde que as atividades sejam realizadas na residência do empreendedor, sem recepção de pessoas; ou em edificações diversas da residência, se a ocupação da atividade tiver ao todo até 200 m² (duzentos metros quadrados) e for realizada: em edificação que não tenha mais de 03 (três) pavimentos; em locais de reunião de público com lotação até 100 (cem) pessoas; em local sem subsolo com uso distinto de estacionamento; sem possuir líquido inflamável ou combustível acima de 1000 L (mil litros); e sem possuir gás liquefeito de petróleo (GLP) acima de 190 kg (cento e noventa quilogramas)."
        },
        {
          atividade_economica: "11.11-1/11 - Desenvolvimento e licenciamento de programas de computador customizáveis",
          orgao: "Vigilância Sanitária",
          abrangencia: "ESTADUAL",
          condicoes: "Desde que não haverá o desenvolvimento de softwares que realizam ou influenciam diretamente no diagnóstico, monitoramento, terapia (tratamento) para saúde"
        }
      ],
      matriz_filial: "MATRIZ",
      natureza_juridica: "111-1 - Sociedade Empresária Limitada",
      nome_fantasia: "Nome de Exemplo",
      normalizado_abertura_data: "11/11/1111",
      normalizado_capital_social: 10000.0,
      normalizado_cnpj: "11111111111111",
      normalizado_consulta_datahora: "11/11/1111 11:11:11",
      normalizado_endereco_cep: "01311-300",
      normalizado_situacao_cadastral_data: "11/11/1111",
      normalizado_situacao_especial_data: "",
      porte: "ME",
      qsa: [
        {
          nome: "Nome de Exemplo",
          qualificacao: "49-Sócio-Administrador",
          nome_representante_legal: "Nome de Exemplo",
          qualificacao_representante_legal: "Nome de Exemplo",
          pais_origem: "Nome de Exemplo"
        },
        {
          nome: "Nome de Exemplo",
          qualificacao: "22-Sócio",
          nome_representante_legal: "Nome de Exemplo",
          qualificacao_representante_legal: "Nome de Exemplo",
          pais_origem: "Nome de Exemplo"
        },
        {
          nome: "Nome de Exemplo",
          qualificacao: "22-Sócio",
          nome_representante_legal: "Nome de Exemplo",
          qualificacao_representante_legal: "Nome de Exemplo",
          pais_origem: "Nome de Exemplo"
        }
      ],
      razao_social: "Empresa XYZ",
      situacao_cadastral: "ATIVA",
      situacao_cadastral_data: "11/11/1111",
      situacao_cadastral_observacoes: "Exemplo de texto",
      situacao_especial: "********",
      situacao_especial_data: "********",
      telefone: "(11) 1111-1111",
      site_receipt: null
    }
  ],
  errors: [],
  site_receipts: []
}

module.exports = { obj };