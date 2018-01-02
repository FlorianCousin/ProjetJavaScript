/*========== Gestion des zombies ==========*/

/**
Une classe abstraite qui correspond au type des zombie en général
**/
class Zombie {

	constructor() {
		
		// Position en ordonnée du zombie
		this.y = Math.round(Math.random() * 100);
		
		// Numéro du sprite : 1, 2, 3, ou 4
		this.sprite = 0;
		
		//Position en ordonnée de l'oeuf
		this.yOeuf = this.y - 15;
		
		this.appOeauf;
	}
	
	avancer() {
		this.y += 10;
		this.sprite = (this.sprite + 1) % 4;
		if (this.y > 800) {
			joueur.pv -= 1;
		}
	}
	
	touche() {
		this.pv -= 1;
		if (this.pv <= 0) {
			joueur.points += this.gain;
			return true;
		}
		return false;
	}
	
	estTouche(x, y) {
		return (this.x < x && x < this.x + this.largeur) && (this.y < y && y < this.y + this.largeur);
	}
	
}

// Fréquence d'apparition d'un zombie
Zombie.freqApparition = 2000;

// Temps en milliseconde d'apparition des oeufs  
Zombie.timeOeuf = 3000;

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
		
		// Le nombre de PV actuel du zombie
		this.pv = this.pvMax;
		
		// Le nombre de point rapporté
		this.gain = 1;
		
		// L'origine de départ du sprite dans l'image de sprites
		this.xorigine = 0;
		this.yorigine = 0;
		// La largeur du sprite (et aussi sa hauteur car ce sont des carrés)
		this.largeur = 48;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - this.largeur));
		
		//L'origine de départ de l'oeuf dans le sprite
		this.yOrigineOeuf = 140;
		this.xOrigineOeuf = 0;
		
		//Position en abscisse de l'oeuf
		this.xOeuf = this.x;
	}

}

// temps en milliseconde entre deux avancés
ZombieFaible.time = 200;

/**
Une classe qui hérite de Zombie et qui correspond au type des zombies moyens
**/
class ZombieMoyen extends Zombie {
	
	constructor() {
		super();
		
		// Le nombre de PV max du zombie moyen
		this.pvMax = 2;
		
		// Le nombre de PV actuel du zombie
		this.pv = this.pvMax;
		
		// Le nombre de point rapporté
		this.gain = 3;
		
		// L'origine de départ du sprite dans l'image de sprites
		this.xorigine = 192;
		this.yorigine = 0;
		// La largeur du sprite (et aussi sa hauteur car ce sont des carrés)
		this.largeur = 48;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - this.largeur));
		
		//L'origine de départ de l'oeuf dans le sprite
		this.yOrigineOeuf = 0;
		this.xOrigineOeuf = 0;
		
		//Position en abscisse de l'oeuf
		this.xOeuf = this.x;
	}

}
 
// temps en milliseconde entre deux avancés
ZombieMoyen.time = 500;

/**
Une classe qui hérite de Zombie et qui correspond au type des zombies forts
**/
class ZombieFort extends Zombie {
	
	constructor() {
		super();
		
		// Le nombre de PV max du zombie fort
		this.pvMax = 3;
		
		// Le nombre de PV actuel du zombie
		this.pv = this.pvMax;
		
		// Le nombre de point rapporté
		this.gain = 5;
		
		// L'origine de départ du sprite dans l'image de sprites
		this.xorigine = 386;
		this.yorigine = 0;
		// La largeur du sprite (et aussi sa hauteur car ce sont des carrés)
		this.largeur = 48;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - this.largeur));
		
		//L'origine de départ de l'oeuf dans le sprite
		this.yOrigineOeuf = 280;
		this.xOrigineOeuf = 0;
		
		//Position en abscisse de l'oeuf
		this.xOeuf = this.x;
		
	}

}

// Apparition des oeufs
ZombieFort.appOeuf = true; 

// temps en milliseconde entre deux avancés
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
		
		// Le nombre de PV actuel du zombie
		this.pv = this.pvMax;
		
		// Le nombre de point rapporté
		this.gain = 30;
		
		// L'origine de départ du sprite dans l'image de sprites
		this.xorigine = 0;
		this.yorigine = 48;
		// La largeur du sprite (et aussi sa hauteur car ce sont des carrés)
		this.largeur = 64;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - this.largeur));
		
		//L'origine de départ de l'oeuf dans le sprite
		this.yOrigineOeuf = 420;
		this.xOrigineOeuf = 0;
		
		//Position en abscisse de l'oeuf
		this.xOeuf = this.x - 5;
		
		ZombieBoss.apparu = true;
		
	}

}

// Temps en miliseconde entre deux avancés
ZombieBoss.time = 1000;

// Pour savoir si un zombie boss est apparu. L'attribut est à true si un zombie boss est déjà apparu et false sinon
ZombieBoss.apparu = false;

// Tableau récupérant le temps où apparaît le zombie
var timef = new Array();
var timem = new Array();
var timeF = new Array();
var timeB;

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
timef.push(0);
moyens.push(new ZombieMoyen());
timem.push(0);
forts.push(new ZombieFort());
timeF.push(0);
boss = new ZombieBoss();
timeB = 0;
boss.appOeuf = true;









/*========== Corps ==========*/

var cs = document.getElementById("cv");
ctx = cs.getContext("2d");


