const puppeteer = require('puppeteer-extra') 

 
// Add stealth plugin and use defaults 
const pluginStealth = require('puppeteer-extra-plugin-stealth') 
const ppUserPrefs = require('puppeteer-extra-plugin-user-preferences')
const fs = require('fs')
const axios = require("axios")


const uas = [
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Vivaldi/6.5.3206.63",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Vivaldi/6.5.3206.63",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.2277.112",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.62 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.62 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPod; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.62 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.64 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.64 Mobile Safari/537.36"
]

const locales = [
  {"value": "/icpplus/citar?p=15&amp;locale=es", "content": "A Coruña"},
  {"value": "/icpplus/citar?p=2&amp;locale=es", "content": "Albacete"},
  {"value": "/icpco/citar?p=3&amp;locale=es", "content": "Alicante"},
  {"value": "/icpplus/citar?p=4&amp;locale=es", "content": "Almería"},
  {"value": "/icpplus/citar?p=1&amp;locale=es", "content": "Araba"},
  {"value": "/icpplus/citar?p=33&amp;locale=es", "content": "Asturias"},
  {"value": "/icpplus/citar?p=5&amp;locale=es", "content": "Ávila"},
  {"value": "/icpplus/citar?p=6&amp;locale=es", "content": "Badajoz"},
  {"value": "/icpplustieb/citar?p=8&amp;locale=es", "content": "Barcelona"},
  {"value": "/icpplus/citar?p=48&amp;locale=es", "content": "Bizkaia"},
  {"value": "/icpplus/citar?p=9&amp;locale=es", "content": "Burgos"},
  {"value": "/icpplus/citar?p=10&amp;locale=es", "content": "Cáceres"},
  {"value": "/icpplus/citar?p=11&amp;locale=es", "content": "Cádiz"},
  {"value": "/icpplus/citar?p=39&amp;locale=es", "content": "Cantabria"},
  {"value": "/icpplus/citar?p=12&amp;locale=es", "content": "Castellón"},
  {"value": "/icpplus/citar?p=51&amp;locale=es", "content": "Ceuta"},
  {"value": "/icpplus/citar?p=13&amp;locale=es", "content": "Ciudad Real"},
  {"value": "/icpplus/citar?p=14&amp;locale=es", "content": "Córdoba"},
  {"value": "/icpplus/citar?p=16&amp;locale=es", "content": "Cuenca"},
  {"value": "/icpplus/citar?p=20&amp;locale=es", "content": "Gipuzkoa"},
  {"value": "/icpplus/citar?p=17&amp;locale=es", "content": "Girona"},
  {"value": "/icpplus/citar?p=18&amp;locale=es", "content": "Granada"},
  {"value": "/icpplus/citar?p=19&amp;locale=es", "content": "Guadalajara"},
  {"value": "/icpplus/citar?p=21&amp;locale=es", "content": "Huelva"},
  {"value": "/icpplus/citar?p=22&amp;locale=es", "content": "Huesca"},
  {"value": "/icpco/citar?p=7&amp;locale=es", "content": "Illes Balears"},
  {"value": "/icpplus/citar?p=23&amp;locale=es", "content": "Jaén"},
  {"value": "/icpplus/citar?p=26&amp;locale=es", "content": "La Rioja"},
  {"value": "/icpco/citar?p=35&amp;locale=es", "content": "Las Palmas"},
  {"value": "/icpplus/citar?p=24&amp;locale=es", "content": "León"},
  {"value": "/icpplus/citar?p=25&amp;locale=es", "content": "Lleida"},
  {"value": "/icpplus/citar?p=27&amp;locale=es", "content": "Lugo"},
  {"value": "/icpplustiem/citar?p=28&amp;locale=es", "content": "Madrid"},
  {"value": "/icpco/citar?p=29&amp;locale=es", "content": "Málaga"},
  {"value": "/icpplus/citar?p=52&amp;locale=es", "content": "Melilla"},
  {"value": "/icpplus/citar?p=30&amp;locale=es", "content": "Murcia"},
  {"value": "/icpplus/citar?p=31&amp;locale=es", "content": "Navarra"},
  {"value": "/icpplus/citar?p=32&amp;locale=es", "content": "Ourense"},
  {"value": "/icpplus/citar?p=34&amp;locale=es", "content": "Palencia"},
  {"value": "/icpplus/citar?p=36&amp;locale=es", "content": "Pontevedra"},
  {"value": "/icpplus/citar?p=37&amp;locale=es", "content": "Salamanca"},
  {"value": "/icpco/citar?p=38&amp;locale=es", "content": "S.Cruz Tenerife"},
  {"value": "/icpplus/citar?p=40&amp;locale=es", "content": "Segovia"},
  {"value": "/icpplus/citar?p=41&amp;locale=es", "content": "Sevilla"},
  {"value": "/icpplus/citar?p=42&amp;locale=es", "content": "Soria"},
  {"value": "/icpplus/citar?p=43&amp;locale=es", "content": "Tarragona"},
  {"value": "/icpplus/citar?p=44&amp;locale=es", "content": "Teruel"},
  {"value": "/icpplus/citar?p=45&amp;locale=es", "content": "Toledo"},
  {"value": "/icpplus/citar?p=46&amp;locale=es", "content": "Valencia"},
  {"value": "/icpplus/citar?p=47&amp;locale=es", "content": "Valladolid"},
  {"value": "/icpplus/citar?p=49&amp;locale=es", "content": "Zamora"},
  {"value": "/icpplus/citar?p=50&amp;locale=es", "content": "Zaragoza"}
]

