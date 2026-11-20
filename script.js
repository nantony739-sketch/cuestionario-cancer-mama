const preguntas = [
  {
    texto: "¿Cuántos casos nuevos de cáncer de mama se registran cada año en el mundo?",
    opciones: ["230 mil", "2.3 millones", "23 millones", "500 mil"],
    correcta: 1,
    explicacion: "Se registran 2.3 millones de casos nuevos cada año en el mundo."
  },
  {
    texto: "¿Cómo se define el cáncer de mama?",
    opciones: [
      "Células mamarias que crecen sin control",
      "Una infección de la glándula mamaria",
      "Una inflamación causada por el estrés",
      "Un exceso de tejido graso"
    ],
    correcta: 0,
    explicacion: "Es el crecimiento sin control de las células mamarias."
  },
  {
    texto: "¿Cuál de estos NO es un factor de riesgo?",
    opciones: [
      "Edad mayor a 50 años",
      "Antecedentes familiares",
      "Sedentarismo y sobrepeso",
      "Uso de desodorantes"
    ],
    correcta: 3,
    explicacion: "Los factores son: edad mayor a 50 años, antecedentes familiares, factores hormonales y sedentarismo y sobrepeso."
  },
  {
    texto: "¿Cuál es una señal de alerta?",
    opciones: [
      "Dolor de cabeza frecuente",
      "Bulto en mama o axila",
      "Pérdida de apetito",
      "Fiebre persistente"
    ],
    correcta: 1,
    explicacion: "Un bulto en la mama o la axila es una señal de alerta."
  },
  {
    texto: "¿Qué cambio en la piel de la mama es una señal de alerta?",
    opciones: ["Resequedad", "Hoyuelos o piel roja", "Pecas nuevas", "Vello excesivo"],
    correcta: 1,
    explicacion: "Los hoyuelos o el enrojecimiento de la piel son señales de alerta."
  },
  {
    texto: "¿Cuál es el primer paso de la autoexploración mensual?",
    opciones: [
      "Palpar en círculos",
      "Revisar las axilas",
      "Observar frente al espejo",
      "Revisar el pezón"
    ],
    correcta: 2,
    explicacion: "Los pasos son: observar frente al espejo, palpar en círculos y revisar axilas y pezón."
  },
  {
    texto: "¿Qué porcentaje de curación se asocia a la detección temprana?",
    opciones: ["50%", "75%", "90%", "99%"],
    correcta: 3,
    explicacion: "La presentación destaca un 99% de curación con detección temprana."
  },
  {
    texto: "¿Cuál de estos hábitos forma parte de la prevención diaria?",
    opciones: [
      "Evitar alcohol y tabaco",
      "Dormir menos de 6 horas",
      "Consumir más azúcar",
      "Evitar el ejercicio"
    ],
    correcta: 0,
    explicacion: "La prevención incluye actividad física, alimentación saludable, evitar alcohol y tabaco, y chequeo médico anual."
  },
  {
    texto: "¿Cuál NO se menciona como parte del tratamiento integral?",
    opciones: [
      "Cirugía especializada",
      "Radioterapia dirigida",
      "Acompañamiento emocional",
      "Medicina alternativa con hierbas"
    ],
    correcta: 3,
    explicacion: "El tratamiento incluye cirugía, radioterapia, terapias médicas y acompañamiento emocional."
  },
  {
    texto: "¿Cuál es el lema de la diapositiva final?",
    opciones: [
      "Prevenir es vivir",
      "Tócate para que no te toque",
      "Rosa es esperanza",
      "Tu salud en tus manos"
    ],
    correcta: 1,
    explicacion: "El lema es «Tócate para que no te toque»."
  }
];

// ----- Estado -----
let indiceActual = 0;
let puntos = 0;
let respondida = false;

// ----- Elementos -----
const fondoEl = document.getElementById("fondo");
const bienvenidaEl = document.getElementById("bienvenida");
const quizEl = document.getElementById("quiz");
const resultadoEl = document.getElementById("resultado");
const btnInicio = document.getElementById("btn-inicio");
const comenzarBtn = document.getElementById("comenzar");
const progresoEl = document.getElementById("progreso");
const barraEl = document.getElementById("barra-llena");
const preguntaEl = document.getElementById("pregunta");
const opcionesEl = document.getElementById("opciones");
const explicacionEl = document.getElementById("explicacion");
const siguienteBtn = document.getElementById("siguiente");
const puntajeEl = document.getElementById("puntaje");
const mensajeEl = document.getElementById("mensaje");
const reiniciarBtn = document.getElementById("reiniciar");

