// variáveis da bolinha

let xBolinha = 300;
let yBolinha = 200;
let diameter = 13;
let raio = diameter / 2;

//Velocidade da bolinha

let velocidadeBolinhaX = 6;
let velocidadeBolinhaY = 6;

//Variáveis da raquete do usuário

let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let auturaRaquete = 90;

//Variáveis da raquete da máquina

let xRaqueteMaquina = 585;
let yRaqueteMaquina = 150;
let velocidadeYMaquina;

//Variáveis do placar

let pontosUsuario = 0;
let pontosMaquina = 0;

//Variáveis dos sons do jogo

let pontoUsuario;
let pontoMaquina;
let toqueBolinha;
let trilhaSonora;

let chanceErro = 0;

function setup() {
  createCanvas(600, 400);
  // trilhaSonora.loop();
}

function preload() {
  trilhaSonora = loadSound("sons/trilha.mp3");
  pontoUsuario = loadSound("sons/pontos_usuario.mp3");
  pontoMaquina = loadSound("sons/pontos_maquina.mp3");
  toqueBolinha = loadSound("sons/toque_bolinha.mp3");
}

function movimentaBolinha() {
  xBolinha += velocidadeBolinhaX;
  yBolinha += velocidadeBolinhaY;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeBolinhaX *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeBolinhaY *= -1;
  }
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diameter); //recebe como parâmetros os valores de x e y e o diâmetro do círculo
}

function mostraRaquete(x, y) {
  rect(x, y, comprimentoRaquete, auturaRaquete); //Recebe como parâmetros os valores de x e y para a posição do retângulo e autura e comprimento do retângulo
}

function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function calculaChanceErro() {
  if (pontosMaquina >= pontosUsuario) {
    chanceErro += 1;
    if (chanceErro >= 39) {
      chanceErro = 40;
    }
  } else {
    chanceErro -= 1;

    if (chanceErro <= 35) {
      chanceErro = 35;
    }
  }
}

function movimentaRaqueteMaquina() {
  velocidadeYMaquina = yBolinha - yRaqueteMaquina - comprimentoRaquete / 2 - 30;
  yRaqueteMaquina += velocidadeYMaquina;
  calculaChanceErro();
}

function collideRectCircle(xRect, yRect, rectWidth, rectHeight, xCircle, yCircle, diameter) {
  //2d
  var testX = xCircle;
  var testY = yCircle;

  // which edge is closest?
  if (xCircle < xRect) {
    testX = xRect; // left edge
  } else if (xCircle > xRect + rectWidth) {
    testX = xRect + rectWidth;
  } // right edge

  if (yCircle < yRect) {
    testY = yRect; // top edge
  } else if (yCircle > yRect + rectHeight) {
    testY = yRect + rectHeight;
  } // bottom edge

  // // get distance from closest edges
  var distance = this.dist(xCircle, yCircle, testX, testY);

  // if the distance is less than the radius, collision!
  if (distance <= diameter / 2) {
    return true;
  }
  return false;
}

function verificaColisaoRaquete(x, y) {
  if (
    collideRectCircle(
      x,
      y,
      comprimentoRaquete,
      auturaRaquete,
      xBolinha,
      yBolinha,
      diameter
    )
  ) {
    velocidadeBolinhaX *= -1;
    toqueBolinha.play();
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(pontosUsuario, 170, 26);
  fill(color(255, 140, 0));
  // console.log("Usuário: " + pontosUsuario);
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosMaquina, 470, 26);
  // console.log("Pontos máquina: " + pontosMaquina);
}

function marcaPontos() {
  if (xBolinha > 590) {
    pontosUsuario += 1;
    pontoUsuario.play();
  }
  if (xBolinha < 10) {
    pontosMaquina += 1;
    pontoMaquina.play();
  }
}

function draw() {
  background(0);
  movimentaBolinha();
  verificaColisaoBorda();
  mostraBolinha();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteMaquina, yRaqueteMaquina);
  movimentaRaquete();
  movimentaRaqueteMaquina();

  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteMaquina, yRaqueteMaquina);

  incluiPlacar();
  marcaPontos();
}
