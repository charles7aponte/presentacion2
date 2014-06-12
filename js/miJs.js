
var listaElementos=Array();
var $elementoSeleccionado=null;
var $herramientaBotones=null;
var banderaTransicion=false;
var banderaPanelLetra =false;//false indicado panel de edicion  de letras no  esta abierto 


var manejadorPaginas= new Pagina();



$( "#spinner" ).spinner({
	 min:1
	
	,numberFormat: "n" 
	
	,change:function(event, ui){
		cambiarTamLetra();		

	}

	,spin: function(event, ui){
		cambiarTamLetra();
	}	
});

$( "#spinner" ).blur(function(){
	cambiarTamLetra();
});




/// cambi de tamaññn de letra
function cambiarTamLetra(){
	var valor= $( "#spinner" ).spinner("value");

				if(!/[123456789][0-9]*/.test(valor))
				{
					valor=1;
					$( "#spinner" ).spinner("value",1);
				}


				if($elementoSeleccionado && $elementoSeleccionado.data("tipo")=="textarea")
				{
					
					$elementoSeleccionado.css("font-size",valor+"px");
					$elementoSeleccionado.find("textarea").css("font-size",valor+"px");	
				}
}




//actualizar la parte grafica del menu 
function actualizaPanelHerramientaEdicionLetras(){

	if($elementoSeleccionado && $elementoSeleccionado.data("tipo")=="textarea")
	{

		//muestra el boton de activar la edicion de letras
		$("#boton_color_grupo").show();



		var $elementoText= $elementoSeleccionado.find("textarea");

		var micolor=$elementoSeleccionado.find("textarea").css("color");
		var tam=$elementoSeleccionado.find("textarea").css("font-size").split("px");
		var font=$elementoSeleccionado.find("textarea").css("font-family");
		


		//color 
		$("#panel_tipo_color").spectrum("set",micolor);


		//tamaño de letra
		if(tam.length>0)
			tam=tam[0];
		$( "#spinner" ).spinner("value",tam);

		//tipo de fuente
		font=font.split(",");
		font=font[0];
		$("#panel_tipo_letra option[value="+ font +"]").attr("selected",true);


		//negrilla
		var bold= $elementoText.css("font-weight");				
		if(bold=="bold")
		{
			$("#panel_letras_bold").addClass("active_letra");
		}else{
			$("#panel_letras_bold").removeClass("active_letra");
		}


		//cursiva
		var cursiva= $elementoText.css("font-style");				
		if(cursiva=="italic")
		{
			$("#panel_letras_cursiva").addClass("active_letra");
		}else{
			$("#panel_letras_cursiva").removeClass("active_letra");
		}


	
		//surayado
		var sub= $elementoText.css("text-decoration");				
		if(sub=="underline")
		{
			$("#panel_letras_subrayado").addClass("active_letra");
		}else{
			$("#panel_letras_subrayado").removeClass("active_letra");
		}


		//aligneacion de texto
		var alig= $elementoText.css("text-align");
		$("#panel_letras_center , #panel_letras_left ,#panel_letras_right").removeClass("active_letra");

		switch(alig){
			case "center": 	$("#panel_letras_center").addClass("active_letra");  break;
			case "left": 	$("#panel_letras_left").addClass("active_letra");  break;
			case "right": 	$("#panel_letras_right").addClass("active_letra");  break;
				

		}


	}
	else{

		$("#boton_color_grupo").hide();

	}
}







//boton para edicion de letras
$("#boton_color_grupo").click(function(event) {
	if(banderaPanelLetra)
	{
		$("#panel_editar_letras").hide();
	}
	else{
		$("#panel_editar_letras").show();
		$("#subgrupo_botones_boton_capa").hide()
	}

	banderaPanelLetra= !banderaPanelLetra;
});


