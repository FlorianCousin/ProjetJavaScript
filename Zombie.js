class Test {
	
	constructor() {
		this.here = true;
	}
	
	changeHere() {
		this.here = !this.here;
	}

}

var t = new Test();

export default Test;

/*
export function recupererContenuUtile(url, rappel) {
  getJSON(url, donnees => rappel(JSON.parse(donnees)));
}*/