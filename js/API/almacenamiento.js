//Almacenamiento
function crearUsuario(nombre,id){
	window.localStorage.setItem("nombre",nombre);
	window.localStorage.setItem("id",id);
}
function estaRegistrado(){
	var id = window.localStorage.getItem("id");
	if(id == undefined)
		return false;
	else
		return true;
}
//WEB SQL (SQLite)
function accesoBD(){
	var bd = window.openDatabase("hotel","1.0","Hotel Cenet", 200000);
	return bd;
}

function crearReservas(th,pr,ha,di){
	alert(0);
	accesoBD().transaction(function(tx){
		alert(1);
    	tx.executeSql('CREATE TABLE IF NOT EXISTS reservas (id unique,th,pr,ha,di)');
        tx.executeSql('INSERT INTO reservas (th,pr,ha,di) VALUES ("'+th+'","'+pr+'","'+ha+'","'+di+'")');
	},function(err){
    	alert("Error processing SQL: "+err.code);
	},function(){
    	navigator.notification.alert("Esperando a conexión para sincronizar",null,"Reserva Guardada","De acuerdo");
	});
}

function CrearHistorias(th,pr,ha,di)
{
	accesoBD.transaction(function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS Historial (id unique,th,pr,ha,di)');
        tx.executeSql('INSERT INTO Historial (th,pr,ha,di) VALUES ("'+th+'","'+pr+'","'+ha+'","'+di+'")');
		
	},function(err){
		alert("Error processing SQL: "+err.code);
	}
	,function(){
		    	navigator.notification.alert("Reserva realizada y guardada en historial!!",null,"Reserva Creada","De acuerdo");
	});
}

function LeerReservas()
{
	accesoBD.transaction(function(tx){
		tx.executeSql('Select * from reservas',[],function(tx2,res){
			var largo = res.rows.length;
			
			for(i=0;i<largo;i++)
			{
				var th = res.rows.item(i).th;
				var pr = res.rows.item(i).pr;
				var ha = res.rows.item(i).ha;
				var di = res.rows.item(i).di;
				
				enviarReservas(th,pr,ha,di);
				
				//tx2.executeSql('delete from reservas where id='+res.rows.item(i).id);
			}
			
			
			},function (err){
			alert('No se leyo correctamente');
			});

	},function(err){
		alert("Error processing SQL: "+err.code);
	}
	,function(){
		//Eliminar reservas
		accesoBD.transaction(function(tx){
			tx.executeSql('delete from reservas');


		
	},function(err){
		alert('No se eliminarón los registros');
	}
	,function(){
		x = null;
	});
		
	});
	
}

