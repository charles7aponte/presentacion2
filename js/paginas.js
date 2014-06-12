/************************
* gestiona las paginas 
* y las animacion , le formato de
* presentacion 
***************************/


function Pagina(){
	return {
			/**************atributos ******************/
			$elementoPadre:$("#contenedor_paginas")
			,paginas:Array()
			,$paginaActual:null
			,posicionActual:-1
			,idPagina:0  //contador del id de las paginas
			,$htmlPaginado:$("#html_mi_paginacion_paginas")
			,banderPresentacion:false //indica si esta la presentacion activa
			,intervaloPlay:null
		    , banderaPlay:false
		    ,fondoOriginal: $("#contenedor_paginas").css("background")//guadar el color de fondo inicias
		   ,fondoPresentacion:"rgba(24, 50, 41, 0.5)"//color de fondo en ele momento de la presentcion
		    ,banderaPasandoPagina:false // false si no esta en proceso de transicion depasar una pagina con animacion , y ture si 
		    ,banderaHabilitaEdicion:true
		    ,contadorMilise:10
		    ,MAXIMO_MILI:10


			/*************** funciones *****************/
			,nueva:function(){
				this.idPagina++;
				var $nuevaPagina = $("<div class='pagina' id='pagina"+this.idPagina+"' data-marco='none' data-fondo='none' data-animacion='fade'> <div class='marco'></di></div>");
				
				this.paginas.push($nuevaPagina[0]);
				this.$elementoPadre.append($nuevaPagina);


				this.$paginaActual=$nuevaPagina;
				this.posicionActual= this.paginas.length-1;


				if(this.banderPresentacion)
				{


				$(".pagina").css("-webkit-transform","scale(1.2,1.2)");
				$(".pagina").css("transform","scale(1.2, 1.2)");


				}
			}


			,showPaginaActual:function(){
				if(this.$paginaActual)
				{

					for(var i=0; i<this.paginas.length ; i++)
					{
						$(this.paginas[i]).hide();
					}

					this.$paginaActual.show();
				}

			}


			,htmlPaginado:function()
			{

				var html=" <li class='arrow_1 unavailable'></li> ";

				for(var i=0; i< this.paginas.length ; i++)
					{

						if(this.paginas[i]==this.$paginaActual[0])
						{
							html+="<li class='current'><a href='' onclick='return false ' >"+(i+1)+"</a></li>";		
						}
						else{
							html+="<li><a  onclick='manejadorPaginas.seleccionarPagina("+i+")' >"+(i+1)+"</a></li>";
						}
					}

				html+="<li class='arrow_2'></li>";

				this.$htmlPaginado.html(html);

				this.actualizaPanelTransiciones();

				return html;
			}


			/****
			@param {int} posicionPagina   indica la poscion del pagina dentro de lista {paginas} 
			*/
			,seleccionarPagina:function(posicionPagina)
			{

				this.$paginaActual = $(this.paginas[posicionPagina]);
				this.posicionActual=posicionPagina;

				this.showPaginaActual();
				this.htmlPaginado();
				this.actualizaBotonesPresentacion();

				return false;

			}





			/*******************
			*
			* inciio de la presentaion 
			*************/
			,inicioPresentacion: function(){

				this.banderPresentacion=true;
				$("#grupos_btones_presentacion").show();

				$("#menu_lateral_1").hide();
				$("#panel_principal_1").hide();
				//$("#mi_footer_paginacion").hide();

				$("#contenedor_paginas").css({"width":"100%"});
				this.actualizaBotonesPresentacion();
				this.actualizaPanelTransiciones();

				$("#sombra_contenedor_paginas").show();

				$("#contenedor_paginas").css("background",this.fondoPresentacion);
				$("body").css("background",this.fondoPresentacion);

				$(".pagina").css("-webkit-transform","scale(1.2,1.2)");
				$(".pagina").css("transform","scale(1.2,1.2)");


				//evita el regreso
				if(this.banderaHabilitaEdicion==false)
				{
					$("#bton_cierrre_presentacion").hide();

					$("#grupo_botones_transicion").hide();
				}
			}



		


			, pasarPaginaAnimacion: function(posicionPagina){


				if(this.banderaPasandoPagina)
				{
					return false;
				}
				else{

					this.banderaPasandoPagina=true;

					var animacion= this.$paginaActual.data("animacion");		
					var selft=this;
					var accionSeleccionPagina=this.mostrarPaginaActual


					
					this.$paginaActual.effect(animacion,500,function(){
					
							selft.$paginaActual = $(selft.paginas[posicionPagina]);
							selft.posicionActual=posicionPagina;


							//asegurar que todas las pagianas estan invisibles
							for(var i=0; i< selft.paginas.length ; i++)
								$(selft.paginas[i]).hide();

							selft.$paginaActual.show();
							selft.htmlPaginado();
							selft.actualizaBotonesPresentacion();

							selft.actualizaPanelTransiciones();


							selft.banderaPasandoPagina=false;


					});
				}

				return false;

			}	


			/***********************
			* siguiente pagina animada
			*/
			,siguientePaginaAnimada: function(){


				if(this.banderPresentacion==false)
					return false;

				var posicion= this.posicionActual+1;
				if(posicion<this.paginas.length  )
				{

					this.pasarPaginaAnimacion(posicion);
					
				}


				return false;
			}



			/***********************
			* anterior pagina animada
			*/
			,anteriorPaginaAnimada: function(){


				if(this.banderPresentacion==false)
					return false

				var posicion= this.posicionActual-1;
				if(posicion>=0  )
				{
					this.pasarPaginaAnimacion(posicion);
					
				}




				return false;
			}


			/*******************************
			* inicio de play
			*/
		  ,inicioPlay: function(){

		  	var selft=this;
		  	//detener el reloj
		  	if(selft.banderaPlay)
		  	{
		  		
		  		

		  		if(this.intervaloPlay )
		  		{
		  			clearInterval(this.intervaloPlay);
		  			this.intervaloPlay= null;

		  		}

		  		selft.banderaPlay=false;

		  		selft.actualizaBotonesPresentacion();

		  	}
		  	else {

		  		selft.banderaPlay=true;

		  		selft.contadorMilise=parseInt(selft.MAXIMO_MILI);


			  	selft.intervaloPlay =setInterval(function(){

				  	
				  	selft.contadorMilise=selft.contadorMilise-1;
				  	selft.actualizaBotonesPresentacion();
				  	
				  

			  		if(selft.banderPresentacion &&  selft.banderaPlay && selft.posicionActual+1<selft.paginas.length)
				  		{
				  			if(selft.contadorMilise==0)
				  			{
				  				selft.banderaPlay=true;
				  				selft.siguientePaginaAnimada();

				  				selft.contadorMilise=parseInt(selft.MAXIMO_MILI);
				  			}

				  	
			  			}
			  			else{
	 		
				  			selft.banderaPlay=false;

				  			//	selft.siguientePaginaAnimada();

					  		clearInterval(selft.intervaloPlay);
					  		selft.intervaloPlay=null;
					  		selft.actualizaBotonesPresentacion();




			  			}
			  		
			  		}, 500);


			  	this.actualizaBotonesPresentacion();

		  	}
		  		
		  	
		  	return false;

		  }

		  /*********************
		  *  actualiza los botones de presentaion 
		  */
		  ,actualizaBotonesPresentacion: function()
		  {


		  	$("#bton_presentacion_siguiente").removeClass("desactive_representacion");
		  	$("#bton_presentacion_anterio").removeClass("desactive_representacion");

		  	if(this.posicionActual== this.paginas.length -1)
		  	{
		  		$("#bton_presentacion_siguiente").addClass("desactive_representacion");
		  	}

		  	if(this.posicionActual== 0)
		  	{
		  		$("#bton_presentacion_anterio").addClass("desactive_representacion");
		  	}

		  	if(this.banderaPlay)
		  	{
		  		$("#bton_presentacion_medio").removeClass("fi-play");
		  		$("#bton_presentacion_medio").addClass("fi-pause");
		  		$("#contador_manejo_paginas").html(this.contadorMilise);
		  				  		
		  	}
		  	else{
		  		$("#bton_presentacion_medio").addClass("fi-play");
		  		$("#bton_presentacion_medio").removeClass("fi-pause");
		  		$("#contador_manejo_paginas").html("");
		  	}

		  }


		  /***************************
		  * fin de presentacion
		  */
		 , finPresentacion:function(){


		 	
		 	this.banderaPlay=false;
		 	this.banderPresentacion=false;


			$("#menu_lateral_1").show();
			$("#panel_principal_1").show();
			$("#mi_footer_paginacion").show();
			$("#contenedor_paginas").css({"width":"none"});


			if(this.intervaloPlay){
				clearInterval(this.intervaloPlay);
			}

			$("#grupos_btones_presentacion").hide();
			$("#sombra_contenedor_paginas").hide();

			$("body").css("background",this.fondoOriginal);
			$("#contenedor_paginas").css("background",this.fondoOriginal);

			$(".pagina").css("-webkit-transform","scale(1,1)");
			$(".pagina").css("transform","scale(1,1)");
		

		 }


		 /*******************
		 *
		 *  actualiza la transicion
		 **/
		 ,actualizaTransicionPagina:function(animacion)
		 {
		 	this.$paginaActual.data("animacion",animacion);

		 }


		 /*****************
		 *saber la transcion actual de 
		 **/
		 ,getTransicionActual:function(){

		 	return this.$paginaActual.data("animacion");
		 }


		 /***********************
		*actualiza el pane de transciones niti
		**/
		,actualizaPanelTransiciones:function(){
			var animacion=this.$paginaActual.data("animacion");

			$("#lista_transicion_presentacion>li div.th_activo").removeClass("th_activo");
			$("#lista_transicion_presentacion>li div.th[data-animacion='"+animacion+"']").addClass("th_activo");

		}


		/***********************
		* eliminar pagina actual
		* 
		**/
		,eliminarPaginaActual:function (listaElementos){

			//no puede quedar en cero 
			if(this.paginas.length>1)
			{
				var arrayIndice=Array();
				var idPagina= this.$paginaActual.attr("id");

	
				///busca los elemento a eleminar 
				for(var i=0; i< listaElementos.length; i++)
				{
					var $elemento= $(listaElementos[i]);

					
					if($elemento.data("idpagina")==idPagina)
						{
							arrayIndice.push(i);

						}

				}

				///elimina los elementos
				for(var i=0; i<arrayIndice.length ; i++)
				{

					listaElementos.splice(arrayIndice[i],1);
					
				}


				//nueva posicion
				//si la pagina actual es la extremo al final de 
				var nuevaPosicion= this.posicionActual;
				
				if(this.posicionActual== this.paginas.length-1)
					{
						nuevaPosicion--;
					}

				
				//removiendo la pagina actual
				this.paginas.splice(this.posicionActual,1);
				this.$paginaActual.remove();

				//this.$paginaActual= $(this.paginas[nuevaPosicion]);

				//actualiza parte graficas // el HTML
				this.seleccionarPagina(nuevaPosicion);



			}

		}


		/********************
		***
		* retorna un string de array de los Json 
		*/
		,getStringJsonPaginas:function(){

			var miString="[";

			for(var i=0;i<this.paginas.length; i++)
			{

				var $pagina= $(this.paginas[i]);

				miString+="{";
				miString+="'id':\\\""+$pagina.attr("id")+"\\\""
							+",'marco':\\\""+$pagina.data("marco")+"\\\""
							+",'fondo':\\\""+$pagina.data("fondo")+"\\\""
							+",'color':\\\""+$pagina.css("background-color")+"\\\""
							+",'animacion':\\\""+$pagina.data("animacion")+"\\\""
							
				miString+="},";

			}


			if(miString.length>1)
				miString=miString.substring(0,miString.length-1);

			miString+="]";

			return miString;
		}


		/*****************************
		* cargar las paginas
		*
		*****/
		,cargarPaginas: function(jsonPaginas){
			//solo en un caso
			jsonPaginas=eval(jsonPaginas);

			this.$paginaActual.remove();
			this.paginas=[];
			var mi_contadorId=0;
			

			for(var i=0; i<jsonPaginas.length ; i++)
			{
				var jPagina=jsonPaginas[i];

				var idInteroPagina= (jPagina.id+"").split("pagina");
				idInteroPagina= idInteroPagina[idInteroPagina.length-1];
				idInteroPagina= parseInt(idInteroPagina);

				if(mi_contadorId<idInteroPagina)
					idInteroPagina= mi_contadorId;

				var $nuevaPagina = $("<div class='pagina' id='"+jPagina.id +"' "
				 					+" data-marco='"+jPagina.marco+"' "
				 					+" data-fondo='"+jPagina.fondo+"'' "
				 					+" data-animacion='"+jPagina.animacion+"'> " 
				 					+" <div class='marco'></di></div>");

			
				//genera lso estiso 
				$nuevaPagina.css({
					'background-color': jPagina.color
					,'background-image': jPagina.fondo
				});

				$nuevaPagina.find(".marco").css({
					'background-image':jPagina.marco
				})


				
				this.paginas.push($nuevaPagina[0]);
				this.$elementoPadre.append($nuevaPagina);


				this.$paginaActual= $nuevaPagina;
				this.posicionActual= this.paginas.length-1;



			}//fin del for



			this.idPagina= idInteroPagina; 
			this.showPaginaActual();
			this.htmlPaginado();
		}




		};// fin obje
};// fin funcitoon


