var cs = document.getElementById("cv");
ctx = cs.getContext("2d");



function afficher() {
	if (!grass.loaded) {
		return;
	}
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 13; j++) {
			ctx.drawImage(grass, 64 * i, 64 * j);
		}
	}
}


var grass = new Image();
grass.loaded = false;
grass.src = "grass.png";
grass.onload = function() {
	grass.loaded = true;
	afficher();
};



