# La excepción argentina

Trabajo práctico de Visualización de la Información (ITBA, 2026): visualización de datos con la [API Data360 del Banco Mundial](https://data360.worldbank.org/en/api).

**La nota:** https://USUARIO.github.io/REPO/ (publicada con GitHub Pages)

## Qué hay en el repositorio

| Archivo | Contenido | Punto de la consigna |
|---|---|---|
| `tp_data360.ipynb` | Exploración de la API, los tres gráficos en Altair y los números de la nota | 1, 2 y 3 |
| `docs/index.html`, `docs/estilo.css` | La nota (landing) | 3 |
| `docs/graficos/` | Los gráficos de Altair exportados como JSON de Vega-Lite | 2 |
| `docs/datos/` | Los datos de cada gráfico en CSV, incluidos los de Flourish y Datawrapper | 2 y 3 |
| `guia_flourish_datawrapper.md` | Cómo armar los gráficos de Flourish y Datawrapper | 3 |

## Cómo correr el notebook

- **En Colab:** abrir `https://colab.research.google.com/github/USUARIO/REPO/blob/main/tp_data360.ipynb` y ejecutar todo. Colab ya trae pandas, Altair y requests. Los archivos que genera quedan en la sesión de Colab: hay que descargarlos y subirlos al repositorio.
- **En la compu:** instalar las dependencias y abrir el notebook en Jupyter o VS Code.

```bash
pip install -r requirements.txt
```

El notebook descarga los datos en vivo de la API (tarda alrededor de un minuto) y regenera `docs/graficos/` y `docs/datos/`.

## Cómo ver la nota en la compu

Abrir `index.html` con doble clic no funciona: el navegador bloquea la carga de los gráficos desde archivos locales. Hay que servir la carpeta `docs` y abrir http://localhost:8000:

```bash
python -m http.server 8000 --directory docs
```

## Cómo publicarla en GitHub Pages

1. Subir el repositorio a GitHub.
2. En **Settings → Pages**, elegir **Deploy from a branch**, la rama `main` y la carpeta `/docs`.
3. Reemplazar `USUARIO/REPO` por el usuario y el nombre del repositorio en este README y en los enlaces del final de `docs/index.html`.
Los gráficos de Flourish (visualización 30791854) y Datawrapper (mapa KllOm) ya están publicados e insertados en `docs/index.html`. Si cambian los datos, hay que actualizarlos siguiendo `guia_flourish_datawrapper.md` y volver a publicarlos.
