

/*========== Gestion des zombies ==========*/


/**
	Une classe abstraite qui correspond au type des zombies en général
**/
class Zombie {

	constructor(tps) {
		
		// Position en ordonnée du zombie
		this.y = Math.round(Math.random() * 100);
		
		// Numéro du sprite : 1, 2, 3, ou 4
		this.sprite = 0;
		
		// Position en ordonnée de l'oeuf
		this.yOeuf = this.y - 15;
		
		// Pour savoir si le temps durant lequel l'oeuf est affiché est écoulé ou non.
		// L'attribut est à true s'il reste du temps d'affichage et false si celui-ci est dépassé. 
		this.appOeauf = true;
		// Temps où apparaît le zombie
		this.tpsApparition = tps;
		
		// La condition pour assurer que la classe est abstraite
		if (this.constructor === Zombie) {
			throw new Error("Erreur : on ne peut pas instancier la classe Zombie");
		}
	}
	
	
	/**
		Permet de faire avancer le zombie de 10 pixels et d'actualiser correctement l'attribut sprite.
		
		@return true si le zombie est en dehors du jeu et false sinon.
	**/
	avancer() {
		this.y += this.constructor.pas;
		this.sprite = (this.sprite + 1) % 4;
		if (this.y > 800) {
			joueur.touche();
			this.son.pause();
			return true;
		}
		return false;
	}
	
	
	/**
		Permet d'actualiser le nombre de pv du zombie en cas de touche.
		
		@return true si le zombie n'a plus de pv et false sinon
	**/
	touche() {
		this.pv -= 1;
		this.crier();
		if (this.pv <= 0) {
			joueur.points += this.constructor.gain;
			this.son.pause();
			return true;
		}
		return false;
	}
	
	
	/**
		Permet de savoir si le zombie a été touché par un click ou non.
		L'origine est en haut à gauche du canvas, l'axe des abcsisses est croissant vers la droite et
		l'axe des ordonnées est croissant vers le bas.
		
		@param x
			abscisse du point de click
		@param y
			ordonnées du point de click
		@return true si le click est sur le zombie et false sinon
	**/
	estTouche(x, y) {
		if (this.x < x && x < this.x + this.constructor.largeur
			&& this.y < y && y < this.y + this.constructor.largeur) {
			sangs.push(new Sang(this.x, this.y, 0, this.constructor.largeur));
			return true;
		}
		return false;
	}
	
	
	/**
		Permet d'afficher le zombie et sa barre de vie
	**/
	afficher() {
		var largeur = this.constructor.largeur;
		ctx.drawImage(ennemis, this.constructor.xorigine + this.sprite * largeur, this.constructor.yorigine, largeur, largeur, this.x, this.y, largeur, largeur);
		
		var pvMax = this.constructor.pvMax;
		
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

// Période d'apparition d'un zombie en milliseconde
Zombie.periodeApparition = 2000;


/**
	Une classe qui hérite de Zombie et qui correspond au type des zombies faibles
**/
class ZombieFaible extends Zombie {

	constructor(tps) {
		super(tps);
		
		// Le nombre de PV actuel du zombie
		this.pv = ZombieFaible.pvMax;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - ZombieFaible.largeur));
		
		// Position en abscisse de l'oeuf
		this.xOeuf = this.x;
		
		// Le son d'une poule
		this.son = new Audio("sons/1poule1.wav");
		this.son.loop = true;
		this.son.currentTime = Math.random() * 10;
		this.son.play();
	}
	
	/**
		Permet à l'ennemi de crier. Cette fonction est exécutée lorsque celui-ci est touché.
	**/
	crier() {
		if (poulecrie.currentTime > 0) {
			poulecrie.currentTime = 0;
		}
		poulecrie.play()
	}

}

// L'origine de départ du sprite d'un zombie faible dans l'image de sprites
ZombieFaible.xorigine = 0;
ZombieFaible.yorigine = 0;
// La largeur du sprite d'un zombie faible (et aussi sa hauteur car ce sont des carrés)
ZombieFaible.largeur = 48;

// Le nombre de PV max d'un zombie faible
ZombieFaible.pvMax = 1;

// Le nombre de point rapporté au joueur à la mort d'un zombie faible
ZombieFaible.gain = 1;

// Temps en milliseconde entre deux avancés
ZombieFaible.time = 100;
// Nombre de pixels de différence entre deux avancés
ZombieFaible.pas = 10

// L'origine de départ de l'oeuf dans l'image de sprites
ZombieFaible.xOrigineOeuf = 0;
ZombieFaible.yOrigineOeuf = 140;

