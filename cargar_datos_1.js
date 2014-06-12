
var datosPagina="[{'id':\"pagina0\",'marco':\"url('img/marcos/m4.png')\",'fondo':\"url('img/fondo/f2.png')\",'color':\"rgb(214, 219, 225)\",'animacion':\"explode\"},{'id':\"pagina1\",'marco':\"url('img/marcos/m4.png')\",'fondo':\"url('img/fondo/f5.png')\",'color':\"rgb(214, 219, 225)\",'animacion':\"fold\"},{'id':\"pagina2\",'marco':\"url('img/marcos/m4.png')\",'fondo':\"url('img/fondo/f9.png')\",'color':\"rgb(214, 219, 225)\",'animacion':\"fade\"}]";



var datosElementos="[ {pagina:\"pagina1\",tipo: \"tipo1\",top:\"96px\",left:\"221.875px\",height:\"200px\",width:\"100px\",imagen:\" url('img/personajes/p1/cuerpo2.png')\"}, {pagina:\"pagina0\",tipo: \"tipo1\",top:\"84px\",left:\"127.875px\",height:\"200px\",width:\"100px\",imagen:\" url('img/personajes/p1/cuerpo4.png')\"}]";

manejadorPaginas.cargarPaginas(datosPagina);
cargarJsonStringOf(datosElementos);

manejadorPaginas.banderaHabilitaEdicion=false;

manejadorPaginas.inicioPresentacion();
