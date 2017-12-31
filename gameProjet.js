/*========== Gestion des zombies ==========*/

/**
Une classe abstraite qui correspond au type des zombie en général
**/
class Zombie {

	constructor() {
		// Le nombre de PV actuel du zombie
		this.pv = 1;
		
		// Position en ordonnée du zombie
		this.y = Math.round(Math.random() * 50);
		
		// Numéro du sprite : 1, 2, 3, ou 4
		this.sprite = 0;
	}
	
	avancer() {
		this.y += 10;
		this.sprite = (this.sprite + 1) % 4;
	}
	
	dommages(){
		this.pv -= 1;
	}
	
}

/**
Une classe qui hérite de Zombie et qui correspond au type des zombies faibles
**/
class ZombieFaible extends Zombie {

	// Le nombre de point acquis à la mort d'un zombie faible
	//static final var gain = 1;

	constructor() {
		super();
		
		// Le nombre de PV max du zombie faible
		this.pvMax = 1;
		
		// Le nombre de point rapporté
		this.gain = 1;
		
		// L'origine de départ du sprite dans l'image de sprites
		this.xorigine = 0;
		this.yorigine = 0;
		// La largeur du sprite (et aussi sa hauteur car ce sont des carrés)
		this.largeur = 48;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - this.largeur));
	}

}

// temps en miliseconde entre deux avancés
ZombieFaible.time = 200;

/**
Une classe qui hérite de Zombie et qui correspond au type des zombies moyens
**/
class ZombieMoyen extends Zombie {
	
	constructor() {
		super();
		
		// Le nombre de PV max du zombie moyen
		this.pvMax = 2;
		
		// Le nombre de point rapporté
		this.gain = 3;
		
		// L'origine de départ du sprite dans l'image de sprites
		this.xorigine = 192;
		this.yorigine = 0;
		// La largeur du sprite (et aussi sa hauteur car ce sont des carrés)
		this.largeur = 48;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - this.largeur));
		
	}

}

// temps en miliseconde entre deux avancés
ZombieMoyen.time = 500;

/**
Une classe qui hérite de Zombie et qui correspond au type des zombies forts
**/
class ZombieFort extends Zombie {
	
	constructor() {
		super();
		
		// Le nombre de PV max du zombie fort
		this.pvMax = 3;
		
		// Le nombre de point rapporté
		this.gain = 5;
		
		// L'origine de départ du sprite dans l'image de sprites
		this.xorigine = 386;
		this.yorigine = 0;
		// La largeur du sprite (et aussi sa hauteur car ce sont des carrés)
		this.largeur = 48;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - this.largeur));
		
	}

}

// temps en miliseconde entre deux avancés
ZombieFort.time = 300;

/**
Une classe qui hérite de Zombie et qui correspond au type du zombie boss
Il s'agit d'un singleton
**/
class ZombieBoss extends Zombie {

	//static var boss = new ZombieBoss();
	
	constructor() {
		super();
		
		// Le nombre de PV max du zombie boss
		this.pvMax = 25;
		
		// Le nombre de point rapporté
		this.gain = 30;
		
		// L'origine de départ du sprite dans l'image de sprites
		this.xorigine = 0;
		this.yorigine = 48;
		// La largeur du sprite (et aussi sa hauteur car ce sont des carrés)
		this.largeur = 64;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - this.largeur));
		
	}

}

// temps en miliseconde entre deux avancés
ZombieBoss.time = 1000;




var faibles = new Array();
var moyens = new Array();
var forts = new Array();
var boss;

var ennemis = new Image();
ennemis.loaded = false;
ennemis.src = "images/ennemis2.png";
ennemis.onload = function() {
	ennemis.loaded = true;
	afficher();
}


faibles.push(new ZombieFaible());
moyens.push(new ZombieMoyen());
forts.push(new ZombieFort());
boss = new ZombieBoss();








/*========== Corps ==========*/

var cs = document.getElementById("cv");
ctx = cs.getContext("2d");

function initialiser(zombie){
	zombie.pv = zombie.pvMax;
}

function afficherZombie(zombie) {
	ctx.drawImage(ennemis, zombie.xorigine + zombie.sprite * zombie.largeur, zombie.yorigine, zombie.largeur, zombie.largeur, zombie.x, zombie.y, zombie.largeur, zombie.largeur);
	if (zombie.pv > zombie.pvMax/2){ 
		ctx.clearRect(zombie.x,zombie.y-10,(zombie.pv/zombie.pvMax)*50,5);
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(zombie.x,zombie.y-10,(zombie.pv/zombie.pvMax)*50,5);
	}
	else if ((zombie.pv <= zombie.pvMax/2)&&(zombie.pv > zombie.pvMax/4))
	{ 
		ctx.clearRect(zombie.x,zombie.y-10,(zombie.pv/zombie.pvMax)*50,5);
		ctx.fillStyle = "#FF5B00";
		ctx.fillRect(zombie.x,zombie.y-10,(zombie.pv/zombie.pvMax)*50,5);
	}
	else if (zombie.pv <= zombie.pvMax/4){
		ctx.clearRect(zombie.x,zombie.y-10,(zombie.pv/zombie.pvMax)*50,5);
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(zombie.x,zombie.y-10,(zombie.pv/zombie.pvMax)*50,5);
	} 
	
}


function afficher() {
	if (!(grass.loaded && ennemis.loaded)) {
		return;
	}
	
	ctx.drawImage(grass, 0, 0);
	faibles.forEach(afficherZombie);
	moyens.forEach(afficherZombie);
	forts.forEach(afficherZombie);
	if (boss != null) afficherZombie(boss);
}


var grass = new Image();
grass.loaded = false;
grass.src = "images/foin2.png";
grass.onload = function() {
	grass.loaded = true;
	afficher();
};



var joueur = function() {
	this.points = 0;
	this.pv = 10;
}








/*========== Gestion du temps ==========*/

var start = null;

function function1() {
	console.log("function 1");
}
function function2() {
	console.log("function 2");
}
function function3() {
	console.log("function 3");
}

function game (ts) {
	
	if (start === null) {
		start = {
			avFaibles: ts,
			avMoyens: ts,
			avForts: ts,
			avBoss: ts,
			fun1: ts,
			fun2: ts,
			fun3: ts
		};
		faibles.forEach(initialiser);
		moyens.forEach(initialiser);
		forts.forEach(initialiser);
		initialiser(boss);
	}
	
	if (ts - start.avFaibles >= ZombieFaible.time) {
		start.avFaibles = ts;
		faibles.forEach(function(zombie) {zombie.avancer();});
		afficher();
	}
	
	if (ts - start.avMoyens >= ZombieMoyen.time) {
		start.avMoyens = ts;
		moyens.forEach(function(zombie) {zombie.avancer();});
		afficher();
	}
	
	if (ts - start.avForts >= ZombieFort.time) {
		start.avForts = ts;
		forts.forEach(function(zombie) {zombie.avancer();});
		afficher();
	}
	
	if (ts - start.avBoss >= ZombieBoss.time) {
		start.avBoss = ts;
		boss.avancer();
		afficher();
	}

	if (ts - start.fun1 >= 1000) {
		start.fun1 = ts;
		function1();
	} 

	if (ts - start.fun2 >= 3000) {
		start.fun2 = ts;
		function2();
	}

	if (ts - start.fun3 >= 4000) {
		start.fun3 = ts;
		function3();
	}

	requestAnimationFrame(game);	
}


requestAnimationFrame(game);


