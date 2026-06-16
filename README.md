# Proempresa/web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

# Requisitos

Para este proyecto se trabajó con:

- Angular 13.3.3
- Node 16.15.0
- MySQL 8.0.28

## Desarrollo en local

Ejecute `ng serve` para un servidor de desarrollo. Navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambia alguno de los archivos de origen.

## Para Producción (SSR)

Ejecute `npm run build:ssr` para compilar el proyecto. La compilación resultante se almacenará en el directorio `dist/`.

Si desea probar la compilación de producción en un servidor de desarrollo local, ejecute `npm run serve:ssr`. Navegue a `http://localhost:4200/`.

Para desplegar en un servidor remoto deberá cargar el contenido del directorio `dist/`.

Nota: Los ambientes para produccion y desarrollo se encuentran en el directorio `src/environments`.

## Base de datos

Para levantar la Base de datos, debera correr el archivo `.sql`, y modificar los valores de `siteurl` y `home` de la tabla `pre_wp_options` por la ubicación del proyecto backend (WordPress).

Luego de cargar la base de datos, configure la conexión en el archivo `wp-config.php` del proyecto WordPress, con los valores para `DB_Name`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`.

## Servicios REST

A continuación se mostraran los servicios construidos desde el backend.


- Servicio para obtener menu ( slug ):

	<domain-backend>/wp-json/api/menu?name=<slug>

- Servicio para obtener opciones de configuracion:

	<domain-backend>/wp-json/api/options/<slug>

	Ejemplo: slug => options-2

- Servicio para obtener campos de opciones de configuración ( campos )

	<domain-backend>/wp-json/api/options/<slug>?fields=<campo_1>,<campo_2>,...

	Ejemplo: campo => logo

- Servicio para obtener campos dependiendo el tipo de página :

	<domain-backend>/wp-json/api/pages/<tipo>/<slug>

	Tipos de pagina: tipo => page, producto

	Ejemplo: slug => consumo-directo

	Ejepmlo 2: <domain-backend>/wp-json/api/pages/producto/consumo-directo

- Servicio para enviar datos a formulario

	<domain-backend>/wp-json/contact-form-7/v1/contact-forms/<id>/feedback

	Ejemplo: id => 9

- Servicio para obtener los proyectos conglomerados:

	<domain-backend>/wp-json/api/projects

- Servicio para obtener proyecto conglomerado por id:

	<domain-backend>/wp-json/api/projects/<id>

	Ejemplo: id => 2286

- Servicio para obtener los inmuebles:

	<domain-backend>/wp-json/api/inmuebles

- Servicio para obtener inmueble por id:

	<domain-backend>/wp-json/api/inmuebles/<id>

	Ejemplo: id => 1787

- Servicio para "Encuentra tu Ejecutivo de Negocios":

	<domain-backend>/wp-json/api/encuentraedn/<dni>

	Ejemplo: dni => 87654321
 
 - Servicio para Busqueda de Paginas:

	<domain-backend>/wp-json/api/search?s=<search>

	Ejemplo: search => ahorro
	
