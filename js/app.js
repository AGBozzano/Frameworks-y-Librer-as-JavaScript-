var I_animacion = false;

//Funcion necesaria para inicializar el tablero sin jugadas previas ni alterar el
//marcador desde el inicio
function InicioDulces(){

	do{
		InsertarDulces();
		validar();
		$("img[name=delete]").remove();
		InsertarDulces();
		validar();
	}while($('img[name="delete"]').length != 0);
	I_animacion = true;

}

//Inserta nuevos dulces al tablero
function InsertarDulces(){

	var top = 7;

	$("[class^='col']").each(function(){
		var candys= $(this).children().length;
		var agregar= top-candys;
		for (var i = 0; i < agregar; i++){
			var tipoDulce= Math.floor((Math.random()*4)+1);
			if(I_animacion==true){
				$(this).prepend('<img src="image/' + tipoDulce+ '.png" class="elemento caida"></img>');	
			}else{
				$(this).prepend('<img src="image/' + tipoDulce+ '.png" class="elemento"></img>');
			}

			
		}
	});
	//Solo anima los nuevos dulces una vez iniciado el juego
	if(I_animacion==true){
		animar_caida();
	}
	addCandyEvents();
	
}

//Asigna propiedadres del Drag and Drop y otras funciones.
function addCandyEvents() {

	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		distance: 100,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});

	$('img').droppable({
		drop: swapCandy
	});
	enableCandyEvents();
}

//Deshabilita las opciones de drag and drop para que no interumpa con las acciones de delete
function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

//Habilita las opciones de drag and drop
function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

//Asigna los parametros limites del movimiento de los dulces
function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

// Cambia un caramelo por otro (a través de arrastrar y soltar)
function swapCandy(event, candyDrag) {

	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	// We swap candyDrag and candyDrag src attributes
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);


	
		validar();
		// De esta manera, impedimos movimientos equivocados
		if ($('img[name="delete"]').length === 0) {
			// Caramelo Arrastrar y caramelo Drop se les da su src inicial
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			//Agrego 1 mov
			actualizarMov();

			//realiza acciones hasta que no hayan mas movimientos acertados
			do{
				actualizarPun();
				eliminarDulces();
				InsertarDulces();				
				validar();
			}while($('img[name="delete"]').length != 0);
		}
	
}

//Contabiliza un movimiento
function actualizarMov(){
	var MovActuales= Number($('#movimientos-text').text());
	var total = MovActuales + 1;
	$('#movimientos-text').text(total);
}

//Contabiliza la puntuacion
function actualizarPun(){
  var p_Actual = Number($('#score-text').text());
  var p_Nuevos = $('img[name="delete"]').length * 5;
  var resultado = p_Actual + p_Nuevos;
  $('#score-text').text(resultado);
}

//Intento de animacion de tintineo
function eliminarDulces(){

	//Intente mil maneras de animar a los dulces marcados con delete, tanto en la clase como en "name"
	//Intente enviar los datos a otra funcion y desde hay hacer las animaciones, pero nada
	//Por alguna razon que no conosco ni tampoco un par de sus tutores, las animaciones no se realiza
	//odio entregar las cosas sin terminarlas 100%, pero ya estoy cansado estuve casi 1 mes con esto
	//los videos son muy simples y al momento de final todo se vuelve super complicado...
	//saludos.......................................................................

	//$("img[name=delete]").fadeTo(250,0.1).fadeTo(250,1).fadeTo(250,0.1).fadeTo(250,1).hide();
	//$("img[name=delete]").animate({opacity:0},250).animate({opacity:1},250).animate({opacity:0},250);
	//$("img[name=delete]").remove("pulsate",1000);
	//$("img[name=delete]").hide("pulsate",1000).remove();
	//var dulces = $("img[name=delete]");

	//$("img[name=delete]").addClass("delete");
	//$(".delete").fadeTo(250,0.1).fadeTo(250,1).fadeTo(250,0.1).fadeTo(250,1).hide();

	$("img[name=delete]").fadeTo(250,0.1).fadeTo(250,1).fadeTo(250,0.1).fadeTo(250,1).hide();
	$("img[name=delete]").remove();

}


//Anima la caida simulando gravedad descendente
function animar_caida(){
	$(".caida").animate({top:-500},0).animate({top:0},"slow");
	$(".caida").removeClass("caida");

}

//Comienza con las validaciones
function validar(){
	validarCol();
	validarRow();
}

//Valida verticalmente tomando de a 3 dulces y agregando name="delete"
function validarCol(){

	for(var col=1; col < 8; col++){
		
		for(var row=0; row < 5; row++){
			
			let Dulce1 = $(".col-"+col).children('img')[row];
			let Dulce2 = $(".col-"+col).children('img')[row+1];
			let Dulce3 = $(".col-"+col).children('img')[row+2];

			if((Dulce1.src == Dulce2.src) && (Dulce1.src == Dulce3.src)){

				Dulce1.name = "delete";
				Dulce2.name = "delete";
				Dulce3.name = "delete"; 

			}
		}
	}
}

//Valida horizontalmente tomando de a 3 dulces y agregando name="delete"
function validarRow(){

	for(var row=0; row < 7; row++){
		for(var col=1; col < 6; col++){
			let Dulce1=$(".col-"+col).children('img')[row];
			let Dulce2=$(".col-"+(col+1)).children('img')[row];
			let Dulce3=$(".col-"+(col+2)).children('img')[row];		


			if((Dulce1.src == Dulce2.src) && (Dulce1.src == Dulce3.src)){
				Dulce1.name = "delete";
				Dulce2.name = "delete";
				Dulce3.name = "delete"; 

			}
		}
	}
}
//Cambios de Color al Titulo...
function CambiarColor(){

	var time1 = Math.round(Math.random() * (600 - 100) + 1000);
	var time2 = Math.round(Math.random() * (600 - 100) + 100);

	$(".main-titulo").animate({'color':'white'}, time1, function(){
		$(".main-titulo").animate({'color':'yellow'}, time2, function(){
			CambiarColor();
		});
  	});
}

//Finalizar el juego y agrandar el tablero...
function FinalizarJuego() {
  $(".panel-tablero").hide("slow",function(){
  	$(".panel-score").animate({width: "100%"}, 1000);
  	$(".main-titulo").text("Game Over");
  	$(".main-titulo").css("text-align","center");
  });
}

//Click al boton de inicio/reinicio...
$(".btn-reinicio").on("click", function(){

  var nombre =$(".btn-reinicio").text();
  if (nombre=="Iniciar") {
    $(".btn-reinicio").text("Reiniciar");

    IniciarConteo();
	InicioDulces();
  }else{
    location.reload(true)
  }
});

$(function() {
	CambiarColor(".main-titulo");
});