/*//boton de movimiento de la barra de herramients  
$("#herramientas_grupo").click(function(){
	if(banderaPanelLetra)
	{
		$("#panel_editar_letras").hide();
		banderaPanelLetra=false;
	}
});
*/

///color  de escenario 
$("#color_escenario").spectrum({
    color: "#999"
    ,showInitial: false    
    ,chooseText: "Aceptar"
    ,cancelText: "Cancelar"
    ,showButtons: false
    ,change: function(color) {
    	color.toHexString(); // #ff0000
    	//manejadorPaginas.$paginaActual.css("background-color", color.toHexString());
    	
	}

	,move: function(color) {
    color.toHexString(); // #ff0000
    	manejadorPaginas.$paginaActual.css("background-color", color.toHexString());

   }
  });





var color=$("#panel_tipo_color").spectrum({
    color: "#f00"
    ,showInitial: false    
    ,chooseText: "Aceptar"
    ,cancelText: "Cancelar"
    ,showButtons: false
    ,change: function(color) {
    	color.toHexString(); // #ff0000
    	
	}

	,move: function(color) {
    color.toHexString(); // #ff0000
   

    	if($elementoSeleccionado.data("tipo")=="textarea")
    	{

    	$elementoSeleccionado.css("color",color.toHexString());
		$elementoSeleccionado.find("textarea").css("color",color.toHexString());
    	    			

    	}//fin de la valicion para text are

	}
});



$(".sp-picker-container").mousedown(function(e){
	e.stopPropagation();
	//return false;
});





/**************************/



/*****
caja de herramientas 
*/
$herramientaBotones=$("#herramientas_grupo_botones");
$herramientaBotones.draggable({
		handle:"#herramientas_grupo",
		drag:function(){
			$("#panel_tipo_color").spectrum("hide");
		}
		,scroll:false
	});

$herramientaBotones.hide();
$("#subgrupo_botones_boton_capa").hide();



//evita la porpgacion
$herramientaBotones.mousedown(function(e){
	e.stopPropagation();
	//return false;
});

/*********************
*evento para btones***
**********************/




//evento eleiminar un elemento
$("#boton_delete_grupo").click(function(event) {
	eliminarMiElemento();

	if(banderaPanelLetra)
	{
		$("#panel_editar_letras").hide();
		banderaPanelLetra=false;
	}
});

//togle de caps 
$("#boton_capa").click(function(){
	$("#subgrupo_botones_boton_capa").fadeToggle(200);

	if(banderaPanelLetra)
	{
		$("#panel_editar_letras").hide();
		banderaPanelLetra=false;
	}
});



//negrilla, subrayado , letra cursiva
$("#panel_letras_bold, #panel_letras_subrayado , #panel_letras_cursiva ").click(function(){
	
	//solo es para tipo texto
	if($elementoSeleccionado && $elementoSeleccionado.data("tipo")=="textarea"){
		var $elem =$(this);
		var activo=$elem.data("activo")+"";
		var propiedad=$elem.data("propiedad")+"";
		var descativo=$elem.data("descativo")+"";

		//desactiva
		if($elem.hasClass('active_letra'))
		{
			$elem.removeClass('active_letra');
			$elementoSeleccionado.css( propiedad,descativo );
			$elementoSeleccionado.find("textarea").css( propiedad,descativo );
		}
		else{
			
			$elem.addClass('active_letra');
			$elementoSeleccionado.css(propiedad,activo);
			$elementoSeleccionado.find("textarea").css(propiedad,activo);
			

		}//fin de toogle 	

	}//validacion de si aplica 
	
});


///alineacion de letra
$("#panel_letras_center, #panel_letras_left,#panel_letras_right").click(function(){
	//solo es para tipo texto
	if($elementoSeleccionado && $elementoSeleccionado.data("tipo")=="textarea"){
		var $elem =$(this);
		var activo=$elem.data("activo")+"";
		var propiedad=$elem.data("propiedad")+"";
	
		//desactiva
		$("#panel_letras_center, #panel_letras_left, #panel_letras_right").removeClass("active_letra");	
			
		

		$(this).addClass('active_letra');



		$elementoSeleccionado.css(propiedad,activo);
		$elementoSeleccionado.find("textarea").css(propiedad,activo);

	}//validacion de si aplica 
	
});



