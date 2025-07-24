// Dados simulados para 2024
const data2024 = {
  "total_registros": 2204,
            "periodo": {
                "inicio": "2024-01-01",
                "fim": "2024-12-31"
            },
            "bairros_atendidos": 110,
            "por_mes": [
                {"Mês": 1, "Mês_Nome": "January", "Quantidade": 163},
                {"Mês": 2, "Mês_Nome": "February", "Quantidade": 137},
                {"Mês": 3, "Mês_Nome": "March", "Quantidade": 485},
                {"Mês": 4, "Mês_Nome": "April", "Quantidade": 243},
                {"Mês": 5, "Mês_Nome": "May", "Quantidade": 156},
                {"Mês": 6, "Mês_Nome": "June", "Quantidade": 117},
                {"Mês": 7, "Mês_Nome": "July", "Quantidade": 131},
                {"Mês": 8, "Mês_Nome": "August", "Quantidade": 132},
                {"Mês": 9, "Mês_Nome": "September", "Quantidade": 125},
                {"Mês": 10, "Mês_Nome": "October", "Quantidade": 136},
                {"Mês": 11, "Mês_Nome": "November", "Quantidade": 153},
                {"Mês": 12, "Mês_Nome": "December", "Quantidade": 226}
            ],
            "por_categoria": {
                "Árvore": 1055,
                "Vistoria Técnica": 644,
                "Deslizamento": 377,
                "Muro com risco de queda": 41,
                "Dano estrutural": 38,
                "Dano em ponte": 13,
                "Rompimento de manilha": 12,
                "Alagamento": 11,
                "Infiltração": 5,
                "Solicitação de 2ª via de documento": 4,
                "Prorrogação de Prazo": 3,
                "Dano em Via Pública": 1
            },
            "por_bairro": {
                "Meudon": 139,
                "Albuquerque": 98,
                "São Pedro": 93,
                "Santa Cecília": 69,
                "Barra do Imbuí": 65,
                "Alto": 63,
                "Vargem Grande": 62,
                "Quebra Frascos": 59,
                "Vale da Revolta": 58,
                "Araras": 56
            },
            "por_area": {
                "1º Distrito": 1947,
                "2º Distrito": 93,
                "3º Distrito": 164,
            },
            "por_origem": {
                "Protocolo 199 Emergencial": 850,
                "Protocolo Presencial": 643,
                "Protocolo 1Doc": 508,
                "Protocolo E-ouve": 203
            },
            "por_ocorrencia": {
                "Avaliação de Risco": 1743,
                "Deslizamento": 377,
                "Dano estrutural": 38,
                "Dano em ponte": 13,
                "Rompimento de manilha": 12,
                "Alagamento": 11,
                "Infiltração": 5,
                "Solicitação de 2ª via de documento": 4,
                "Dano em Via Pública": 1
            }
};

// Dados simulados para 2025
const data2025 = {
              "total_registros": 803,
            "periodo": {
                "inicio": "2025-01-02",
                "fim": "2025-06-15"
            },
             "bairros_atendidos": 100,
            "por_mes": [
                { "Mês": 1, "Mês_Nome": "January", "Quantidade": 199 },
                { "Mês": 2, "Mês_Nome": "February", "Quantidade": 129 },
                { "Mês": 3, "Mês_Nome": "March", "Quantidade": 134 },
                { "Mês": 4, "Mês_Nome": "April", "Quantidade": 273 },
                { "Mês": 5, "Mês_Nome": "May", "Quantidade": 67 },
                { "Mês": 6, "Mês_Nome": "June", "Quantidade": 1 }
            ],
            "por_categoria": {
                "Árvore": 402,
                "Avaliação de Risco": 215,
                "Deslizamento": 81,
                "IPTU/Energia": 30,
                "Solicitação de 2ª via de documento": 20,
                "Muro com risco de queda": 15,
                "Dano em ponte": 13,
                "Rompimento de manilha": 11,
                "Alagamento": 6,
                "Infiltração": 5,
                "Dano estrutural": 5
            },
            "por_bairro": {
                "Alto": 38,
                "Albuquerque": 36,
                "São Pedro": 36,
                "Vargem Grande": 32,
                "Meudon": 30,
                "Parque do Imbuí": 28,
                "Várzea": 27,
                "Santa Cecília": 26,
                "Barra do Imbuí": 19,
                "Quebra Frascos": 17
            },
            "por_area": {
                "1º Distrito": 663,
                "2º Distrito": 58,
                "3º Distrito": 82,
            },
            "por_origem": {
                "Protocolo 199 Emergencial": 342,
                "Protocolo Presencial": 273,
                "Protocolo 1Doc/Documento": 117,
                "Protocolo E-Ouve": 71
            },
            "por_ocorrencia": {
                "Avaliação de Risco": 632,
                "Deslizamento": 81,
                "Vistoria Técnica": 30,
                "Solicitação de 2ª via de documento": 20,
                "Dano em ponte": 13,
                "Rompimento de manilha": 11,
                "Alagamento": 6,
                "Infiltração": 5,
                "Dano estrutural": 5
            }
};

// Simulação de delay de rede
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função principal da API
export const fetchDashboardData = async (year) => {
  // Simula delay de rede
  await delay(800 + Math.random() * 400);
  
  switch (year) {
    case '2024':
      return data2024;
    case '2025':
      return data2025;
    default:
      throw new Error(`Dados não disponíveis para o ano ${year}`);
  }
};

// Função para buscar anos disponíveis
export const fetchAvailableYears = async () => {
  await delay(200);
  return ['2024', '2025'];
};

// Função para buscar estatísticas resumidas
export const fetchSummaryStats = async () => {
  await delay(300);
  return {
    totalYears: 2,
    totalRecords: data2024.total_registros + data2025.total_registros,
    lastUpdate: new Date().toISOString()
  };
};