// ----- Fondo animado con elementos flotantes -----
function crearFondo() {
  const simbolos = ["🎀", "💗", "🌸", "✨", "💖"];
  for (let i = 0; i < 18; i++) {
    const b = document.createElement("span");
    b.className = "burbuja";
    b.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    b.style.left = Math.random() * 100 + "%";
    b.style.fontSize = 18 + Math.random() * 30 + "px";
    b.style.animationDuration = 8 + Math.random() * 10 + "s";
    b.style.animationDelay = Math.random() * 10 + "s";
    fondoEl.appendChild(b);
  }
}

// ----- Cambiar de pantalla -----
function mostrarPantalla(pantalla) {
  [bienvenidaEl, quizEl, resultadoEl].forEach((p) => p.classList.add("oculto"));
  pantalla.classList.remove("oculto");

  // Reinicia la animación de entrada
  pantalla.style.animation = "none";
  void pantalla.offsetWidth;
  pantalla.style.animation = "";

  // El botón flotante solo aparece fuera de la bienvenida
  btnInicio.classList.toggle("oculto", pantalla === bienvenidaEl);
}

// ----- Mostrar pregunta -----
function mostrarPregunta() {
  const actual = preguntas[indiceActual];
  respondida = false;

  progresoEl.textContent = `Pregunta ${indiceActual + 1} de ${preguntas.length}`;
  barraEl.style.width = `${(indiceActual / preguntas.length) * 100}%`;
  preguntaEl.textContent = actual.texto;

  // Reinicia la animación del título de la pregunta
  preguntaEl.style.animation = "none";
  void preguntaEl.offsetWidth;
  preguntaEl.style.animation = "";

  opcionesEl.innerHTML = "";
  explicacionEl.classList.add("oculto");
  siguienteBtn.textContent =
    indiceActual === preguntas.length - 1 ? "Ver resultado 🎀" : "Siguiente ➜";

  actual.opciones.forEach((texto, i) => {
    const boton = document.createElement("button");
    boton.textContent = texto;
    boton.classList.add("opcion");
    boton.style.animationDelay = `${i * 0.1}s`; // aparecen una por una
    boton.addEventListener("click", () => elegirOpcion(i));
    opcionesEl.appendChild(boton);
  });
}

// ----- Elegir opción -----
function elegirOpcion(elegida) {
  if (respondida) return;
  respondida = true;

  const actual = preguntas[indiceActual];
  const botones = document.querySelectorAll(".opcion");

  botones.forEach((b) => (b.disabled = true));
  botones[actual.correcta].classList.add("correcta");

  if (elegida === actual.correcta) {
    puntos++;
  } else {
    botones[elegida].classList.add("incorrecta");
  }

  barraEl.style.width = `${((indiceActual + 1) / preguntas.length) * 100}%`;
  explicacionEl.textContent = actual.explicacion;
  explicacionEl.classList.remove("oculto");
}

// ----- Resultado final -----
function mostrarResultado() {
  mostrarPantalla(resultadoEl);
  puntajeEl.textContent = `${puntos} / ${preguntas.length}`;

  if (puntos >= 9) {
    mensajeEl.textContent = "¡Excelente! Conoces muy bien la prevención y detección.";
  } else if (puntos >= 6) {
    mensajeEl.textContent = "¡Muy bien! Repasa los puntos que fallaste.";
  } else {
    mensajeEl.textContent = "Sigue aprendiendo: la información puede salvar vidas.";
  }
}

// ----- Empezar o reiniciar -----
function empezarQuiz() {
  indiceActual = 0;
  puntos = 0;
  mostrarPantalla(quizEl);
  mostrarPregunta();
}

// ----- Botones -----
comenzarBtn.addEventListener("click", empezarQuiz);
reiniciarBtn.addEventListener("click", empezarQuiz);

btnInicio.addEventListener("click", () => mostrarPantalla(bienvenidaEl));

siguienteBtn.addEventListener("click", () => {
  if (!respondida) {
    alert("Elige una opción primero");
    return;
  }
  if (indiceActual < preguntas.length - 1) {
    indiceActual++;
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
});

// ----- Iniciar -----
crearFondo();