//seleccion de tipo letra
$("#panel_tipo_letra").change(function(){
	if($elementoSeleccionado && $elementoSeleccionado.data("tipo")=="textarea"){
		var valor=$(this).val();
		
		$elementoSeleccionado.css("font-family",valor);
		$elementoSeleccionado.find("textarea").css("font-family",valor);
	}
});

/**************
* se elige le numero de capa
****/
function elegirCapa(numeroCapa)
{

	numeroCapa = parseInt(numeroCapa);

	var listaSubcapas = $("#subgrupo_botones_boton_capa .active_icons");
	
	

	listaSubcapas.each(function(index, value){
		$(value).removeClass("active_icons");
	});

	$("#subgrupo_botones_boton_capa"+numeroCapa).addClass("active_icons");
		
	if($elementoSeleccionado)
	{


		$elementoSeleccionado.css({zIndex:(numeroCapa*10)});	
	}	

}








/********************************************
**eliminar un elemnto de edicion ************
*********************************************/
function eliminarMiElemento(){
	if($elementoSeleccionado)	
	{


		var posicion = listaElementos.indexOf($elementoSeleccionado[0]);
		if(posicion!=-1)
			{

				listaElementos.splice(posicion,1);

				//console.log("se encontro ");
			}else {
				//console.log("no se encontro ");
			}


		$elementoSeleccionado.parent()[0].removeChild($elementoSeleccionado[0]);
		
		$("#herramientas_grupo_botones").hide(200);
		$("#panel_tipo_color").spectrum("hide");
		$elementoSeleccionado=null;
	}

}










/*********************************
*  evento para dar salida 
*  al dar click por fuera
********************************/
$(document).mousedown(function(event) {
	if($elementoSeleccionado)	
	{
		$elementoSeleccionado.resizable( "option", { disabled: true } );
		$elementoSeleccionado.removeClass( "elemento_seleccionado" );
		$elementoSeleccionado.removeClass('ui-state-disabled');
		$elementoSeleccionado=null;

		//oculta la caja de herramientas
		$("#herramientas_grupo_botones").hide(200);
		$("#panel_tipo_color").spectrum("hide");
		
	}

	/* Act on the event */
});



/*********************************
*	menu 1 , convierte los elemento 
*	draggable
* 
**********************************/
function actualizaDropMenu(){


	$(".elemento_menu1").draggable({
		cursor:"move"
		//, cursorAt: { left:25,top:25 }
		,delay:1
		,"helper": function(){
			var $self=$(this);
			var representacion= $($self.data("elemento"))[0];
			return representacion;
		}
		,opacity: 0.6
		,"zIndex": 100
		,scroll: false
		,drag:function( event, ui ){

			//console.info(ui);
			$("#herramientas_grupo_botones").hide(200);
			$("#panel_tipo_color").spectrum("hide");
		}
	});

}
actualizaDropMenu();

/*********************************
*	menu 1 , convierte los elemento 
*	draggable
* 
**********************************/
$(".elemento_fondo").draggable({
	cursor:"move"
	,scroll: false
	//, cursorAt: { left:25,top:25 }
	,delay:1
	,"helper": function(){
		var $self=$(this);
		var representacion= $($self.data("elemento"))[0];
		return representacion;
	}
	,opacity: 0.8
	,"zIndex": 100
	,drag:function( event, ui ){
		
		
	}
});







propiedadesPagina();


