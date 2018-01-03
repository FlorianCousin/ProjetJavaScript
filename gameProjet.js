/*========== Gestion des zombies ==========*/

/**
	Une classe abstraite qui correspond au type des zombies en général
**/
class Zombie {

	constructor() {
		
		// Position en ordonnée du zombie
		this.y = Math.round(Math.random() * 100);
		
		// Numéro du sprite : 1, 2, 3, ou 4
		this.sprite = 0;
		
		// Position en ordonnée de l'oeuf
		this.yOeuf = this.y - 15;
		
		// Pour savoir si le temps durant lequel l'oeuf est affiché est écoulé ou non.
		// L'attribut est à true s'il reste du temps d'affichage et false si celui-ci est dépassé. 
		this.appOeauf;
		
		// La condition pour assurer que la classe est abstraite
		if (this.constructor === Zombie) {
			throw new Error("Erreur : on ne peut pas instancier la classe Zombie");
		}
	}
	
	/**
		Retourne la classe du zombie, càd retourne ZombieFaible, ZombieMoyen, ZombieFort ou ZombieBoss
		selon la classe dans laquelle apartient le zombie. Le zombie est forcément dans une de ces quatres
		classes car la classe Zombie est censée être abstraite.
		
		@return la classe du zombie
	**/
	getClasse() {
		if (this instanceof ZombieFaible) {
			return ZombieFaible;
		 }
		 else if (this instanceof ZombieMoyen) {
			return ZombieMoyen;
		}
		else if (this instanceof ZombieFort) {
			return ZombieFort;
		}
		else if (this instanceof ZombieBoss) {
			return ZombieBoss;
		}
	}
	
	/**
		Permet de faire avancer le zombie de 10 pixels et d'actualiser correctement l'attribut sprite.
		
		@return true si le zombie est en dehors du jeu et flse sinon.
	**/
	avancer() {
		this.y += 10;
		this.sprite = (this.sprite + 1) % 4;
		return this.y > 800;
	}
	
	/**
		Permet d'actualiser le nombre de pv du zombie en cas de touche.
		
		@return true si le zombie n'a plus de pv et false sinon
	**/
	touche() {
		this.pv -= 1;
		return this.pv <= 0;
	}
	
	
	/**
		Permet de savoir si le zombie a été touché par un clique ou non.
		L'origine est en haut à gauche du canvas, l'axe des abcsisses est croissant vers la droite et
		l'axe des ordonnées est croissant vers le bas.
		
		@param x
			abscisse du point de click
		@param y
			ordonnées du point de click
		@return true si le click est sur le zombie et false sinon
	**/
	estTouche(x, y) {
		return (this.x < x && x < this.x + this.getClasse().largeur) && (this.y < y && y < this.y + this.getClasse().largeur);
	}
	
	
	/**
		Permet d'afficher le zombie et sa barre de vie
	**/
	afficher() {
		var largeur = this.getClasse().largeur;
		ctx.drawImage(ennemis, this.getClasse().xorigine + this.sprite * largeur, this.getClasse().yorigine, largeur, largeur, this.x, this.y, largeur, largeur);
		
		var pvMax = this.getClasse().pvMax;
		
		if (this.pv == pvMax) {
			ctx.fillStyle = "#00FF00";
		}
		else if ((this.pv < pvMax) && (this.pv >= pvMax / 2)) {
			ctx.fillStyle = "#FFBB00";
		}
		else if (this.pv < pvMax / 2) {
			ctx.fillStyle = "#FF0000";
		}
		
		ctx.fillRect(this.x, this.y - 10, this.pv * largeur / pvMax, 5);
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

	constructor() {
		super();
		
		// Le nombre de PV actuel du zombie
		this.pv = ZombieFaible.pvMax;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - ZombieFaible.largeur));
		
		// Position en abscisse de l'oeuf
		this.xOeuf = this.x;
	}

}

// L'origine de départ du sprite d'un zombie faible dans l'image de sprites
ZombieFaible.xorigine = 0;
ZombieFaible.yorigine = 0;
// La largeur du sprite d'un zombie faible (et aussi sa hauteur car ce sont des carrés)
ZombieFaible.largeur = 48;

// Le nombre de PV max d'un zombie faible
ZombieFaible.pvMax = 1;

// Le nombre de point rapportéau joueur à la mort d'un zombie faible
ZombieFaible.gain = 1;

// Temps en milliseconde entre deux avancés
ZombieFaible.time = 200;

// L'origine de départ de l'oeuf dans l'image de sprites
ZombieFaible.xOrigineOeuf = 0;
ZombieFaible.yOrigineOeuf = 140;

/**
	Une classe qui hérite de Zombie et qui correspond au type des zombies moyens
**/
class ZombieMoyen extends Zombie {
	
	constructor() {
		super();
		
		// Le nombre de PV actuel du zombie
		this.pv = ZombieMoyen.pvMax;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - ZombieMoyen.largeur));
		
		// Position en abscisse de l'oeuf
		this.xOeuf = this.x;
	}

}

