let movingObjects = []; // Creamos un array vacío llamado "movingObjects"
let ballTimer = 0; // Inicializamos la variable "ballTimer" en 0
let score = 0; // Inicializamos la variable "score" en 0
let level = 0; // Inicializamos la variable "level" en 0
let dragonColor = "green"; // Inicializamos la variable "dragonColor" en "green"
let winnerButton; // Declaramos la variable "winnerButton" sin inicializarla
let scorePosition; // Declaramos la variable "scorePosition" sin inicializarla
let levelPosition; // Declaramos la variable "levelPosition" sin inicializarla




// Definimos la función "setup"
function setup() {

  createCanvas(400, 400);   // Creamos un canvas de 400x400 píxeles
  movingObjects.push(new Dragon());   // Agregamos un nuevo objeto de tipo Dragon al array "movingObjects"
  scorePosition = createVector(10, 30);  // Creamos un vector con coordenadas (10, 30) y lo asignamos a la variable "scorePosition"
  levelPosition = createVector(width - 10, 30); // Creamos un vector con coordenadas (ancho - 10, 30) y lo asignamos a la variable "levelPosition"
}




// Definimos la función "draw"
function draw() {
  // Establecemos el color de fondo en gris claro
  background(220);

  // Iteramos a través de cada objeto en el array "movingObjects"
  for (let object of movingObjects) {
    // Mostramos el objeto en la pantalla
    object.show();
    // Movemos el objeto
    object.move();

    // Si el objeto es una pelota y está fuera de la pantalla, lo eliminamos del array "movingObjects"
    if (object instanceof Ball && object.isOffscreen()) {
      movingObjects.splice(movingObjects.indexOf(object), 1);
    }

    // Si el objeto es una pelota y la primera pelota en el array "movingObjects" colisiona con ella,
    // actualizamos la puntuación y comprobamos si se cumple alguna condición de nivel
    if (object instanceof Ball && movingObjects[0].hits(object)) {
      score += object.value; // Incrementamos la puntuación según el valor de la pelota
      // Comprobamos si se cumple alguna condición de nivel y actualizamos la variable "level" y "dragonColor" en consecuencia
      if (score >= 1000 && level === 0) {
        level = 1;
        dragonColor = "blue";
      } else if (score >= 2500 && level === 1) {
        level = 2;
        dragonColor = "purple";
      } else if (score >= 5000 && level === 2) {
        level = 3;
        dragonColor = "red";
        // Si el jugador ha llegado al nivel 3 y ha obtenido al menos 5000 puntos, se detiene el juego y se muestra un mensaje de ganador
        noLoop();
        background(220);
        textSize(50);
        textAlign(CENTER, CENTER);
        fill("black");
        text("WINNER", width / 2, height / 2);
        // Creamos un botón para volver a jugar y lo mostramos en la pantalla
        winnerButton = createButton('Play Again');
        winnerButton.position(width/2 - 50, height/2 + 40);
        winnerButton.mousePressed(playAgain);
      }
      // Eliminamos la pelota del array "movingObjects"
      movingObjects.splice(movingObjects.indexOf(object), 1);
    }
  }

  // Mostramos la puntuación y el nivel en la pantalla
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + score, scorePosition.x, scorePosition.y);
  textAlign(RIGHT, TOP);
  text("Level: "+ level, levelPosition.x, levelPosition.y);

  // Si el nivel es menor que 3, la puntuación es menor que 5000 y se cumple una probabilidad del 2%, agregamos una nueva pelota al array "movingObjects"
  if (random() < 0.02 && level < 3 && score < 5000) {
    movingObjects.push(new Ball());
  }
}




// Esta función se llama cuando se hace clic en el botón "Play Again".
// Reinicia las variables del juego y crea un nuevo objeto Dragon.
function playAgain() {
  winnerButton.remove(); // Elimina el botón "Play Again".
  movingObjects = []; // Vacía el arreglo de objetos móviles.
  score = 0; // Reinicia la puntuación a cero.
  level = 0; // Reinicia el nivel a cero.
  dragonColor = "green"; // Restablece el color del dragón a verde.
  movingObjects.push(new Dragon()); // Crea un nuevo objeto Dragon y lo agrega al arreglo de objetos móviles.
  loop(); // Reanuda el bucle de dibujo.
}



// Esta clase es la clase base para todos los objetos móviles del juego.
class MovingObject {
  constructor() {
    this.size = 0; // El tamaño del objeto.
    this.color = ""; // El color del objeto.
    this.x = 0; // La posición X del objeto.
    this.y = 0; // La posición Y del objeto.
  }

  // Muestra el objeto en la pantalla.
  show() {
    fill(this.color); // Establece el color de relleno del objeto.
    ellipse(this.x, this.y, this.size, this.size); // Dibuja una elipse en la posición del objeto con el tamaño especificado.
  }

  // Mueve el objeto.
  move() {
    // Esta función se implementa en las subclases para proporcionar un comportamiento de movimiento específico para cada tipo de objeto móvil.
  }

  // Verifica si este objeto colisiona con otro objeto.
  hits(object) {
    // Esta función se implementa en las subclases para proporcionar un comportamiento específico de colisión para cada tipo de objeto móvil.
  }
}



// Clase Dragon que hereda de la clase MovingObject
class Dragon extends MovingObject {
// Constructor de la clase Dragon
constructor() {
super(); // Llama al constructor de la clase padre
this.x = width / 2;
this.y = height / 2;
this.speed = 5;
this.size = 30;
this.color = "green";
}

// Método para mover el dragón
move() {
if (keyIsDown(LEFT_ARROW)) { // Si se presiona la flecha izquierda
this.x -= this.speed; // Disminuye la posición x del dragón
}
if (keyIsDown(RIGHT_ARROW)) { // Si se presiona la flecha derecha
this.x += this.speed; // Aumenta la posición x del dragón
}
if (keyIsDown(UP_ARROW)) { // Si se presiona la flecha arriba
this.y -= this.speed; // Disminuye la posición y del dragón
}
if (keyIsDown(DOWN_ARROW)) { // Si se presiona la flecha abajo
this.y += this.speed; // Aumenta la posición y del dragón
}
// Restringe el movimiento del dragón a los límites de la pantalla
this.x = constrain(this.x, 0 + this.size / 2, width);
this.y = constrain(this.y, 0 + this.size / 2, height - this.size / 2);
}

// Método que verifica si el dragón colisiona con otro objeto
hits(object) {
let d = dist(this.x, this.y, object.x, object.y); // Calcula la distancia entre el dragón y el objeto
return d < (this.size / 2 + object.size / 2); // Retorna true si la distancia es menor a la suma de los radios del dragón y el objeto
}
}



// Define la clase Ball que hereda de MovingObject
class Ball extends MovingObject {
  constructor() {
    // Llama al constructor de la clase padre
    super();
    // Define las propiedades de la pelota
    this.x = width;
    this.y = random(height);
    this.speed = random(2, 5);
    this.size = random(10, 30);
    this.color = color(random(255), random(255), random(255));
    // Define el valor de la pelota en base a su tamaño
    this.value = Math.round(map(this.size, 10, 30, 100, 500));
  }

  // Define el método move de la pelota
  move() {
    // Actualiza la posición de la pelota en el eje x
    this.x -= this.speed;
    // Mueve la pelota aleatoriamente en el eje y
    this.y += random(-1, 1); 
  }

  // Define el método isOffscreen de la pelota
  isOffscreen() {
    // Devuelve verdadero si la pelota está fuera de la pantalla
    return (this.x < 0);
  }
}
