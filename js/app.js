// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrrito, tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let carritoArticulos = [];

// Llamado de eventos
cargarEventListener();
function cargarEventListener() {
  listaCursos.addEventListener('click', agregarCarrito);
  carrito.addEventListener('click', eliminarCurso);
  vaciarCarrito.addEventListener('click', vaciarElCarrito);
}

// Funciones

function vaciarElCarrito() {
  carritoArticulos = [];
  limpiarHtl();
}

function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    e.preventDefault();
    const eliminarId = e.target.getAttribute('data-id');

    carritoArticulos = carritoArticulos.filter(
      (curso) => curso.id !== eliminarId
    );
    carritoCompras();
  }
}

function agregarCarrito(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const cursosSelecionado = e.target.parentElement.parentElement;
    // console.log(cursosSelecionado);
    leerDatos(cursosSelecionado);
  }
}

// lee el contenido del html al que le dimos click
function leerDatos(cursosSelecionado) {
  const objInfoCurso = {
    id: cursosSelecionado.querySelector('a').getAttribute('data-id'),
    img: cursosSelecionado.querySelector('img').src,
    titulo: cursosSelecionado.querySelector('h4').textContent,
    precio: cursosSelecionado.querySelector('p span').textContent,
    cantidad: 1,
  };

  // revisa si ese articulo ya existe dentro del carrito
  const existe = carritoArticulos.some((el) => el.id === objInfoCurso.id); // comprobamos si existe este metodo nos devuelve un tru o false

  if (existe) {
    const cursoDelcarrito = carritoArticulos.map((curso) => {
      if (curso.id === objInfoCurso.id) {
        curso.cantidad++;
        return curso; // retorna los objetos actualizados que los tendra la vaiable de cursoDelcarrito
      } else {
        return curso; // retorna los objetos que el usuario haya agregado una ves al carrito
      }
    });
    carritoArticulos = [...cursoDelcarrito];
  } else {
    // agregar elementos al carrito
    carritoArticulos = [...carritoArticulos, objInfoCurso];
    // console.log(carritoArticulos);
  }
  carritoCompras();
}

// muestra el carrito de comprase en html

function carritoCompras() {
  limpiarHtl();

  carritoArticulos.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
    <img src="${item.img}" alt="${item.titulo}">
    </td>
    <td>
      ${item.titulo}
    </td>
    <td>
    ${item.precio}
    </td>
    <td>
    ${item.cantidad}
    </td>
    
    <td>
      <a href="#" class="borrar-curso" data-id='${item.id}'> X </a>
    </td>



    
    `;

    contenedorCarrito.appendChild(row);
  });
}

// limpiar carrito para que no se repita cada que agregamos uno nuevo

function limpiarHtl() {
  // forma mala
  //contenedorCarrito.innerHTML = '';

  // forma mas adecuada de eliminar del dom
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
