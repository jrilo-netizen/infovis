// La excepción argentina: pestañas, gráficos y animaciones de entrada de la landing.

const pestanas = [...document.querySelectorAll('[role="tab"]')];
const paneles = pestanas.map((pestana) => document.getElementById(pestana.getAttribute("aria-controls")));
const indicador = document.querySelector(".pestanas-indicador");
const contenido = document.getElementById("contenido");

// ---------- Gráficos ----------
// Los gráficos de cada pestaña se cargan recién cuando se abre: dentro de un panel oculto medirían ancho 0.
async function cargarGraficos(panel) {
  // Flourish y Datawrapper: cada iframe recibe su dirección (data-src) la primera vez que se muestra.
  panel.querySelectorAll("iframe[data-src]:not([src])").forEach((iframe) => (iframe.src = iframe.dataset.src));

  // Altair: cada <figure data-grafico="nombre"> recibe el gráfico que exportó el notebook (graficos/nombre.json).
  const figuras = [...panel.querySelectorAll("[data-grafico]:not([data-dibujado])")];
  figuras.forEach((figura) => (figura.dataset.dibujado = "")); // marcados antes de esperar, para no dibujarlos dos veces
  await document.fonts.ready; // Vega mide los textos: la tipografía tiene que estar cargada
  for (const figura of figuras) {
    const spec = await fetch(`graficos/${figura.dataset.grafico}.json`).then((respuesta) => respuesta.json());
    // El título y la bajada pasan a HTML para que se ajusten al ancho de la pantalla.
    figura.querySelector(".grafico-titulo").textContent = spec.title.text;
    figura.querySelector(".grafico-bajada").textContent = [spec.title.subtitle].flat().join(" ");
    delete spec.title;
    spec.config.font = getComputedStyle(document.body).fontFamily; // la misma tipografía de la página
    spec.config.background = "transparent"; // el fondo lo pone la tarjeta
    vegaEmbed(figura.querySelector(".grafico-lienzo"), spec, { actions: false });
  }
}

// Datawrapper avisa con un mensaje la altura que necesita su gráfico ({ KllOm: 775 }): se la damos al iframe.
window.addEventListener("message", (evento) => {
  for (const [id, altura] of Object.entries(evento.data?.["datawrapper-height"] ?? {})) {
    document.getElementById(`datawrapper-chart-${id}`).style.height = `${altura}px`;
  }
});

// ---------- Pestañas ----------
function mostrarPestana(indice, { enfocar = false, desplazar = false } = {}) {
  pestanas.forEach((pestana, i) => {
    pestana.setAttribute("aria-selected", i === indice);
    pestana.tabIndex = i === indice ? 0 : -1;
    paneles[i].hidden = i !== indice;
  });
  indicador.style.transform = `translateX(${indice * 100}%)`;
  // La URL recuerda la pestaña (salvo la primera, para que al recargar se vea la portada).
  history.replaceState(null, "", indice === 0 ? location.pathname : `#${paneles[indice].id}`);
  if (enfocar) pestanas[indice].focus();
  // Si la persona estaba leyendo más abajo, la llevamos al comienzo del panel nuevo.
  if (desplazar && contenido.getBoundingClientRect().top < 0) contenido.scrollIntoView();
  cargarGraficos(paneles[indice]);
  window.dispatchEvent(new Event("resize")); // los gráficos ya dibujados recalculan su ancho
}

pestanas.forEach((pestana, i) => {
  pestana.addEventListener("click", () => mostrarPestana(i, { desplazar: true }));
  // Con el teclado: flechas, Inicio y Fin recorren las pestañas.
  pestana.addEventListener("keydown", (evento) => {
    const destino = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: pestanas.length - 1 }[evento.key];
    if (destino === undefined) return;
    evento.preventDefault();
    mostrarPestana((destino + pestanas.length) % pestanas.length, { enfocar: true });
  });
});

// Los enlaces internos (#historia, #nota-pib...) abren la pestaña que contiene su destino y bajan hasta él.
function irAlDestino() {
  const destino = document.getElementById(location.hash.slice(1));
  const indice = paneles.findIndex((panel) => panel.contains(destino));
  mostrarPestana(Math.max(indice, 0));
  if (destino) (paneles.includes(destino) ? contenido : destino).scrollIntoView();
}

window.addEventListener("hashchange", irAlDestino);
irAlDestino();

// ---------- Enlaces al repositorio ----------
// En GitHub Pages la dirección es usuario.github.io/repositorio: de ahí sale el link al repo.
const enGitHub = location.hostname.endsWith(".github.io");
const repo = enGitHub ? `${location.hostname.split(".")[0]}/${location.pathname.split("/")[1]}` : "USUARIO/REPO";
document.querySelectorAll("a[data-repo]").forEach((enlace) => (enlace.href = `https://github.com/${repo}/${enlace.dataset.repo}`));
document.querySelectorAll("a[data-colab]").forEach((enlace) => (enlace.href = `https://colab.research.google.com/github/${repo}/blob/main/tp_data360.ipynb`));


