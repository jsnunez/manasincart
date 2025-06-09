let carrito = [];
let sede = "";
let tipoProducto = "";
const carritoContainer = document.getElementById('carrito');
const carritoItems = document.getElementById('carrito-items');
const carritoTotal = document.getElementById('carrito-total');
const vaciarBtn = document.getElementById('vaciar-carrito');
const clasesPorTipo = {
    panaderia: [
        { value: 'todo', label: 'Todos' },
        { value: 'tradicional', label: 'Tradicional' },
        { value: 'dulce', label: 'Dulce' },
        { value: 'rellenos', label: 'Rellenos' },
        { value: 'integral', label: 'Integral' },
        { value: 'funcional', label: 'Funcional' },
        { value: 'temporada', label: 'Temporada (noviembre)' }
    ],
    bizcocheria: [
        { value: 'todo', label: 'Todos' },
        { value: 'torta_artesanal', label: 'Torta artesanal' },
        { value: 'dulces', label: 'Dulces' },
        { value: 'salados', label: 'Salados' }
    ],
    cafeteria: [
        { value: 'todo', label: 'Todos' },
        { value: 'onces', label: 'Onces' },
        { value: 'bebidas', label: 'Bebidas' }
    ],
    santandereano: [
        { value: 'todo', label: 'Todos' },
        { value: 'tamal', label: 'Tamal' },
        { value: 'carnes_frias', label: 'Carnes frías' },
        { value: 'ayacos', label: 'Ayacos' }
    ],
    restaurante: [
        { value: 'todo', label: 'Todos' },
        { value: 'combos', label: 'Combos' },
        { value: 'menu-del-dia', label: 'Menú del día' },
        { value: 'ensaladas', label: 'Ensaladas' }
    ]
};


document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Hero Slider Functionality
    const dots = document.querySelectorAll('.dot');

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                // Remove active class from all dots
                dots.forEach(d => d.classList.remove('active'));

                // Add active class to clicked dot
                this.classList.add('active');

                // Here you would normally change the slide
                // For this example, we're just changing the active dot
                console.log(`Slide changed to ${index + 1}`);
            });
        });
    }

    // Product Card Hover Effect
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only prevent default if the link has a hash
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    if (localStorage.getItem('carrito')) {
        try {
            carrito = JSON.parse(localStorage.getItem('carrito'));
            console.log(sede);
        } catch {
            carrito = [];
        }
    }

    actualizarCarrito();
});

document.querySelectorAll('.icon-row .icon-circle').forEach(function (icon) {
    icon.addEventListener('click', function () {
        // Hide all sections
        document.querySelectorAll('.panaderia-section, .bizcocheria-section, .cafeteria-section, .santandereano-section, .restaurante-section')
            .forEach(function (section) {
                section.style.display = 'none';
            });
        // Show the selected section
        var sectionClass = this.getAttribute('data-section');
        document.getElementById('clase-producto').value = 'todo';
        var section = document.querySelector('.' + sectionClass);
        if (section) {
            section.style.display = 'block';
        }
        if (sectionClass.endsWith('-section')) {
            tipo = sectionClass.replace('-section', '');
        }
    });
});