/*********************
* genera la propiedade de la pagina para contenedor y arrastras los elemento
*
*/
function propiedadesPagina(){

	$(".pagina").droppable({
		accept:".elemento_menu1, .padre_elemento , .elemento_fondo"
		//,activeClass: "ui-state-highlight"
		,greedy: true
		, hoverClass: "drop-hover" 
		
		,tolerance: "fit"
		,activate: function( event, ui ){
			//console.log("ga");
		}
		,deactivate:function ( event, ui ){
			//console.log(ui);
		}
		, drop: function( event, ui ) {
			

			if(ui.draggable.hasClass('elemento_fondo'))/// es de fondo 
			{

				var $midragg = $(ui.draggable);
				var $elemento = $(ui.draggable.data("elemento"));
				var tipo= $elemento.data("tipo");

				//fondo image 
				switch(tipo)
				{

					//imagen de fondo 
					case "tipo_f1":
					{

						var imagen= $elemento.data("imagen");
						imagen="url('"+imagen+"')";
						
						manejadorPaginas.$paginaActual.data("fondo",imagen);
						manejadorPaginas.$paginaActual.css("background-image",imagen);
					}
					break;

					//elimna el fondo de image
					case "tipo_f0":
						manejadorPaginas.$paginaActual.css("background-image","none");
						manejadorPaginas.$paginaActual.data("fondo","none");

					break;

					//PARA EL MArCCO
					case "tipo_m1":
						var imagen= $elemento.data("imagen");
						imagen="url('"+imagen+"')";


						manejadorPaginas.$paginaActual.data("marco", imagen);
						manejadorPaginas.$paginaActual.find(".marco").css("background-image", imagen);
					break;

					//sin marco
					case "tipo_m0":
						
						manejadorPaginas.$paginaActual.data("marco", "none");
						manejadorPaginas.$paginaActual.find(".marco").css("background-image","none");
					break;
				}


			}
			else{
				dropElemento1(this, event, ui);
			}

		}

		,over: function( event, ui )
		{
			
		}

	});

}

/**************************
****
*
*  el elemento drop 
*  el elemento es ingresado a una pagina o arrastrado a la
*  pagina
**/
function  dropElemento1(elemento,event, ui){

			var $selft=$(elemento);
			var miposition = ui.position;
			var mioffset = ui.offset;
			var $nuevoElemento = $(ui.draggable.data("elemento"));		
			

			$selft.append($nuevoElemento);
			$nuevoElemento.data("idpagina",manejadorPaginas.$paginaActual.attr("id"));



			/******************************
			****convierto el nuevo elemento resize
			********************/
			$nuevoElemento.resizable({
			// autoHide: true 
			  handles: "n, e, s, w, ne, se, sw, nw, all" 
			});


			//propiedades al elemento nuevo
			$nuevoElemento.css({
	         	position:'absolute'
				,top: event.pageY-($nuevoElemento.height()/2)-$selft.offset().top
				,left: event.pageX-($nuevoElemento.width()/2)-$selft.offset().left
				,zIndex:10
			});


			//datos al nuevo elemento , datos que se necesitan 
			$nuevoElemento.data("pagina",manejadorPaginas.$paginaActual.attr("id"));


		   
			//convierto el nuevo elemento draggable
			$nuevoElemento.draggable({
					cursor:"move"
					,iframeFix: true
					,containment: "parent"
					,delay:1
					,opacity: 0.6
					,"zIndex": 100
					,drag:function( event, ui ){

						//console.info(ui);
						//$("#herramientas_grupo_botones").css({display:'none'});
						$("#panel_tipo_color").spectrum("hide");
					}
					,revert:"invalid"
					,scroll: false	
				});



			$nuevoElemento.resizable( "option", { disabled: true } );
			$nuevoElemento.css({overflow:'visible'});
			$nuevoElemento.addClass('padre_elemento');
			$nuevoElemento.removeClass('ui-state-disabled');



			//evento para seleccionar el eleemnto y activar la edicion del elemento seleccionado
			$nuevoElemento.mousedown(function(e){
				if($elementoSeleccionado)
				{
				//deseleccciona el elemento	
				$elementoSeleccionado.resizable( "option", { disabled: true } );
				$elementoSeleccionado.removeClass( "elemento_seleccionado" );
				$elementoSeleccionado.removeClass('ui-state-disabled');
				$elementoSeleccionado=null;

									

				}

				//muestra la caja de herramientas
				$elementoSeleccionado= $nuevoElemento;

				
				$("#herramientas_grupo_botones").show(200);
				$("#herramientas_grupo_botones").css({
					top: $nuevoElemento.offset().top- 60
					,left:parseFloat($nuevoElemento.css("left")) + parseFloat(manejadorPaginas.$paginaActual.css("margin-left")) //$nuevoElemento.offset().left 
				});

		
				if(banderaPanelLetra)
				{
						$("#panel_editar_letras").hide();
						banderaPanelLetra=false;
				}

				$("#subgrupo_botones_boton_capa").hide();

				actualizaPanelHerramientaEdicionLetras();

				
			



				
				$nuevoElemento.resizable( "option", { disabled: false } );
				$nuevoElemento.addClass( "elemento_seleccionado" );
				
				e.stopPropagation();
			});

			

		
			listaElementos.push($nuevoElemento[0]);

}










