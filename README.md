# Portafolio Personal de Bruno Alexis Victoria Velázquez

Este proyecto es un portafolio web personal que muestra la formación, experiencia, habilidades y proyectos de Bruno Alexis Victoria Velázquez, asi como los conocimientos adquiridos durante la formacion "Principiante en programación" de Alura Latam y Oracle ONE.

## Estructura
- **index.html**: Página principal (Home) con presentación y enlaces a redes sociales.
- **aboutme.html**: Página sobre mí, con información personal y profesional.
- **curriculum.html**: Currículum detallado, educación, experiencia, certificaciones y habilidades.
- **proyectos.html**: Galería de proyectos con previews interactivos embebidos vía iframes (vista teléfono) y diseño responsive en grilla.
- **styles.css**: Estilos globales y responsivos para todo el sitio.
- **assets/**: Imágenes y recursos gráficos utilizados en el sitio.

## Visualización
Abre el archivo `index.html` para visualizar el portafolio en tu navegador.

## Cómo agregar proyectos (proyectos.html)
Cada tarjeta contiene un contenedor `proyecto_preview` con un `<iframe>` de tipo teléfono (390x844 aprox; max-width 420px). Para que un proyecto cargue e interactúe:

1. Reemplaza el atributo `srcdoc` por `src` con la URL pública de tu proyecto:
   ```html
   <iframe title="Mi proyecto (teléfono)" loading="lazy" src="https://mi-proyecto.com"></iframe>
   ```
2. Si la URL bloquea el embebido (X-Frame-Options/CSP), usa una captura estática y añade un botón “Abrir demo” con `target="_blank"`.

La grilla de proyectos es responsiva: 3 columnas en desktop, 2 en pantallas medianas y 1 en móviles. El contenedor de la página ajusta espacios con `clamp()` para un whitespace agradable.

## Tecnologías usadas
- HTML5
- CSS3 (variables, grid responsivo, tipografía Nunito/Poppins, `clamp()` y `aspect-ratio`)

---
© 2025 Bruno Alexis Victoria Velázquez. Todos los derechos reservados. 