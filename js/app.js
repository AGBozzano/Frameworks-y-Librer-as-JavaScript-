
function CambiarColor(){

	var time1 = Math.round(Math.random() * (600 - 100) + 100);
	var time2 = Math.round(Math.random() * (600 - 100) + 100);

	$(".main-titulo").animate({'color':'white'}, time1, function(){
		$(".main-titulo").animate({'color':'yellow'}, time2, function(){
			CambiarColor();
		});
  	});
}
  

function ReiniciarJuego(verifica) {

  clearTimeout(temporizador);
  $(".btn-reinicio").text("Iniciar");
 
  if (verifica) {

    $(".panel-tablero").show("slow");
    $(".panel-score").animate({
        width: "-=50"
      }, 1000
    );
    verifica=false;
  };
}

var tiempoAtras;

var min;

var seg;

var temporizador;

var verifica = false;

function FinalizarJuego() {

  clearTimeout(temporizador);
  $(".panel-tablero").hide("slow");
  $(".panel-score").animate({
      width: "+=%50"
    }, 1000
  );
  verifica=true;
}


$(".btn-reinicio").on("click", function(){

  var nombre =$(".btn-reinicio").text();
  if (nombre=="Iniciar") {
    $(".btn-reinicio").text("Reiniciar");
    clearTimeout(temporizador);
  }else{
    ReiniciarJuego(verifica);
  }

  min =0;
  seg =0;

  $(".elemento").remove('img');
  $('#score-text').text("0");
  $('#movimientos-text').text("0");

  updateReloj();

  CaidaDeDulces();

});

$(function() {
	CambiarColor(".main-titulo");
});
