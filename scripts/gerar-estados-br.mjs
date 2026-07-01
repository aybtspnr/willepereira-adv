#!/usr/bin/env node
/**
 * Gera cidades para TODOS os estados do Brasil
 * Foco nas cidades principais de cada estado (população > 50k ou capitais)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const contentDir = join(projectRoot, 'src', 'data', 'cidades-content')

if (!existsSync(contentDir)) mkdirSync(contentDir, { recursive: true })

// ═══ CIDADES POR ESTADO ═══
// Formato: { nome, porte, economia, populacao, regiao }
const estadosCidades = {
  'AC': {
    nome: 'Acre',
    capitais: ['Rio Branco'],
    cidades: [
      { nome: 'Cruzeiro do Sul', porte: 'media', economia: 'Comércio, Agricultura e Serviços', populacao: '85.000', regiao: 'Sul do Acre' },
      { nome: 'Sena Madureira', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '45.000', regiao: 'Centro-Sul do Acre' },
      { nome: 'Tarauacá', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '40.000', regiao: 'Interior do Acre' },
    ],
  },
  'AL': {
    nome: 'Alagoas',
    capitais: ['Maceió'],
    cidades: [
      { nome: 'Arapiraca', porte: 'media', economia: 'Agroindústria Canavieira, Comércio e Serviços', populacao: '230.000', regiao: 'Sul de Alagoas' },
      { nome: 'Penedo', porte: 'pequena', economia: 'Turismo Histórico, Comércio e Serviços', populacao: '35.000', regiao: 'Vale do São Francisco' },
      { nome: 'Palmeira dos Índios', porte: 'pequena', economia: 'Agricultura, Comércio e Serviços', populacao: '45.000', regiao: 'Agreste Alagoano' },
      { nome: 'Rio Largo', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '70.000', regiao: 'Metrópole de Maceió' },
    ],
  },
  'AP': {
    nome: 'Amapá',
    capitais: ['Macapá'],
    cidades: [
      { nome: 'Santana', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '120.000', regiao: 'Litoral do Amapá' },
      { nome: 'Laranjal do Jari', porte: 'pequena', economia: 'Mineração, Agricultura e Comércio', populacao: '50.000', regiao: 'Oeste do Amapá' },
    ],
  },
  'AM': {
    nome: 'Amazonas',
    capitais: ['Manaus'],
    cidades: [
      { nome: 'Parintins', porte: 'media', economia: 'Turismo, Pesca e Comércio', populacao: '120.000', regiao: 'Médio Amazonas' },
      { nome: 'Itacoatiara', porte: 'media', economia: 'Agricultura, Pesca e Comércio', populacao: '95.000', regiao: 'Leste Amazonense' },
      { nome: 'Manacapuru', porte: 'media', economia: 'Agricultura, Pecuária e Comércio', populacao: '85.000', regiao: 'Centro-Sul do Amazonas' },
      { nome: 'Tefé', porte: 'media', economia: 'Comércio, Serviços e Transporte Fluvial', populacao: '65.000', regiao: 'Médio Solimões' },
      { nome: 'Coari', porte: 'media', economia: 'Petróleo e Gás, Comércio e Serviços', populacao: '80.000', regiao: 'Centro-Oeste do Amazonas' },
    ],
  },
  'BA': {
    nome: 'Bahia',
    capitais: ['Salvador'],
    cidades: [
      { nome: 'Feira de Santana', porte: 'grande', economia: 'Indústria, Comércio e Agroindústria', populacao: '620.000', regiao: 'Centro-Norte da Bahia' },
      { nome: 'Vitória da Conquista', porte: 'media', economia: 'Agropecuária, Comércio e Serviços', populacao: '340.000', regiao: 'Sudoeste da Bahia' },
      { nome: 'Camaçari', porte: 'media', economia: 'Indústria Petroquímica, Comércio e Serviços', populacao: '300.000', regiao: 'Região Metropolitana de Salvador' },
      { nome: 'Ilhéus', porte: 'media', economia: 'Turismo, Cacau e Comércio', populacao: '180.000', regiao: 'Costa do Cacau' },
      { nome: 'Jequié', porte: 'media', economia: 'Agropecuária, Comércio e Serviços', populacao: '160.000', regiao: 'Sudoeste da Bahia' },
      { nome: 'Barreiras', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '150.000', regiao: 'Oeste Baiano' },
      { nome: 'Teixeira de Freitas', porte: 'media', economia: 'Indústria, Comércio e Agropecuária', populacao: '110.000', regiao: 'Sul da Bahia' },
      { nome: 'Alagoinhas', porte: 'media', economia: 'Indústria, Comércio e Agropecuária', populacao: '100.000', regiao: 'Norte Baiano' },
      { nome: 'Porto Seguro', porte: 'media', economia: 'Turismo, Comércio e Serviços', populacao: '150.000', regiao: 'Costa do Descobrimento' },
      { nome: 'Juazeiro', porte: 'media', economia: 'Agronegócio, Comércio e Irrigação', populacao: '220.000', regiao: 'Vale do São Francisco' },
      { nome: 'Paulo Afonso', porte: 'media', economia: 'Energia Hidrelétrica, Comércio e Serviços', populacao: '120.000', regiao: 'Vale do São Francisco' },
    ],
  },
  'CE': {
    nome: 'Ceará',
    capitais: ['Fortaleza'],
    cidades: [
      { nome: 'Caucaia', porte: 'grande', economia: 'Indústria, Comércio e Petróleo', populacao: '370.000', regiao: 'Região Metropolitana de Fortaleza' },
      { nome: 'Juazeiro do Norte', porte: 'media', economia: 'Indústria Calçadista, Comércio e Serviços', populacao: '280.000', regiao: 'Cariri' },
      { nome: 'Maracanaú', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000', regiao: 'Região Metropolitana de Fortaleza' },
      { nome: 'Sobral', porte: 'media', economia: 'Indústria, Comércio e Agropecuária', populacao: '210.000', regiao: 'Norte Cearense' },
      { nome: 'Crato', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '135.000', regiao: 'Cariri' },
      { nome: 'Itapipoca', porte: 'media', economia: 'Agricultura, Pecuária e Comércio', populacao: '65.000', regiao: 'Litoral Oeste do Ceará' },
      { nome: 'Maranguape', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '120.000', regiao: 'Região Metropolitana de Fortaleza' },
      { nome: 'Quixadá', porte: 'media', economia: 'Agricultura, Pecuária e Comércio', popução: '80.000', regiao: 'Sertão Central' },
    ],
  },
  'DF': {
    nome: 'Distrito Federal',
    capitais: ['Brasília'],
    cidades: [
      { nome: 'Ceilândia', porte: 'grande', economia: 'Comércio, Serviços e Administrativo', populacao: '400.000', regiao: 'Região Administrativa de Ceilândia' },
      { nome: 'Taguatinga', porte: 'grande', economia: 'Comércio, Serviços e Administrativo', populacao: '350.000', regiao: 'Região Administrativa de Taguatinga' },
      { nome: 'Samambaia', porte: 'media', economia: 'Comércio, Serviços e Administrativo', populacao: '280.000', regiao: 'Região Administrativa de Samambaia' },
      { nome: 'Plano Piloto', porte: 'media', economia: 'Administrativo, Serviços e Comércio', populacao: '120.000', regiao: 'Região Administrativa do Plano Piloto' },
    ],
  },
  'ES': {
    nome: 'Espírito Santo',
    capitais: ['Vitória'],
    cidades: [
      { nome: 'Vila Velha', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '500.000', regiao: 'Grande Vitória' },
      { nome: 'Serra', porte: 'grande', economia: 'Indústria, Portuária e Comércio', populacao: '530.000', regiao: 'Região Metropolitana' },
      { nome: 'Cariacica', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '380.000', regiao: 'Grande Vitória' },
      { nome: 'Linhares', porte: 'media', economia: 'Agricultura, Indústria e Comércio', populacao: '180.000', regiao: 'Norte Capixaba' },
      { nome: 'Cachoeiro de Itapemirim', porte: 'media', economia: 'Indústria de Mármore, Comércio e Serviços', populacao: '210.000', regiao: 'Sul Capixaba' },
      { nome: 'Colatina', porte: 'media', economia: 'Indústria, Agricultura e Comércio', populacao: '120.000', regiao: 'Norte Capixaba' },
      { nome: 'Guarapari', porte: 'media', economia: 'Turismo, Comércio e Indústria', populacao: '110.000', regiao: 'Litoral Norte do ES' },
      { nome: 'São Mateus', porte: 'media', economia: 'Agricultura, Portuária e Comércio', populacao: '130.000', regiao: 'Norte Capixaba' },
    ],
  },
  'GO': {
    nome: 'Goiás',
    capitais: ['Goiânia'],
    cidades: [
      { nome: 'Aparecida de Goiânia', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '590.000', regiao: 'Região Metropolitana de Goiânia' },
      { nome: 'Anápolis', porte: 'media', economia: 'Indústria Farmacêutica, Comércio e Serviços', populacao: '390.000', regiao: 'Centro Goiano' },
      { nome: 'Rio Verde', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '240.000', regiao: 'Sudoeste Goiano' },
      { nome: 'Luziânia', porte: 'media', economia: 'Comércio, Serviços e Construção Civil', populacao: '210.000', regiao: 'Entorno de Brasília' },
      { nome: 'Águas Lindas de Goiás', porte: 'media', economia: 'Mineração, Comércio e Serviços', populacao: '65.000', regiao: 'Entorno de Brasília' },
      { nome: 'Itumbiara', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '105.000', regiao: 'Sul Goiano' },
      { nome: 'Jataí', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '105.000', regiao: 'Sudoeste Goiano' },
      { nome: 'Catalão', porte: 'media', economia: 'Mineração, Indústria e Comércio', populacao: '120.000', regiao: 'Sudoeste Goiano' },
      { nome: 'Planaltina', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '95.000', regiao: 'Norte Goiano' },
    ],
  },
  'MA': {
    nome: 'Maranhão',
    capitais: ['São Luís'],
    cidades: [
      { nome: 'Imperatriz', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '260.000', regiao: 'Sul Maranhense' },
      { nome: 'Timon', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '160.000', regiao: 'Sul Maranhense' },
      { nome: 'Caxias', porte: 'media', economia: 'Agricultura, Pecuária e Comércio', populacao: '160.000', regiao: 'Leste Maranhense' },
      { nome: 'Bacabal', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '105.000', regiao: 'Centro Maranhense' },
      { nome: 'Codó', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '45.000', regiao: 'Centro Maranhense' },
      { nome: 'Paco do Lumiar', porte: 'media', economia: 'Comércio, Serviços e Agricultura', populacao: '120.000', regiao: 'Região Metropolitana de São Luís' },
    ],
  },
  'MT': {
    nome: 'Mato Grosso',
    capitais: ['Cuiabá'],
    cidades: [
      { nome: 'Várzea Grande', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '290.000', regiao: 'Região Metropolitana de Cuiabá' },
      { nome: 'Rondonópolis', porte: 'media', economia: 'Agronegócio, Comércio e Indústria', populacao: '240.000', regiao: 'Sul Mato-Grossense' },
      { nome: 'Sinop', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '140.000', regiao: 'Norte Mato-Grossense' },
      { nome: 'Sorriso', porte: 'media', economia: 'Agronegócio, Armazenagem e Comércio', populacao: '100.000', regiao: 'Norte Mato-Grossense' },
      { nome: 'Primavera do Leste', porte: 'media', economia: 'Agronegócio, Mineração e Comércio', populacao: '110.000', regiao: 'Leste Mato-Grossense' },
      { nome: 'Tangará da Serra', porte: 'media', economia: 'Agricultura, Indústria e Comércio', populacao: '110.000', regiao: 'Centro-Sul Mato-Grossense' },
      { nome: 'Cáceres', porte: 'media', economia: 'Comércio, Pecuária e Serviços', populacao: '95.000', regiao: 'Oeste Mato-Grossense' },
    ],
  },
  'MS': {
    nome: 'Mato Grosso do Sul',
    capitais: ['Campo Grande'],
    cidades: [
      { nome: 'Dourados', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '225.000', regiao: 'Sul Mato-Grossense' },
      { nome: 'Três Lagoas', porte: 'media', economia: 'Indústria Celulose, Comércio e Serviços', populacao: '120.000', regiao: 'Leste Mato-Grossense' },
      { nome: 'Corumbá', porte: 'media', economia: 'Pecuária, Mineração e Comércio', populacao: '115.000', regiao: 'Oeste Mato-Grossense' },
      { nome: 'Ponta Porã', porte: 'media', economia: 'Comércio Fronteiriço, Agropecuária e Serviços', populacao: '95.000', regiao: 'Fronteira com o Paraguai' },
      { nome: 'Naviraí', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '55.000', regiao: 'Sul Mato-Grossense' },
    ],
  },
  'MG': {
    nome: 'Minas Gerais',
    capitais: ['Belo Horizonte'],
    cidades: [
      { nome: 'Uberlândia', porte: 'grande', economia: 'Comércio, Serviços e Agronegócio', populacao: '700.000', regiao: 'Triângulo Mineiro' },
      { nome: 'Contagem', porte: 'grande', economia: 'Indústria Automobilística, Comércio e Serviços', populacao: '670.000', regiao: 'Região Metropolitana de BH' },
      { nome: 'Juiz de Fora', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '570.000', regiao: 'Zona da Mata' },
      { nome: 'Betim', porte: 'grande', economia: 'Indústria Automobilística (FIAT), Comércio e Serviços', populacao: '440.000', regiao: 'Região Metropolitana de BH' },
      { nome: 'Montes Claros', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '420.000', regiao: 'Norte de Minas' },
      { nome: 'Ribeirão das Neves', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '340.000', regiao: 'Região Metropolitana de BH' },
      { nome: 'Uberaba', porte: 'media', economia: 'Agropecuária, Indústria e Comércio', populacao: '340.000', regiao: 'Triângulo Mineiro' },
      { nome: 'Governador Valadares', porte: 'media', economia: 'Mineração, Comércio e Serviços', populacao: '280.000', regiao: 'Leste de Minas' },
      { nome: 'Ipatinga', porte: 'media', economia: 'Indústria Siderúrgica (USIMINAS), Comércio e Serviços', populacao: '260.000', regiao: 'Vale do Aço' },
      { nome: 'Sete Lagoas', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '240.000', regiao: 'Centro-Norte de Minas' },
      { nome: 'Divinópolis', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000', regiao: 'Centro-Oeste de Minas' },
      { nome: 'Poços de Caldas', porte: 'media', economia: 'Indústria, Turismo Termal e Comércio', populacao: '180.000', regiao: 'Sul de Minas' },
      { nome: 'Lavras', porte: 'media', economia: 'Agricultura, Indústria e Comércio', populacao: '105.000', regiao: 'Sul de Minas' },
      { nome: 'Varginha', porte: 'media', economia: 'Indústria Automobilística (Troller), Comércio e Serviços', populacao: '140.000', regiao: 'Sul de Minas' },
      { nome: 'Patos de Minas', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '150.000', regiao: 'Noroeste de Minas' },
      { nome: 'Barbacena', porte: 'media', economia: 'Mineração, Agricultura e Comércio', populacao: '130.000', regiao: 'Zona da Mata' },
      { nome: 'Passos', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '140.000', regiao: 'Sul de Minas' },
      { nome: 'Santa Luzia', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '220.000', regiao: 'Região Metropolitana de BH' },
    ],
  },
  'PA': {
    nome: 'Pará',
    capitais: ['Belém'],
    cidades: [
      { nome: 'Ananindeua', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '540.000', regiao: 'Região Metropolitana de Belém' },
      { nome: 'Santarém', porte: 'media', economia: 'Agronegócio, Comércio e Transporte Fluvial', populacao: '310.000', regiao: 'Médio Amazonas' },
      { nome: 'Marabá', porte: 'media', economia: 'Mineração, Agronegócio e Comércio', populacao: '290.000', regiao: 'Sudeste do Pará' },
      { nome: 'Castanhal', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '200.000', regiao: 'Nordeste do Pará' },
      { nome: 'Parauapebas', porte: 'media', economia: 'Mineração (Carajás), Comércio e Serviços', populacao: '210.000', regiao: 'Sudeste do Pará' },
      { nome: 'Abaetetuba', porte: 'media', economia: 'Agricultura, Pesca e Comércio', populacao: '150.000', regiao: 'Baixo Tocantins' },
    ],
  },
  'PB': {
    nome: 'Paraíba',
    capitais: ['João Pessoa'],
    cidades: [
      { nome: 'Campina Grande', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '410.000', regiao: 'Agreste Paraibano' },
      { nome: 'Santa Rita', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '130.000', regiao: 'Região Metropolitana de João Pessoa' },
      { nome: 'Patos', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '110.000', regiao: 'Sertão Paraibano' },
      { nome: 'Bayeux', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '60.000', regiao: 'Região Metropolitana de João Pessoa' },
    ],
  },
  'PR': {
    nome: 'Paraná',
    capitais: ['Curitiba'],
    cidades: [
      { nome: 'Londrina', porte: 'grande', economia: 'Agronegócio, Indústria e Comércio', populacao: '580.000', regiao: 'Norte Paranaense' },
      { nome: 'Maringá', porte: 'grande', economia: 'Agronegócio, Indústria e Comércio', populacao: '440.000', regiao: 'Norte Paranaense' },
      { nome: 'Ponta Grossa', porte: 'grande', economia: 'Indústria, Agronegócio e Comércio', populacao: '360.000', regiao: 'Centro-Sul Paranaense' },
      { nome: 'Cascavel', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '330.000', regiao: 'Oeste Paranaense' },
      { nome: 'São José dos Pinhais', porte: 'grande', economia: 'Indústria Automobilística (Renault/Audi), Comércio e Serviços', populacao: '350.000', regiao: 'Região Metropolitana de Curitiba' },
      { nome: 'Foz do Iguaçu', porte: 'media', economia: 'Turismo (Cataratas), Comércio e Serviços', populacao: '260.000', regiao: 'Oeste Paranaense' },
      { nome: 'Colombo', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000', regiao: 'Região Metropolitana de Curitiba' },
      { nome: 'Guarapuava', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '180.000', regiao: 'Centro-Sul Paranaense' },
      { nome: 'Paranaguá', porte: 'media', economia: 'Portuária, Turismo e Comércio', populacao: '150.000', regiao: 'Litoral Paranaense' },
      { nome: 'Araucária', porte: 'media', economia: 'Indústria Petroquímica (Petrobras), Comércio e Serviços', populacao: '140.000', regiao: 'Região Metropolitana de Curitiba' },
      { nome: 'Toledo', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '140.000', regiao: 'Oeste Paranaense' },
      { nome: 'Apucarana', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '130.000', regiao: 'Norte Paranaense' },
    ],
  },
  'PE': {
    nome: 'Pernambuco',
    capitais: ['Recife'],
    cidades: [
      { nome: 'Jaboatão dos Guararapes', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '700.000', regiao: 'Região Metropolitana de Recife' },
      { nome: 'Olinda', porte: 'media', economia: 'Turismo, Comércio e Serviços', populacao: '390.000', regiao: 'Região Metropolitana de Recife' },
      { nome: 'Caruaru', porte: 'media', economia: 'Indústria, Comércio e Agropecuária', populacao: '360.000', regiao: 'Agreste Pernambucano' },
      { nome: 'Petrolina', porte: 'media', economia: 'Agronegócio Irrigado, Comércio e Serviços', populacao: '350.000', regiao: 'Vale do São Francisco' },
      { nome: 'Paulista', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '340.000', regiao: 'Região Metropolitana de Recife' },
      { nome: 'Cabo de Santo Agostinho', porte: 'media', economia: 'Indústria Portuária, Comércio e Serviços', populacao: '200.000', regiao: 'Região Metropolitana de Recife' },
      { nome: 'Garanhuns', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '140.000', regiao: 'Agreste Pernambucano' },
      { nome: 'Vitória de Santo Antão', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '140.000', regiao: 'Zona da Mata Norte' },
    ],
  },
  'PI': {
    nome: 'Piauí',
    capitais: ['Teresina'],
    cidades: [
      { nome: 'Parnaíba', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '150.000', regiao: 'Litoral Oeste do Piauí' },
      { nome: 'Picos', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '80.000', regiao: 'Sul Piauiense' },
      { nome: 'Floriano', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '60.000', regiao: 'Médio Parnaíba' },
    ],
  },
  'RJ': {
    nome: 'Rio de Janeiro',
    capitais: ['Rio de Janeiro'],
    cidades: [
      { nome: 'São Gonçalo', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '1.100.000', regiao: 'Região Metropolitana do RJ' },
      { nome: 'Duque de Caxias', porte: 'grande', economia: 'Indústria Petroquímica, Comércio e Serviços', populacao: '920.000', regiao: 'Região Metropolitana do RJ' },
      { nome: 'Nova Iguaçu', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '820.000', regiao: 'Baixada Fluminense' },
      { nome: 'Niterói', porte: 'grande', economia: 'Indústria Naval, Comércio e Serviços', populacao: '520.000', regiao: 'Baía de Guanabara' },
      { nome: 'Campos dos Goytacazes', porte: 'media', economia: 'Petróleo, Agricultura e Comércio', populacao: '500.000', regiao: 'Norte Fluminense' },
      { nome: 'Belford Roxo', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '500.000', regiao: 'Baixada Fluminense' },
      { nome: 'São João de Meriti', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '460.000', regiao: 'Baixada Fluminense' },
      { nome: 'Petrópolis', porte: 'media', economia: 'Turismo, Indústria e Comércio', populacao: '310.000', regiao: 'Serrana' },
      { nome: 'Volta Redonda', porte: 'media', economia: 'Indústria Siderúrgica (CSN), Comércio e Serviços', populacao: '270.000', regiao: 'Vale do Paraíba' },
      { nome: 'Macae', porte: 'media', economia: 'Petróleo e Gás, Comércio e Serviços', populacao: '260.000', regiao: 'Litoral Norte Fluminense' },
      { nome: 'Angra dos Reis', porte: 'media', economia: 'Turismo, Petróleo e Comércio', populacao: '210.000', regiao: 'Costa Verde' },
      { nome: 'Cabo Frio', porte: 'media', economia: 'Turismo, Comércio e Serviços', populacao: '230.000', regiao: 'Litoral Sul Fluminense' },
    ],
  },
  'RN': {
    nome: 'Rio Grande do Norte',
    capitais: ['Natal'],
    cidades: [
      { nome: 'Mossoró', porte: 'media', economia: 'Petróleo, Agronegócio e Comércio', populacao: '300.000', regiao: 'Oeste Potiguar' },
      { nome: 'Parnamirim', porte: 'media', economia: 'Comércio, Serviços e Tecnologia', populacao: '270.000', regiao: 'Região Metropolitana de Natal' },
      { nome: 'São Gonçalo do Amarante', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '95.000', regiao: 'Região Metropolitana de Natal' },
      { nome: 'Macaíba', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '85.000', regiao: 'Agreste Potiguar' },
    ],
  },
  'RO': {
    nome: 'Rondônia',
    capitais: ['Porto Velho'],
    cidades: [
      { nome: 'Ji-Paraná', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '130.000', regiao: 'Leste Rondoniense' },
      { nome: 'Ariquemes', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '110.000', regiao: 'Norte de Rondônia' },
      { nome: 'Vilhena', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '100.000', regiao: 'Sul de Rondônia' },
      { nome: 'Cacoal', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '85.000', regiao: 'Leste Rondoniense' },
    ],
  },
  'RR': {
    nome: 'Roraima',
    capitais: ['Boa Vista'],
    cidades: [
      { nome: 'Rorainópolis', porte: 'pequena', economia: 'Mineração, Agricultura e Comércio', populacao: '30.000', regiao: 'Norte de Roraima' },
      { nome: 'Caracaraí', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '22.000', regiao: 'Interior de Roraima' },
    ],
  },
  'RS': {
    nome: 'Rio Grande do Sul',
    capitais: ['Porto Alegre'],
    cidades: [
      { nome: 'Caxias do Sul', porte: 'grande', economia: 'Indústria, Vinicultura e Comércio', populacao: '520.000', regiao: 'Serra Gaúcha' },
      { nome: 'Canoas', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '350.000', regiao: 'Região Metropolitana de POA' },
      { nome: 'Pelotas', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '340.000', regiao: 'Sul Gaúcho' },
      { nome: 'Santa Maria', porte: 'grande', economia: 'Agronegócio, Comércio e Serviços', populacao: '290.000', regiao: 'Centro-Oeste Gaúcho' },
      { nome: 'Gravataí', porte: 'media', economia: 'Indústria Automobilística (GM), Comércio e Serviços', populacao: '290.000', regiao: 'Região Metropolitana de POA' },
      { nome: 'Viamão', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '250.000', regiao: 'Região Metropolitana de POA' },
      { nome: 'Novo Hamburgo', porte: 'media', economia: 'Indústria Calçadista, Comércio e Serviços', populacao: '270.000', regiao: 'Vale dos Sinos' },
      { nome: 'São Leopoldo', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000', regiao: 'Vale dos Sinos' },
      { nome: 'Rio Grande', porte: 'media', economia: 'Portuária, Petróleo e Comércio', populacao: '210.000', regiao: 'Extremo Sul Gaúcho' },
      { nome: 'Passo Fundo', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '200.000', regiao: 'Norte Gaúcho' },
      { nome: 'Sapucaia do Sul', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '140.000', regiao: 'Vale dos Sinos' },
      { nome: 'Bento Gonçalves', porte: 'media', economia: 'Vinicultura, Indústria e Comércio', populacao: '120.000', regiao: 'Serra Gaúcha' },
      { nome: 'Erechim', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '110.000', regiao: 'Norte Gaúcho' },
      { nome: 'Lajeado', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '95.000', regiao: 'Vale do Taquari' },
    ],
  },
  'SC': {
    nome: 'Santa Catarina',
    capitais: [], // Já coberto
    cidades: [], // Já coberto
  },
  'SE': {
    nome: 'Sergipe',
    capitais: ['Aracaju'],
    cidades: [
      { nome: 'Nossa Senhora do Socorro', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '200.000', regiao: 'Região Metropolitana de Aracaju' },
      { nome: 'Lagarto', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '110.000', regiao: 'Agreste Sergipano' },
      { nome: 'Itabaiana', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '95.000', regiao: 'Agreste Sergipano' },
    ],
  },
  'SP': {
    nome: 'São Paulo',
    capitais: ['São Paulo'],
    cidades: [
      { nome: 'Guarulhos', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '1.400.000', regiao: 'Grande São Paulo' },
      { nome: 'Campinas', porte: 'grande', economia: 'Tecnologia, Indústria e Comércio', populacao: '1.200.000', regiao: 'Centro-Oeste Paulista' },
      { nome: 'São Bernardo do Campo', porte: 'grande', economia: 'Indústria Automobilística, Comércio e Serviços', populacao: '840.000', regiao: 'Grande São Paulo' },
      { nome: 'Santo André', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '720.000', regiao: 'ABC Paulista' },
      { nome: 'São José dos Campos', porte: 'grande', economia: 'Tecnologia (EMBRAER), Indústria e Comércio', populacao: '730.000', regiao: 'Vale do Paraíba' },
      { nome: 'Osasco', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '690.000', regiao: 'Grande São Paulo' },
      { nome: 'Santo Amaro da Imperatriz', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '670.000', regiao: 'ABC Paulista' },
      { nome: 'Sorocaba', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '690.000', regiao: 'Centro-Oeste Paulista' },
      { nome: 'Ribeirão Preto', porte: 'grande', economia: 'Agronegócio, Indústria e Comércio', populacao: '720.000', regiao: 'Norte Paulista' },
      { nome: 'São José do Rio Preto', porte: 'grande', economia: 'Agronegócio, Indústria e Comércio', populacao: '460.000', regiao: 'Norte Paulista' },
      { nome: 'Bauru', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '380.000', regiao: 'Centro-Oeste Paulista' },
      { nome: 'Jundiaí', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '430.000', regiao: 'Centro-Norte Paulista' },
      { nome: 'Piracicaba', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '410.000', regiao: 'Centro-Oeste Paulista' },
      { nome: 'Franca', porte: 'media', economia: 'Indústria Calçadista, Comércio e Serviços', populacao: '340.000', regiao: 'Norte Paulista' },
      { nome: 'Marília', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '240.000', regiao: 'Centro-Oeste Paulista' },
      { nome: 'Presidente Prudente', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '230.000', regiao: 'Oeste Paulista' },
      { nome: 'Araraquara', porte: 'media', economia: 'Indústria, Agronegócio e Comércio', populacao: '240.000', regiao: 'Centro-Norte Paulista' },
      { nome: 'São Carlos', porte: 'media', economia: 'Tecnologia, Indústria e Comércio', populacao: '250.000', regiao: 'Centro-Oeste Paulista' },
      { nome: 'Taubaté', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '310.000', regiao: 'Vale do Paraíba' },
      { nome: 'Votorantim', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '130.000', regiao: 'Centro-Oeste Paulista' },
      { nome: 'Mauá', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '460.000', regiao: 'Grande São Paulo' },
      { nome: 'Diadema', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '410.000', regiao: 'Grande São Paulo' },
      { nome: 'Carapicuíba', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '400.000', regiao: 'Grande São Paulo' },
      { nome: 'Cotia', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000', regiao: 'Grande São Paulo' },
      { nome: 'Embu das Artes', porte: 'media', economia: 'Artesanato, Comércio e Serviços', populacao: '270.000', regiao: 'Grande São Paulo' },
    ],
  },
  'TO': {
    nome: 'Tocantins',
    capitais: ['Palmas'],
    cidades: [
      { nome: 'Araguaína', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '180.000', regiao: 'Norte Tocantinense' },
      { nome: 'Gurupi', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '90.000', regiao: 'Sul Tocantinense' },
      { nome: 'Porto Nacional', porte: 'media', economia: 'Mineração, Comércio e Serviços', populacao: '55.000', regiao: 'Centro Tocantinense' },
    ],
  },
}

// ═══ DADOS REGIONAIS POR UF ═══
const dadosUF = {
  'AC': { contexto: 'O Acre é um estado amazônico com economia baseada em castanha-do-pará, pecuária e comércio. A/fronteira com o Peru e a Bolívia gera demandas jurídicas específicas de comércio exterior e imigração.', desafios: 'Questões ambientais são frequentes devido à proximidade com a floresta amazônica. O comércio fronteiriço gera demandas trabalhistas e consumeristas.' },
  'AL': { contexto: 'Alagoas é um estado litorâneo com economia baseada em cana-de-açúcar, turismo e comércio. Maceió é o centro econômico e administrativo.', desafios: 'A indústria canavieira gera demandas trabalhistas e ambientais. O turismo litorâneo gera questões consumeristas.' },
  'AP': { contexto: 'O Amapá é um estado amazônico com economia baseada em mineração, comércio e serviços públicos. Macapá é o centro econômico.', desafios: 'Questões ambientais e de terras indígenas são frequentes. O comércio gerado pela mineração traz demandas trabalhistas.' },
  'AM': { contexto: 'O Amazonas é o maior estado do Brasil, com economia baseada em mineração, petróleo e comércio. Manaus é o centro econômico e industrial.', desafios: 'Questões ambientais são críticas devido à Amazônia. O comércio livre gera demandas consumeristas. A Zona Franca de Manaus traz questões tributárias.' },
  'BA': { contexto: 'A Bahia é o maior estado do Nordeste, com economia diversificada incluindo petróleo, turismo, agropecuária e indústria.', desafios: 'O turismo gera demandas consumeristas. A indústria petrolífera gera questões ambientais e trabalhistas. A desigualdade social traz demandas previdenciárias.' },
  'CE': { contexto: 'O Ceará é um estado nordestino com economia diversificada incluindo turismo, indústria e agropecuária. Fortaleza é o centro econômico.', desafios: 'O turismo litorâneo gera questões consumeristas. A indústria calçadista gera demandas trabalhistas. A seca recorrente traz questões ambientais.' },
  'DF': { contexto: 'O Distrito Federal abriga a capital federal e possui a maior renda per capita do Brasil. A economia é baseada em serviços públicos, comércio e tecnologia.', desafios: 'A alta concentração de servidores públicos gera demandas trabalhistas específicas. O comércio intenso gera questões consumeristas. O mercado imobiliário é aquecido.' },
  'ES': { contexto: 'O Espírito Santo é um estado litorâneo com economia baseada em indústria siderúrgica, petróleo e turismo. Vitória é o centro econômico.', desafios: 'A indústria siderúrgica gera demandas trabalhistas e ambientais. O petróleo traz questões ambientais. O turismo gera demandas consumeristas.' },
  'GO': { contexto: 'Goiás é um estado do Centro-Oeste com economia baseada em agronegócio, mineração e serviços. Goiânia é o centro econômico.', desafios: 'O agronegócio gera demandas trabalhistas e ambientais. A mineração traz questões ambientais. O crescimento urbano gera questões imobiliárias.' },
  'MA': { contexto: 'O Maranhão é um estado nordestino com economia baseada em agropecuária, comércio e serviços. São Luís é o centro econômico.', desafios: 'A baixa renda gera muitas demandas previdenciárias e assistenciais. O comércio gera questões consumeristas. A infraestrutura precária traz desafios.' },
  'MT': { contexto: 'O Mato Grosso é um estado do Centro-Oeste com economia baseada em agronegócio (soja, milho, algodão) e mineração. Cuiabá é o centro econômico.', desafios: 'O agronegócio gera demandas trabalhistas e ambientais. A mineração traz questões ambientais. O crescimento acelerado gera questões urbanísticas.' },
  'MS': { contexto: 'O Mato Grosso do Sul é um estado do Centro-Oeste com economia baseada em agronegócio, pecuária e indústria. Campo Grande é o centro econômico.', desafios: 'O agronegócio gera demandas trabalhistas e ambientais. A pecuária traz questões ambientais. O turismo no Pantanal gera demandas consumeristas.' },
  'MG': { contexto: 'Minas Gerais é o segundo maior estado do Brasil, com economia diversificada incluindo mineração, indústria, agronegócio e serviços. BH é o centro econômico.', desafios: 'A mineração gera questões ambientais graves (como a rompimento de barragens). A indústria gera demandas trabalhistas. O mercado imobiliário é aquecido.' },
  'PA': { contexto: 'O Pará é um estado amazônico com economia baseada em mineração, petróleo e comércio. Belém é o centro econômico.', desafios: 'Questões ambientais são críticas devido à Amazônia. A mineração gera demandas trabalhistas e ambientais. O comércio gera questões consumeristas.' },
  'PB': { contexto: 'A Paraíba é um estado nordestino com economia baseada em indústria, comércio e agropecuária. João Pessoa é o centro econômico.', desafios: 'A indústria têxtil gera demandas trabalhistas. O comércio gera questões consumeristas. A seca recorrente traz questões ambientais.' },
  'PR': { contexto: 'O Paraná é um estado do Sul com economia diversificada incluindo agronegócio, indústria e serviços. Curitiba é o centro econômico.', desafios: 'O agronegócio gera demandas trabalhistas e ambientais. A indústria automobilística traz questões trabalhistas específicas. O turismo gera demandas consumeristas.' },
  'PE': { contexto: 'Pernambuco é um estado nordestino com economia diversificada incluindo petróleo, turismo, indústria e agropecuária. Recife é o centro econômico.', desafios: 'O petróleo gera questões ambientais e trabalhistas. O turismo gera demandas consumeristas. A desigualdade social traz demandas previdenciárias.' },
  'PI': { contexto: 'O Piauí é um estado nordestino com economia baseada em agropecuária, comércio e serviços. Teresina é o centro econômico.', desafios: 'A baixa renda gera muitas demandas previdenciárias e assistenciais. O comércio gera questões consumeristas. A seca recorrente traz desafios.' },
  'RJ': { contexto: 'O Rio de Janeiro é um estado do Sudeste com economia diversificada incluindo petróleo, turismo, indústria e serviços. A capital é o centro econômico.', desafios: 'O petróleo gera questões ambientais e trabalhistas. O turismo gera demandas consumeristas. A violência urbana traz desafios. O mercado imobiliário é complexo.' },
  'RN': { contexto: 'O Rio Grande do Norte é um estado nordestino com economia baseada em petróleo, turismo e agropecuária. Natal é o centro econômico.', desafios: 'O petróleo gera questões ambientais e trabalhistas. O turismo gera demandas consumeristas. A seca recorrente traz desafios.' },
  'RO': { contexto: 'Rondônia é um estado amazônico com economia baseada em agronegócio e mineração. Porto Velho é o centro econômico.', desafios: 'Questões ambientais são frequentes devido ao desmatamento. O agronegócio gera demandas trabalhistas. A mineração traz questões ambientais.' },
  'RR': { contexto: 'Roraima é o estado mais ao norte do Brasil, com economia baseada em mineração, comércio e serviços públicos. Boa Vista é o centro econômico.', desafios: 'Questões ambientais e de terras indígenas são frequentes. O comércio fronteiriço gera demandas trabalhistas e consumeristas.' },
  'RS': { contexto: 'O Rio Grande do Sul é o estado mais ao sul do Brasil, com economia diversificada incluindo indústria, agronegócio e serviços. Porto Alegre é o centro econômico.', desafios: 'A indústria gera demandas trabalhistas. O agronegócio traz questões ambientais. As enchentes recorrentes geram demandas de seguros e indenização.' },
  'SC': { contexto: 'Santa Catarina é um estado do Sul com economia diversificada incluindo indústria, agronegócio e turismo. Florianópolis é a capital.', desafios: 'A indústria gera demandas trabalhistas. O turismo gera questões consumeristas. O crescimento econômico traz desafios urbanísticos.' },
  'SE': { contexto: 'Sergipe é o menor estado do Brasil, com economia baseada em indústria, comércio e agropecuária. Aracaju é o centro econômico.', desafios: 'A indústria gera demandas trabalhistas. O comércio gera questões consumeristas. A baixa renda traz demandas previdenciárias.' },
  'SP': { contexto: 'São Paulo é o maior e mais rico estado do Brasil, com economia diversificada incluindo indústria, serviços, tecnologia e agronegócio. A capital é o maior centro econômico da América Latina.', desafios: 'A imensa diversidade econômica gera demandas por todas as áreas do direito. O mercado de trabalho é o maior do país, gerando enorme demanda trabalhista. O mercado imobiliário é o mais complexo do Brasil.' },
  'TO': { contexto: 'O Tocantins é um estado do Centro-Norte com economia baseada em agronegócio e serviços. Palmas é a capital e centro econômico.', desafios: 'O agronegócio gera demandas trabalhistas e ambientais. O crescimento urbano traz questões imobiliárias. A infraestrutura precária gera desafios.' },
}

// ═══ GERADOR DE CONTEÚDO ═══
function slugify(nome) {
  return nome.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function gerarConteudo(cidade, uf) {
  const dados = dadosUF[uf] || dadosUF['SP']
  const hash = cidade.nome.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  
  const heroTitles = [
    `Advogado em ${cidade.nome}: Assessoria Jurídica Especializada`,
    `Direito em ${cidade.nome} — Advogados com Experiência e Compromisso`,
    `Assessoria Jurídica em ${cidade.nome} - ${uf} | Will & Pereira Advocacia`,
    `Advogados em ${cidade.nome} para Todas as Áreas do Direito`,
  ]
  
  const heroDescs = [
    `Encontre o melhor advogado em ${cidade.nome}/${uf}. A Will & Pereira Advocacia oferece assessoria jurídica completa com mais de 15 anos de experiência atendendo moradores de ${cidade.nome} e região.`,
    `Soluções jurídicas personalizadas para moradores de ${cidade.nome}/${uf}. Nossa equipe atua em todas as áreas do Direito, oferecendo atendimento humanizado e resultados comprovados.`,
  ]
  
  const intro = [
    `Quando se fala em assessoria jurídica de qualidade em ${cidade.nome}/${uf}, a primeira questão que surge é encontrar um profissional que conheça profundamente as particularidades locais e que esteja preparado para oferecer soluções eficazes. A Will & Pereira Advocacia, com mais de 15 anos de atuação e escritório em Palhoça/SC, é referência no atendimento jurídico para moradores de ${cidade.nome} e de toda a região. Nossa equipe multidisciplinar combina conhecimento técnico aprofundado com um atendimento humanizado, garantindo que cada cliente receba a orientação jurídica que merece.\n\nEm ${cidade.nome}/${uf}, com ${cidade.populacao} habitantes e economia baseada em ${cidade.economia}, as demandas jurídicas apresentam características específicas que conhecemos profundamente. ${dados.contexto} Esses fatores fazem com que a busca por um advogado especializado seja constante, seja para questões preventivas ou para resolução de conflitos já existentes.\n\nEste guia apresenta um panorama completo dos serviços jurídicos disponíveis para moradores de ${cidade.nome}, abrangendo todas as principais áreas do Direito. Cada seção é elaborada com base na realidade específica de ${cidade.nome}/${uf}, oferecendo informações práticas e relevantes para quem busca orientação jurídica na região.`,
  ]
  
  const areas = {
    previdenciario: `O Direito Previdenciário é uma das áreas mais demandadas em ${cidade.nome}/${uf}. Muitos trabalhadores da região têm dúvidas sobre aposentadoria, auxílio-doença, pensão por morte e outros benefícios do INSS. A reforma da previdência (EC 103/2019) trouxe mudanças significativas, e contar com um advogado especializado é essencial para garantir o melhor benefício possível.\n\nEm ${cidade.nome}, onde a economia se baseia em ${cidade.economia}, trabalhadores de diversas categorias precisam de orientação previdenciária. ${dados.desafios} A Will & Pereira Advocacia realiza análise completa do histórico contributivo de cada cliente, identificando todas as possibilidades de antecipação ou majoração da aposentadoria.\n\nOs principais benefícios previdenciários atendidos pela nossa equipe em ${cidade.nome} incluem: aposentadoria por idade, aposentadoria por tempo de contribuição (com regras de transição), aposentadoria especial, auxílio-doença, aposentadoria por invalidez, pensão por morte, auxílio-acidente, salário-maternidade e BPC/LOAS. A revisão de benefícios é outro serviço essencial, pois muitos benefícios são concedidos com erros de cálculo.`,
    
    trabalhista: `O Direito Trabalhista protege as relações entre empregados e empregadores. Em ${cidade.nome}/${uf}, oferecemos assessoria completa tanto para trabalhadores quanto para empresas, abrangendo verbas rescisórias, horas extras, FGTS, assédio moral, acidente de trabalho e defesa em reclamações trabalhistas.\n\n${dados.contexto} ${dados.desafios} A Will & Pereira Advocacia atua na defesa dos direitos trabalhistas com foco em resultados, buscando sempre a melhor solução para cada caso.\n\nOs principais direitos trabalhistas que defendemos em ${cidade.nome} incluem: pagamento correto de horas extras e adicionais, verbas rescisórias integralizadas, depósito regular do FGTS, estabilidade provisória para acidentados, respeito à jornada de trabalho e combate ao assédio moral e sexual.`,
    
    civel: `O Direito Cível abrange as relações cotidianas entre pessoas e empresas. Em ${cidade.nome}/${uf}, nossa equipe atua em contratos, indenizações, cobranças, usucapião, direito de vizinhança e questões de propriedade. ${dados.contexto} A Will & Pereira Advocacia oferece assessoria completa em todas as áreas do Direito Cível, com foco nos resultados e atendimento personalizado.\n\nEm ${cidade.nome}, com economia baseada em ${cidade.economia}, os conflitos cíveis são variados e exigem conhecimento aprofundado do Código Civil e da jurisprudência. Atuamos em elaboração e revisão de contratos, ações de cobrança, indenização por danos, usucapião, ações possessórias e todas as demais questões cíveis.`,
    
    consumidor: `O Código de Defesa do Consumidor protege moradores de ${cidade.nome}/${uf} contra abusos de empresas e fornecedores. Atendemos consumidores que tiveram direitos violados: produtos com defeito, cobranças indevidas, negativas de planos de saúde, problemas bancários e cláusulas abusivas em contratos.\n\n${dados.contexto} ${dados.desafios} Nossa equipe domina os instrumentos processuais do CDC, incluindo inversão do ônus da prova, repetição de indébito e indenização por danos morais.`,
    
    familia: `O Direito de Família lida com questões sensíveis que afetam a vida das pessoas. Em ${cidade.nome}/${uf}, atendemos em divórcios, guarda de filhos, pensão alimentícia, inventários e união estável. Cada caso é tratado com discrição e profissionalismo, buscando soluções que preservem os vínculos familiares quando possível.\n\nA Will & Pereira Advocacia oferece assessoria completa em Direito de Família, trabalhando com mediação familiar, acordos consensuais e, quando necessário, litígios para proteger os direitos dos clientes.`,
    
    imobiliario: `O Direito Imobiliário regula todas as questões relacionadas a imóveis. Em ${cidade.nome}/${uf}, atuamos em compra e venda, locação, usucapião, regularização fundiária e condomínio. ${dados.contexto} A Will & Pereira Advocacia oferece assessoria completa em Direito Imobiliário, protegendo seus interesses em cada etapa da transação.\n\nEm ${cidade.nome}, o mercado imobiliário apresenta características próprias que demandam conhecimento especializado. Trabalhamos com due diligence completa, verificação de matrículas e certidões, elaboração de contratos e resolução de conflitos.`,
  }
  
  const exclusiva = `## Por Que Escolher a Will & Pereira Advocacia em ${cidade.nome}?\n\nEscolher o advogado certo é uma decisão que impacta diretamente o resultado de qualquer questão jurídica. Em ${cidade.nome}/${uf}, a Will & Pereira Advocacia se destaca por diversos fatores:\n\n**Experiência Comprovada:** Com mais de 15 anos de atuação, nossa equipe possui experiência consolidada em todas as principais áreas do Direito. Já atendemos milhares de clientes em todo o Brasil.\n\n**Conhecimento Local:** Conhecemos profundamente as particularidades de ${cidade.nome} e da região de ${uf}. ${dados.contexto}\n\n**Atendimento Personalizado:** Cada caso é único e merece atenção individualizada. Em ${cidade.nome}, oferecemos atendimento personalizado com explicação clara de cada etapa.\n\n**Atuação Nacional:** Nossa equipe atende clientes em todo o Brasil, tanto presencialmente quanto por videoconferência.\n\n**Transparência Total:** Honorários claros, sem surpresas. O cliente sempre sabe onde está investindo.`
  
  const diaADia = `## Como um Advogado Pode Ajudar no Dia a Dia em ${cidade.nome}\n\nMuitas pessoas acreditam que só precisam de advogado quando enfrentam um processo judicial. No entanto, o acompanhamento preventivo evita problemas maiores.\n\n**Orientações preventivas comuns em ${cidade.nome}:**\n• Análise de contratos antes da assinatura\n• Verificação de cláusulas trabalhistas\n• Planejamento previdenciário antes da aposentadoria\n• Regularização de imóveis\n• Elaboração de testamentos\n• Revisão de cobranças bancárias\n\n**Resolução extrajudicial:** Muitos conflitos podem ser resolvidos sem ação judicial. Nossa equipe busca soluções consensuais sempre que possível.\n\n**Atendimento de emergência:** Oferecemos atendimento prioritário para situações urgentes.`
  
  const faqs = [
    { pergunta: `Quais áreas do direito são mais comuns em ${cidade.nome}?`, resposta: `Em ${cidade.nome}/${uf}, as áreas mais demandadas variam conforme a economia local (${cidade.economia}). A Will & Pereira Advocacia atua em todas as áreas com excelência.` },
    { pergunta: `Como funciona o atendimento para moradores de ${cidade.nome}?`, resposta: `Atendemos presencialmente em Palhoça/SC e por videoconferência para todo o Brasil, incluindo ${cidade.nome}. O primeiro atendimento é orientativo.` },
    { pergunta: `Qual o prazo para entrar com uma ação trabalhista?`, resposta: `O trabalhador tem até 2 anos após a extinção do contrato, mas pode cobrar verbas dos últimos 5 anos. Orientamos sobre prazos em ${cidade.nome}.` },
    { pergunta: `A Will & Pereira Advocacia atende ${cidade.nome}?`, resposta: `Sim! Atendemos moradores de ${cidade.nome} e toda a região de ${uf}, independentemente do porte da cidade.` },
    { pergunta: `Quais documentos são necessários para uma consulta?`, resposta: `Documentos relacionados à questão: contratos, comprovantes, documentos pessoais. Orientamos sobre a documentação antes da consulta.` },
    { pergunta: `Quanto custa um advogado?`, resposta: `Os honorários variam conforme o caso. Em muitos casos trabalhistas e previdenciários, trabalhamos com honorários de sucumbência. Entre em contato para orientação inicial.` },
  ]
  
  return {
    heroTitle: heroTitles[hash % heroTitles.length],
    heroDescription: heroDescs[hash % heroDescs.length],
    introParagraphs: intro,
    areaContent: areas,
    exclusiva,
    diaADia,
    faqs,
    stats: { experiencia: '15+', clientes: '5000+', taxa: '98%', cidades: '324' },
  }
}

// ═══ GERAR ARQUIVOS ═══
let totalGerados = 0
let totalCidades = 0

for (const [uf, estado] of Object.entries(estadosCidades)) {
  if (uf === 'SC') continue // Já coberto
  
  const todasCidades = [
    ...estado.capitais.map(nome => ({ nome, porte: 'grande', economia: 'Comércio, Serviços, Indústria e Tecnologia', populacao: 'capital', regiao: estado.nome })),
    ...estado.cidades,
  ]
  
  for (const cidade of todasCidades) {
    try {
      const slug = `advogado-em-${slugify(cidade.nome)}`
      const filePath = join(contentDir, `${slug}.ts`)
      
      // Skip if already exists
      if (existsSync(filePath)) {
        totalCidades++
        continue
      }
      
      const conteudo = gerarConteudo(cidade, uf)
      const fileContent = `export default ${JSON.stringify(conteudo, null, 2)}\n`
      
      writeFileSync(filePath, fileContent)
      
      const allText = JSON.stringify(conteudo)
      const wordCount = allText.split(/\s+/).length
      
      console.log(`✅ ${cidade.nome}/${uf} (~${wordCount} palavras)`)
      totalGerados++
      totalCidades++
    } catch (err) {
      console.log(`❌ ${cidade.nome}/${uf}: ${err.message}`)
    }
  }
}

console.log(`\n📊 Resultado: ${totalGerados} novos, ${totalCidades} total`)
