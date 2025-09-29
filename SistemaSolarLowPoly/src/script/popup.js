export function showPlanetInfo(name) {
    const info = {
        Mercury: {
            Title: "Mercúrio",
            Description: "Mercúrio é o planeta mais próximo do Sol e o menor do sistema solar. Devido à sua proximidade com o Sol, ele tem temperaturas extremas."
        },
        Venus: {
            Title: "Vênus",
            Description: "Vênus tem uma atmosfera densa de CO₂ que causa efeito estufa extremo, sendo o planeta mais quente."
        },
        Earth: {
            Title: "Terra",
            Description: "A Terra é o único planeta conhecido que abriga vida, com água líquida e atmosfera protetora."
        },
        Mars: {
            Title: "Marte",
            Description: "Conhecido como Planeta Vermelho, Marte possui calotas polares e grandes desertos."
        },
        Jupiter: {
            Title: "Júpiter",
            Description: "O maior planeta do Sistema Solar, famoso pela Grande Mancha Vermelha."
        },
        Saturn: {
            Title: "Saturno",
            Description: "Saturno se destaca por seus impressionantes anéis compostos de gelo e rocha."
        },
        Uranus: {
            Title: "Urano",
            Description: "Um gigante gasoso inclinado, que gira praticamente de lado."
        },
        Neptune: {
            Title: "Netuno",
            Description: "O planeta mais distante do Sol, com ventos extremamente fortes."
        }
    };

    const titleElement = document.getElementById("planet-title");
    const descElement  = document.getElementById("planet-description");

    if (info[name]) {
        titleElement.textContent = info[name].Title;
        descElement.textContent  = info[name].Description;
    } else {
        titleElement.textContent = "Planeta desconhecido";
        descElement.textContent  = "";
    }
}
