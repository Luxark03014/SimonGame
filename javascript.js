let sequence = [];
let humanSequence = [];
let level = 0;
let level2 = 0;
let fartAudio = document.querySelector(".fart")
let highscore = JSON.parse(localStorage.getItem("highscore"))
var tileContainer = document.querySelector(".tile-container");
var startButton = document.querySelector(".startButton");
var heading = document.querySelector(".heading");
var info = document.querySelector(".info");


var lastScoreDiv = document.querySelector(".highscore");
var  highscoreDiv= document.querySelector(".lastscore");
lastScoreDiv.textContent = `Last score: ${level2}`;
highscoreDiv.textContent = `Highscore: ${highscore}`;


//sonido
Tone.start()
const synth = new Tone.Synth().toDestination()
function playNote() {
  
}
//localstora
function humanTurn(level) {
  // Hace que los azulejos sean clicables
  tileContainer.classList.remove("unclickable");

  tileContainer.classList.add("activated");
  tileContainer.classList.add("clickable");
  // Actualiza la interfaz de usuario para mostrar que es el turno del

  info.textContent = `Level ${level}`;
}
function handleSequenceCompletion() {
  document.querySelector('.tile-container').classList.add('unclickable');
  setTimeout(() => {
    nextRound();
  }, 500);
}
function handleMistake() {
fartAudio.volume = 1
fartAudio.play()

level2 = level;
lastScoreDiv.textContent = `Last score: ${level2}`;
if (level2 > highscore){
  highscore = level2;
  localStorage.setItem("highscore", JSON.stringify(highscore));
    console.log(localStorage.getItem("highscore"))
}
highscoreDiv.textContent = `Highscore: ${highscore}`;
  
  resetGame('¡Juego terminado! Has cometido un error.');
}
function startGame() {
  // Reinicia las variables del juego
  sequence = [];
  humanSequence = [];
  level = 0;
  // Oculta el botón de inicio y muestra cualquier otro elemento
  //relevante
  startButton.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "Espera a la computadora";

  // Comienza la primera ronda
  nextRound();
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);

  // Cambia el estilo del azulejo para mostrar que está activado

  switch (color) {
    case "red":
      tile.classList.add("bg-red-300");
      synth.triggerAttackRelease('C4', '8n')
      break;
    case "blue":
      tile.classList.add("bg-blue-300");
      synth.triggerAttackRelease('C5', '8n')
      break;
    case "green":
      tile.classList.add("bg-green-300");
      synth.triggerAttackRelease('C6', '8n')
      break;
    default:
      tile.classList.add("bg-yellow-300");
      synth.triggerAttackRelease('C7', '8n')
      break;
  }

  // Reproduce el sonido asociado

  // Establece un temporizador para desactivar el azulejo después de un    corto período

  setTimeout(() => {
    tile.classList.remove(
      "bg-red-300",
      "bg-blue-300",
      "bg-green-300",
      "bg-yellow-300"
    );
    switch (color) {
      case "red":
        tile.classList.add("bg-red-500");
        break;
      case "blue":
        tile.classList.add("bg-blue-500");
        break;
      case "green":
        tile.classList.add("bg-green-500");
        break;
      default:
        tile.classList.add("bg-yellow-500");
        break;
    }
  }, 500);
}
function resetGame(text) {
  // Muestra un mensaje, por ejemplo, "¡Juego terminado!" o
level2 = level;

  alert(text);
  // Restablece las variables de estado a sus valores iniciales
  sequence = [];
  humanSequence = [];
  level = 0;

  startButton.classList.remove("hidden"); // Muestra el botón de inicio
  
  info.classList.add("hidden"); // Oculta cualquier mensaje

  tileContainer.classList.add("unclickable"); // Hace que los azulejos
}

function playRound(nextSequence) {
  tileContainer.classList.add("unclickable");
  nextSequence.forEach((color, index) => {
    // Establece un temporizador para cada azulejo de la secuencia
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600); // El tiempo se incrementa para cada
    //azulejo
  });
  setTimeout(() => {
    tileContainer.classList.remove("unclickable");
  }, nextSequence.length * 600);
}

function nextRound() {
  level += 1; // Incrementa el nivel
  // Agrega un nuevo color a la secuencia
  const newColor = nextStep();
  sequence.push(newColor);
  // Muestra la nueva secuencia al jugador
  playRound(sequence);
  // Preparaciones adicionales para el nuevo nivel, como actualizar la
  //interfaz

  // Por ejemplo, actualizar un mensaje en la pantalla con el nivel
  //actual
  
  humanTurn(level);
}
function youWin(){
  sequence = [];
  humanSequence = [];
  level = 0;

 info.textContent = "Has Ganado!";

}
function nextStep() {
  const tiles = ["red", "green", "blue", "yellow"]; 
 
  const randomIndex = Math.floor(Math.random() * tiles.length); //


  return tiles[randomIndex]; 

}

function handleClick(tile) {
  activateTile(tile); // Agrega un efecto visual y sonoro al hacer clic en un azulejo
  humanSequence.push(tile);
  playNote();
  // Verifica si la elección del jugador es incorrecta
  if (!checkIfCorrect()) {
    handleMistake();
    return;
  }

  // Verifica si el jugador ha completado la secuencia
  if (humanSequence.length === sequence.length) {
    // Si el jugador ha completado la secuencia, reinicia la secuencia del jugador
    humanSequence = [];
    handleSequenceCompletion();
  }
 
}


  

    function checkIfCorrect() {
      for (let i = 0; i < humanSequence.length; i++) {
        if (humanSequence[i] !== sequence[i]) {
          return false;
        }
      }
      return true;
    }
    


function updateLevelDisplay(level) {
  document.getElementById('info').textContent = `Level ${level}`;
  level2 = level;
}
startButton.addEventListener("click", () => {
  startGame();
});
document.querySelector('.tile-container').addEventListener('click', event => {
  if (!event.target.classList.contains('tile')) return;
  handleClick(event.target.dataset.tile);
});


