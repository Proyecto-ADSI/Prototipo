const URL = 'http://localhost:8081';

ObtenerUsuario = (Id_Usuario, Modal) => {

    $.ajax({
        url: `${URL}/Usuarios/${Id_Usuario}`,
        type: 'get',
        datatype: 'json',
        success: function(datos){


            if(Modal == 1){

                CargarDatosModalDetalles(datos);

            }else if(Modal == 2){

                CargarDatosModalEditar(datos);
            }else if(Modal == 3){

                CargarDatosModalEliminar(datos);
            }
            
        },
        error: function(error){
                console.log(error);
        }
    })
}

$(function () {

    DataTableUsuarios =  $('#UsuariosDataTable').DataTable({
        ajax: {
            url: `${URL}/Usuarios`,
            error: function(error){
                console.log("Eror al listar usuarios " + error);
            },
            // success: function(res){
            //     console.log(res)
            // }
        },
        // data: datos,
        aoColumns: [
            { mData: 'Id_Usuario', sClass: "MyStyle_Id_Principal_Column"},
            { mData: 'Usuario'},
            { mData: 'Nombre'},
            { mData: 'Apellidos' },
            { mData: 'Rol'},
            { mData: 'Correo'},
            { mData: 'Celular'},
            { defaultContent: 
                    `
                    <input type="checkbox" id="switch_cliente" class="js-switch" />
                    
                    <button id="btnDetalles" class="btn btn-warning">
                        <i class="fa fa-eye"></i>
                    </button>

                    <button id="btnEditar" class="btn btn-info">
                        <i class="fa fa-pencil"></i>
                    </button>
                    
                    <button id="btnEliminar" class="btn btn-danger">
                        <i class="fa fa-close"></i> 
                    </button>
            `}
                
        ],
        
        language: {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        },
        createdRow: function (row, data, index) {


            let Estado_Usuario = parseInt(data.Estado_Usuario);

            let switchElem = Array.prototype.slice.call($(row).find('.js-switch'));

            switchElem.forEach(function (html) {

                let s = new Switchery(html, {
                    color: '#26c6da',
                    secondaryColor: '#f62d51',
                    size: 'small'
                });

                if (Estado_Usuario == 0) {
                    s.setPosition(false, true);

                } else if (Estado_Usuario == 1) {
                    s.setPosition(true, true);
                }
            });

        }
    });
});

// Cargar Modal
// 1 -> Detalles
// 2 -> Editar

// Detalles usuario y empleado - abrir modal y cargar datos
$(document).on("click","#btnDetalles", function(){

    fila = $(this).closest("tr");

    Id_Usuario = parseInt(fila.find('td:eq(0)').text());

    ObtenerUsuario(Id_Usuario,1);

});



// Editar usuarios y empleado - abrir modal y cargar datos
$(document).on("click","#btnEditar", function(){

    fila = $(this).closest("tr");

    Id_Usuario = parseInt(fila.find('td:eq(0)').text());

    ObtenerUsuario(Id_Usuario,2);

});

// Cambiar estado -> Inhabilitar/Habilitar

$(document).on("click", ".switchery ", function () {

    let fila = $(this).closest("tr");
    let switchElem = fila.find('.js-switch')[0];
    let Id_Usuario_Estado = parseInt(fila.find('td:eq(0)').text());

    

    // Cambiar Estado Usuario
    let Estado;
    if(switchElem.checked){

        Estado = 1;

    }else{
        Estado = 0;
    } 

    $.ajax({
        url: `${URL}/Usuarios/CambiarEstado/${Id_Usuario_Estado}/${Estado}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) { 
        },
        error: function (error) {
            console.log(error);
        }
    });
});


// Eliminar usuarios y empleado
$(document).on("click","#btnEliminar", function(){

    let fila = $(this).closest("tr");

    let Id_Usuario = parseInt(fila.find('td:eq(0)').text());

    Eliminarusuario(Id_Usuario);
});