// L'origine de départ du sprite d'un zombie moyen dans l'image de sprites
ZombieMoyen.xorigine = 192;
ZombieMoyen.yorigine = 0;
// La largeur du sprite d'un zombie moyen (et aussi sa hauteur car ce sont des carrés)
ZombieMoyen.largeur = 48;

// Le nombre de PV max d'un zombie moyen
ZombieMoyen.pvMax = 2;

// Le nombre de point rapporté au joueur à la mort d'un zombie moyen
ZombieMoyen.gain = 3;
 
// Temps en milliseconde entre deux avancés
ZombieMoyen.time = 500;

// L'origine de départ de l'oeuf dans l'image de sprites
ZombieMoyen.xOrigineOeuf = 0;
ZombieMoyen.yOrigineOeuf = 0;

/**
	Une classe qui hérite de Zombie et qui correspond au type des zombies forts
**/
class ZombieFort extends Zombie {
	
	constructor() {
		super();
		
		// Le nombre de PV actuel du zombie
		this.pv = ZombieFort.pvMax;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - ZombieFort.largeur));
		
		// Position en abscisse de l'oeuf
		this.xOeuf = this.x;
		
	}

}

// L'origine de départ du sprite d'un zombie fort dans l'image de sprites
ZombieFort.xorigine = 386;
ZombieFort.yorigine = 0;
// La largeur du sprite d'un zombie fort (et aussi sa hauteur car ce sont des carrés)
ZombieFort.largeur = 48;

// Le nombre de PV max d'un zombie fort
ZombieFort.pvMax = 3;

// Le nombre de point rapporté au joueur à la mort d'un zombie fort
ZombieFort.gain = 5;

// temps en milliseconde entre deux avancés
ZombieFort.time = 300;

// L'origine de départ de l'oeuf dans l'image de sprites
ZombieFort.xOrigineOeuf = 0;
ZombieFort.yOrigineOeuf = 280;

/**
	Une classe qui hérite de Zombie et qui correspond au type du zombie boss
**/
class ZombieBoss extends Zombie {

	//static var boss = new ZombieBoss();
	
	constructor() {
		super();
		
		// Le nombre de PV actuel du zombie
		this.pv = ZombieBoss.pvMax;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - ZombieBoss.largeur));
		
		// Position en abscisse de l'oeuf
		this.xOeuf = this.x - 5;
		
		ZombieBoss.apparu = true;
		
	}

}

// L'origine de départ du sprite d'un zombie boss dans l'image de sprites
ZombieBoss.xorigine = 0;
ZombieBoss.yorigine = 48;
// La largeur du sprite d'un zombie boss (et aussi sa hauteur car ce sont des carrés)
ZombieBoss.largeur = 64;

// Le nombre de PV max d'un zombie boss
ZombieBoss.pvMax = 25;

// Le nombre de point rapporté au joueur à la mort d'un zombie boss
ZombieBoss.gain = 30;

// Temps en miliseconde entre deux avancés
ZombieBoss.time = 1000;

// L'origine de départ de l'oeuf dans l'image de sprites
ZombieBoss.xOrigineOeuf = 0;
ZombieBoss.yOrigineOeuf = 420;

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




/**
	Permet d'afficher un oeuf
	
	@param zombie
		le zombie associé à l'oeuf à afficher
**/
function afficherOeuf(zombie){
	if (zombie.appOeuf == true){
		ctx.drawImage(oeuf, zombie.getClasse().xOrigineOeuf, zombie.getClasse().yOrigineOeuf, 250, 140, zombie.xOeuf, zombie.yOeuf, zombie.getClasse().largeur + 50, zombie.getClasse().largeur + 10);
	}
}

/**
	Permet d'afficher entièrement ce qu'il y a à afficher dans le canvas, c'est-à-dire
	le fond, les oeufs, les zombies, et la barre de vie du joueur.
**/
function afficher() {
	if (!(grass.loaded && ennemis.loaded && oeuf.loaded)) {
		return;
	}
	
	ctx.drawImage(grass, 0, 0);
	
	faibles.forEach(afficherOeuf);
	moyens.forEach(afficherOeuf);
	forts.forEach(afficherOeuf);
	
	faibles.forEach(function(zombie) { zombie.afficher() });
	moyens.forEach(function(zombie) { zombie.afficher() });
	forts.forEach(function(zombie) { zombie.afficher() });
	
	if (boss != null){
		afficherOeuf(boss);
		boss.afficher();
	}
	
	if (joueur.pv == 10) {
		ctx.fillStyle = "#00FF00";
	}
	else if ((joueur.pv < 10) && (joueur.pv >= 5)) {
		ctx.fillStyle = "#FFBB00";
	}
	else if (joueur.pv < 5) {
		ctx.fillStyle = "#FF0000";
	}
	
	ctx.fillRect(10, 10, 10 * joueur.pv, 10);
	
	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(tps, 580 - Math.trunc(Math.log10(tps) + 1) * 10, 20);
	ctx.fillText("Vous avez " + joueur.points + " points", 120, 20);
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

/**
	Une classe qui correspond au joueur
**/
class Joueur {
	
	constructor() {
		this.points = 0;
		this.pv = 10;
	}
}

var joueur = new Joueur();

/**
	Permet de déterminer l'action à exécuter au click sur le canvas
**/
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
				joueur.points += ZombieBoss.gain;
				boss = null;
			}
		}
	}
	
	afficher();
}

