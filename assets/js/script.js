// variables que guardan un elemento del DOM
let inputNuevaTarea = document.getElementById("input");
let btnNuevaTarea = document.getElementById("btn");
let idNuevaTarea = document.getElementById("id");
let contentNuevaTarea = document.getElementById("tareas");
let totalTareas = document.getElementById("total");
let tareasRealizadas = document.getElementById("realizadas");

// arreglo de objetos con tareas por defecto
let arrayList = [
  { id: 1, tarea: "Hacer el aseo.", realizada: false },
  { id: 2, tarea: "Limpiar la cocina.", realizada: false },
  { id: 3, tarea: "Hacer mercado.", realizada: false },
];

//funcion que renderiza las tareas agregadas por defecto (y las tareas agregadas por input)
function renderArrayList() {
  let htmlListTarea = "";
  let htmlListId = "";
  arrayList.forEach((item) => {
    htmlListTarea += `<span class="span__text span__text--box">${item.tarea}<div>
    <img class="icon" src="./assets/images/check.svg" onclick="checkStatus(${item.id})" alt="">
    <img class="icon" src="./assets/images/x.svg" onclick="borrar(${item.id})" alt=""></div></span>`;
    htmlListId += ` <p class="span__text">${item.id}</p>`;
  });
  contentNuevaTarea.innerHTML = htmlListTarea;
  idNuevaTarea.innerHTML = htmlListId;
  totalTareas.textContent = arrayList.length;
}
renderArrayList();

// función que borra un elemento agregado al arreglo por su id
function borrar(id) {
  let indice = arrayList.findIndex((list) => list.id === id);
  arrayList.splice(indice, 1);
  actualizarRealizadas();
  renderArrayList();
}

// función que agrega una nueva tarea al ingresarla en el input
btnNuevaTarea.addEventListener("click", () => {
  let inputValue = inputNuevaTarea.value;
  let newId = "";
  if (arrayList.length >= 1) {
    newId = arrayList[arrayList.length - 1].id + 1;
  } else {
    newId = arrayList.id = 1;
  }
  if (inputNuevaTarea.value === "") {
    alert("Debes ingresar una tarea");
  } else {
    arrayList.push({ id: newId, tarea: inputValue + ".", realizada: false });
    renderArrayList();
  }
  inputNuevaTarea.value = "";
});

//funcion para actualizar la lista de tareas cuando están realizadas
function checkStatus(id) {
  let tareaEncontrada = arrayList.find((list) => list.id === id);
  tareaEncontrada.realizada = true;
  let realizadaFiltrada = arrayList.filter((item) => item.realizada === true);
  tareasRealizadas.textContent = realizadaFiltrada.length;
  tareaCompletada(id);
  renderArrayList();
}

//funcion para cambiar el texto de la tarea cuando está realizada
function tareaCompletada(id) {
  let tacharRealizada = arrayList.find((item) => item.id === id);
  tacharRealizada.tarea = "Realizada.";
}

// función que actualiza cada vez que se elimina una tarea realizada
function actualizarRealizadas() {
  let realizadaFiltrada = arrayList.filter((item) => item.realizada === true);
  tareasRealizadas.textContent = realizadaFiltrada.length;
}
