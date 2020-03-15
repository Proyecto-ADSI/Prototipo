let EditarSexo = () => {

    let datos = {
        Id_Sexo: parseInt(Id_Sexos),
        Nombre: $("#TxtSexoEdit").val(),
    };
    $.ajax({
        url: `${URL}/Sexo`,
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(datos),
        processData: false,
    }).done(respuesta => {
        if(respuesta.data.ok){
            swal("Excelente", 
            "Sexo modificado correctamente", "success");
            $("#ModificarSexo").modal("hide");
            ListarSexo();
        }else{
            swal("Error al modificar", 
            "Ha ocurrido un error al modificar, intenta de nuevo", 
            "error")
        }
    }).fail(error => {
        console.log(error);
    });
}

$("#FormSexoEdit").validate({
    submitHandler: function(){
            EditarSexo();
            console.clear();
    },
    rules:{
        SexoEdit: {
            required:true,
            SoloLetras:true,
            minlength:2,
            maxlength:45
        }
    },
    errorClass: "form-control-feedback",
    errorElement: "div",
    highlight: function (element) {
        $(element).parents(".form-group").addClass("has-danger").removeClass("has-success");
        $(element).addClass("form-control-danger").removeClass("form-control-success");
    },
    unhighlight: function (element) {

        $(element).parents(".form-group").addClass("has-success").removeClass("has-danger");
        $(element).addClass("form-control-success").removeClass("form-control-danger");
    },
    errorPlacement: function (error, element) {
            error.insertAfter(element.parent(".input-group"));
        
    }
    
});
