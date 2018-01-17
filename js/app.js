
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
	candyDrag.position.left = Math.min(140, candyDrag.position.left);
	candyDrag.position.right = Math.min(140, candyDrag.position.right);
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
		checkBoard();
		// De esta manera, impedimos movimientos equivocados
		if ($('img.delete').length === 0) {
			// Caramelo Arrastrar y caramelo Drop se les da su src inicial
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);
}



function CambiarColor(){

	var time1 = Math.round(Math.random() * (600 - 100) + 1000);
	var time2 = Math.round(Math.random() * (600 - 100) + 100);

	$(".main-titulo").animate({'color':'white'}, time1, function(){
		$(".main-titulo").animate({'color':'yellow'}, time2, function(){
			CambiarColor();
		});
  	});
}
  
function FinalizarJuego() {
  $(".panel-tablero").hide("slow",function(){
  	$(".panel-score").animate({width: "100%"}, 1000);
  });
}


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
