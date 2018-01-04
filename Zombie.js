class Test {
	
	constructor() {
		this.here = true;
	}
	
	changeHere() {
		this.here = !this.here;
	}

}

var t = new Test();

//export default Test;

/*
export function recupererContenuUtile(url, rappel) {
  getJSON(url, donnees => rappel(JSON.parse(donnees)));
}*/

s1 = new Audio("sons/1poule3.wav");
s2 = new Audio("sons/1poule3.wav");

s2.currentTime = 5;

s1.play();
s2.play();