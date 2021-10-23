function traerInformacion(){
	$.ajax({    
    url : 'http://140.238.182.7/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
	//-------------------------------------------------------
    success : function(respuesta) {
		console.log(respuesta);
		/* pintarRespuestaBikes(respuesta); */
		$("#resultado").empty();
        let miTabla = '<table>';
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
	        
			miTabla += '<td>'+ respuesta[i].email+ '</td>';	 
			miTabla += '<td>'+ respuesta[i].password+ '</td>'; 
	        miTabla += '<td>'+ respuesta[i].name+ '</td>'; 		
	       	miTabla += '<td>'+ respuesta[i].age+ '</td>'; 

			miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';			
            miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Borrar</button>';
			miTabla += '</tr>';
	
		}
        miTabla += '</table>';
	    $("#resultado").append(miTabla);    
       
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function guardarInformacion(){
	
	
	let misDatos = {
		email: $("#email").val(),
		name: $("#name").val(),
        password: $("#password").val(),
        age: $("#age").val() 
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
	'http://140.238.182.7/api/Client/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado.");
			$("#email").val("");
			$("#password").val("");
			$("#name").val("");
			$("#age").val("");

        	traerInformacion();	
			}
		}
	});
}

//=====================Actualizar=======================
function actualizarInformacion(){
    
	let misDatos = {
		email: $("#email").val(),
		password: $("#password").val(),
		name: $("#name").val(),
		 age: $("#age").val()
       
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://140.238.182.7/api/Client/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");

			$("#email").val("");
			$("#password").val("");
			$("#name").val("");
			$("#age").val("");
			
			$("#id").attr("readonly", false);
        	        traerInformacion();	
			}
		}
	});
}
	
function eliminarRegistro(id){
	$.ajax({    
        url : 'http://140.238.182.7/api/Client/'+id,
        type : 'DELETE',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Eliminado el registro No:"+id);
        	        traerInformacion();	
			}
		}
	});
}

function editarRegistro (id){
	$.ajax({    
    url : 'http://140.238.182.7/api/Client/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://140.238.182.7/api/Client/"+id);
        let miTabla = '<table>';
		
			$("#email").val(respuesta.email);
			$("#password").val(respuesta.password);
			$("#name").val(respuesta.name);			
			$("#age").val(respuesta.age);
			
            $("#id").attr("readonly", true);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