const ofcs = {
  "A Coruña": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    { 
      "value": "4",
      "content": "CNP  SANTIAGO COMPOSTELA EXTRANJEROS, AVD RODRIGO DE PADRON, SN"
    },
    {
      "value": "2",
      "content": "CNP COMISARIA A CORUÑA - LONZAS, C\\ Médico Devesa Núñez, 4"
    },
    {
      "value": "5",
      "content": "CNP FERROL, AVENIDA DE SAN AMARO, S/N"
    },
    {
      "value": "3",
      "content": "CNP Santa Uxía de Ribeira, Av/ Das Airos , 21"
    },
    {
      "value": "1",
      "content": "Oficina de Extranjería en A Coruña, C/ Real, 53"
    }
  ],
  "Albacete": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "5",
      "content": "CNP ALBACETE BPEF, Buen Pastor, 1"
    },
    {
      "value": "4",
      "content": "CNP HELLIN, FORTUNATO ARIAS, 2"
    },
    {
      "value": "2",
      "content": "CNP TARJETAS  Expedición, CALDERON DE LA BARCA, 2"
    }
  ],
  "Alicante": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "12",
      "content": "CNP Alcoy, Placeta Les Xiques, S/N"
    },
    {
      "value": "15",
      "content": "CNP Alicante NIE, Ebanistería, 4-6"
    },
    {
      "value": "3",
      "content": "CNP Alicante TIE, Campo de Mirra, 6"
    },
    {
      "value": "10",
      "content": "CNP Benidorm, Apolo XI, 36"
    },
    {
      "value": "4",
      "content": "CNP Benidorm TIE, Callosa D`Ensarria, 2"
    },
    {
      "value": "13",
      "content": "CNP Comisaría Provincial, C/ Isabel la Católica, 25"
    },
    {
      "value": "11",
      "content": "CNP Denia, Avda Marquesado, 53"
    },
    {
      "value": "5",
      "content": "CNP Elche, El Abeto, 1"
    },
    {
      "value": "9",
      "content": "CNP Elda, Lamberto Amat, 26"
    },
    {
      "value": "7",
      "content": "CNP Orihuela, Sol, 34"
    },
    {
      "value": "14",
      "content": "CNP Orihuela Costa, C/ Flores (Centro de Emergencias), 5"
    },
    {
      "value": "6",
      "content": "CNP Torrevieja, Arquitecto Larramendi, 3"
    },
    {
      "value": "1",
      "content": "OEX ALICANTE, EBANISTERIA, 4-6"
    },
    {
      "value": "2",
      "content": "OEX ALTEA, SAN ISIDRO LABRADOR, 1"
    }
  ],
  "Almería": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "1",
      "content": "Almería OUE, C/ Marruecos, 1"
    },
    {
      "value": "3",
      "content": "CNP ALMERIA, AVENIDA DEL MEDITERRANEO, 201"
    },
    {
      "value": "4",
      "content": "CNP EL EJIDO, Avenida del bulevar, 117"
    },
    {
      "value": "2",
      "content": "CNP ROQUETAS DE MARDGP UEYD , Avda. Curro Romero, 46"
    }
  ],
  "Araba": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "CNP Comisaría Oficina de tramitación, Oñate, 17"
    },
    {
      "value": "1",
      "content": "Subdelegación del Gobierno en Alava, Olaguibel, 1"
    }
  ],
  "Asturias": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "5",
      "content": "CNP AVILES, Río San Martín, 2"
    },
    {
      "value": "2",
      "content": "CNP GIJÓN, Plaza Máximo Gonzalez, s/n"
    },
    {
      "value": "4",
      "content": "CNP LUARCA, OLAVARRIETA, 25"
    },
    {
      "value": "3",
      "content": "CNP OVIEDO, Plaza de España, Planta Baja (POLICÍA), 3"
    },
    {
      "value": "6",
      "content": "CNP OVIEDO PROTECCION TEMPORAL UCRANIANO, CUARTEL POLICÍA NACIONAL (AVENIDA BUENAVISTA), SN"
    },
    {
      "value": "1",
      "content": "Oficina de Extranjería en Oviedo, Plaza de España, 3"
    },
    {
      "value": "7",
      "content": "SOLICITUD INICIAL ASILO, OFICINA DE EXTRANJEROS (PLAZA DE ESPAÑA 3, POSTERIOR), 3"
    }
  ],
  "Ávila": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "CNP ÁVILA, PASEO SAN ROQUE, 34"
    },
    {
      "value": "1",
      "content": "Oficina de Extranjería en Ávila, Hornos Caleros, 1"
    }
  ],
  "Badajoz": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "4",
      "content": "CNP ALMENDRALEJO, Benito Pérez Galdós, S/N"
    },
    {
      "value": "7",
      "content": "CNP BADAJOZ, Avenida Ramón y Cajal, s/n"
    },
    {
      "value": "2",
      "content": "CNP BADAJOZ CITA PREVIA POLICÍA TARJETAS, LA BOMBA, 9"
    },
    {
      "value": "5",
      "content": "CNP DON BENITO, AVENIDA DE CORDOBA , S/N"
    },
    {
      "value": "3",
      "content": "CNP MÉRIDA, AVENIDA VALHONDO , 8"
    },
    {
      "value": "6",
      "content": "CNP ZAFRA, PLAZA DEL PILAR REDONDO S/N EDIFICIO AYUNTAMIENTO, S/N"
    },
    {
      "value": "1",
      "content": "OFICINA DE EXTRANJERÍA, CALLE LA BOMBA, 9"
    }
  ],
  "Barcelona": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "48",
      "content": "CNP CARTAS DE INVITACION, CALLE GUADALAJARA , 1"
    },
    {
      "value": "18",
      "content": "CNP COMISARIA BADALONA, AVDA. DELS VENTS, 9"
    },
    {
      "value": "19",
      "content": "CNP COMISARIA CASTELLDEFELS, PLAÇA DE L`ESPERANTO, 4"
    },
    {
      "value": "20",
      "content": "CNP COMISARIA CERDANYOLA DEL VALLES, VERGE DE LES FEIXES, 4"
    },
    {
      "value": "21",
      "content": "CNP COMISARIA CORNELLA DE LLOBREGAT, AV. SANT ILDEFONS, S/N"
    },
    {
      "value": "23",
      "content": "CNP COMISARIA EL PRAT DE LLOBREGAT, CENTRE, 4"
    },
    {
      "value": "28",
      "content": "CNP COMISARIA GRANOLLERS, RICOMA, 65"
    },
    {
      "value": "26",
      "content": "CNP COMISARIA IGUALADA, PRAT DE LA RIBA, 13"
    },
    {
      "value": "17",
      "content": "CNP COMISARIA LHOSPITALET DE LLOBREGAT, Rbla. Just Oliveres, 43"
    },
    {
      "value": "38",
      "content": "CNP COMISARIA MANRESA, SOLER I MARCH, 5"
    },
    {
      "value": "27",
      "content": "CNP COMISARIA MATARO, AV. GATASSA, 15"
    },
    {
      "value": "31",
      "content": "CNP COMISARIA MONTCADA I REIXAC, MAJOR, 38"
    },
    {
      "value": "32",
      "content": "CNP COMISARIA RIPOLLET, TAMARIT, 78"
    },
    {
      "value": "29",
      "content": "CNP COMISARIA RUBI, TERRASSA, 16"
    },
    {
      "value": "30",
      "content": "CNP COMISARIA SABADELL, BATLLEVELL, 115"
    },
    {
      "value": "33",
      "content": "CNP COMISARIA SANT ADRIA DEL BESOS, AV. JOAN XXIII, 2"
    },
    {
      "value": "24",
      "content": "CNP COMISARIA SANT BOI DE LLOBREGAT, RIERA BASTÉ, 43"
    },
    {
      "value": "34",
      "content": "CNP COMISARIA SANT CUGAT DEL VALLES, VALLES, 1"
    },
    {
      "value": "22",
      "content": "CNP COMISARIA SANT FELIU DE LLOBREGAT, CARRERETES, 9"
    },
    {
      "value": "35",
      "content": "CNP COMISARIA SANTA COLOMA DE GRAMENET, IRLANDA, 67"
    },
    {
      "value": "36",
      "content": "CNP COMISARIA TERRASSA, BALDRICH, 13"
    },
    {
      "value": "37",
      "content": "CNP COMISARIA VIC, BISBE MORGADES, 4"
    },
    {
      "value": "25",
      "content": "CNP COMISARIA VILADECANS, AVDA. BALLESTER, 2"
    },
    {
      "value": "46",
      "content": "CNP COMISARIA VILAFRANCA DEL PENEDES, Avinguda Ronda del Mar, 109"
    },
    {
      "value": "49",
      "content": "CNP COMISARIA VILANOVA I LA GELTRU, PLAÇA COTXES, 5"
    },
    {
      "value": "39",
      "content": "CNP COMISARIA VILANOVA I LA GELTRU ODE, VAPOR, 19"
    },
    {
      "value": "47",
      "content": "CNP GUADALAJARA, Guadalajara, 1"
    },
    {
      "value": "14",
      "content": "CNP MALLORCA GRANADOS, MALLORCA, 213"
    },
    {
      "value": "43",
      "content": "CNP PSJ PLANTA BAJA, PASSEIG SANT JOAN, 189"
    },
    {
      "value": "16",
      "content": "CNP RAMBLA GUIPUSCOA 74, RAMBLA GUIPUSCOA, 74"
    },
    {
      "value": "51",
      "content": "VILADECANS, AVDA. BALLESTER, 2"
    },
    {
      "value": "50",
      "content": "VILADECANS 2, AVDA. BALLESTER, 2"
    }
  ],
  "Bizkaia": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "CNP BILBAO JSP del País Vasco, Gordóniz, 8"
    },
    {
      "value": "1",
      "content": "Oficina Extranjería Bizkaia, Barroeta Aldamar , 1"
    }
  ],
  "Burgos": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "CNP ARANDA DE DUERO, SAN FRANCISCO, 92"
    },
    {
      "value": "4",
      "content": "CNP COMISARIA BURGOS, Avenida Castilla y León, 3"
    },
    {
      "value": "2",
      "content": "CNP MIRANDA DE EBRO, ANTONIO CABEZON, 14"
    },
    {
      "value": "1",
      "content": "Oficina de Extranjeria en Burgos, Vitoria, 34"
    }
  ],
  "Cáceres": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "CNP CACERES BPEF, Avenida Pierre de Coubertin, 13"
    },
    {
      "value": "2",
      "content": "CNP PLASENCIA, CUEVA DE LA SERRANA, S/N"
    },
    {
      "value": "1",
      "content": "OFICINA DE EXTRANJERIA EN CACERES, C/Catedrático Antonio Silva, 7"
    }
  ],
  "Cádiz": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "5",
      "content": "ALGECIRAS TR OFICINA EXRANJERÍA , P. Juan de Lima, 5"
    },
    {
      "value": "1",
      "content": "CÁDIZ COMISARÍA CUERPO N. DE POLICÍA, Avenida de Andalucía, 28"
    },
    {
      "value": "3",
      "content": "CÁDIZ OFICINA DE EXTRANJERÍA, Acacias, 2"
    },
    {
      "value": "6",
      "content": "CNP ALGECIRAS, AV. FUERZAS ARMADAS, 6"
    },
    {
      "value": "4",
      "content": "CNP CHICLANA DE LA FRONTERA, LA FUENTE, 7"
    },
    {
      "value": "9",
      "content": "CNP JEREZ DE LA FRONTERA, Avenida de la Universidad, 10"
    },
    {
      "value": "8",
      "content": "CNP LA LINEA CONCEPCIÓN, AVENIDA MENENDEZ PELAYO, S/N"
    },
    {
      "value": "7",
      "content": "CNP PUERTO SANTA MARIA PUERTO REAL, Carpintero de rivera, s/n"
    },
    {
      "value": "10",
      "content": "CNP ROTA, AVENIDA PRINCIPES DE ESPAÑA, 113"
    },
    {
      "value": "12",
      "content": "CNP SAN FERNANDO, Avenida Contitución de 1978, S/N"
    }
  ],
  "Cantabria": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "5",
      "content": "CNP SANTANDER TRAMITES EXTANJERIA,  ***  C/ LOPEZ DORIGA, 6"
    },
    {
      "value": "4",
      "content": "DELEGACIÓN DEL GOBIERNO, Calvo Sotelo, 25"
    },
    {
      "value": "1",
      "content": "OFICINA EXTRANJERIA, Vargas, 53"
    },
    {
      "value": "3",
      "content": "POLICIA CASTRO URDIALES, CAYETANO TUEROS, 8"
    },
    {
      "value": "2",
      "content": "POLICIA SANTANDER /TOMA DE HUELLA - TIES, JOSÉ RAMÓN LÓPEZ DÓRIGA, 6"
    }
  ],
  "Castellón": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "4",
      "content": "CNP COMISARIA, CALLE TEODORO IZQUIERDO, 6"
    },
    {
      "value": "3",
      "content": "OFICINA DE EXTRANJERIA, ESCULTOR VICIANO - OFICINA DE EXTRANJERÍA, 2"
    }
  ],
  "Ceuta": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "CNP CEUTA TARAJAL, Frontera del Tarajal, s/n"
    },
    {
      "value": "1",
      "content": "Oficina de Extranjeros, Avenida de Otero (Edif. Mutua), s/n"
    }
  ],
  "Ciudad Real": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "10",
      "content": "CNP ALCÁZAR DE SAN JUAN, AVENIDA ÁLVAREZ GUERRA, 10"
    },
    {
      "value": "6",
      "content": "CNP CIUDAD REAL, RONDA DE TOLEDO, 27"
    },
    {
      "value": "9",
      "content": "CNP PUERTOLLANO, CRUCES, 26"
    },
    {
      "value": "7",
      "content": "CNP TOMELLOSO, ELADIO CABAÑERO, S/N"
    },
    {
      "value": "8",
      "content": "CNP VALDEPEÑAS, AMAPOLA, 12"
    },
    {
      "value": "3",
      "content": "CNP-O.U.E. (COMISARÍA), Carretera de Porzuna, 1"
    },
    {
      "value": "4",
      "content": "Información y Registro, Carretera de porzuna, 1"
    },
    {
      "value": "1",
      "content": "OFICINA DE EXTRANJERÍA, Carretera Porzuna, 1"
    }
  ],
  "Córdoba": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "CNP COMISARIA CORDOBA BPEF, Avenida del Mediterraneo, s/n"
    },
    {
      "value": "4",
      "content": "CNP CÓRDOBA TIE, Av. de los Mozárabes, Local (Entrada por Av. América), 19"
    },
    {
      "value": "2",
      "content": "CNP NEGOCIADO EXTRANJEROS POLICIA, Plaza de la Constitucion, s/n"
    },
    {
      "value": "1",
      "content": "OFICINA EXTRANJEROS, PLAZA DE LA CONSTITUCION, SN"
    }
  ],
  "Cuenca": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "CNP CUENCA, Hervás y Panduro, 4"
    },
    {
      "value": "4",
      "content": "POLICIA CUENCA ASILO, Astrana Marín, 4"
    },
    {
      "value": "1",
      "content": "16002  CUENCA, Hervás y Panduro, 4"
    },
    {
      "value": "2",
      "content": "16400  TARANCON, Tras Plaza Ayuntamiento, 1"
    }
  ],
  "Gipuzkoa": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "4",
      "content": "CNP IRUN, Plaza Ensanche, 1"
    },
    {
      "value": "3",
      "content": "CNP SAN SEBASTIAN, PASEO URUMEA, 17"
    },
    {
      "value": "2",
      "content": "Oficina de extranjería, Javier Barkaiztegui, s/n"
    }
  ],
  "Girona": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "6",
      "content": "CNP CAMPRODON, CRTA C38 KM, 11,5"
    },
    {
      "value": "3",
      "content": "CNP FIGUERES, C/ PEP VENTURA , 8"
    },
    {
      "value": "8",
      "content": "CNP GIRONA, Carrer Sant Pau, 2"
    },
    {
      "value": "9",
      "content": "CNP GIRONA BPEF, Avenida Jaume I, 17"
    },
    {
      "value": "4",
      "content": "CNP LLORET DE MAR, VIRGEN DE LORETO, 51"
    },
    {
      "value": "7",
      "content": "CNP PUIGCERDÀ, AVDA. FRANCIA , 2"
    },
    {
      "value": "5",
      "content": "CNP SANT FELIU DE GUIXOLS, ORTIZ DE LA VEGA, 6-8"
    },
    {
      "value": "1",
      "content": "OFICINA DE EXTRANJEROS, GRAN VIA DE JAUME I, 17, 17"
    },
    {
      "value": "2",
      "content": "OFICINA EXPEDICION TIE, Cristóbal Grober , 12"
    }
  ],
  "Granada": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "4",
      "content": "CNP GRANADA BPEF, La Palmita, s/n"
    },
    {
      "value": "3",
      "content": "Comisaría de Baza, Alhóndiga, 18"
    },
    {
      "value": "2",
      "content": "Comisaría de Motril, Aguas del Hospital, S/N"
    },
    {
      "value": "1",
      "content": "Oficina de Extranjería en Granada, San Agapito, 2"
    }
  ],
  "Guadalajara": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "CNP GUADALAJARA, AVENIDA DEL EJERCITO, 12"
    },
    {
      "value": "1",
      "content": "OFICINA DE EXTRANJEROS DE GUADALAJARA, Avenida de Francia , 18"
    }
  ],
  "Huelva": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "4",
      "content": "CNP AYAMONTE, AVENIDA NARCISO MARTIN NAVARRO, 20"
    },
    {
      "value": "3",
      "content": "CNP HUELVA, Avenida de la Glorieta, s/n"
    },
    {
      "value": "1",
      "content": "Oficina de Extranjería, c/ Fernando el Católico, 36"
    },
    {
      "value": "2",
      "content": "Oficina de Extranjería Policía, Fernando el Católico, 36"
    }
  ],
  "Huesca": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "CNP FRAGA, PLAZA DE ESPAÑA , 1"
    },
    {
      "value": "2",
      "content": "CNP HUESCA, Plaza Luis Buñuel , 3"
    },
    {
      "value": "4",
      "content": "CNP JACA, Avda. Zaragoza, 14 "
    },
    {
      "value": "6",
      "content": "CNP MONZON, PLAZA MAYOR, 4"
    },
    {
      "value": "1",
      "content": "Sede Huesca, PLAZA CERVANTES, 1"
    }
  ],
  "Illes Balears": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "8",
      "content": "CNP CIUTADELLA MENORCA, REPÚBLICA ARGENTINA , 4"
    },
    {
      "value": "6",
      "content": "CNP MAHON EXTRANJERIA, MENORCA-MAHON, C/SAN SEBASTIAN, 2"
    },
    {
      "value": "10",
      "content": "CNP MANACOR, Rambla Rei En Jaume, 8"
    },
    {
      "value": "5",
      "content": "IBIZA CNP Policía Documentación, Avenida de la Paz, S/N"
    },
    {
      "value": "9",
      "content": "MALLORCA  Policia Nacional BPEF, Simó Ballester, 8"
    },
    {
      "value": "4",
      "content": "MALLORCA CNP Policía Documentación, Felicià Fuster (p. lateral), 7"
    },
    {
      "value": "7",
      "content": "MALLORCA PN Residente UE y NIE, Calle Feliciá Fuster , 7"
    },
    {
      "value": "1",
      "content": "Oficina de Extranjería de Palma, Felicià Fuster, 7"
    },
    {
      "value": "2",
      "content": "Oficina de Extranjeros de Ibiza, Paseo Juan Carlos I, S/N"
    }
  ],
  "Jaén": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "CNP JAEN, Arquitecto Berges, 11"
    },
    {
      "value": "5",
      "content": "CNP LINARES, Hernán Cortés, 16"
    },
    {
      "value": "1",
      "content": "Oficina Extranjería y TIE Jaén, Plaza de las Batallas, 2"
    }
  ],
  "La Rioja": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "CALAHORRA, Julio Longinos, 2"
    },
    {
      "value": "4",
      "content": "CNP LOGROÑO JEFATURA, SERRADERO, 26"
    },
    {
      "value": "1",
      "content": "LOGROÑO, AVDA. DE LA SOLIDARIDAD, 72"
    }
  ],
  "Las Palmas": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "10",
      "content": "CNP LAS PALMAS DE GRAN CANARIA, C/Luis Doreste Silva, 68"
    },
    {
      "value": "4",
      "content": "CNP MASPALOMAS, Avenida de Moya, 4"
    },
    {
      "value": "8",
      "content": "CNP PUERTO ROSARIO, HERBANIA, 28"
    },
    {
      "value": "9",
      "content": "CNP SANTA LUCIA DE TIRAJANA, DOCTOR NEGRIN, 10"
    },
    {
      "value": "11",
      "content": "CNP TELDE, Eduardo Chillida, 1"
    },
    {
      "value": "7",
      "content": "CNP TUINEJE, PACO HIERRO, S/N"
    },
    {
      "value": "6",
      "content": "COMISARIA CNP ARRECIFE, MASTELERO, S/N"
    },
    {
      "value": "3",
      "content": "Fuerteventura, Primero de Mayo, 64"
    },
    {
      "value": "2",
      "content": "Lanzarote, C/ Blas Cabrera Felipe, 6"
    },
    {
      "value": "1",
      "content": "Las Palmas de Gran Canaria, PLAZA DE LA CONCORDIA, 5"
    }
  ],
  "León": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "5",
      "content": "CNP ASTORGA, PLAZA LOS MARQUESES, S/N"
    },
    {
      "value": "6",
      "content": "CNP LEON BPEF, Villa Benavente, 6"
    },
    {
      "value": "2",
      "content": "CNP PONFERRADA, Río Oza, s/n"
    },
    {
      "value": "4",
      "content": "CNP SAN ANDRES DEL RABANEDO, GLORIETA DONANTES DE SANGRE , S/N"
    },
    {
      "value": "1",
      "content": "Dependencia de Trabajo e Inmigración, Av. Asturias , 4"
    },
    {
      "value": "3",
      "content": "Extranjería Expedición LEÓN, C/ de la GUARDIA CIVIL, 6"
    }
  ],
  "Lleida": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "1",
      "content": "AOFICINA EXTRANJEROS, C/ PRAT DE LA RIBA, 36"
    },
    {
      "value": "3",
      "content": "CNP LES, SAN JAIME, 58"
    },
    {
      "value": "2",
      "content": "CNP LLEIDA, DE L`ENSENYANÇA, 2"
    },
    {
      "value": "4",
      "content": "CNP SEO DE URGELL, Avenida Saloria, 100"
    }
  ],
  "Lugo": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "4",
      "content": "CNP COMISARÍA LOCAL MONFORTE DE LEMOS, MIGUEL DE CERVANTES, 1"
    },
    {
      "value": "3",
      "content": "CNP COMISARÍA LOCAL VIVEIRO, AVDA. RAMÓN CANOSA, S/N"
    },
    {
      "value": "1",
      "content": "CNP COMISARÍA PROVINCIAL LUGO, c/Chantada, s/n"
    },
    {
      "value": "2",
      "content": "Oficina de Extranjería en Lugo, Armanyá, 10"
    }
  ],
  "Madrid": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "7",
      "content": "CNP AVDA POBLADOS, Avda. de los Poblados, S/N"
    },
    {
      "value": "15",
      "content": "CNP Comisaría de Alcalá de Henares, Avda. de Meco, s/n"
    },
    {
      "value": "16",
      "content": "CNP Comisaría de Alcobendas, Avda. de España, 52"
    },
    {
      "value": "17",
      "content": "CNP Comisaría de Alcorcón, Alfredo Nobel, 10"
    },
    {
      "value": "18",
      "content": "CNP Comisaría de Aranjuez, Avda. Príncipe, 40"
    },
    {
      "value": "27",
      "content": "CNP Comisaría de Arganda del Rey, Av.Mediterraneo(PoliciaLocal), 7"
    },
    {
      "value": "28",
      "content": "CNP Comisaría de Collado Villalba, SAN FERNANDO, 27"
    },
    {
      "value": "19",
      "content": "CNP Comisaría de Coslada, Guadalquivir, 16"
    },
    {
      "value": "20",
      "content": "CNP Comisaría de Fuenlabrada, Calle de los Ángeles, 9"
    },
    {
      "value": "21",
      "content": "CNP Comisaría de Getafe, Churruca, 6"
    },
    {
      "value": "39",
      "content": "CNP Comisaría de Las Rozas de Madrid, José Echegaray, 22"
    },
    {
      "value": "22",
      "content": "CNP Comisaría de Leganés, Avda. de Universidad, 27"
    },
    {
      "value": "29",
      "content": "CNP Comisaría de Majadahonda, Ctra.Villanueva del Pardillo, 3"
    },
    {
      "value": "23",
      "content": "CNP Comisaría de Móstoles, Granada, 9"
    },
    {
      "value": "24",
      "content": "CNP Comisaría de Parla, Avda. Juan Carlos I, 2"
    },
    {
      "value": "25",
      "content": "CNP Comisaría de Pozuelo de Alarcón, Camino de las Huertas, 36"
    },
    {
      "value": "30",
      "content": "CNP Comisaría de Rivas Vaciamadrid, José Hierro, 82"
    },
    {
      "value": "26",
      "content": "CNP Comisaría de Torrejón de Ardoz, Hilados, 15"
    },
    {
      "value": "31",
      "content": "CNP Comisaría de Valdemoro, Avda. de España, 97"
    },
    {
      "value": "34",
      "content": "CNP OFICINA AQUILES 2, Aquiles, 2"
    },
    {
      "value": "14",
      "content": "CNP Padre Piquer, Padre Piquer, 18"
    },
    {
      "value": "38",
      "content": "CNP SAN FELIPE TIE, SAN FELIPE, 7"
    },
    {
      "value": "36",
      "content": "CNP SANTA ENGRACIA, SANTA ENGRACIA, 18"
    },
    {
      "value": "35",
      "content": "Comisaría de Getafe 2, churruca, 6"
    },
    {
      "value": "37",
      "content": "CREADE POZUELO, Paseo de la Casa Campo, 1"
    },
    {
      "value": "33",
      "content": "Oficina de Asilo y Refugio, C/ Pradillo, 40"
    }
  ],
  "Málaga": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "9",
      "content": "CNP Antequera, Calle Ciudad de Oaxaca, S/N"
    },
    {
      "value": "5",
      "content": "CNP Benalmadena, Calle Las Flores, 6"
    },
    {
      "value": "11",
      "content": "CNP CREADE-MÁLAGA, Avenida José Ortega y Gasset (Palacio de Ferias y Congresos de Málaga), 201"
    },
    {
      "value": "3",
      "content": "CNP Estepona, Calle Valle Inclán, 1"
    },
    {
      "value": "4",
      "content": "CNP Fuengirola, Avenida Condes de San Isidro, 98"
    },
    {
      "value": "2",
      "content": "CNP MÁLAGA Provincial, Plaza de Manuel Azaña (TIES (HUELLAS): ZONA 1, RESTO DE TRÁMITES: ZONA 2), 3"
    },
    {
      "value": "7",
      "content": "CNP Marbella, Avenida Duque de Lerma, L3"
    },
    {
      "value": "10",
      "content": "CNP Ronda, Calle Rio Tinto, 2"
    },
    {
      "value": "6",
      "content": "CNP Torremolinos, Calle Skal, 12"
    },
    {
      "value": "8",
      "content": "CNP Velez Malaga, Calle Puerta del Mar, 4"
    },
    {
      "value": "1",
      "content": "MMP, C/ Mauricio Moro Pareto, 13"
    }
  ],
  "Melilla": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "1",
      "content": "Oficina Unica de Extranjería, Paseo Alcalde Rafael Ginel , s/n"
    },
    {
      "value": "4",
      "content": "UDE MELILLA, Actor Tallaví, 3"
    }
  ],
  "Murcia": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "8",
      "content": "CNP CARTAGENA, MENENDEZ Y PELAYO, 6"
    },
    {
      "value": "6",
      "content": "CNP LORCA, Pza. Policía Nacional, 1"
    },
    {
      "value": "7",
      "content": "CNP MOLINA DE SEGURA, CANARIAS, 2"
    },
    {
      "value": "9",
      "content": "CNP MURCIA SANGONERA, AVDA. MERCAMURCIA, 15"
    },
    {
      "value": "5",
      "content": "CNP YECLA, RAMBLA, 34"
    },
    {
      "value": "4",
      "content": "OFICINA DE EXTRANJEROS, CTRA NACIONAL 301, KM.388, 0"
    }
  ],
  "Navarra": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "1",
      "content": "CNP PAMPLONA, Avenida Guipúzcoa, 40"
    },
    {
      "value": "2",
      "content": "CNP TUDELA, PLAZA PADRE LASA, 7"
    }
  ],
  "Ourense": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "CNP BARCO DE VALDEORRAS, Plaza Do Concello, 2"
    },
    {
      "value": "2",
      "content": "CNP ORENSE EXTRANJEROS, Mestre Vide, 4A"
    },
    {
      "value": "1",
      "content": "OFICINA DE EXTRANXEIROS, Parque de San Lázaro, 1"
    }
  ],
  "Palencia": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "CNP PALENCIA, AVENIDA SIMON NIETO, 8"
    },
    {
      "value": "1",
      "content": "Subdelegación del Gobierno en Palencia, Avda Casado Alisal, 4"
    }
  ],
  "Pontevedra": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "8",
      "content": "CNP MARIN, LAMEIRA , 27"
    },
    {
      "value": "6",
      "content": "CNP PONTEVEDRA, JOAQUIN COSTA, 17"
    },
    {
      "value": "7",
      "content": "CNP SALVATERRA DE MIÑO, RUA MATIAS CANDEIRA, 1"
    },
    {
      "value": "5",
      "content": "CNP VILAGARCIA DE AROUSA, AVENIDA DE MARIÑA , 9"
    },
    {
      "value": "3",
      "content": "Comisaría de Policía Nacional de Vigo, -ALVARO CUNQUEIRO, 6"
    },
    {
      "value": "1",
      "content": "EXTRANJERÍA PONTEVEDRA, MICHELENA, 28"
    },
    {
      "value": "2",
      "content": "EXTRANJERÍA VIGO, TEÓFILO LLORENTE, 4"
    },
    {
      "value": "4",
      "content": "Extranjería y Documentación de Tui, Párroco Rodríguez Vázquez, 3"
    }
  ],
  "Salamanca": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "CNP SALAMANCA, Jardines, s/n"
    },
    {
      "value": "2",
      "content": "OFICINA DE EXTRANJERIA, CALLE DOCTOR TORRES VILLARROEL, 14"
    }
  ],
  "S.Cruz Tenerife": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "5",
      "content": "CNP ISLA DE LA PALMA, Calle Pérez Galdós, 16"
    },
    {
      "value": "2",
      "content": "CNP Playa de las Américas, Av. de los Pueblos, 2"
    },
    {
      "value": "3",
      "content": "CNP Puerto de la Cruz Los Realejos, Av. del Campo y Llarena, 3"
    },
    {
      "value": "7",
      "content": "CNP San Cristobal de LA LAGUNA, CALLE NAVA Y GRIMON, 66"
    },
    {
      "value": "6",
      "content": "CNP Sta Cruz de TFE ROBAYNA, CALLE ROBAYNA, 23"
    },
    {
      "value": "8",
      "content": "CNP STA. CRUZ TENERIFE, Ramón Pérez Ayala, 6"
    },
    {
      "value": "4",
      "content": "EXTRANJERIA LA PALMA, Avenida Marítima, 2"
    },
    {
      "value": "1",
      "content": "1 OUE SANTA CRUZ DE TENERIFE,  C/LA MARINA, 20"
    }
  ],
  "Segovia": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "Oficina de Extranjería en Segovia, Plaza Adolfo Suárez , 1"
    },
    {
      "value": "3",
      "content": "SEGOVIA BPEF, Paseo Ezequiel González, 22"
    }
  ],
  "Sevilla": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "BPEF GRUPO 1, CALLE DOCTOR RAFAEL MARTINEZ DOMINGUEZ, S/N"
    },
    {
      "value": "1",
      "content": "Documentación de Extranjeros POLICIA , Plaza de España Torre Norte, s/n"
    },
    {
      "value": "2",
      "content": "POLICÍA  BPEF, Plaza de España - TORRE NORTE, S/N"
    }
  ],
  "Soria": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "2",
      "content": "CNP SORIA, Nicolas Rabal, 9"
    },
    {
      "value": "1",
      "content": "Oficina de Extranjería en Soria,  Alfonso VIII, 2"
    }
  ],
  "Tarragona": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "CNP Comisaría Local de Reus, General Moragues, 54"
    },
    {
      "value": "4",
      "content": "CNP Comisaría Local de Tortosa, Passeig de Ribera, 21"
    },
    {
      "value": "6",
      "content": "CNP Comisaría Local El Vendrell, Camí Reial, 15 - 17"
    },
    {
      "value": "2",
      "content": "CNP Comisaría Provincial de Tarragona, Plaza Orleans, s/n"
    },
    {
      "value": "1",
      "content": "Oficina de extranjería de Tarragona, Av, Estanislau Figueras, 59"
    }
  ],
  "Teruel": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "ALCANIZ COMISARIA DOCUM EXTRANJEROS, RONDA DE CASPE, 1"
    },
    {
      "value": "2",
      "content": "OFICINA DE EXTRANJERIA, MIGUEL VALLES, 2"
    },
    {
      "value": "1",
      "content": "TERUEL COMISARIA DOCUM EXTRANJEROS, MIGUEL VALLES, 2"
    }
  ],
  "Toledo": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "4",
      "content": "CNP POLICIA TALAVERA DE LA REINA, CARLOS BARRAL, 2"
    },
    {
      "value": "5",
      "content": "JEFATURA SUPERIOR DE POLICIA, AV. PORTUGAL, S/N"
    },
    {
      "value": "1",
      "content": "OFICINA EXTRANJEROS TOLEDO, RONDA DE BUENAVISTA, 57"
    },
    {
      "value": "3",
      "content": "POLICIA TOLEDO, RONDA DE BUENAVISTA, 57"
    }
  ],
  "Valencia": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "8",
      "content": "CNP COMISARIA DE ALZIRA, Pere Morell, 4"
    },
    {
      "value": "13",
      "content": "CNP COMISARIA DE BURJASOT, C/  Doctor Joan Pesset , 2"
    },
    {
      "value": "6",
      "content": "CNP COMISARIA DE ONTENIENTE, Plaza de Escura, 2"
    },
    {
      "value": "14",
      "content": "CNP COMISARIA DE PATERNA, De les Roses, 27"
    },
    {
      "value": "7",
      "content": "CNP COMISARIA DE SAGUNTO, Progreso, 14"
    },
    {
      "value": "3",
      "content": "CNP COMISARIA PATRAIX EXTRANJERIA, GREMIS, 6"
    },
    {
      "value": "15",
      "content": "CNP COMISARIA XIRIVELLA-ALDAIA-ALAQUAS, C/ Jaume Roig Xirivella, 4"
    },
    {
      "value": "5",
      "content": "CNP GANDIA EXPEDICION TIE, Ciudad de Laval, 5"
    },
    {
      "value": "11",
      "content": "CNP GANDIA EXTRANJERÍA CERTIFICADOS, Ciudad de Laval , 5"
    },
    {
      "value": "12",
      "content": "CNP VALENCIA CALLE ZAPADORES 52, Zapadores, 52"
    },
    {
      "value": "4",
      "content": "CNP-COMISARIA DE BAILEN, Bailen, 9"
    },
    {
      "value": "10",
      "content": "OUE2, Joaquin Ballester, 39"
    },
    {
      "value": "9",
      "content": "OUE3, Avda. Constitución, 116"
    }
  ],
  "Valladolid": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "3",
      "content": "CNP MEDINA DEL CAMPO, CALLE VALLADOLID, 30"
    },
    {
      "value": "2",
      "content": "CNP Valladolid, Gerona, s/n"
    },
    {
      "value": "1",
      "content": "OFICINA DE EXTRANJERÍA - VALLADOLID, Arzobispo José Delicado, 7"
    }
  ],
  "Zamora": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "1",
      "content": "Subdelegación del Gobierno,  Plaza de la Constitución, 2"
    }
  ],
  "Zaragoza": [
    {
      "value": "99",
      "content": "Cualquier oficina"
    },
    {
      "value": "1",
      "content": " Oficina de Extranjeros, Obispo Covarrubias , 1"
    }, 
    {
      "value": "2",
      "content": "CNP Calatayud Comisaría Policía, Coral Bilbilitana, s/n"
    },
    {
      "value": "3",
      "content": "CNP Zaragoza Unidad Doc. Extranjeros, C/ Obispo Covarrubias, s/n"
    }
  ]
}

