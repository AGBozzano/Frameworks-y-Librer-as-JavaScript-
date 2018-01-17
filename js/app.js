
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
