var imagen="";


function previewFile() {
  var preview = "hola";
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
  imagen=reader.result;
    preview.src = reader.result;
  }

  if (file) {
  reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

$(document).ready(function () {
cargar();

//Fin Base de Datos
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  }); 

//funciones consultas
function llenarcombofrm(){
  select = document.getElementById('categoria');
    var leer=JSON.parse(localStorage.getItem("categoriass"));
    for (var i in leer){
        var opt = document.createElement('option');
        opt.value = leer[i].categoria;
        opt.innerHTML = leer[i].categoria;
        select.appendChild(opt);
    }
}

function consultaservicio2(categoria,nombre){
    var leer=JSON.parse(localStorage.getItem("sservicios"));
    var contador=0;
    $("#layoutservicios").empty();
    for (var i in leer){

      if(nombre!="" && categoria!=""){
         if(leer[i].categoria == categoria && leer[i].nombre == nombre){
            var string="";
            var tabla =document.getElementById("layoutservicios");
            string='<center><IMG SRC="'+leer[i].imagen+'" class="img-responsive" width="200px"><h3>'+leer[i].nombre+'</h3><button ids="'+leer[i].idss+'" class="btn btn-primary leermas">Leer Mas</button> <button id="'+leer[i].idss+'" class="btn btn-default modificar">Modificar</button><br><br><button id="'+leer[i].idss+'" class="btn btn-danger eliminar">Eliminar</button></center>';
            var div=document.createElement("div");
            div.className = "thumbnail";
            div.innerHTML =string;
            tabla.innerHTML=div;
            contador++;
            }
     
      }else if(nombre!="" && categoria==""){
        if(leer[i].nombre == nombre ){
          var string="";
          var tabla =document.getElementById("layoutservicios");
          string='<center><IMG SRC="'+leer[i].imagen+'" class="img-responsive" width="200px"><h3>'+leer[i].nombre+'</h3><button ids="'+leer[i].idss+'" class="btn btn-primary leermas">Leer Mas</button> <button id="'+leer[i].idss+'" class="btn btn-default modificar">Modificar</button><br><br><button id="'+leer[i].idss+'" class="btn btn-danger eliminar">Eliminar</button></center>';
          var div=document.createElement("div");
          div.className = "thumbnail";
          div.innerHTML =string;
          tabla.appendChild(div);
          contador++;
        }
      }else if(nombre=="" && categoria!=""){

        if(leer[i].categoria == categoria ){
          var string="";
          var tabla =document.getElementById("layoutservicios");
          string='<center><IMG SRC="'+leer[i].imagen+'" class="img-responsive" width="200px"><h3>'+leer[i].nombre+'</h3><button ids="'+leer[i].idss+'" class="btn btn-primary leermas">Leer Mas</button> <button id="'+leer[i].idss+'" class="btn btn-default modificar">Modificar</button><br><br><button id="'+leer[i].idss+'" class="btn btn-danger eliminar">Eliminar</button></center>';
          var div=document.createElement("div");
          div.className = "thumbnail";
          div.innerHTML =string;
          tabla.appendChild(div);
          contador++;
        }
      }else if(nombre =="" && categoria==""){
          var string="";
          var tabla =document.getElementById("layoutservicios");
          string='<center><IMG SRC="'+leer[i].imagen+'" class="img-responsive" width="200px"><h3>'+leer[i].nombre+'</h3><button ids="'+leer[i].idss+'" class="btn btn-primary leermas">Leer Mas</button> <button id="'+leer[i].idss+'" class="btn btn-default modificar">Modificar</button><br><br><button id="'+leer[i].idss+'" class="btn btn-danger eliminar">Eliminar</button></center>';
          var div=document.createElement("div");
          div.className = "thumbnail";
          div.innerHTML =string;
          tabla.appendChild(div);
          contador++;
      }
    }
        if(contador=0){
              var tabla =document.getElementById("layoutservicios");
              string='<center>No se ha encontrado el servicio a buscar</center>';
              tabla.innerHTML=string;  
        }
}

function consultaservicio(){
    var leer=JSON.parse(localStorage.getItem("sservicios"));
    for (var i in leer){
      var string="";
      var tabla =document.getElementById("layoutservicios");
      string='<center><IMG SRC="'+leer[i].imagen+'" class="img-responsive" width="200px"><h3>'+leer[i].nombre+'</h3><button id="'+leer[i].idss+'" class="btn btn-primary leermas">Leer Mas</button> <button id="'+leer[i].idss+'" class="btn btn-default modificar">Modificar</button><br><br><button id="'+leer[i].idss+'" class="btn btn-danger eliminar">Eliminar</button></center>';
      var div=document.createElement("div");
      div.className = "thumbnail";
      div.innerHTML =string;
      tabla.appendChild(div);
    }
}
//FIN Consultas


// Proceso Botones
$(document).on('click','.eliminar',function(e){
  if(confirm('¿Estas seguro de eliminar este servicio?'))
  {
    //alert("lo has logrado lo has visitao"+e.target.id);
            var contador=0;
            var leer=JSON.parse(localStorage.getItem("sservicios"));
            for(var i in leer) {
              if(leer[i].idss === e.target.id){
                leer.splice([i],1);
               }
            }
                localStorage.setItem("sservicios", JSON.stringify(leer));
                alert("Servicio Eliminado");
                $(".home").click(); 
                $("#cerrarmodal").click();

  }
  else
  {
    return false;
  }

});

  $(document).on('click','.modificar',function(e){
     $.ajax({
            url: 'paginas/adds.html',
            type: "POST",
             beforeSend: function () {
                $("#modal").click();
                },
            success: function (data) {
              $("#layout").html(data);
              $("#head").html("Modificar Servicio");
              $("#atras").removeClass("adds");
              $("#atras").addClass("home");
              $("#sig").removeClass("adds");
              $("#sig").removeClass("info");
              $("#sig").addClass("acercade");
              $("#btnGuardarServicio").css({"display":"none"});
              llenarcombofrm();
              var leer=JSON.parse(localStorage.getItem("sservicios"));
              for(var i in leer) {
                if(leer[i].idss === e.target.id){
                    $("#ids").val(e.target.id);
                    $("#nombre").val(leer[i].nombre);
                    $("#descripcion").val(leer[i].descripcion);
                    $("#telefono").val(leer[i].telefono);
                    $("#email").val(leer[i].email);
                    $("#domicilio").val(leer[i].domicilio);
                    $("#categoria").val(leer[i].categoria);
                    $("#nota").val(leer[i].nota);
                  }
              }

              $("#cerrarmodal").click();
            },
            error: function(data) {
                alert("ERROR")
            }
        })  
              
  });

 $(document).on('click','.leermas',function(e){
     $.ajax({
            url: 'paginas/mostrar.html',
            type: "POST",
             beforeSend: function () {
                $("#modal").click();
                },
            success: function (data) {
              $("#layout").html(data);
              $("#head").html("Leer Mas");
              var leer=JSON.parse(localStorage.getItem("sservicios"));
                                    console.log("hola");

              for(var i in leer) {
                                                    console.log("hola2");

                if(leer[i].idss === e.target.id){
                      console.log("holafor");
                      $("#titulo").html('<center><h1>'+leer[i].nombre+'</h1></center><hr>');
                      $("#img").html('<center><IMG SRC="'+leer[i].imagen+'" class="img-responsive" width="200px"></center><hr>');
                      $("#cuerpo").html('<center>'+leer[i].descripcion+'</center><hr>');
                      $("#tel").html('<center>Telefono: '+leer[i].telefono+'</center><hr>');
                      $("#emil").html('<center>E-mail: '+leer[i].email+'</center><hr>');
                      $("#domi").html('<center>Domicilio: '+leer[i].domicilio+'</center><hr>');
                      $("#cate").html('<center>Categoria: '+leer[i].categoria+'</center><hr>');
                      $("#note").html('<center>Nota: '+leer[i].nota+'</center><br><br><br>');
                  }
              }

              $("#cerrarmodal").click();
            },
            error: function(data) {
                alert("ERROR")
            }
        })  
              
  });
// FIN bOTONES

//Funcionalidad
  $(document).on('click','.buscar',function(){
        consultaservicio2($("#categoria").val(),$("#buscar").val());
    });

    $(document).on('click','#btnGuardarCategoria',function(){
            var categoria=[{"idss":$("#txtidCategoria").val(),
                           "categoria":$("#txtCategoria").val()
                        }];

            if (localStorage.getItem("categoriass") === null) {
                localStorage.setItem("categoriass", JSON.stringify(categoria));
                alert("He Creado una base de datos local categoria, se ha agregado una nueva categoria.");
                              cargar();

           }else{
                var contador=0;
                var leer=JSON.parse(localStorage.getItem("categoriass"));
                //console.log(leer);
                //Verifico existencia
                for(var i in leer) {
                  if(leer[i].idss === $("#txtidCategoria").val()){
                    contador++;
                   }
                }
                //Valido entrada
                if(contador>=1){
                    alert("Este ID ya Existe, agrega otro ID");
                    return;
                }else{
                    leer.push(categoria[0]);
                    localStorage.setItem("categoriass", JSON.stringify(leer));
                    alert("Categoria agregada");
                    cargar();
                }
            }
    });

    $(document).on('click','#btnGuardarServicio',function(){
        var servicio=[{"idss":$("#ids").val(),"nombre":$("#nombre").val(),
                "imagen":imagen,
                "descripcion":$("#descripcion").val(),
                "telefono":$("#telefono").val(),
                "email":$("#email").val(),
                "domicilio":$("#domicilio").val(),
                "categoria":$("#categoria").val(),
                "nota":$("#nota").val()}];
          if (localStorage.getItem("categoriass") === null) {
              alert("Agrega por lo menos una Categoria antes de agregar un servicio");
              return;
          }
          if ( $("#ids").val()=="" || $("#nombre").val()=="" || imagen=="" || $("#descripcion").val()=="" || $("#telefono").val()=="" || $("#email").val()=="" || $("#domicilio").val()=="" || $("#categoria").val()=="" || $("#nota").val()==""){
            alert("Ingresa todos los datos");
            return;
          }
        if (localStorage.getItem("sservicios") === null) {
          localStorage.setItem("sservicios", JSON.stringify(servicio));
          alert("He Creado una base de datos local de servicio, se ha agregado un nuevo servicio.");
                           cargar();

        }else{
            var contador=0;
            var leer=JSON.parse(localStorage.getItem("sservicios"));
            //console.log(leer);
            //Verifico existencia
            for(var i in leer) {
              if(leer[i].idss === $("#ids").val()){
                contador++;
               }
            }
            //Valido entrada
            if(contador>=1){
                alert("Este ID ya Existe, agrega otro ID");
                return;
            }else{
                leer.push(servicio[0]);
                console.log(leer);
                localStorage.setItem("sservicios", JSON.stringify(leer));
                alert("Elemento nuevo agregado");
                cargar();
                imagen="";
            }

        }        

    });

    $(document).on('click','#btnGuardarModificacion',function(){

          if ( $("#ids").val()=="" || $("#nombre").val()==""  || $("#descripcion").val()=="" || $("#telefono").val()=="" || $("#email").val()=="" || $("#domicilio").val()=="" || $("#categoria").val()=="" || $("#nota").val()==""){
            alert("Ingresa todos los datos");
            return;
          }
        if (localStorage.getItem("sservicios") === null) {
          localStorage.setItem("sservicios", JSON.stringify(servicio));
          alert("He Creado una base de datos local de servicio, se ha agregado un nuevo servicio.");
        }else{
            var contador=0;
            var leer=JSON.parse(localStorage.getItem("sservicios"));
            for(var i in leer) {
              if(leer[i].idss === $("#ids").val()){
                    leer[i].nombre=$("#nombre").val();
                    if(imagen!=""){
                    leer[i].imagen=imagen;
                    }
                    leer[i].descripcion=$("#descripcion").val();
                    leer[i].telefono=$("#telefono").val();
                    leer[i].email=$("#email").val();
                    leer[i].domicilio=$("#domicilio").val();
                    leer[i].categoria=$("#categoria").val();
                    leer[i].nota=$("#nota").val();

               }
            }
                localStorage.setItem("sservicios", JSON.stringify(leer));
                imagen="";
                alert("Servicio Modificado Correctamente");
                cargar();

        }        

    });
//Fin Funcionalidad
//Inicio Navegacion
    $(document).on('click','.home',function(){
      $.ajax({
            url: 'paginas/principal.html',
            type: "POST",
             beforeSend: function () {
                $("#modal").click();
                },
            success: function (data) {
              $("#layout").html(data);
              $("#head").html("Catalogo de Servicios");
              $("#sig").removeClass("acercade");
              $("#sig").addClass("adds");
              $(".hamburger").css({"display":"block"});
              $("#footer").css({"display":"block"});
              llenarcombofrm();
              consultaservicio();   
              $("#cerrarmodal").click();
            },
            error: function(data) {
                alert("ERROR")
            }
        })  
    });



    $(document).on('click','.adds',function(){
      $.ajax({
            url: 'paginas/adds.html',
            type: "POST",
             beforeSend: function () {
                $("#modal").click();
                },
            success: function (data) {
              $("#layout").html(data);
              $("#head").html("+ADD Servicio");
              $("#atras").removeClass("adds");
              $("#atras").addClass("home");
              $("#sig").removeClass("adds");
              $("#sig").removeClass("info");
              $("#sig").addClass("acercade");
              $("#btnGuardarModificacion").css({"display":"none"});
              llenarcombofrm();
              $("#cerrarmodal").click();
            },
            error: function(data) {
                alert("ERROR")
            }
        })  
    });

$(document).on('click','.acercade',function(){
      $.ajax({
            url: 'paginas/asercade.html',
            type: "POST",
             beforeSend: function () {
                $("#modal").click();
                },
            success: function (data) {
              $("#layout").html(data);
              $("#head").html("Acerca de");
              $("#atras").removeClass("home");
              $("#atras").addClass("adds")
              $("#sig").removeClass("acercade");
              $("#sig").addClass("info");
              $("#cerrarmodal").click();
            },
            error: function(data) {
                alert("ERROR")
            }
        })  
    });



  $(document).on('click','.addsc',function(){
      $.ajax({
            url: 'paginas/addsc.html',
            type: "POST",
             beforeSend: function () {
                $("#modal").click();
                },
            success: function (data) {
              $("#layout").html(data);
              $("#head").html("+ADD Categoria");
              $("#cerrarmodal").click();

            },
            error: function(data) {
                alert("ERROR")
            }
        })  
    });

    $(document).on('click','.info',function(){
        $.ajax({
            url: 'paginas/info.html',
            type: "POST",
             beforeSend: function () {
                $("#modal").click();
                },
            success: function (data) {
              $("#layout").html(data);
              $("#head").html("Informacion");
              $(".hamburger").css({"display":"none"});
              $("#footer").css({"display":"none"});
              $("#cerrarmodal").click();
            },
            error: function(data) {
                alert("ERROR")
            }
        })  
    });


    function cargar(){
     $.ajax({
            url: 'paginas/principal.html',
            type: "POST",
             beforeSend: function () {
                $("#modal").click();
                },
            success: function (data) {
              $("#layout").html(data);
              $("#head").html("Catalogo de Servicios");
              $("#sig").removeClass("acercade");
              $("#sig").addClass("adds");
              llenarcombofrm();
              consultaservicio();
              $("#cerrarmodal").click();
            },
            error: function(data) {
                alert("ERROR")
            }
        }) 

} 
//Fin Navegacion






});