const req_data = { 
    locality: "/icpplus/citar?p=2&locale=es", 
    office: "2",
    policia_tramites: '4112', 
    nie: "Z0563935A", 
    pnm: "653615024", 
    email: "lina.keratina@gmail.com",
    citado: "KATERINA SOLODA"  
}      
 

const ethDebug = (eth) => {  
    console.log(`
        \nEth${eth} - P -
    `) 
}   

const randomTimeout = () => {  
  return Math.floor(Math.random() * 300) + 1000 
} 
    
const PROXY_INDEX = 29
 
const getProxySysPth = (proxy, loc = false) => {
  return `${__dirname}/pdata/${proxy.replace(":", "_")}.${loc ? "ls" : "cookie"}` 
}


const getProxy = async () => {  
    return await new Promise(async (resolve, reject) =>  
    {   
        fs.readFile(__dirname + "/webshare.txt", 'utf8', (e, d) => {
            return resolve(d.replaceAll("\r", "").split("\n")[PROXY_INDEX])     
        })   
    })      
}


const getProxyConfig = async (sysPthCookie, sysPthLS) => {
  return await new Promise(async (root) => {
    const cookie = await new Promise(async (resolve, _) =>  
    {   
        fs.readFile(sysPthCookie, 'utf8', (e, d) => {
            if(e) return resolve([])
            const spl = d.split("|Mo") 
            const p = JSON.parse(spl[0])    

            return resolve({
              cookies: p, 
              ua: spl[1]
            })     
        })     
    })
    const ls = await new Promise(async (resolve, _) => {
      fs.readFile(sysPthLS, 'utf8', (e, d) => {
        if(e) return resolve([])
        const p = JSON.parse(d)   
        return resolve(p)     
      }) 
    })
    return root({
      ...cookie, 
      ls
    })
  }) 
}

