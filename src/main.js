const remote = require("electron").remote;
const spawn = require("child_process").spawn;
const properties = require("properties");
const fs = require("fs");
const minecraftjs = require("./minecraft");

var saveLogin = function () {
  properties.parse("./launcher/config.properties", { path: true }, function (
    err,
    obj
  ) {
    if (err) return console.error(err);
    let login = $("#login").val();

    obj.login = login;
    console.log(obj);

    fs.writeFileSync("./launcher/config.properties", properties.stringify(obj));
  });
};

var play = function () {
  if (process.platform === "win32") {
    process.env.APPDATA = "./data";
    process.env.SHIM_MCCOMPAT = "0x800000001";
  }

  var minecraftProcess = spawn("java", ["-jar", "mc_fast_skinfix.jar"], {
    cwd: "launcher",
    detached: true,
  });
  minecraftProcess.unref();

  minecraftProcess.stdout.on("data", (data) => {
    if (data.toString().includes("asdf")) remote.getCurrentWindow().close();
  });
};

var easteregg = function () {
  $("<img/>")
    .on("load", function () {
      $("#paralax img").fadeOut(500, function () {
        $(this).remove();
      });
      $(this).appendTo("#paralax").fadeIn(500);
    })
    .hide()
    .attr("src", "img/suprise.jpg");
};

$("#closeButton").click(() => {
  var window = remote.getCurrentWindow();
  window.close();
});
$("#edition").dblclick(() => {
  easteregg();
});
$("#playButton").click(() => {
  saveLogin();
  play();
});

$().ready(() => {
  $("title").append(process.env.npm_package_version);
  properties.parse("./launcher/config.properties", { path: true }, function (
    err,
    obj
  ) {
    $("#login").val(obj.login);
    $("#username").val(obj.login);
    changeBiTSkin(obj.login, obj.skin, obj.cloak);

    $.ajax({
      url: obj.mcapi,
      success: (a) => {
        if (a != "") {
          let mcapi = JSON.parse(a);

          $("<img/>")
            .on("load", function () {
              $("#paralax").append($(this)).fadeIn(500);
              $("#onlineList").fadeIn(500);
            })
            .attr("src", mcapi.image);

          $("#edition").html("Edition " + mcapi.edition);
          if (mcapi.players.length) {
            mcapi.players.forEach((player) => {
              $("#onlineList").append(
                $("<div>")
                  .addClass("player")
                  .append(
                    $("<img>").attr("src", obj.heads + player + ".png"),
                    $("<div>").html(player)
                  )
              );
            });
          } else {
            $("#onlineList").append(
              $("<div>")
                .addClass("player")
                .append($("<div>").html("No players online"))
            );
          }
        }
      },
      error: (a) => {
        console.log(JSON.stringify(a));
      },
    });
  });

  $(document).mousemove(function (e) {
    $("#paralax").parallax(-30, e);
  });
});

$.fn.parallax = function (resistance, mouse) {
  $el = $(this);
  TweenLite.to($el, 0.2, {
    x: -((mouse.clientX - window.innerWidth / 2) / resistance),
    y: -((mouse.clientY - window.innerHeight / 2) / resistance),
  });
};

var skinUpload = function (type) {
  properties.parse("./launcher/config.properties", { path: true }, function (
    err,
    obj
  ) {
    let formData = new FormData();
    formData.append("name", $("#username").val());
    formData.append("password", $("#password").val());
    formData.append("myfile", $("#" + type)[0].files[0]);

    $.ajax({
      url: obj.skinapi + type,
      type: "POST",
      processData: false,
      contentType: false,
      data: formData,
      statusCode: {
        500: function () {
          $(".toast-body")
            .html("Something went wrong on our side :c")
            .attr("class", "toast-body text-danger");
          $(".toast").toast({ delay: 3000 }).toast("show");
        },
        404: function () {
          $(".toast-body")
            .html("Connection error!")
            .attr("class", "toast-body text-danger");
          $(".toast").toast({ delay: 3000 }).toast("show");
        },
        403: function () {
          $(".toast-body")
            .html("Wrong name or password!")
            .attr("class", "toast-body text-warning");
          $(".toast").toast({ delay: 3000 }).toast("show");
        },
        200: function () {
          $(".toast-body")
            .html("Upload succes!")
            .attr("class", "toast-body text-success");
          $(".toast").toast({ delay: 3000 }).toast("show");
        },
      },
    });
  });
};

var displayImage = function (e, type) {
  $(e).prev().html($(e).val().split("/").pop().split("\\").pop());
  let files = e.files,
    reader = new FileReader();
  reader.onload = function (frEvent) {
    skinViewer[type ? "capeUrl" : "skinUrl"] = frEvent.target.result;
  };
  reader.readAsDataURL(files[0]);
};

/**
 * {"image":"http:\/\/moecukier.ml:2001\/bg\/2019_01_1.jpg","players":[],"edition":"4"}
 *
 */
