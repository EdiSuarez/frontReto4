function traerInformacion(){
	$.ajax({    
    url : 'http://140.238.182.7/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		/* pintarRespuesta(respuesta); */
		$("#resultado").empty();
        let miTabla = '<table>';
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';	

	        miTabla += '<td>'+ respuesta[i].name+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].description+ '</td>'; 		
            miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';			
            miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Borrar</button>';			
			miTabla += '</tr>';
	
		}
        miTabla += '</table>';
	    $("#resultado").append(miTabla);    
      /*   pintarSelect(0); */
       
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
		
    }
});
}

function guardarInformacion(){
	let misDatos = {
	    name: $("#name").val(),
		description: $("#description").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
	'http://140.238.182.7/api/Category/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado.");
			
			$("#name").val("");
			$("#description").val("");
		
        	traerInformacion();	
			}
		}
	});
}


function editarRegistro (id){
	$.ajax({    
    url : 'http://140.238.182.7/api/Category/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta + "url" + "http://140.238.182.7/api/Category/"+id);
        let miTabla = '<table>';

			$("#name").val(respuesta.name);
			$("#description").val(respuesta.description);
			
        	$("#id").attr("readonly", true); 
		
	},
    error : function(xhr, status) {
        alert('Ha sucedido un problema:'+ status + json);
    }
});
}
//=======================================================================
function pintarRespuesta(respuesta){
	$("#resultado").empty();
    letmiTabla="<table>";

    for(i=0;i<respuesta.length;i++){
       miTabla+="<tr>";
		miTabla += '<td>'+ respuesta[i].id+ '</td>'; 	
       miTabla+="<td>"+respuesta[i].name+"</td>";
       miTabla+="<td>"+respuesta[i].description+"</td>";
	    miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';			
		miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Borrar</button>';	
		

       miTabla+="</tr>";
    }
   miTabla+="</table>";
    $("#resultado").append(myTable);

}


//=========================================================================	
function actualizarInformacion(){
	let misDatos = {
	   name: $("#name").val(),
	   description: $("#description").val()
    	
	};

	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
	'http://140.238.182.7/api/Category/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Actualizado.");  
			$("#name").val("");
			$("#description").val("");
			
            $("#id").attr("readonly", false); 
        	traerInformacion();	 
			
			}
		}
	});
}

function eliminarRegistro (id){


	$.ajax({    
		url : 'http://140.238.182.7/api/Category/'+id,	
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Registro Borrado."+ id);
        		traerInformacion();	
			}
		}
	});
}
	
	
	