function afficherZombie(zombie) {
	ctx.drawImage(ennemis, zombie.xorigine + zombie.sprite * zombie.largeur, zombie.yorigine, zombie.largeur, zombie.largeur, zombie.x, zombie.y, zombie.largeur, zombie.largeur);
	
	if (zombie.pv == zombie.pvMax) { 
		ctx.clearRect(zombie.x, zombie.y-10, (zombie.pv / zombie.pvMax) * zombie.largeur, 5);
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(zombie.x, zombie.y-10, (zombie.pv / zombie.pvMax) * zombie.largeur, 5);
	}
	else if ((zombie.pv < zombie.pvMax) && (zombie.pv >= zombie.pvMax / 2)) { 
		ctx.clearRect(zombie.x, zombie.y - 10, (zombie.pv / zombie.pvMax) * zombie.largeur, 5);
		ctx.fillStyle = "#FFBB00";
		ctx.fillRect(zombie.x, zombie.y - 10, (zombie.pv / zombie.pvMax) * zombie.largeur, 5);
	}
	else if (zombie.pv < zombie.pvMax / 2) {
		ctx.clearRect(zombie.x, zombie.y - 10, (zombie.pv / zombie.pvMax) * zombie.largeur, 5);
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(zombie.x, zombie.y - 10, (zombie.pv / zombie.pvMax) * zombie.largeur, 5);
	} 
	
}

function afficherOeuf(zombie){
	if (zombie.appOeuf == true){
		ctx.drawImage(oeuf, zombie.xOrigineOeuf, zombie.yOrigineOeuf, 250, 140, zombie.xOeuf, zombie.yOeuf, zombie.largeur + 50, zombie.largeur + 10);
	}
}

function afficher() {
	if (!(grass.loaded && ennemis.loaded && oeuf.loaded)) {
		return;
	}
	
	ctx.drawImage(grass, 0, 0);
	
	faibles.forEach(afficherOeuf);
	moyens.forEach(afficherOeuf);
	forts.forEach(afficherOeuf);
	
	faibles.forEach(afficherZombie);
	moyens.forEach(afficherZombie);
	forts.forEach(afficherZombie);
	
	if (boss != null){
		afficherOeuf(boss);
		afficherZombie(boss);
	}
}


var grass = new Image();
grass.loaded = false;
grass.src = "images/foin2.png";
grass.onload = function() {
	grass.loaded = true;
	afficher();
};

var oeuf = new Image();
oeuf.loaded = false;
oeuf.src = "images/oeufs_tombe.png";
oeuf.onload = function(){
	oeuf.loaded = true;
	afficher();
}

var joueur = function() {
	this.points = 0;
	this.pv = 10;
}


cs.onclick = function(e) {
	var x;
	var y;
	if (e.pageX || e.pageY) { 
	  x = e.pageX;
	  y = e.pageY;
	}
	else { 
	  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	x -= cs.offsetLeft;
	y -= cs.offsetTop;
	
	actionclique(faibles, timef, x, y);
	actionclique(moyens, timem, x, y);
	actionclique(forts, timeF, x, y);
	
	if (boss != null) {
		if (boss.estTouche(x, y)) {
			if (boss.touche()) {
				boss = null;
			}
		}
	}
	
	afficher();
}

function actionclique(arrayzom,arraytime, x, y) {
	for (var i = 0; i < arrayzom.length; i++) {
		if (arrayzom[i].estTouche(x, y)) {
			if (arrayzom[i].touche()) {
				joueur.points += arrayzom[i].gain;
				arrayzom.splice(i, 1);
				arraytime.splice(i,1);
			}
		}
	}
}

function apparitionZombie(ts) {
	if (ts < 30000) {
		faibles.push(new ZombieFaible());
		timef.push(ts);
	}
	else if (ts < 100000) {
		if (Math.random() < 0.5) {
			faibles.push(new ZombieFaible());
			timef.push(ts);
		}
		else {
			moyens.push(new ZombieMoyen());
			timem.push(ts);
		}
	}
	else {
		var ran = Math.random();
		if (ran < 0.33) {
			faibles.push(new ZombieFaible());
			timef.push(ts);
		}
		else if (ran < 0.67) {
			moyens.push(new ZombieMoyen());
			timem.push(ts);
		}
		else {
			forts.push(new ZombieFort());
			timeF.push(ts);
		}
	}
}

// Permet de savoir si l'oeuf doit disparaître ou non
function timer_oeuf (arrayzom, arraytime, ts) {
	
	for (var i = 0; i < arrayzom.length; i++){
		if ((ts - arraytime[i] > Zombie.timeOeuf) && (arrayzom[i]!= null)){
			arrayzom[i].appOeuf = false;
		}	
		else {
			arrayzom[i].appOeuf = true;
		}
	}

}










/*========== Gestion du temps ==========*/

var start = null;

function function1() {
	//console.log("function 1");
}
function function2() {
	//console.log("function 2");
}
function function3() {
	//console.log("function 3");
}

function game (ts) {
	
	if (start === null) {
		start = {
			apparition: ts,
			avFaibles: ts,
			avMoyens: ts,
			avForts: ts,
			avBoss: ts,
			fun1: ts,
			fun2: ts,
			fun3: ts
		};
	}
		
	timer_oeuf(faibles,timef,ts);
	timer_oeuf(forts,timeF,ts);
	timer_oeuf(moyens,timem,ts);

	if ((ts - timeB > Zombie.timeOeuf) && (boss!= null)){
		boss.appOeuf = false;
	}
	else if ((ts - timeB <= Zombie.timeOeuf) && (boss!= null)){
		boss.appOeuf = true;
	}
	
	if (ts >= 1400 && !ZombieBoss.apparu) {
		boss = new ZombieBoss();
		timeB = ts;
	}
	else if (ts - start.apparition >= Zombie.freqApparition) {
		start.apparition = ts;
		apparitionZombie(ts);
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
		if (boss!= null) {
			boss.avancer();
		}
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


