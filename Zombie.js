/**
Une classe abstraite qui correspond au type des zombie en général
**/
class Zombie {

	constructor() {
		// Le nombre de PV actuel du zombie
		this.pv = 2;
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
	}

}

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
	}

}

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
	}

}

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
	}

}
