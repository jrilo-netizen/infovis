# Guía: los gráficos de Flourish y Datawrapper

La nota (`docs/bancomundial.html`) suma dos gráficos hechos con herramientas vistas en la materia. Sus datos ya están listos en `docs/datos/`: los genera la sección 3 del notebook.

Cada gráfico se arma con la cuenta de algún integrante, se publica y se inserta en `docs/bancomundial.html` como un iframe. Los dos ya están publicados e insertados. Para que la nota se vea como una sola pieza, usamos los mismos colores y la misma fuente que los gráficos de Altair.

## 1. Ranking del PIB per cápita (Flourish, bar chart race)

**Archivo:** `docs/datos/flourish_ranking_pib.csv`. Tiene una fila por país y una columna por año, de 1960 a 2025, con el PIB per cápita en dólares constantes de 2015.

1. En [flourish.studio](https://flourish.studio), crear una visualización nueva con la plantilla **Bar chart race**.
2. En la pestaña **Data**, subir el CSV con **Upload data** y asignar las columnas:
   - **Label:** `A` (`pais`)
   - **Categories:** `B` (`grupo`)
   - **Values:** `C-BP` (de 1960 a 2025)
3. En la pestaña **Preview**:
   - **Bars:** mostrar las 18 barras.
   - **Bar colors:** modo **By category**, con `Argentina` en `#2a78d6` y `Resto de América Latina` en `#c3c2b7`.
   - **Formato de los números:** prefijo `US$ `, sin decimales y con punto como separador de miles.
   - **Header:**
     - Título: *De primero a quinto: el ranking del PIB por habitante en América Latina*
     - Subtítulo: *Dólares constantes de 2015, 1960-2025*
   - **Footer:** fuente *Banco Mundial, Data360 (World Development Indicators)*.
4. Publicar con **Export & publish** → **Publish to share and embed** y anotar el número de la visualización.
5. En `docs/bancomundial.html`, buscar el comentario `Flourish` y poner en el `data-src` del iframe que le sigue la dirección `https://flo.uri.sh/visualisation/NÚMERO/embed`.

## 2. Mapa de la inflación 2025 (Datawrapper, choropleth map)

**Archivo:** `docs/datos/datawrapper_mapa_inflacion.csv`. Tiene una fila por país con:
- `iso3`: el código ISO de 3 letras.
- `pais`: el nombre.
- `inflacion`: la inflación de 2025.
- `medida`: la medida usada (IPC o deflactor del PIB).

1. En [datawrapper.de](https://www.datawrapper.de), crear un mapa nuevo de tipo **Choropleth map** y elegir el mapa base **Latin America**.
2. En **Add your data** → **Import your dataset**, subir el CSV y hacer coincidir la columna `iso3` con la clave **ISO Code**. Los 18 países tienen que quedar ubicados.
3. En **Visualize**:
   - **Colors:**
     - Escala por pasos (**steps**) con cortes en 10, 25, 50, 100 y 1000.
     - Colores, de menos a más inflación: `#fee1d6`, `#f7a284`, `#e87043`, `#c64a0f`, `#953404`, `#632308`. Son los del mapa de calor de la nota.
   - **Tooltips:** título `{{ pais }}` y texto `{{ inflacion }}% ({{ medida }})`.
   - **Annotate:**
     - Título: *En 2025, solo tres países de la región superaron el 10% de inflación*
     - Descripción: *Inflación anual. IPC; en Argentina y Venezuela, deflactor del PIB.*
     - Fuente: *Banco Mundial, Data360 (World Development Indicators)*
4. Publicar con **Publish & Embed** → **Publish now** y anotar la dirección publicada, del tipo `https://datawrapper.dwcdn.net/CÓDIGO/1/`.
5. En `docs/bancomundial.html`, buscar el comentario `Datawrapper` y, en el iframe que le sigue, poner esa dirección en `data-src` y `datawrapper-chart-CÓDIGO` en `id`. Con ese `id`, `docs/app.js` le ajusta la altura al mapa.

> Si se vuelve a ejecutar el notebook y cambian los datos, hay que subir de nuevo los CSV y volver a publicar los dos gráficos.
