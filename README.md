# Minimalist Pro Calculator

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Uma calculadora web moderna, expansível e responsiva construída puramente com Vanilla JavaScript, HTML e CSS. Desenvolvida com foco em arquitetura de código, usabilidade (UX) e design de interface (UI).

## Interface do Projeto

Abaixo estão as visualizações dos dois modos de operação da calculadora:

### Modo Standard
> Cole aqui a imagem da calculadora no modo normal
![Modo Standard](./standard.png)

### Modo Scientific


## Funcionalidades (Features)

* Dual-Mode UI: Alternância fluida e animada entre o modo Standard (básico) e o modo Scientific (avançado).
* Design Premium: Paleta de cores Lemon Yellow & Charcoal (Amarelo Limão e Carvão), tipografia monoespaçada e sombras dramáticas para profundidade.
* Acessibilidade de Teclado: Suporte completo para digitação via teclado físico com feedback visual táctil na interface.
* Smart Parsing: Motor matemático inteligente que resolve expressões complexas:
  * Cálculo nativo de porcentagem comercial (ex: 50 + 20% = 60).
  * Auto-fechamento de parênteses para evitar erros de sintaxe (ex: sin(90 vira sin(90)).
  * Deleção inteligente (apaga funções como log( inteiras num só clique).
* Ripple Effect: Animação de clique baseada em coordenadas exatas do mouse, construída do zero com CSS e JS puros, sem bibliotecas externas.

## Arquitetura e Código Limpo (Clean Code)

Este projeto foi reestruturado para demonstrar boas práticas de Engenharia de Software:
* Orientação a Objetos (OOP): Toda a lógica matemática e de estado foi encapsulada numa classe Calculator, separando o "Cérebro" da "Interface" (DOM).
* Event Delegation: O painel de botões utiliza um único Event Listener global para capturar os cliques, otimizando o uso de memória do navegador.
* Expressões Regulares (Regex): Utilização de Regex para interceptar, traduzir e tratar strings matemáticas antes da execução, garantindo cálculos seguros.

## Como Executar

Por ser um projeto puramente Vanilla, não requer instalação de dependências ou build steps.
1. Faça o clone deste repositório:
   ```bash
   git clone [https://github.com/joaorizzo0112/Project-Calculator.git](https://github.com/joaorizzo0112/Project-Calculator.git)
