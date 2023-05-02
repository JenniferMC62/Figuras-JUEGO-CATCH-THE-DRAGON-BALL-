# **Explicación del Código (Detallada)**

## **Declaración de Variables**

<br>
<div/>

<div style="text-align: justify">

Iniciamos declarando las variables (**"let"** ya que solo pueden ser actualizadas dentro del ámbito en el que se declararon).

<br>
<div/>

```javascript
let movingObjects = []; // Creamos un array (arreglo) vacío que se utiliza para almacenar objetos que estarán en movimiento durante el juego 
```

```javascript
let ballTimer = 0; // Variable numérica que se inicializamos en 0 y se utiliza para hacer un seguimiento del tiempo transcurrido desde que se lanzó la bola

let score = 0; // Inicializamos la variable "score" en 0 y se utiliza para hacer un seguimiento de la puntuación del jugador

let level = 0; // Inicializamos la variable "level" en 0 y se utiliza para hacer un seguimiento del nivel actual del jugador

let dragonColor = "green"; // Inicializamos la variable "dragonColor" en "green" y se utiliza para definir el color del dragón en el juego (la bola principal)

```

```javascript
let winnerButton; // Declaramos la variable "winnerButton" sin inicializarla, significa que podemos asignarle un valor más adelante

let scorePosition; // Declaramos la variable "scorePosition" sin inicializarla, significa que podemos asignarle un valor más adelante (donde ubicaremos la posición del letrero de la puntuación del jugardor)

let levelPosition; // Declaramos la variable "levelPosition" sin inicializarla, significa que podemos asignarle un valor más adelante (donde ubicaremos la posición del letrero del nivel del jugardor)
```

<br>
<div/>

## **Función setup()**

<br>
<div/>

En esta parte del código tenemos la función **"setup"** en donde:

<br>
<div/>

- Creamos un canvas de 400x400 píxeles
<br>
<div/>

- Inicializamos **"scorePosition"** y **"levelPosition"** con vectores de posición
<br>
<div/>

- Creamos un nuevo objeto de tipo Dragon al array (arreglo) **"movingObjects"**.

<br>
<div/>

```javascript
function setup() {

  createCanvas(400, 400);   // Creamos un canvas de 400x400 píxeles

  movingObjects.push(new Dragon());   // Agregamos un nuevo objeto de tipo Dragon al array "movingObjects"

  scorePosition = createVector(10, 30);  // Creamos un vector con coordenadas (10, 30) y lo asignamos a la variable "scorePosition"
  levelPosition = createVector(width - 10, 30); // Creamos un vector con coordenadas (ancho - 10, 30) y lo asignamos a la variable "levelPosition"

}
```

<br>
<div/>

## **Función draw()**

<br>
<div/>

Aquí tenemos la función **draw()** donde primero establecemos el color de fondo en gris claro

<br>
<div/>

```javascript
function draw() {
  // Establecemos el color de fondo en gris claro
  background(220);
```
<br>

En la misma función **draw()** también tenemos un ciclo **"for of"** para iterar a través de cada objeto en el array movingObjects y creamos una variable **"object"** para cada elemento del arreglo.

<br>


Y tenemos una condición **if** que comprueba si el objeto es una instancia de la clase **Ball** y si está fuera de la pantalla utilizando el método **isOffscreen()**. Si es así, el objeto se elimina del array **movingObjects** utilizando el método **splice()**. La expresión **movingObjects.indexOf(object)** devuelve el índice del objeto en el array y 1 indica que se debe eliminar solo un elemento en esa posición.

<br>
<div/>


```javascript
// Iteramos a través de cada objeto en el array "movingObjects"
  for (let object of movingObjects) {

    // Llama al método show() para mostrar el objeto en la pantalla
    object.show();
    // Llama al método move() para mover el objeto
    object.move();

    // Si el objeto es una pelota y está fuera de la pantalla, lo eliminamos del array "movingObjects"
    if (object instanceof Ball && object.isOffscreen()) {
      movingObjects.splice(movingObjects.indexOf(object), 1);
    }
```
<br>
<div/>

Continuamos en la función **draw()** con el siguiente **if** el cual tiene dos diferentes condiciones:

<br>
<div/>

- La primera condición, **object instanceof Ball**, comprueba si el objeto es una pelota. Si el objeto no es una pelota, la expresión completa devolverá false y no se ejecutará el bloque de código que sigue.

<br>
<div/>

- La segunda condición, **movingObjects[0].hits(object)**, comprueba si el objeto colisiona con la primera pelota en el arreglo **movingObjects**. La función **hits()** verifica si el objeto y la pelota chocan (hits - golpear) en la pantalla. Si la pelota y el objeto no colisionan, la expresión completa devuelve false y no se ejecuta el bloque de código que sigue.