/**
	Permet d'actualiser l'état de zombies lorsqu'on clique.
	
	@param arrayzom
		liste de zombies à actualiser. En théorie, il n'y a pas de zombie boss.
	@param arraytime
		liste des temps auquels sont apparus les oeufs associés aux zombies de arrayzom
	@param x
		abscisse du click
	@param y
		ordonnée du click
**/
function actionclique(arrayzom, arraytime, x, y) {
	for (var i = 0; i < arrayzom.length; i++) {
		if (arrayzom[i].estTouche(x, y)) {
			if (arrayzom[i].touche()) {
				joueur.points += arrayzom[i].getClasse().gain;
				arrayzom.splice(i, 1);
				arraytime.splice(i, 1);
			}
		}
	}
}


/**
	Permet de faire apparaître un zombie aléatoirement parmi les zombies disponibles.
	La disponibilité des zombies est déterminée par le pdf du projet
**/
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

/**
	Permet de faire avancer les zombies de la liste passée en paramètre et d'actualiser
	cette liste, la liste des temps d'apparition et les pv du joueur si un zombie sort
	du canvas.
	
	@param arrayzom
		liste de zombies
	@param arraytime
		liste des temps d'aparition des zombies de arraytime
**/
function avanceZombie(arrayzom, arraytime) {
	for (var i = 0; i < arrayzom.length; i++) {
		if (arrayzom[i].avancer()) {
			joueur.pv -= 1;
			arrayzom.splice(i, 1);
			arraytime.splice(i, 1);
		}
	}
}

/**
	Permet d'actualiser l'attribut appOeuf des zombie de la liste arrayzom
	de manière à savoir quel oeuf doit disparaître ou non.
	
	@param arrayzom
		liste de zombies
	@param arraytime
		liste des temps d'apparition des oeufs associés aux zombies de la liste arrayzom
	@param ts
		temps en milliseconde depuis le début du jeu
**/
function timer_oeuf (arrayzom, arraytime, ts) {
	
	for (var i = 0; i < arrayzom.length; i++) {
		if ((ts - arraytime[i] > Zombie.timeOeuf) && (arrayzom[i] != null)) {
			arrayzom[i].appOeuf = false;
		}	
		else {
			arrayzom[i].appOeuf = true;
		}
	}

}


/**
	Exécutée lorsque le joueur a perdu
**/
function perdu() {
	cs.onclick = function() {};
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = "#000000"; 
	ctx.fillRect(0, 0, 600, 800);
	ctx.globalAlpha = 1;
	
	ctx.font = "100px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("You lose...", 80, 350);
	ctx.font = "50px Arial";
	ctx.fillText("Vous avez " + joueur.points + " points", 80, 450);
}

/**
	Exécutée lorsque le joueur a survécu 3 minutes et 20 secondes
**/
function gagne() {
	cs.onclick = function() {};
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = "#FFFFFF"; 
	ctx.fillRect(0, 0, 600, 800);
	ctx.globalAlpha = 1;
	
	ctx.font = "100px Arial";
	ctx.fillStyle = "green";
	ctx.fillText("You won !", 100, 350);
	ctx.font = "50px Arial";
	ctx.fillText("Vous avez " + joueur.points + " points", 80, 450);
}













/*========== Gestion du temps ==========*/

var start = null;

// Temps écoulé en seconde
var tps = 0;





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
	
	if (ts >= 140000 && !ZombieBoss.apparu) {
		Zombie.freqApparition = 1000;
		boss = new ZombieBoss();
		timeB = ts;
	}
	else if (ts - start.apparition >= Zombie.freqApparition) {
		start.apparition = ts;
		apparitionZombie(ts);
	}
		
	if (ts - start.avFaibles >= ZombieFaible.time) {
		start.avFaibles = ts;
		avanceZombie(faibles, timef);
		afficher();
	}
	
	if (ts - start.avMoyens >= ZombieMoyen.time) {
		start.avMoyens = ts;
		avanceZombie(moyens, timem);
		afficher();
	}
	
	if (ts - start.avForts >= ZombieFort.time) {
		start.avForts = ts;
		avanceZombie(forts, timeF);
		afficher();
	}
		
	if (ts - start.avBoss >= ZombieBoss.time) {
		start.avBoss = ts;
		if (boss!= null) {
			if (boss.avancer()) {
				joueur.pv -= 1;
				boss == null;
			}
		}
		afficher();
	}
	
	tps = Math.round(ts/1000);

	if (joueur.pv <= 0) {
		perdu();
	}
	else if (ts >= 200000) {
		gagne();
	}
	else {
		requestAnimationFrame(game);
	}
}


requestAnimationFrame(game);