/***********************************************
******* manejo de paginado *********************
**************************************************/


/********************
* dar click en la transicion 
**********************/
$("#bton_pag_transicion").click(function(){

	//esta abierto se debe cerrar;
	if(banderaTransicion)
	{
			$(".pag_transicion").slideUp(200);
			$(".mi_footer").animate({
				height: 45
				
			},2);
		
	}
	else{
		$(".pag_transicion").show(100);
		$(".mi_footer").animate({
				height: 110
				
			},200);
	}

	banderaTransicion=!banderaTransicion;
});




/***************************************************
*********  eventos de paginado*********************
*****************************************************/
manejadorPaginas.paginas.push($("#pagina0")[0]);
manejadorPaginas.posicionActual= 0;
manejadorPaginas.$paginaActual= $("#pagina0");


$("#bton_pag_nueva").click(function(){
	
	manejadorPaginas.nueva();
	manejadorPaginas.htmlPaginado();
	manejadorPaginas.showPaginaActual();

	//genera las propiedades a la nueva pagina
	propiedadesPagina();
});

/***************
* eleminar pagina
**/
$("#bton_pag_eliminar").click(function(){	

	manejadorPaginas.eliminarPaginaActual(listaElementos);

});



	
	/****
		@param {int} posicionPagina   indica la poscion del pagina dentro de listaPaginas 
		*/
function ex_seleccionarPagina(posicionPagina){
	manejadorPaginas.seleccionarPagina(posicionPagina);
	return false;
}






/*******************************
***manejo de texto  al dar doble
* click  debe oculta la sombra para empesar la edicion
******************************
******************************/
function editarTexto(elemento)
{
	var $padre=$(elemento).parent();

	$(elemento).hide();

	$padre.find(".text").focus();

	
}

/***********
desablidata la edicon
*/
function noeditarBlur(elemento)
{

	var $padre=$(elemento).parent().parent();

	$padre.find(".sombra").show();

}



/*
$( document).keypress(function() {
  console.log( "Handler for .keypress() called." );
});*/



$( document ).keydown(function(e) {
 //console.log(e.keyCode);// 39 -->   &&  37 <--
 // 
 	switch(e.keyCode){
 		//-->
 		case 39:
 			manejadorPaginas.siguientePaginaAnimada();
 		break;

 		//<--
 		case 37:
 		
 			manejadorPaginas.anteriorPaginaAnimada();
 		break;

 		//ESC
 		case 27:
 		
 			//manejadorPaginas.finPresentacion();
 			
 		break;


 	}
});



