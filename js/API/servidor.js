//servidor
function enviarDatos(nom,mail,tel,foto){
	$.ajax({
		type: "POST",
		url: "http://10.175.11.51/pgtest.php",
		data: "nom="+nom+"&mai="+mail+"&tel="+tel
	}).done(function(msg){
		if(msg==1){
			$('.title div').text('Subiendo Foto');
			subirFoto(foto);	
		}else{
			navigator.notification.alert("Hubo un error en el registro",null,"Error","Aceptar");
		}
	});
}

function enviarReservas(th,pr,ha,di){
	$.ajax({
		type: "POST",
		url: "http://10.175.11.51/pgtest.php",
		data: "t="+th+"&p="+pr+"&h="+ha+"&d="+di
	}).done(function(msg) {
		if(msg==1){
			navigator.notification.alert("Datos Enviados Correctamente",function(){
				var x = 0;
				//guardar en historial
			},"Reserva Realizada","Aceptar");	
		}else{
			navigator.notification.alert("Hubo un error en el registro",null,"Error","Aceptar");
		}
	});
}