const setupProxy = async (proxy) => {
  const sysPthCookie = getProxySysPth(proxy)
  const sysPthLS = getProxySysPth(proxy, true)
  if(fs.existsSync(sysPthCookie)) return {
    ...await getProxyConfig(sysPthCookie, sysPthLS)
  }  

  const ua = uas[Math.floor(Math.random()*uas.length)]

  fs.writeFileSync(sysPthCookie, `[]|${ua}`) 
  fs.writeFileSync(sysPthLS, "[]")
  return {  
    cookies: [], 
    ua,
    ls: []
  }  
}

const writeProxyCookies = (cks, proxy) => {
  const sysPth = getProxySysPth(proxy) 
  const {ua} = getProxyConfig(sysPth) 
  fs.writeFileSync(sysPth, JSON.stringify(cks)+"|"+ua) 
}

const writeProxyLS = (ls, proxy) => {
  const sysPthLS = getProxySysPth(proxy, true)
  fs.writeFileSync(sysPthLS, JSON.stringify(ls))
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


const solveCaptcha = async (fname) => {

  const filePath = `${__dirname}/${fname}`;

  const formData = new FormData();
  
  const fileData = fs.readFileSync(filePath);
  
  // Create a Blob object from the Buffer data
  const blob = new Blob([fileData]); 
  
  // Добавляем файл в объект FormData
  formData.append('file', blob, '${fname}');
  
  // Добавляем другие данные в объект FormData
  formData.append('key', '8hqpcfc2nbrg7ywzltgt3knvqrdzwbdk');
  formData.append('method', 'post'); 
   
  const captchaId = await axios.post("http://azcaptcha.com/in.php", formData)
  const id = captchaId.data.split("|")[1]
  await sleep(4000)
  const solve = await axios.get(`http://azcaptcha.com/res.php?key=8hqpcfc2nbrg7ywzltgt3knvqrdzwbdk&action=get&id=${id}`)
  return solve.data.split("|")[1]

}
 
  
const BOOTSTRAP = async () => { 

  try {
    const extSysPth = "C:\\Users\\lebed\\AppData\\Local\\Google\\Chrome for Testing\\User Data\\Default\\Extensions\\cclelndahbckbenkjhflpdbgdldlbecc\\0.5.3_0"
    
    puppeteer.use(pluginStealth())      

    const pr = await getProxy()

    const {cookies, ua} = await setupProxy(pr)  
        
    const browser = await puppeteer.launch({     
        slowMo: 10, 
        headless: false, 
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", 
        args: [  
            `--start-maximized`, 
            `--proxy-server=${pr}`,   
            `--disable-extensions-except=${extSysPth}`,
            `--load-extension=${extSysPth}`,
        ], 
    })  
    const page = await browser.newPage();  
     
    console.log(`\n COOKIE SIZE: ${cookies.length}\nUSING PROXY: ${pr}`)
 
    await page.setCookie(...cookies)   

    await page.setExtraHTTPHeaders({
      "User-Agent": ua, 
      "sec-ch-ua": 'Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121',
      "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "Accept-Encoding": "gzip, deflate, br, zstd",
    })  

    await page.goto(`https://icp.administracionelectronica.gob.es/icpplus/index.html`, { waitUntil: 'networkidle2' })
    for(var i=0;i < 100;i++) {
      await page.waitForSelector("#form")    
      
      await page.select("#form", req_data.locality)  
      
      await page.waitForTimeout(2200)  
  
      await Promise.all([page.click("#btnAceptar"), page.waitForNavigation({waitUntil:'networkidle2'})])
  
      await page.waitForSelector("#sede")
  
      await page.waitForTimeout(2200) 
  
      await Promise.all([page.select("#sede", "2"), page.waitForNavigation({waitUntil:'networkidle2'})])
  
      await page.waitForSelector(".mf-input__l")
      await page.waitForSelector("#btnAceptar")
  
      await page.select(".mf-input__l", "4112")
   
      await page.waitForTimeout(2200)
  
      await Promise.all([page.click("#btnAceptar"), page.waitForNavigation({waitUntil:'networkidle2'})])
  
      await page.waitForSelector("#btnVolver")
  
      await page.waitForTimeout(2200)  
  
      await Promise.all([page.click("#btnVolver"), page.waitForNavigation({waitUntil:'networkidle2'})])

      await page.waitForSelector("#btnVolver")
      await page.waitForTimeout(2200) 


      
      
      await Promise.all([page.click("#btnVolver"), page.waitForNavigation({waitUntil: 'networkidle2'})])
      
      await page.reload()
      
    } 
    /*await page.waitForTimeout(3200)
    await page.reload() 

    await page.waitForSelector("#form")    
     
    await page.waitForTimeout(2200) 
    
    await page.select("#form", req_data.locality)  
    
    await page.waitForTimeout(2200)  

    await Promise.all([page.click("#btnAceptar"), page.waitForNavigation({waitUntil:'networkidle2'})])
    ethDebug(1) 

    await page.waitForSelector("#sede")

    await page.waitForTimeout(2200) 

    await Promise.all([page.select("#sede", "2"), page.waitForNavigation({waitUntil:'networkidle2'})])
    ethDebug(2) 

    await page.waitForSelector(".mf-input__l")
    await page.waitForSelector("#btnAceptar")

    await page.select(".mf-input__l", "4112")
 
    await page.waitForTimeout(2200)

    await Promise.all([page.click("#btnAceptar"), page.waitForNavigation({waitUntil:'networkidle2'})])
    ethDebug(3)

    await page.waitForSelector("#btnEntrar")

    await page.waitForTimeout(2200)  

    await page.click("#btnEntrar")

    await page.waitForSelector("#txtIdCitado")
    await page.waitForSelector("#txtDesCitado")
    await page.waitForSelector("#btnEnviar")

    await page.type("#txtIdCitado", req_data.nie) 

    await page.waitForTimeout(2200) 

    await page.type("#txtDesCitado", req_data.citado)

    await page.waitForTimeout(2200)

    await Promise.all([page.click("#btnEnviar"), page.waitForNavigation({waitUntil:'networkidle2'})])
    ethDebug(4)

    await page.waitForSelector("#btnEnviar")

    await page.waitForTimeout(2200) 

    await Promise.all([page.click("#btnEnviar"), page.waitForNavigation({waitUntil:'networkidle2'})])

    await page.waitForSelector("#txtTelefonoCitado")

    await page.waitForTimeout(2200)  

    await page.type("#txtTelefonoCitado", req_data.pnm)
    await page.type("#emailUNO", req_data.email)
    await page.type("#emailDOS", req_data.email) 

    await page.waitForTimeout(2200)  

    await Promise.all([page.click("#btnSiguiente"), page.waitForNavigation({waitUntil:'domcontentloaded'})])  

    await page.waitForSelector("#btnSiguiente")
    await page.waitForSelector("#cita1")
    ethDebug(5)
    

    try {
      const element = await page.waitForSelector(".img-thumbnail", {timeout: 5000}) 
      
      await page.waitForTimeout(randomTimeout()) 
  
      
      await element.screenshot({ 
        path: `post_image_1.jpg`  
      });   
  
      const key = await solveCaptcha(`post_image_1.jpg`)
      await page.type("#captcha", key)
    } catch(e) {
      console.log(e)
    }

    await page.click("#cita1")

    await page.click("#btnSiguiente")
    
    await page.waitForTimeout(2000)
    
    await page.waitForSelector(".btn")
    await page.click(".btn")
    

    await page.waitForTimeout(10000)

    await Promise.all([page.goto("https://icp.administracionelectronica.gob.es/icpplus/index.html"), page.waitForNavigation({waitUntil:'domcontentloaded'})]) 
    
    
    const cks = await page.cookies()  

    writeProxyCookies(cks, pr)
    ethDebug(5) */
  } catch(e) {

  }
}


//captcha()

//solveCaptcha()
     
BOOTSTRAP()   