<br>
<div/>

Si ambas condiciones son verdaderas, significa que la pelota y el objeto colisionan. En ese caso, el valor de la pelota se suma a la variable **score**, que lleva el registro de la puntuación del jugador. La variable **object.value** se refiere al valor numérico asignado a cada pelota en la función **Ball()**.

<br>
<div/>

```javascript
    // Si el objeto es una pelota y la primera pelota en el array "movingObjects" colisiona con ella,
    // actualizamos la puntuación y comprobamos si se cumple alguna condición de nivel
    if (object instanceof Ball && movingObjects[0].hits(object)) {
      score += object.value; // Incrementamos la puntuación según el valor de la pelota
```

<br>
<div/>

Después de actualizar la puntuación, el bloque de código verifica si se ha alcanzado un cierto nivel y actualiza las variables **level** y **dragonColor**.

<br>
<div/>

- Si el puntaje es **mayor o igual a 1000 y el nivel actual es 0**, se actualiza el nivel a 1 y se cambia el color del dragón a azul.

<br>
<div/>

- Si el puntaje es **mayor o igual a 2500 y el nivel actual es 1**, se actualiza el nivel a 2 y se cambia el color del dragón a morado. 

<br>
<div/>

- Si el puntaje es **mayor o igual a 5000 y el nivel actual es 2**, se actualiza el nivel a 3 y se cambia el color del dragón a rojo.


<br>
<div/>


```javascript
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
```

<br>
<div/>

Continuando en la función **draw()** si el jugador a ganado el juego Esta parte del código es responsable de mostrar un mensaje de "ganador" cuando el jugador ha alcanzado un puntaje determinado en el juego. En este caso, cuando el jugador alcanza un puntaje de al menos 5000 puntos y ha alcanzado el nivel 3 del juego, el juego se detiene y se muestra un mensaje de "WINNER" en la pantalla.

<br>
<div/>

- La función **noLoop()** se llama para detener el bucle de dibujo y detener el juego.

- La función **background(220)** se llama para dibujar un fondo gris claro en la pantalla.

- la función **textSize(50)** se llama para establecer el tamaño de la fuente del mensaje de ganador en 50 píxeles.

- La función **textAlign(CENTER, CENTER)** se utiliza para centrar el texto horizontal y verticalmente en la pantalla.

- La función **fill("black")** se utiliza para establecer el color del texto en negro.

- La función **text("WINNER", width / 2, height / 2)** se llama para dibujar el texto "WINNER" en el centro de la pantalla, utilizando las variables **width** y **height** para determinar la posición central de la pantalla.

<br>
<div/>



```javascript
        // Si el jugador ha llegado al nivel 3 y ha obtenido al menos 5000 puntos, se detiene el juego y se muestra un mensaje de ganador
        noLoop();
        background(220);
        textSize(50);
        textAlign(CENTER, CENTER);
        fill("black");
        text("WINNER", width / 2, height / 2);
```


<br>
<div/>

Después creamos un botón en la pantalla que permite al jugador volver a jugar después de haber ganado el juego.

<br>
<div/>

```javascript
        // Creamos un botón para volver a jugar y lo mostramos en la pantalla

        winnerButton = createButton('Play Again'); // Creamos un nuevo botón y lo asigna a la variable winnerButton. 'Play Again' es el texto que se muestra en el botón

        winnerButton.position(width/2 - 50, height/2 + 40); // width/2 - 50 establece la posición horizontal del botón en el centro de la pantalla con un desplazamiento de 50 píxeles hacia la izquierda, mientras que height/2 + 40 establece la posición vertical del botón en el centro de la pantalla con un desplazamiento de 40 píxeles hacia abajo

        winnerButton.mousePressed(playAgain); //  establece una función playAgain que se ejecutará cuando se haga clic en el botón
      }
```

<br>
<div/>

En esta parte del código se elimina la pelota del array **"movingObjects"** si cumple dos condiciones:

<br>
<div/>

1. Es una instancia de la clase **"Ball"**.
2. Ha salido de la pantalla.

<br>
<div/>

Si ambas condiciones se cumplen, entonces la pelota se elimina del array mediante el método **splice()**. En este caso, se utiliza el método **indexOf()** para encontrar el índice de la pelota en el array **"movingObjects"**, y se especifica 1 como el número de elementos a eliminar, ya que solo se quiere eliminar la pelota actual. 

<br>
<div/>


```javascript
     // Eliminamos la pelota del array "movingObjects"
      movingObjects.splice(movingObjects.indexOf(object), 1);
    }
  }
```

<br>
<div/>

Luego mostramos la puntuación y el nivel actual del jugador en la pantalla del juego.