/*****************************
* selecciona trancicon 
***/
function seleccionarTransicion(elemento)
{
	
	var $miElemento= $(elemento);
	var animacion= $miElemento.data("animacion");

	$("#lista_transicion_presentacion>li div.th_activo").removeClass("th_activo");

	$miElemento.addClass('th_activo');

 	manejadorPaginas.actualizaTransicionPagina(animacion);




}

/*******************
* ver la transcion de leemmtno como se comporta
**/
function verTranscionDemo(elemento,animacion)
{
	var $miElemento= $(elemento);
	$miElemento.effect(animacion,{},500,function(){
		 $miElemento.removeAttr( "style" ).hide().fadeIn();     
	});
}






/*************
** carga los nuevos elementos
**/
function cargarElementos($nuevoElemento,idPagina){
			if(manejadorPaginas==null)
			return false;


			$("#"+idPagina).append($nuevoElemento);
			$nuevoElemento.data("idpagina",idPagina);



			/******************************
			****convierto el nuevo elemento resize
			********************/
			$nuevoElemento.resizable({
			// autoHide: true 
			  handles: "n, e, s, w, ne, se, sw, nw, all" 
			});


			//propiedades al elemento nuevo
			/*$nuevoElemento.css({
	         	position:'absolute'
				,top: event.pageY-($nuevoElemento.height()/2)-$selft.offset().top
				,left: event.pageX-($nuevoElemento.width()/2)-$selft.offset().left
				,zIndex:10
			});*/


			//datos al nuevo elemento , datos que se necesitan 
			$nuevoElemento.data("pagina",manejadorPaginas.$paginaActual.attr("id"));


		   
			//convierto el nuevo elemento draggable
			$nuevoElemento.draggable({
					cursor:"move"
					,iframeFix: true
					,containment: "parent"
					,delay:1
					,opacity: 0.6
					,"zIndex": 100
					,drag:function( event, ui ){

						//console.info(ui);
						//$("#herramientas_grupo_botones").css({display:'none'});
						$("#panel_tipo_color").spectrum("hide");
					}
					,revert:"invalid"	
				});



			$nuevoElemento.resizable( "option", { disabled: true } );
			$nuevoElemento.css({overflow:'visible'});
			$nuevoElemento.addClass('padre_elemento');
			$nuevoElemento.removeClass('ui-state-disabled');



			//evento para seleccionar el eleemnto y activar la edicion del elemento seleccionado
			$nuevoElemento.mousedown(function(e){
				if($elementoSeleccionado)
				{
				//deseleccciona el elemento	
				$elementoSeleccionado.resizable( "option", { disabled: true } );
				$elementoSeleccionado.removeClass( "elemento_seleccionado" );
				$elementoSeleccionado.removeClass('ui-state-disabled');
				$elementoSeleccionado=null;

									

				}

				//muestra la caja de herramientas
				$elementoSeleccionado= $nuevoElemento;
				$("#herramientas_grupo_botones").show(200);
				$("#herramientas_grupo_botones").css({
					top: $nuevoElemento.offset().top- 60
					,left:$nuevoElemento.offset().left 
				});

				if(this.banderaPanelLetra)
				{
						$("#panel_editar_letras").hide();
						banderaPanelLetra=false;
				}

				$("#subgrupo_botones_boton_capa").hide();

				actualizaPanelHerramientaEdicionLetras();

				
			



				
				$nuevoElemento.resizable( "option", { disabled: false } );
				$nuevoElemento.addClass( "elemento_seleccionado" );
				
				e.stopPropagation();
			});

			

		
			listaElementos.push($nuevoElemento[0]);

	
}



