var strinImagenes=
"[]";




function actualizarImagenesExt(stringLista){

	setTimeout(function(){
		$("#panel_imagenes_contenido_table1").html(generarHmtlImagenes(2,eval(stringLista)));
			actualizaDropMenu();

	},500);
	

}

actualizarImagenesExt(strinImagenes);































