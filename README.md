# La excepción argentina

Trabajo práctico de Visualización de la Información (ITBA, 2026): visualización de datos con la [API Data360 del Banco Mundial](https://data360.worldbank.org/en/api).

**La nota:** https://jrilo-netizen.github.io/infovis/docs/bancomundial.html (publicada con GitHub Pages)

## Qué hay en el repositorio

| Archivo | Contenido | Punto de la consigna |
|---|---|---|
| `tp_data360.ipynb` | Exploración de la API, los tres gráficos en Altair y los números de la nota | 1, 2 y 3 |
| `docs/bancomundial.html`, `docs/estilo.css`, `docs/app.js` | La landing, con una pestaña por punto de la consigna | 1, 2 y 3 |
| `docs/graficos/` | Los gráficos de Altair exportados como JSON de Vega-Lite | 2 |
| `docs/datos/` | Los datos de cada gráfico en CSV, incluidos los de Flourish y Datawrapper | 2 y 3 |
| `guia_flourish_datawrapper.md` | Cómo armar los gráficos de Flourish y Datawrapper | 3 |

## Cómo correr el notebook

- **En Colab:** abrir https://colab.research.google.com/github/jrilo-netizen/infovis/blob/main/tp_data360.ipynb y ejecutar todo. Colab ya trae pandas, Altair y requests. Los archivos que genera quedan en la sesión de Colab: hay que descargarlos y subirlos al repositorio.
- **En la compu:** instalar las dependencias y abrir el notebook en Jupyter o VS Code.

```bash
pip install -r requirements.txt
```

El notebook descarga los datos en vivo de la API (tarda alrededor de un minuto) y regenera `docs/graficos/` y `docs/datos/`.

## Cómo ver la nota en la compu

Abrir `bancomundial.html` con doble clic no funciona: el navegador bloquea la carga de los gráficos desde archivos locales. Hay que servir la carpeta `docs` y abrir http://localhost:8000/bancomundial.html:

```bash
python -m http.server 8000 --directory docs
```

## Cómo se publica

GitHub Pages publica la rama `main` desde la raíz del repositorio, así que la nota queda en `docs/bancomundial.html`. Los enlaces de la landing al repositorio y a Colab los arma `docs/app.js` a partir de esa dirección.

Los gráficos de Flourish (visualización 30791854) y Datawrapper (mapa KllOm) ya están publicados e insertados en `docs/bancomundial.html`. Si cambian los datos, hay que actualizarlos siguiendo `guia_flourish_datawrapper.md` y volver a publicarlos.
