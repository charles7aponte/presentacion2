var $listaSecciones=$("#botones_presentacion_p1>div");



/***********************
actualizaion de estados de los personajes *
*********************/
function actualizaEstadosPersonajes(){

//$("tr[data-filapersonaje]").hide();
	

	$(".slides>li").each(function(index,value){
		var $li=$(value);
		var valor="";
		//esta activo
		//
		

		
		

		if($li.css("opacity")!=0)
		{
			valor= $li.data("personaje");
			
			$("tr[data-filapersonaje='"+valor+"']").show(10);
			
			

		}
		else{
			valor= $li.data("personaje");
			$("tr[data-filapersonaje='"+valor+"']").hide(50);
		}
		
	});
		


};

actualizaEstadosPersonajes();
seleccionSeccion($("#boton_esecenario_1"));


//seleccionar un seccion
$listaSecciones.click(function(){
	
	var $elemento=$(this);

	if($elemento.hasClass('active_button')==false)
	{
		seleccionSeccion($elemento);

		//descativar los otors btoones
		$listaSecciones.removeClass("active_button");
		$elemento.addClass("active_button");
	}

	

});


//seleccion de  secccion
function seleccionSeccion($elemento){
	$listaSecciones.each(function(index, value){
		var value=$(value).data("mipanel");
		$("div[data-seccion='"+value+"']").hide();
	});


	var valor= $elemento.data("mipanel");

	$("div[data-seccion='"+valor+"']").slideDown();

		ajustaTamPanel();
}




var miIdSetTime=null;

/**********************************
*************************
*  ajausta de modo vertical la pantalla
*
**/

$(window).resize(function(){
	$("#menu_lateral_1").height($(window).height());
	$("#contenedor_paginas").height( $(window).height() -70);


		if(miIdSetTime)
			clearTimeout(miIdSetTime);

		miIdSetTime=setTimeout(function(){
				ajustaTamPanel();	
		},300);
	

});

/**************
ajusta para ultilizar el maximo de alto en los paneles
**/
function ajustaTamPanel(){
	$("#panel_escenario_contenido").height( $(window).height() -  $("#panel_escenario_contenido").offset().top-60);
	$("#panel_marcos_contenido").height( $(window).height() -  $("#panel_marcos_contenido").offset().top-60);
	$("#panel_personajes_contenido").height( $(window).height() -  $("#panel_personajes_contenido").offset().top-60);
		
	$("#panel_texto_contenido").height( $(window).height() -  $("#panel_texto_contenido").offset().top-60);
	
	$("#panel_imagenes_contenido").height( $(window).height() -  $("#panel_imagenes_contenido").offset().top-60);
	
}




$(window).resize();




/******************
generar el htm de los bocadillos 
********************/
function generarHtmlBocadillos(cantidadFila, cantidad){

	var html=""

	for(var i=1; i<=cantidad; i++)
	{


		 if(i%cantidadFila==1)
        {
        	html+=" <tr> ";
        }

		html+=" <th> "
          +"                <div class=\"elemento_menu1 imagen_fondo\" "           
          +"                 style=\"background-image: url(img/bocadillo/b"+i+".png); \"  "
          +"                 data-elemento=\"<div   data-tipo='tipo1'  "

          +" 				 class='imagen_fondo' " 
          +"				 data-imagen='img/bocadillo/b"+i+".png'  "
          +"                style='background:url(img/bocadillo/b"+i+".png);  background-size: 100%; height:100px ; width:100px'  ></div>\"> "
          +"               </div>  "                       
          +"              </th>  ";


        if(i%cantidadFila==0)
        {
        	html+=" </tr> ";
        }



	}

	

	return html;
}

$("#cuerpo_bocadillo").html(generarHtmlBocadillos(2,14));




//gnere el html de fondos
function generarHmtlFondos(cantidadFila, cantidad){
	var html="";
	var valor="tipo_f1"

	for(var i=1; i<=cantidad; i++)
	{


		 if(i%cantidadFila==1)
        {
        	html+=" <tr> ";
        }


        if(i==1)
        	{
        		valor="tipo_f0";
        	}
        	else{
        		valor="tipo_f1";
        	}


		html+="<th> "
             +"               <div class=\"elemento_fondo imagen_fondo\" "
             +"                style=\"background-image: url('img/fondo/f"+i+".png'); \"  "
             +"                data-elemento=\"<div   data-tipo='"+valor+"'  "
             +"               class='imagen_fondo' "
               +" 			  data-imagen='img/fondo/f"+i+".png' "
             +"               style='background-image:url(img/fondo/f"+i+".png);  background-size: 100%; height:90px ; width:90px'  ></div>\" > "
             +"              </div> "
             +"  </th> ";


        if(i%cantidadFila==0)
        {
        	html+=" </tr> ";
        }

	}

	return html;
}

$("#imagenes_fondo1").html(generarHmtlFondos(2,10));




//gnere el html de los marcos
function generarHmtlMarcos(cantidadFila, cantidad){
	var html="";
	var valor="tipo_m1"

	for(var i=1; i<=cantidad; i++)
	{


		 if(i%cantidadFila==1)
        {
        	html+=" <tr> ";
        }


        if(i==1)
        	{
        		valor="tipo_m0";
        	}
        	else{
        		valor="tipo_m1";
        	}


		html+="<th> "
             +"               <div class=\"elemento_fondo imagen_fondo\" "
             +"                style=\"background-image: url('img/marcos/m"+i+".png'); \"  "
             +"                data-elemento=\"<div   data-tipo='"+valor+"'  "
             
             +"               class='imagen_fondo' "
             +" 				data-imagen='img/marcos/m"+i+".png' "
             +"               style='background-image:url(img/marcos/m"+i+".png);  background-size: 100%; height:100px ; width:100px'  ></div>\" > "
             +"              </div> "
             +"  </th> ";


        if(i%cantidadFila==0)
        {
        	html+=" </tr> ";
        }

	}

	return html;
}


$("#imagenes_marcos").html(generarHmtlMarcos(2,12));









/******************
generar el htm de las imagenes
********************/
function generarHmtlImagenes(cantidadFila, lista){

	var html=""

	for(var i=1; i<lista.length; i++)
	{


		 if((i)%cantidadFila==1)
        {
        	html+=" <tr> ";
        }

		html+=" <th> "
          +"                <div class=\"elemento_menu1 imagen_fondo\" "           
          +"                 style=\"background-image: url(img_ext/"+lista[i]+"); \"  "
          +"                 data-elemento=\"<div   data-tipo='tipo1'  "

          +" 				 class='imagen_fondo' " 
          +"				 data-imagen='img_ext/"+lista[i]+"'  "
          +"                style='background:url(img_ext/"+lista[i]+");  background-size: 100%; height:100px ; width:100px'  ></div>\"> "
          +"               </div>  "                       
          +"              </th>  ";


        if((i)%cantidadFila==0)
        {
        	html+=" </tr> ";
        }


	}


	return html;
}