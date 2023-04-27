// Declaraciones 

let balls = []; // Declara una matriz vacía llamada "balls"
let ballTimer = 0; // Inicializa una variable "ballTimer" con el valor 0
let score = 0; // Inicializa una variable "score" con el valor 0
let level = 0; // Inicializa una variable "level" con el valor 0
let dragonColor = "green"; // Inicializa una variable "dragonColor" con el valor "green"
let winnerButton; // Declara una variable "winnerButton" sin asignarle un valor
let scorePosition; // Declara una variable "scorePosition" sin asignarle un valor
let levelPosition; // Declara una variable "levelPosition" sin asignarle un valor


// SETUP

function setup() { // Inicio de la función "setup"
  createCanvas(400, 400); // Crea un lienzo de dibujo de 400 x 400
  dragon = new Dragon(); // Crea una nueva instancia de la clase "Dragon" y la asigna a la variable "dragon"
  scorePosition = createVector(10, 30); // Crea un vector de posición (x, y) y lo asigna a la variable "scorePosition"
  levelPosition = createVector(width - 10, 30); // Crea un vector de posición (x, y) y lo asigna a la variable "levelPosition"
}


// FUNCIÓN DRAW

function draw() {
  background(220); // establece el color de fondo del canvas
  for (let ball of balls) { // recorre el arreglo de bolas
    ball.show(); // llama al método show de cada bola para dibujarla en el canvas
    ball.move(); // llama al método move de cada bola para moverla en el canvas
    if (ball.isOffscreen()) { // verifica si la bola ha salido del canvas
      balls.splice(balls.indexOf(ball), 1); // elimina la bola del arreglo
    }
    if (dragon.hits(ball)) { // verifica si el dragón ha chocado con la bola
      score += ball.value; // aumenta el puntaje del jugador con el valor de la bola
      if (score >= 1000 && level === 0) { // si el puntaje es mayor o igual a 1000 y el nivel es 0
        level = 1; // sube al nivel 1
        dragonColor = "blue"; // cambia el color del dragón a azul
      } else if (score >= 2500 && level === 1) { // si el puntaje es mayor o igual a 2500 y el nivel es 1
        level = 2; // sube al nivel 2
        dragonColor = "purple"; // cambia el color del dragón a morado
      } else if (score >= 5000 && level === 2) { // si el puntaje es mayor o igual a 5000 y el nivel es 2
        level = 3; // sube al nivel 3
        dragonColor = "red"; // cambia el color del dragón a rojo
        noLoop(); // detiene la animación del juego
        background(220); // establece el color de fondo del canvas
        textSize(50); // establece el tamaño de fuente del texto
        textAlign(CENTER, CENTER); // establece la alineación del texto
        fill("black"); // establece el color de fuente del texto
        text("WINNER", width / 2, height / 2); // dibuja el texto en el centro del canvas
        winnerButton = createButton('Play Again'); // crea un botón para jugar de nuevo
        winnerButton.position(width/2 - 50, height/2 + 40); // establece la posición del botón
        winnerButton.mousePressed(playAgain); // llama a la función playAgain cuando se hace clic en el botón
      }// Elimina la bola actual del arreglo de bolas
balls.splice(balls.indexOf(ball), 1);
    }
}
// Muestra al dragón en la pantalla
dragon.show();

// Mueve al dragón en la pantalla de acuerdo a su posición actual
dragon.move();

// Cambia el color del dragón a dragonColor
dragon.color = dragonColor;

// Establece el color de relleno para el texto que se mostrará en la pantalla
fill(0);

// Establece el tamaño del texto que se mostrará en la pantalla
textSize(20);

// Establece la alineación horizontal y vertical del texto que se mostrará en la pantalla
textAlign(LEFT, TOP);

// Muestra el puntaje actual del jugador en la pantalla
text("Score: " + score, scorePosition.x, scorePosition.y);

// Establece la alineación horizontal y vertical del texto que se mostrará en la pantalla
textAlign(RIGHT, TOP);

// Muestra el nivel actual del jugador en la pantalla
text("Level: "+ level, levelPosition.x, levelPosition.y);

// Comprueba si ha pasado un segundo desde que se agregó la última bola, si el nivel actual es menor que 3 y el puntaje actual es menor que 5000
if (millis() - ballTimer > 1000 && level < 3 && score < 5000) {
  // Agrega una nueva bola al juego
  balls.push(new Ball());

  // Restablece el temporizador de bola (ballTimer) al tiempo actual
  ballTimer = millis();
}
}



