var skinview3d = require('skinview3D');

var StandingAnimation = (player,time) => {
    const skin = player.skin;

	// Leg swing
	skin.leftLeg.rotation.x = 0;
	skin.rightLeg.rotation.x = 0;

	// Arm swing
	skin.leftArm.rotation.x = 0;
	skin.rightArm.rotation.x = 0;
	skin.leftArm.rotation.z = 0;
	skin.rightArm.rotation.z = 0;

	// Head shaking with different frequency & amplitude
	skin.head.rotation.y = 0;
	skin.head.rotation.x = 0;

	// Always add an angle for cape around the x axis
	
	player.cape.rotation.x = 0;
}




var displayBiTSkin = function(){
    skinViewer = new skinview3d.SkinViewer({
        domElement: document.getElementById("preview3D"),
        width: 250,
        height: 350,
        skinUrl: "img/minecraft/skin.png",
        capeUrl: "img/minecraft/cape.png"
    });
    // Control objects with your mouse!
    let control = skinview3d.createOrbitControls(skinViewer);
    control.enableRotate = true;
    control.enableZoom = false;
    control.enablePan = false;

    skinViewer.animation = new skinview3d.CompositeAnimation();

    // Add an animation
    walk = skinViewer.animation.add(skinview3d.WalkingAnimation);
    // Add another animation
    rotate = skinViewer.animation.add(skinview3d.RotatingAnimation);
    // Remove an animation, stop walking dude
}

var changeBiTSkin = function(login,skinsUrl,capesUrl){

    let skin = new Image();
    let cape = new Image();
    skin.onload = function(){ skinViewer.skinUrl = skin.src; }
    cape.onload = function(){ skinViewer.capeUrl = cape.src; }
    skin.src = skinsUrl + login + '.png';
    cape.src = capesUrl + login + '.png';
}


var toggleWalkAnim = function(checked){ walk.remove(); walk = skinViewer.animation.add(checked? skinview3d.WalkingAnimation : StandingAnimation) }
var toggleRotateAnim = function(checked){ rotate.paused = !checked;}