// Temps en milliseconde d'apparition des oeufs  
ZombieFaible.timeOeuf = 2000;


/**
	Une classe qui hérite de Zombie et qui correspond au type des zombies moyens
**/
class ZombieMoyen extends Zombie {
	
	constructor(tps) {
		super(tps, "sons/1poule.wav");
		
		// Le nombre de PV actuel du zombie
		this.pv = ZombieMoyen.pvMax;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - ZombieMoyen.largeur));
		
		// Position en abscisse de l'oeuf
		this.xOeuf = this.x;
		
		// Le son d'une poule
		this.son = new Audio("sons/1poule2.wav");
		this.son.loop = true;
		this.son.currentTime = Math.random() * 10;
		this.son.play();
	}
	
	
	/**
		Permet à l'ennemi de crier. Cette fonction est exécutée lorsque celui-ci est touché.
	**/
	crier() {
		if (poulecrie.currentTime > 0) {
			poulecrie.currentTime = 0;
		}
		poulecrie.play()
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
ZombieMoyen.time = 200;
// Nombre de pixels de différence entre deux avancés
ZombieMoyen.pas = 5

// L'origine de départ de l'oeuf dans l'image de sprites
ZombieMoyen.xOrigineOeuf = 0;
ZombieMoyen.yOrigineOeuf = 0;

// Temps en milliseconde d'apparition des oeufs  
ZombieMoyen.timeOeuf = 3000;

/**
	Une classe qui hérite de Zombie et qui correspond au type des zombies forts
**/
class ZombieFort extends Zombie {
	
	constructor(tps) {
		super(tps, "sons/1poule.wav");
		
		// Le nombre de PV actuel du zombie
		this.pv = ZombieFort.pvMax;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - ZombieFort.largeur));
		
		// Position en abscisse de l'oeuf
		this.xOeuf = this.x;
		
		// Le son d'une poule
		this.son = new Audio("sons/1poule3.wav");
		this.son.loop = true;
		this.son.currentTime = Math.random() * 10;
		this.son.play();
	}
	
	
	/**
		Permet à l'ennemi de crier. Cette fonction est exécuté lorsque celui-ci est touché.
	**/
	crier() {
		if (poulecrie.currentTime > 0) {
			poulecrie.currentTime = 0;
		}
		poulecrie.play()
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
ZombieFort.time = 150;
// Nombre de pixels de différence entre deux avancés
ZombieFort.pas = 7

// L'origine de départ de l'oeuf dans l'image de sprites
ZombieFort.xOrigineOeuf = 0;
ZombieFort.yOrigineOeuf = 280;

// Temps en milliseconde d'apparition des oeufs  
ZombieFort.timeOeuf = 3000;


/**
	Une classe singleton qui hérite de Zombie et qui correspond au type du zombie boss
**/
class ZombieBoss extends Zombie {

	//static var boss = new ZombieBoss();
	
	constructor(tps) {
		super(tps);
		
		// Le nombre de PV actuel du zombie
		this.pv = ZombieBoss.pvMax;
		
		// Position en abscisse du zombie
		this.x = Math.round(Math.random() * (600 - ZombieBoss.largeur));
		
		// Position en abscisse de l'oeuf
		this.xOeuf = this.x - 5;
		
		// Le son d'une vache
		this.son = new Audio("sons/vachevenere.wav");
		this.son.play();
		
		// Pour assurer l'aspect singleton de la classe
		if (ZombieBoss.apparu) {
			throw new Error("Erreur : la classe ZombieBoss ne peut pas être instanciée deux fois car c'est un singleton");
		} else {
			ZombieBoss.apparu = true;
		}
	}
	
	
	/**
		Permet à l'ennemi de crier. Cette fonction est exécutée lorsque celui-ci est touché.
	**/
	crier() {
		if (vachemeugle.currentTime > 0) {
			vachemeugle.currentTime = 0;
		}
		vachemeugle.play()
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
ZombieBoss.time = 300;
// Nombre de pixels de différence entre deux avancés
ZombieBoss.pas = 5;

// L'origine de départ de la tombe dans l'image de sprites
ZombieBoss.xOrigineOeuf = 0;
ZombieBoss.yOrigineOeuf = 420;

// Pour savoir si un zombie boss est apparu. L'attribut est à true si un zombie boss est déjà apparu et false sinon
ZombieBoss.apparu = false;

// Temps en milliseconde d'apparition de la tombe  
ZombieBoss.timeOeuf = 10000;





// Initialisation du tableau de zombies faibles
var faibles = new Array();
// Histoire de commencer en beauté
faibles.push(new ZombieFaible(0));
// Initialisation du tableau de zombies moyens
var moyens = new Array();
// Initialisation du tableau de zombies forts
var forts = new Array();
// Déclaration du tableau du zombie boss
var boss;

// L'image des sprites des ennemis
var ennemis = new Image();
ennemis.loaded = false;
ennemis.src = "images/ennemis.png";
ennemis.onload = function() {
	ennemis.loaded = true;
	afficher();
}








/*========== L'ensemble des sons ==========*/

var ouille = new Audio("sons/ouille.mp3");
var mort = new Audio("sons/mort.mp3");
var poulecrie = new Audio("sons/poulecrie.wav");
var vachemeugle = new Audio("sons/vachemeugle.wav");
var tir = new Audio("sons/tir.wav");









/*========== Gestion du sang ==========*/

class Sang {

	constructor(x, y, yorigine, largeur) {
		
		// Coordonnées du sang
		this.x = x;
		this.y = y;
		
		// Ordonnées du premier sprite de sang
		this.yorigine = yorigine;
		// Largeur d'un sprite
		this.largeur = largeur;
		
		// Le numéro du sprite
		this.sprite = 0;
		
	}
	
	afficher() {
		ctx.drawImage(imsang, this.sprite * this.largeur, this.yorigine, this.largeur, this.largeur, this.x, this.y, this.largeur, this.largeur);
	}
	
	spriteSuivant() {
		this.sprite = Math.min(this.sprite + 1, 2);
	}
}

// Temps entre deux sprites en milliseconde
Sang.time = 100;


// L'image des srites du sang
var imsang = new Image();
imsang.loaded = false;
imsang.src = "images/sang.png";
imsang.onload = function() {
	imsang.loaded = true;
	afficher();
}

// La liste de tous les sangs à afficher
sangs = new Array();










/*========== Corps du programme ==========*/

var cs = document.getElementById("cv");
ctx = cs.getContext("2d");




/**
	Permet d'afficher un oeuf
	
	@param zombie
		le zombie associé à l'oeuf à afficher
**/
function afficherOeuf(zombie){
	if (zombie.appOeuf == true){
		ctx.drawImage(oeuf, zombie.constructor.xOrigineOeuf, zombie.constructor.yOrigineOeuf, 250, 140, zombie.xOeuf, zombie.yOeuf, zombie.constructor.largeur + 50, zombie.constructor.largeur + 10);
	}
}


/**
	Permet d'afficher entièrement ce qu'il y a à afficher dans le canvas, c'est-à-dire
	le fond, les oeufs, les zombies, et la barre de vie du joueur.
**/
function afficher() {
	if (!(grass.loaded && ennemis.loaded && oeuf.loaded && imsang.loaded)) {
		return;
	}
	
	// Affichage du terrain de jeu
	ctx.drawImage(grass, 0, 0);
	
	// Affichage du sang
	sangs.forEach(function(sang) { sang.afficher() });
	
	// Affichage des oeufs
	faibles.forEach(afficherOeuf);
	moyens.forEach(afficherOeuf);
	forts.forEach(afficherOeuf);
	
	// Affichage des zombies normaux
	faibles.forEach(function(zombie) { zombie.afficher() });
	moyens.forEach(function(zombie) { zombie.afficher() });
	forts.forEach(function(zombie) { zombie.afficher() });
	
	// Affichage du boss
	if (boss != null){
		afficherOeuf(boss);
		boss.afficher();
	}
	
	// Détermination la couleur de la barre de vie du joueur
	if (joueur.pv == 10) {
		ctx.fillStyle = "#00FF00";
	}
	else if ((joueur.pv < 10) && (joueur.pv >= 5)) {
		ctx.fillStyle = "#FFBB00";
	}
	else if (joueur.pv < 5) {
		ctx.fillStyle = "#FF0000";
	}
	// Affichage de la barre de vie du joueur
	ctx.fillRect(10, 10, 10 * joueur.pv, 10);
	
	// Affichage du timer et des points du joueur
	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(Math.max(tps, 0), 580 - Math.trunc(Math.max(Math.log10(tps), 0) + 1) * 10, 20);
	ctx.fillText("Vous avez " + joueur.points + " points", 150, 20);
	
	//Affichage de la possibilité de faire une pause
	ctx.fillText ("Pause : touche 'p'", 350, 20);
}


// L'image de fond
var grass = new Image();
grass.loaded = false;
grass.src = "images/foinsanssang.png";
grass.onload = function() {
	grass.loaded = true;
	afficher();
};

// L'image des oeufs et de la tombe
var oeuf = new Image();
oeuf.loaded = false;
oeuf.src = "images/oeufs_tombe.png";
oeuf.onload = function(){
	oeuf.loaded = true;
	afficher();
}


/**
	Executée lorsqu'une touche est appuyée, cette fonction permet de mettre ou d'enlever la pause du jeu
	en fonction de l'état actuel de celui-ci.
	Lorsque pause.p est false au début de la fonction, le jeu se met en pause.
	Si pause.p est true au début de la fonction, alors le jeu reprend.
**/
document.onkeydown = function(e) {
	if (e.key != "p") {
		console.log("Cette touche ne sert à rien");
		return;
	}
	pause.p = !pause.p;
	if (!pause.p) {
		cs.onclick = actionclick;
		requestAnimationFrame(game);
	}
}


// Permet de déterminer l'action à exécuter au click sur le canvas
cs.onclick = actionclick;

/**
	Exécutée lorsqu'on clique sur le canvas et que le jeu est en cours (càd ni gagné, ni perdu, ni pause).
	Il s'agit de récupérer les coordonnées du click par rapport au canvas et d'actualiser les zombies en fonction
	de ce click.
	
	@param e
		objet associé au click
**/
function actionclick(e) {
	// On récupère d'abord les coordonnées du click par rapport au canvas dans x et y
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
	
	// On émet un son de tir
	if (tir.currentTime > 0) {
		tir.currentTime = 0;
	}
	tir.play();
	
	// On agit sur les zombies en conséquence du click
	actualisezom(faibles, x, y);
	actualisezom(moyens, x, y);
	actualisezom(forts, x, y);
	
	if (boss != null) {
		if (boss.estTouche(x, y)) {
			
			sangs.push(new Sang(boss.x, boss.y, 48, ZombieBoss.largeur));
			
			if (boss.touche()) {
				joueur.points += ZombieBoss.gain;
				boss = null;
			}
			
		}
	}
	
	// On actualise le plateau de jeu
	afficher();
}


/**
	Permet d'actualiser l'état des zombies lorsqu'on clique.
	
	@param arrayzom
		liste de zombies à actualiser. En théorie, il n'y a pas de zombie boss.
	@param x
		abscisse du click
	@param y
		ordonnée du click
**/
function actualisezom(arrayzom, x, y) {
	for (var i = 0; i < arrayzom.length; i++) {
		if (arrayzom[i].estTouche(x, y) && arrayzom[i].touche()) {
			arrayzom.splice(i, 1);
		}
	}
}


/**
	Permet de faire apparaître un zombie aléatoirement parmi les zombies disponibles.
	La disponibilité des zombies est déterminée par le pdf du projet
**/
function apparitionZombie(ts) {
	if (ts < 30000) {
		faibles.push(new ZombieFaible(ts));
	}
	else if (ts < 100000) {
		if (Math.random() < 0.5) {
			faibles.push(new ZombieFaible(ts));
		}
		else {
			moyens.push(new ZombieMoyen(ts));
		}
	}
	else {
		var ran = Math.random();
		if (ran < 0.33) {
			faibles.push(new ZombieFaible(ts));
		}
		else if (ran < 0.67) {
			moyens.push(new ZombieMoyen(ts));
		}
		else {
			forts.push(new ZombieFort(ts));
		}
	}
}


/**
	Permet de faire avancer les zombies de la liste passée en paramètre et d'actualiser
	cette liste, la liste des temps d'apparition et les pv du joueur si un zombie sort
	du canvas.
	
	@param arrayzom
		liste de zombies
**/
function avanceZombie(arrayzom) {
	for (var i = 0; i < arrayzom.length; i++) {
		if (arrayzom[i].avancer()) {
			arrayzom.splice(i, 1);
		}
	}
}


/**
	Permet d'actualiser l'attribut appOeuf des zombie de la liste arrayzom
	de manière à savoir quel oeuf doit disparaître ou non.
	
	@param arrayzom
		liste de zombies
	@param ts
		temps en milliseconde depuis le début du jeu
**/
function timer_oeuf (arrayzom, ts) {
	for (var i = 0; i < arrayzom.length; i++) {
		arrayzom[i].appOeuf = (ts - arrayzom[i].tpsApparition <= arrayzom[i].constructor.timeOeuf);
	}
}










/*========== Des classes ==========*/


/**
	Une classe très simple qui permet de gérer les attributs nécessaires au bon
	fonctionnement des pauses.
**/
class Pause {
	
	constructor() {
		// Pour savoir si on est en pause ou pas.
		// p est à true si on est en pause et false sinon
		this.p = false;
		
		// Le temps écoulé pendant toutes les pauses de la partie en milliseconde
		this.time = 0;
		
		// Le temps de mise en place de la dernière pause en milliseconde depuis l'ouverture de la page.
		// mepause pour mise en pause
		this.mepause;
	}
}

var pause = new Pause();


/**
	Une classe qui correspond au joueur
**/
class Joueur {
	
	constructor() {
		// Correspond aux points du joueur gagné en tuant des ennemis
		this.points = 0;
		
		// Correspond au points de vie du joueur
		this.pv = 10;
	}
	
	/**
		Exécutée lorsqu'un ennemi sort du jeu (en bas de l'écran), cette fonction
		permet d'agir en conséquence de la perte d'un point de vie.
	**/
	touche() {
		this.pv -= 1;
		if (this.pv > 0) {
			if (ouille.currentTime > 0) {
				ouille.currentTime = 0;
			}
			ouille.play();
		}
		else {
			mort.play();
		}
	}
}

var joueur = new Joueur();













/*========== Les fenêtres de non jeu ==========*/

/**
	Exécutée lorsque le joueur a perdu,
	cette fonction permet de mettre l'aspect visuel du jeu en mode perdu.
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
	Exécutée lorsque le joueur a survécu 3 minutes et 20 secondes,
	cette fonction permet de mettre l'aspect visuel du jeu en mode gagné.
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


/**
	Executée dans game lorsqu'on est en pause,
	cette fonction permet de mettre l'aspect visuel du jeu en mode pause.
**/
function enPause(){
	cs.onclick = function() {};
	
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = "#FFFFFF"; 
	ctx.fillRect(0, 0, 600, 800);
	ctx.globalAlpha = 1;
	
	ctx.font = "100px Arial";
	ctx.fillStyle = "blue";
	ctx.fillText("Pause", 150, 350);
	ctx.font = "30px Arial";
	ctx.fillText("Appuyez sur 'p' pour continuer", 90, 450);
}













/*========== Gestion du temps ==========*/

var start = null;

// Temps restant avant la fin de la partie en seconde
var tps = 200;




/**
	Cette fonction permet de gérer le temps écoulé dans le jeu et d'agir en conséquence.
	
	@param ts
		temps écoulé en milliseconde depuis l'ouverture de la page
**/
function game (ts) {
	
	if (start === null) {
		start = {
			sang: ts,
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
	
	
	timer_oeuf(faibles,ts);
	timer_oeuf(forts,ts);
	timer_oeuf(moyens,ts);
	
	if (ts - start.sang >= Sang.time) {
		start.sang = ts;
		sangs.forEach(function(sang) { sang.spriteSuivant() });
	}

	if (boss != null) {
		boss.appOeuf = ts - boss.tpsApparition <= ZombieBoss.timeOeuf;
	}
	
	if (ts >= 140000 && !ZombieBoss.apparu) {
		Zombie.periodeApparition = 1000;
		boss = new ZombieBoss(ts);
	}
	else if (ts - start.apparition >= Zombie.periodeApparition) {
		start.apparition = ts;
		apparitionZombie(ts);
	}
		
	if (ts - start.avFaibles >= ZombieFaible.time) {
		start.avFaibles = ts;
		avanceZombie(faibles);
		afficher();
	}
	
	if (ts - start.avMoyens >= ZombieMoyen.time) {
		start.avMoyens = ts;
		avanceZombie(moyens);
		afficher();
	}
	
	if (ts - start.avForts >= ZombieFort.time) {
		start.avForts = ts;
		avanceZombie(forts);
		afficher();
	}
		
	if (ts - start.avBoss >= ZombieBoss.time) {
		start.avBoss = ts;
		if (boss != null) {
			if (boss.avancer()) {
				boss = null;
			}
		}
		afficher();
	}
	
	// Lorsqu'on est en pause, le temps s'écoule quand même donc ts augmente quand même.
	// Or, tps ne doit pas être modifié lorsqu'on est en pause.
	// C'est pourquoi il faut enlever pause.time à ts pour avoir tps.
	tps = 200 - Math.trunc((ts - pause.time) / 1000);

	// Si le joueur n'a plus de pv, c'est perdu
	if (joueur.pv <= 0) {
		perdu();
	}
	// Si les 200 secondes sont écoulées, c'est gagné
	else if (tps < 0) {
		gagne();
	}
	// Si on n'est pas en pause, on continue
	else if (!pause.p) {
		if (pause.mepause != null) {
			pause.time += ts - pause.mepause;
			pause.mepause = null;
		}
		requestAnimationFrame(game);
	}
	// Sinon on est en pause, et dans ce cas on ne refait pas appel à requestAnimationFrame
	else {
		enPause();
		if (pause.mepause == null) {
			pause.mepause = ts;
		}
	}
	
}

requestAnimationFrame(game);