// Función que se llama cuando el jugador desea jugar de nuevo

function playAgain() {
  // Remueve el botón de ganador de la pantalla
  winnerButton.remove();

  // Reinicia el arreglo de bolas
  balls = [];

  // Reinicia el puntaje del jugador
  score = 0;

  // Reinicia el nivel del jugador
  level = 0;

  // Reinicia el color del dragón a verde
  dragonColor = "green";

  // Continúa ejecutando el juego
  loop();
}




// Clase Dragon para representar al personaje del jugador

class Dragon {
  constructor() {
    this.x = width / 2; // Posición inicial del personaje en el centro de la pantalla horizontalmente
    this.y = height / 2; // Posición inicial del personaje en el centro de la pantalla verticalmente
    this.speed = 5; // Velocidad de movimiento del personaje
    this.size = 30; // Tamaño del personaje
    this.color = "green"; // Color del personaje
  }

  // Método para dibujar el personaje en la pantalla
  show() {
    fill(this.color); // Establece el color de relleno al color del personaje
    ellipse(this.x, this.y, this.size, this.size); // Dibuja el personaje como un círculo
  }

  // Método para mover al personaje en la pantalla
  move() {
    if (keyIsDown(LEFT_ARROW)) { // Si el jugador presiona la tecla de flecha izquierda
      this.x -= this.speed; // Disminuye la posición horizontal del personaje
    } 
    if (keyIsDown(RIGHT_ARROW)) { // Si el jugador presiona la tecla de flecha derecha
      this.x += this.speed; // Aumenta la posición horizontal del personaje
    } 
    if (keyIsDown(UP_ARROW)) { // Si el jugador presiona la tecla de flecha arriba
      this.y -= this.speed; // Disminuye la posición vertical del personaje
    } 
    if (keyIsDown(DOWN_ARROW)) { // Si el jugador presiona la tecla de flecha abajo
      this.y += this.speed; // Aumenta la posición vertical del personaje
    }
    // Limita la posición del personaje dentro de los límites de la pantalla
    this.x = constrain(this.x, 0 + this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, 0 + this.size / 2, height - this.size / 2);
  }

  // Método para determinar si el personaje ha sido golpeado por una bola
  hits(ball) {
    let d = dist(this.x, this.y, ball.x, ball.y); // Calcula la distancia entre el personaje y la bola
    return d < this.size / 2 + ball.size / 2; // Retorna verdadero si la distancia es menor que la suma de los radios del personaje y la bola
  }
}

// Clase Ball para representar las bolas (3 niveles - 3 colores diferentes)
class Ball {
  constructor() {
    // Tamaño y color aleatorios
    this.size = 20;
    this.color = random(["yellow", "blue", "red"]);
    // Posición inicial y velocidad aleatoria
    this.x = width + this.size / 2;
    this.y = random(height);
    this.xSpeed = random(-5, -1);
    this.ySpeed = random(-5, 5);
    // Valor de puntos basado en el color
    if (this.color === "blue") {
      this.value = 100;
    } else if (this.color === "red") {
      this.value = 200;
    } else if (this.color === "yellow") {
      this.value = 500;
    }
  }
 
  show() {
    // Dibujar la pelota en la pantalla
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    // Mover la pelota en cada frame
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  isOffscreen() {
    // Verificar si la pelota está fuera de la pantalla
    return this.x < -this.size / 2;
  }
}