/*****************
* genera el json para guardar 
*/
function getStringJsonElmentos(){


var miString="[";

	 for(var i=0 ; i< listaElementos.length; i++)
	 {
	 	var $elemento= $(listaElementos[i]);
	 	var elemento=" {"
	 		 +"pagina:" +"\\\""+ $elemento.data("pagina")+"\\\""
	 		+",tipo: " +"\\\""+ $elemento.data("tipo")+"\\\""
	 		+",top:" +"\\\""+  $elemento.css("top")+"\\\""
	 		+",left:" +"\\\""+  $elemento.css("left")+"\\\""
	 		+",height:" +"\\\""+  $elemento.css("height")+"\\\""
	 		+",width:" +"\\\""+  $elemento.css("width")+"\\\""
	 	


	 	//textarea
	 	if($elemento.data("tipo")=="textarea")
	 	{
	 		$elemento= $elemento.find("textarea");

	 	  	elemento+=",color:" +"\\\""+ $elemento.css("color")+"\\\""
	 	  	+",fontSize:" +"\\\""+ $elemento.css("font-size")+"\\\""
	 	  	+",fontFamily:" +"\\\""+ $elemento.css("font-family")+"\\\""
	 	  	+",fontWeight:" +"\\\""+ $elemento.css("font-weight")+"\\\""
	 	  	+",textDecoration:" +"\\\""+ $elemento.css("text-decoration")+"\\\""
	 	  	+",textAlign:" +"\\\""+ $elemento.css("text-align")+"\\\""
	 	  	+",texto:" +"\\\""+ $elemento.val()+"\\\"";
	 	  	
	 	  	
	 	}
	 	else{


	 		elemento+=",imagen:" +"\\\" url('"+ $elemento.data("imagen")+"')\\\"";
	 	}

		

	 	elemento+="},";

	 	miString+=elemento;
	 }//fin de for


	 if(miString.length>1)
	 {
	 	miString=miString.substring(0,miString.length-1);
	 }

return  miString+="]";
}



/***************
**
* cargar ememtos 
**/
function cargarJsonStringOf(mijson){
	mijson= eval(mijson);

	for(var i=0; i< mijson.length ; i++)
	{
		var stringElemento ="";
		var elementoJson= mijson[i];

		if(elementoJson.tipo=="textarea")
		{

			var $text=$("<div  data-tipo='textarea' style='position:absolute;height:"+elementoJson.height+" ; width:"+elementoJson.width+";"

						+" top:"+elementoJson.top+";left:"+elementoJson.left+"'  > "

                        +"    <div style='overflow:hidden; height:100% ; width:100%;'> <textarea  class='text ' "  
                        +"    style='box-shadow: none;' "
                        +"          onblur='noeditarBlur(this)' >Texto</textarea></div> "
                        +"    <div  class='sombra' ondblclick='editarTexto(this)'></div></div>");
			

			var opciones={
			color:	elementoJson.color	
			,fontSize:  elementoJson.fontSize
	 	  	,fontFamily: elementoJson.fontFamily
	 	  	,fontWeight: elementoJson.fontWeight
	 	  	,textDecoration: elementoJson.textDecoration
	 	  	,textAlign: elementoJson.textAlign};


	 	  	$text.css(opciones);
	 	  	$text.find("textarea").css(opciones).text(elementoJson.texto);

	 	  	cargarElementos($text, elementoJson.pagina);
		}
		else{

			var $elementoNuevo=$("<div   data-tipo='tipo1' "

                      //  +"   data-imagen="+elementoJson.imagen+" "
                        +"  class='imagen_fondo' "
                        +"  style='position:absolute;  background-size: 100%; height:"+elementoJson.height+" ; width:"+elementoJson.width+";'  ></div>");


			$elementoNuevo.css("background-image",elementoJson.imagen);
			$elementoNuevo.css("top",elementoJson.top);
			$elementoNuevo.css("left",elementoJson.left);
			
			$elementoNuevo.width(elementoJson.width);
			$elementoNuevo.height(elementoJson.height);
			$elementoNuevo.data("image",elementoJson.imagen);


			cargarElementos($elementoNuevo, elementoJson.pagina);

		}
	}
	



}

