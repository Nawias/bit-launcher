const remote = require('electron').remote;
const exec = require('child_process').exec;
const properties = require('properties');
const fs = require('fs');

var saveLogin = function(){
    properties.parse("./launcher/config.properties",{path:true}, function(err, obj) {
        if(err) return console.error(err);
        let login = $("#login").val();
        
        obj.login = login;
        console.log(obj);

        fs.writeFileSync("./launcher/config.properties", properties.stringify(obj));
    })
}

var play = function() {
    if(process.platform === "win32")
        process.env.APPDATA = "./data";
    
    exec('java -jar mc_fast_skinfix.jar',{cwd: "launcher"} ,function(err, data) {  
        console.log(err)
        console.log(data.toString());       
    }).unref() /*
    var window = remote.getCurrentWindow();
    window.close();  */
}

var easteregg = function() {
  
  $("<img/>").on('load', function(){ 
    $("#paralax img").fadeOut(500,function(){$(this).remove();});
    $(this).appendTo("#paralax").fadeIn(500);
  }).hide().attr("src","img/suprise.jpg");

}

$("#closeButton").click(()=>{
    var window = remote.getCurrentWindow();
    window.close();
});
$("#edition").dblclick(()=>{
  easteregg();
});
$("#playButton").click(()=>{
    saveLogin();
    play(); 
})

$().ready(()=>{
  $("title").append(process.env.npm_package_version);

  properties.parse("./launcher/config.properties",{path:true}, function(err, obj) {
    $("#login").val(obj.login);
  });

  $.ajax({
    url: "http://moecukier.ml:2001/launcher/json",
    success:(a)=>{
      if(a!=""){
        let mcapi = JSON.parse(a);

        $("<img/>").on('load', function(){
          $("#paralax").append($(this)).fadeIn(500);
          $("#onlineList").fadeIn(500);
        }).attr("src",mcapi.image);

        //$("#paralax").attr("style","background:url("+mcapi.image+");background-size:cover;background-position:center center;");

        $("#edition").html("Edition "+mcapi.edition);
        if(mcapi.players.length){
          mcapi.players.forEach(player => {
            $("#onlineList").append(
              $("<div>").addClass("player").append(
                $("<img>").attr("src","http://moecukier.ml:2000/images/new/"+player+".png"),
                $("<div>").html(player)
              )
            );
          });
        } else {
          $("#onlineList").append(
            $("<div>").addClass("player").append(
              $("<div>").html("No players online")
            )
          );
        }
      }
    },
    error:(a)=>{
      console.log(JSON.stringify(a))
    }
  });

  $(document).mousemove(function(e) {
    $("#paralax").parallax(-30, e);
  });

});

$.fn.parallax = function(resistance, mouse) {
  $el = $(this);
  TweenLite.to($el, 0.2, {
      x: -((mouse.clientX - window.innerWidth / 2) / resistance),
      y: -((mouse.clientY - window.innerHeight / 2) / resistance)
  });
};

var skinUpload = function(type){
  /*
  var myFormData = new FormData();
myFormData.append('pictureFile', pictureInput.files[0]);

$.ajax({
  url: 'upload.php',
  type: 'POST',
  processData: false, // important
  contentType: false, // important
  dataType : 'json',
  data: myFormData
});
  
  
  $.ajax({
    url: "http://moecukier.ml:2001//upload/"+type,
    success:(a)=>{
      
    },
    error:(a)=>{
      console.log(JSON.stringify(a))
    }
  });*/
}

/**
 * {"image":"http:\/\/moecukier.ml:2001\/bg\/2019_01_1.jpg","players":[],"edition":"4"}
 * 
 */