<br>
<div/>

```javascript

  // Mostramos la puntuación y el nivel en la pantalla

  fill(0); // Para que sea negro

  textSize(20); // Se establece el tamaño del texto

// Indica que el texto "Score" estará alineado a la izquierda y en la parte superior de la pantalla
  textAlign(LEFT, TOP);
  text("Score: " + score, scorePosition.x, scorePosition.y);

// El texto "Level" estará alineado a la derecha y también en la parte superior de la pantalla
  textAlign(RIGHT, TOP);
  text("Level: "+ level, levelPosition.x, levelPosition.y);
```

<br>
<div/>

Por último en la función **draw()** tenemos la siguiente condición en donde se verifica que el nivel actual sea menor que 3 y la puntuación del jugador sea menor que 5000. Además, hay una probabilidad del 2% de que se añada una nueva pelota en cada iteración del bucle principal. Esto se logra mediante el uso de la función **"random()"**, que devuelve un número aleatorio entre 0 y 1, y comprobando si el número aleatorio es menor que 0.02

<br>
<div/>

Si se cumple la condición, se crea una nueva instancia de la clase **"Ball"** y se agrega al array **"movingObjects"** usando la función **"push()"**.

<br>
<div/>

```javascript
  // Si el nivel es menor que 3, la puntuación es menor que 5000 y se cumple una probabilidad del 2%, agregamos una nueva pelota al array "movingObjects"
  if (random() < 0.02 && level < 3 && score < 5000) {
    movingObjects.push(new Ball());
  }
}
```

<br>
<div/>

## **Función playAgain()**

<br>
<div/>

Esta función se llama cuando se hace clic en el botón **"Play Again"** y se utiliza para reiniciar el juego después de que el jugador gane.

<br>
<div/>

```javascript
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
```

<br>
<div/>

## **Clase MovingObject**

<br>
<div/>

En esta parte definimos la clase **"MovingObject"** que representa un objeto móvil en el juego. 

<br>
<div/>

La clase tiene un constructor que inicializa las propiedades **"size"** (tamaño), **"color"**, **"x"** y **"y"** (posiciones). 

<br>
<div/>

También tiene tres métodos: 

<br>
<div/>

- **show()** que dibuja el objeto en la pantalla, utilizando el tamaño y el color especificados. 
- **move()** que no tiene implementación en la clase base, y se espera que se implemente en las subclases para proporcionar un comportamiento de movimiento específico para cada tipo de objeto móvil.
- **hits()** que se se espera implementar en las subclases para proporcionar un comportamiento específico de colisión para cada tipo de objeto móvil.

<br>
<div/>


```javascript
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
```

## **Clase Dragon**

<br>
<div/>

Aquí tenemos una subclase llamada **"Dragon"** que hereda de la clase **"MovingObject"**. Tiene un constructor que inicializa las variables específicas del dragón, como su tamaño, posición, velocidad y color. 

<br>
<div/>

```javascript
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
```

<br>
<div/>

También tiene un método **"move()"** que controla el movimiento del dragón en la pantalla. En este método, se verifica si las flechas izquierda, derecha, arriba o abajo están presionadas usando las funciones **keyIsDown()**. Dependiendo de la tecla presionada, la posición x o y del dragón se incrementa o decrementa por el valor de **this.speed**.

<br>
<div/>

Además, el movimiento del dragón se restringe a los límites de la pantalla usando la función **constrain()**. El primer parámetro es el valor que se quiere restringir, el segundo es el valor mínimo permitido y el tercer parámetro es el valor máximo permitido. 

<br>
<div/>

```javascript
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

```

<br>
<div/>

Por último se implementa el método **hits** el cual recibe como parámetro otro objeto y verifica si hay una colisión entre el dragón y ese objeto.

<br>
<div/>

Primero, se calcula la distancia entre el centro del dragón (representado por sus coordenadas x y y) y el centro del objeto que se pasa como parámetro (también representado por sus coordenadas x y y). Esto se hace utilizando la función **dist()**, que calcula la distancia euclidiana entre dos puntos en un plano cartesiano.

<br>
<div/>

Luego, se compara esta distancia con la suma de los radios del dragón y el objeto. Si la distancia es menor que esta suma, significa que los dos objetos están colisionando y, por lo tanto, el método retorna true. En caso contrario, retorna false.

<br>
<div/>

```javascript
// Método que verifica si el dragón colisiona con otro objeto
hits(object) {
let d = dist(this.x, this.y, object.x, object.y); // Calcula la distancia entre el dragón y el objeto
return d < (this.size / 2 + object.size / 2); // Retorna true si la distancia es menor a la suma de los radios del dragón y el objeto
}
}
```

<br>
<div/>