document.addEventListener('DOMContentLoaded', function () {

    const productosLista = document.getElementById('productos-lista');
    const sedeSelect = document.getElementById('sede-select');
    const claseSelect = document.getElementById('clase-producto'); // categoría fija en HTML

    const sedes = [
        { id: 'centro', nombre: 'Centro' },
        { id: 'antoniaSantos', nombre: 'Antonia Santos' },
        { id: 'paseoDelComercio', nombre: 'Paseo del Comercio' },
        { id: 'cabecera', nombre: 'Cabecera' },
        { id: 'mejorasPublicas', nombre: 'Mejoras Públicas' },
        { id: 'cañaveral', nombre: 'Cañaveral' },
        { id: 'cie', nombre: 'CIE' }
    ];

    // Llenar el select de sedes
    function llenarSelectSedes() {
        sedeSelect.innerHTML = '<option value="" disabled selected>Seleccione una sede</option>';
        sedes.forEach(sede => {
            const option = document.createElement('option');
            option.value = sede.id;
            option.textContent = sede.nombre;
            sedeSelect.appendChild(option);
        });
    }

    // Crear el modal una sola vez y agregarlo al body
    function crearModalProducto() {
        let modal = document.getElementById('modal-producto');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-producto';
            modal.style.display = 'none';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '9999';
            modal.innerHTML = `
                <div id="modal-producto-content" style="background:#fff; padding:24px; border-radius:8px; max-width:400px; width:90%; position:relative;">
                    <button id="cerrar-modal-producto" style="position:absolute;top:8px;right:8px;background:none;border:none;font-size:20px;cursor:pointer;">&times;</button>
                    <div id="modal-producto-body"></div>
                </div>
            `;
            document.body.appendChild(modal);
            document.getElementById('cerrar-modal-producto').onclick = function () {
                modal.style.display = 'none';
            };
            modal.onclick = function (e) {
                if (e.target === modal) modal.style.display = 'none';
            };
        }
    }

    function mostrarModalProducto(producto) {
        crearModalProducto();
        const modal = document.getElementById('modal-producto');
        const body = document.getElementById('modal-producto-body');
        body.innerHTML = `
            <div style="text-align:center;">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width:100%;max-height:180px;object-fit:contain;margin-bottom:12px;">
            <h2 style="margin:0 0 8px 0;">${producto.nombre}</h2>
            <p style="margin:0 0 8px 0;">${producto.descripcion || ''}</p>
            <div>
                <strong>Variantes:</strong>
                <select id="modal-variante" style="margin-bottom:8px;">
                ${Object.entries(producto.variantes).map(([tam, precio]) =>
            `<option value="${tam}">${tam}: $${precio}</option>`
        ).join('')}
                </select>
            </div>
            <div style="margin:8px 0;">
                <label>Cantidad: <input type="number" id="modal-cantidad" value="1" min="1" style="width:60px;"></label>
            </div>
            <button id="modal-agregar-btn" style="background:#d4af37;color:#fff;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;">Agregar</button>
            </div>
        `;
        modal.style.display = 'flex';

        document.getElementById('modal-agregar-btn').onclick = function () {
            const varianteSelect = document.getElementById('modal-variante');
            const cantidadInput = document.getElementById('modal-cantidad');
            const varianteTexto = varianteSelect.value;
            const precio = producto.variantes[varianteTexto];
            const cantidad = parseInt(cantidadInput.value, 10);

            carrito.push({
                nombre: `${producto.nombre} - ${varianteTexto}`,
                precio: precio * cantidad
            });
            actualizarCarrito();
            modal.style.display = 'none';
        };
    }

    // Modal para agregar al carrito
    function crearModalAgregar(prod, variante) {
        let modal = document.getElementById('modal-agregar');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-agregar';
            modal.style.display = 'none';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '10000';
            modal.innerHTML = `
                <div style="background:#fff; padding:24px; border-radius:8px; max-width:350px; width:90%; position:relative;">
                    <button id="cerrar-modal-agregar" style="position:absolute;top:8px;right:8px;background:none;border:none;font-size:20px;cursor:pointer;">&times;</button>
                    <div id="modal-agregar-body"></div>
                </div>
            `;
            document.body.appendChild(modal);
            document.getElementById('cerrar-modal-agregar').onclick = function () {
                modal.style.display = 'none';
            };
            modal.onclick = function (e) {
                if (e.target === modal) modal.style.display = 'none';
            };
        }
        // const body = document.getElementById('modal-agregar-body');
        // body.innerHTML = `
        //     <div style="text-align:center;">
        //         <h2 style="margin:0 0 8px 0;">Agregar al carrito</h2>
        //         <p><strong>${prod.nombre}</strong></p>
        //         <p>Variante: ${variante}</p>
        //         <label>Cantidad: <input type="number" id="cantidad-agregar" value="1" min="1" style="width:60px;"></label>
        //         <br><br>
        //         <button id="confirmar-agregar" style="background:#d4af37;color:#fff;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;">Agregar</button>
        //     </div>
        // `;
        document.getElementById('confirmar-agregar').onclick = function () {
            const cantidad = parseInt(document.getElementById('cantidad-agregar').value, 10);
            // Aquí puedes agregar la lógica para agregar al carrito
            alert(`Agregado ${cantidad} de ${prod.nombre} (${variante}) al carrito`);
            modal.style.display = 'none';
        };
        modal.style.display = 'flex';
    }

    document.querySelectorAll('.container .icon-circle').forEach(function (icon) {
        icon.addEventListener('click', function () {
            // Hide all sections
            document.querySelectorAll('.panaderia-section, .bizcocheria-section, .cafeteria-section, .rincon-santandereano-section, .restaurante-section')
                .forEach(function (section) {
                    section.style.display = 'none';
                });
            // Show the selected section
            var sectionClass = this.getAttribute('data-section');

            document.getElementById('clase-producto').value = 'todo';
            // Quitar el sufijo "-section" si existe
            if (sectionClass.endsWith('-section')) {
                tipoProducto = sectionClass.replace('-section', '');
            }
            document.getElementById('TipoProducto').innerHTML = tipoProducto.charAt(0).toUpperCase() + tipoProducto.slice(1);
              
        if (tipoProducto && clasesPorTipo[tipoProducto]) {
            claseSelect.innerHTML = '';
            clasesPorTipo[tipoProducto].forEach(op => {
                const option = document.createElement('option');
                option.value = op.value;
                option.textContent = op.label;
                claseSelect.appendChild(option);
            });
        }
            cargarProductos();



        });
    });

    async function cargarProductos() {
        const sede = sedeSelect.value;
        const img = document.getElementById('foto-sede-img');
        let src = 'images/sedes/default.jpg';
        if (sede === 'bucaramanga') src = 'images/sedes/centro.jpg';
        else if (sede === 'floridablanca') src = 'images/sedes/floridablanca.jpg';
        else if (sede === 'giron') src = 'images/sedes/giron.jpg';
        else if (sede === 'piedecuesta') src = 'images/sedes/piedecuesta.jpg';
        else if (sede === 'cucuta') src = 'images/sedes/cucuta.jpg';
        img.src = src;
        const claseSelect1 = document.getElementById('clase-producto'); // categoría fija en HTML
        const categoria = claseSelect1.value;

        if (!sede || !categoria) {
            productosLista.innerHTML = '<p>Seleccione sede y clase para ver productos.</p>';
            return;
        }
        // Cambiar las opciones del select de clase-producto según el tipoProducto
  
        const response = await fetch('productos.json');
        const todo = await response.json();
        const data = todo[tipoProducto];
        console.log(todo);
        console.log(tipoProducto);

        let productos = [];
        if (categoria == 'todo') {

            // Unir todos los productos de todas las categorías de la sede seleccionada
            if (data && data[sede]) {
                Object.values(data[sede]).forEach(arr => {
                    if (Array.isArray(arr)) productos = productos.concat(arr);
                    console.log(arr);
                });
                console.log(productos);
            } else {
                productos = [];
                console.log('No hay productos para esta sede o tipo de producto.');
            }
        
        } else {
            productos = (data[sede] && data[sede][categoria]) || [];
        }

        if (productos.length === 0) {
            productosLista.innerHTML = '<p>No hay productos para esta combinación.</p>';
            return;
        }

        productosLista.innerHTML = '';

        productos.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cursor = 'pointer';

            card.innerHTML = `
        <div class="product-image">
          <img src="${prod.imagen}" alt="${prod.nombre}">
        </div>
        <h3>${prod.nombre}</h3>
        <div class="opciones-producto">
          <select>
            ${Object.entries(prod.variantes).map(([tam, precio]) =>
                `<option>${tam}: $${precio}</option>`
            ).join('')}
          </select>
          <button style="background: #d4af37; border: none; border-radius: 50%; width: 28px; height: 28px; color: #fff; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;">+</button>
        </div>
      `;

            card.addEventListener('click', function (e) {
                // Evitar que el click en el botón "+" abra el modal de info
                if (e.target.tagName.toLowerCase() === 'select') return;
                mostrarModalProducto(prod);
            });
            // Evento para el botón +
            // card.querySelector('button').addEventListener('click', function (e) {
            //     e.stopPropagation();
            //     const select = card.querySelector('select');
            //     const varianteTexto = select.value;
            //     const [tam, precioTexto] = varianteTexto.split(': $');
            //     const precio = parseFloat(precioTexto);
            //     const nombre = `${prod.nombre} - ${tam}`;

            //     // Agregar al carrito
            //     carrito.push({ nombre, precio });
            //     actualizarCarrito();

            //     // Mostrar modal opcional (puedes quitar si no quieres)
            //     crearModalAgregar(prod, varianteTexto);
            // });

            productosLista.appendChild(card);
        });
    }

    // Pedir sede al cargar con Swal, y preguntar si desea cambiar si ya hay una guardada
    async function pedirSede() {
        // Verificar si hay una sede guardada en localStorage
        let sedeGuardada = localStorage.getItem('sedeSeleccionada');
        if (sedeGuardada) {
            // Preguntar si desea cambiar de sede
            const { isConfirmed } = await Swal.fire({
                title: 'Sede seleccionada',
                text: `Actualmente tiene seleccionada la sede: ${sedes.find(s => s.id === sedeGuardada)?.nombre || sedeGuardada}. ¿Desea cambiarla?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Cambiar sede',
                cancelButtonText: 'Conservar'
            });
            if (!isConfirmed) {
                sedeSelect.value = sedeGuardada;
                productosLista.innerHTML = '<p>Seleccione una clase para ver productos.</p>';
                return;
            } else {
                // Advertencia de vaciado de carrito
                const { isConfirmed: vaciar } = await Swal.fire({
                    title: 'Advertencia',
                    text: 'Al cambiar de sede, el carrito se vaciará. ¿Desea continuar?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, continuar',
                    cancelButtonText: 'No'
                });
                if (!vaciar) {
                    sedeSelect.value = sedeGuardada;
                    productosLista.innerHTML = '<p>Seleccione una clase para ver productos.</p>';
                    return;
                }
                // Si cambia la sede, vacía el carrito
                carrito.length = 0;
                actualizarCarrito();
            }
        }

        // Pedir sede con Swal
        const { value: sedeSeleccionada } = await Swal.fire({
            title: 'Seleccione una sede',
            input: 'select',
            inputOptions: sedes.reduce((obj, sede) => {
                obj[sede.id] = sede.nombre;
                return obj;
            }, {}),
            inputPlaceholder: 'Elija una sede',
            showCancelButton: false,
            confirmButtonText: 'Confirmar',
            inputValidator: (value) => {
                return value ? null : 'Debe seleccionar una sede';
            }
        });

        if (sedeSeleccionada) {
            sedeSelect.value = sedeSeleccionada;
            productosLista.innerHTML = '<p>Seleccione una clase para ver productos.</p>';
            // Guardar la sede seleccionada en localStorage
            localStorage.setItem('sedeSeleccionada', sedeSeleccionada);
        }
    }

    // Eventos para cambiar sede o clase
    sedeSelect.addEventListener('change', cargarProductos);
    claseSelect.addEventListener('change', cargarProductos);

    // Inicializar
    llenarSelectSedes();
    pedirSede();
    document.querySelectorAll('.catalog-card').forEach(function (card) {
        card.addEventListener('click', function () {
            var category = this.getAttribute('data-category');
            tipoProducto = this.getAttribute('data-tipo');


        if (tipoProducto && clasesPorTipo[tipoProducto]) {
            claseSelect.innerHTML = '';
            clasesPorTipo[tipoProducto].forEach(op => {
                const option = document.createElement('option');
                option.value = op.value;
                option.textContent = op.label;
                claseSelect.appendChild(option);
            });
        }
            console.log(category);
            console.log(tipoProducto);
            document.getElementById('catalogo').style.display = "flex";
            document.getElementById('TipoProducto').innerHTML = tipoProducto.charAt(0).toUpperCase() + tipoProducto.slice(1);
            document.getElementById('productos').style.display = "none";
            document.getElementById('clase-producto').value = category;
            // alert('Abrir catálogo de: ' + category);
            cargarProductos();
            // Aquí puedes mostrar un modal, redirigir o cargar el catálogo de la categoría
        });
    });
});




// Mostrar/Ocultar carrito al hacer clic en el ícono
document.querySelector('.cart-icon').addEventListener('click', () => {
    carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
});

// Función para actualizar el HTML del carrito
function actualizarCarrito() {
    // Obtener la sede seleccionada (puede variar el id según tu HTML)
    const sedeSelect = document.getElementById('sede-select') || document.getElementById('select-sede');
    const sede = sedeSelect ? sedeSelect.value : '';

    carritoItems.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio}`;
        const btn = document.createElement('button');
        btn.textContent = 'Eliminar';
        btn.style.marginLeft = '10px';
        btn.onclick = () => {
            carrito.splice(index, 1);
            actualizarCarrito();
        };
        li.appendChild(btn);
        carritoItems.appendChild(li);
    });

    carritoTotal.textContent = total.toFixed(2);

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Deshabilitar el botón de vaciar si el carrito está vacío
    vaciarBtn.disabled = carrito.length === 0;
    const selectSede = document.getElementById('sede-select');
    if (selectSede) {
        selectSede.disabled = true;
    }
}

// // Agregar productos con el botón "+"
// document.querySelectorAll('.product-card .opciones-producto button').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         const card = e.target.closest('.product-card');
//         const nombre = card.querySelector('h3').textContent;
//         const select = card.querySelector('select');
//         const detalle = select ? select.options[select.selectedIndex].text : '';
//         const precio = Math.floor(Math.random() * 5000 + 3000); // Precio simulado

//         carrito.push({
//             nombre: `${nombre} - ${detalle}`,
//             precio: precio
//         });

//         actualizarCarrito();
//     });
// });

// Vaciar el carrito
vaciarBtn.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();
});


