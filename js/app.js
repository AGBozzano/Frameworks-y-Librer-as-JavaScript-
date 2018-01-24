
function InsertarDulces(){

	var top = 7;

	$("[class^='col']").each(function(){
		var candys= $(this).children().length;
		var agregar= top-candys;
		for (var i = 0; i < agregar; i++){
			var tipoDulce= Math.floor((Math.random()*4)+1);
			$(this).prepend('<img src="image/' + tipoDulce+ '.png" class="elemento"></img>');
		}
	});
	addCandyEvents();

}

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

function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

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


	setTimeout(function () {
		validar();
		// De esta manera, impedimos movimientos equivocados
		if ($('img.delete').length === 0) {
			// Caramelo Arrastrar y caramelo Drop se les da su src inicial
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			actualizarMov();
			actualizarPun();
			eliminarDulces();
		}
	}, 500);
}

//Contabiliza un movimiento
function actualizarMov(){
	var MovActuales= Number($('#movimientos-text').text());
	var total = MovActuales + 1;
	$('#movimientos-text').text(result);
}
function actualizarPun(){
  var p_Actual = Number($('#score-text').text());
  var p_Nuevos = $('img.delete').length * 5;
  var resultado = p_Actual + p_Nuevos;
  $('#score-text').text(resultados);
}
function eliminarDulces(){
	disableCandyEvents();
	$(".delete").fadeTo(300,0).fadeTo(300,1).fadeTo(300,0).fadeTo(300,1).hide(300);
	$(".delete").remove();
}
function validar(){
	validarCol();
	validarRow();
}
function validarCol(){

	for(var col=1; col < 8; col++){
		for(var row=0; row < 5; row++){
			var Dulce1=$(".col-"+col).children('img')[row].src;
			var Dulce2=$(".col-"+col).children('img')[row+1].src;
			var Dulce3=$(".col-"+col).children('img')[row+2].src;

			if(Dulce1 == Dulce2 && Dulce1 == Dulce3){
				
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
  });
}

//Click al boton de inicio/reinicio...
$(".btn-reinicio").on("click", function(){

  var nombre =$(".btn-reinicio").text();
  if (nombre=="Iniciar") {
    $(".btn-reinicio").text("Reiniciar");

    IniciarConteo();
	InsertarDulces();
  }else{
    location.reload(true)
  }
});

$(function() {
	CambiarColor(".main-titulo");
});
