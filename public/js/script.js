// Menú amburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('open');
        menuBtn.classList.toggle('active');
        // Cambia el ícono hamburguesa por una X al abrir
        menuBtn.innerHTML = menuBtn.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menú al hacer clic en un enlace
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuBtn.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
});


// Función para desactivar el botón de whatsapp desde posición Y
window.addEventListener('scroll', function() {
    const btn = document.querySelector('.whatsapp-btn');
    if (window.scrollY > 300) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
});


// Dezplazamiento
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los enlaces dentro de tu navbar
    const navLinks = document.querySelectorAll('nav a[href^="#"]'); // Selecciona enlaces que empiezan con #

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previene el comportamiento por defecto del enlace (que es añadir el # a la URL y saltar)
            e.preventDefault();

            // Obtiene el ID de la sección a la que se quiere ir (ej. #inicio, #nosotros)
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Realiza el scroll suave a la sección
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // window.location.pathname da la ruta actual sin el hash ni los parámetros de consulta.
                history.replaceState(null, null, window.location.pathname);
            }
        });
    });

    // Si el usuario llega a la página con un hash en la URL (desde un enlace externo), se quita al cargar la página para que no se vea
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
});

// Notificación de contacto
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-contacto');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const data = new FormData(form);
      const noti = document.getElementById('notificacion-contacto');
      const mensaje = document.getElementById('mensaje-notificacion');
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        const result = await res.json();
        console.log(result);
        if (res.ok) {
          mensaje.textContent = '¡Mensaje enviado correctamente! Gracias por contactarnos.';
          form.reset();
        } else {
          mensaje.textContent = 'Ocurrió un error al enviar el mensaje. Intenta nuevamente.';
        }
      } catch {
        mensaje.textContent = 'No se pudo enviar el mensaje. Revisa tu conexión.';
      }
      noti.style.display = 'flex';
    });
  }
});