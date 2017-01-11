// Jaro_Winkler object constructor
// bt is the "boost threshold", typically 0.7
// p is a constant scaling factor 
class Jaro_Winkler {
	constructor(bt,p) {
		this.bt = bt;
		this.p = p;
	}
}

// return an array of strings
// arr[0] is a string of matched characters in s1, arr[1] is that of s2
function matchHelper(s1,s2) {
	var range = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
	var substr1 = "";
	var substr2 = "";
	var matched = [];

	for (var i = 0; i < s1.length; i++) {
		for (var j = Math.max(0, i-range); j <= Math.min(s2.length, i+range); j++) {
			if (s1[i] == s2[j] && !matched[j]) {
				matched[j] = true;
				substr1 += s1[i];
				break;
			}
		}	
	}

	for (var i = 0; i < matched.length; i++) {
		if (matched[i]) {
			substr2 += s2[i];
		}
	}

	var arr = [substr1, substr2];
	return arr;
}

Jaro_Winkler.prototype.jaro = function(s1,s2) {
	var arr = matchHelper(s1,s2);
	var substr1 = arr[0];
	var substr2 = arr[1];
	var count = 0;

  	for (let i = 0; i < s1.length; i++) {
    	if (substr1[i] != substr2[i]) {
      		count++;
    	}
  	}

  	var m = substr1.length;
  	var t = count/2;
  	var jaro = 0;

  	if (m != 0) {
    	jaro = (1/3) * ((m/s1.length) + (m/s2.length) + (m-t)/m);
  	}

  	return jaro; 
}

Jaro_Winkler.prototype.dist = function(s1,s2) {
	var jaro = this.jaro(s1,s2);
	var l = this.prefix(s1,s2);
	var d = jaro;

	if (jaro >= this.bt) {
		d += (l * this.p * (1 - jaro));
	}

	return d;
}

// l is the length of a common prefix, at the maximum size of 4
Jaro_Winkler.prototype.prefix = function(s1,s2) {
	var l = 0;

	for (l = 0; l < 4; l++) {
		if (s1[l] != s2[l]) {
			return l;
		}
	}

	return 4;
}

export default Jaro_Winkler;

var jw = new Jaro_Winkler(0.7, 0.1);
console.log(jw.dist("martha", "marhta"));
console.log(jw.dist("jones", "johnson"));
console.log(jw.dist("ABCVWXYZ", "CABVWXYZ"));
console.log(jw.dist("hello world", "hello world"));



