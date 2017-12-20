/**
Une classe abstraite qui correspond au type des zombie en général
**/
class Zombie {

	var pv;

	constructor() {}
	
}

/**
Une classe qui hérite de Zombie et qui correspond au type des zombies faibles
**/
class ZombieFaible extends Zombie {

	// Le nombre de PV du zombie faible quand celui-ci apparaît
	static var pvMax = 1;
	// Le nombre de point acquis à la mort d'un zombie faible
	static var gain = 1;
	
	

	constructor() {}

}

/**
Une classe qui hérite de Zombie et qui correspond au type des zombies moyens
**/
class ZombieMoyen extends Zombie {

	static var pvMax = 1;
	
	constructor() {}

}

/**
Une classe qui hérite de Zombie et qui correspond au type des zombies forts
**/
class ZombieFort extends Zombie {

	static var pvMax = 1;
	
	constructor() {}

}

/**
Une classe qui hérite de Zombie et qui correspond au type du zombie boss
Il s'agit d'un singleton
**/
class ZombieBoss extends Zombie {

	static var boss = new ZombieBoss();
	static var pvMmax = 1;
	
	constructor() {}

}

