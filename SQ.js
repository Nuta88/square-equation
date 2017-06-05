var view = {
	getEquation : function() {
		return document.getElementById("sEquat").value;
	},
	
writeToParagraph: function(solution) {
	document.getElementById("solve").innerHTML = solution;
}

};

var model = {
	deleteSpace : function(elementById) {
		return elementById.replace(/\s/g, '');
	},

	checkForSQ : function(equation) {
		return equation.indexOf("x^2", 0) >= 0;
	},

	getA : function(equation) {
		var strA = equation.match(/-?\d*(?=x\^2)/i)[0];
		var numA = parseInt(strA, 10);
		return this.getCheckedResult(numA, strA);
	},

	getB : function(equation) {
		var arrB = equation.match(/-?\d*(?=x[^\^])|-?\d*x$/i);
		if (arrB === null) {
			return 0;
		}
		var numB = parseInt(arrB[0], 10);
		return this.getCheckedResult(numB, arrB[0]);
	},

	getC : function(equation) {
		var arrC = equation
				.match(/-\d+(?=[-+])|^\d+(?=[-+])|[-+]\d+(?=[-+])|[-+]\d+$/i);
		if (arrC === null) {
			return 0;
		}
		return parseInt(arrC[0], 10);
	},

	getCheckedResult : function(element, strElement) {
		if (isNaN(element)) {
			if (strElement.charAt(0) === "-")
				return -1;
			return 1;
		}
		return element;
	},
	getDiscriminant : function(a, b, c) {
		return b * b - 4 * a * c;
	},
	getOneRoot : function(a, b) {
		return -b / (2 * a);
	},
	getRootXOne : function(a, b, discriminant) {
		return (-b + Math.sqrt(discriminant)) / (2 * a);
	},

	getRootXTwo : function(a, b, discriminant) {
		return (-b - Math.sqrt(discriminant)) / (2 * a);
	}

};

function start() {

	controler.start();

};

var controler = {
	start : function() {
		var equation = model.deleteSpace(view.getEquation());
		if (!(model.checkForSQ(equation))) {
			document.write("Уравнение введено не коректо.Попробуйте еще раз");
			return;
		}

		var a = model.getA(equation);
		var b = model.getB(equation);
		var c = model.getC(equation);
		var discriminant = model.getDiscriminant(a, b, c);
		var solution = "РЕШЕНИЕ:<br>" + equation + "=0;<br> a = " + a
				+ ";<br>b = " + b + ";<br>c = " + c + ";<br>D = b^2 - 4ac = ("
				+ b + "*" + b + ") - (4*"  + a + "*" + c + ") = "
				+ discriminant + ";<br>";
		if (discriminant < 0) {
			solution += "D < 0;<br>Квадратное уравнение не имеет решения!";
		} else if (discriminant === 0) {
			solution +=
					"D = 0;<br>Уравнение имеет один корень:<br> x = -b/(2a) = "
							+ (b < 0 ? -b : b)
							+ "/2*"
							+ a
							+ " = "
							+ model.getOneRoot(a, b) + "<br>";
		} else {
			solution += "D > 0;<br>Уравнение имеет два корня:<br> x1 = (-b +&radic;D)/(2a) = ("
					+ (b < 0 ? -b : b)
					+ "+&radic;"
					+ discriminant
					+ ")/(2*"
					+ a
					+ ") = "
					+ model.getRootXOne(a, b, discriminant)
					+ "<br>x2 = (-b -&radic;D)/(2a) = ("
					+ (b < 0 ? -b : b)
					+ "-&radic;"
					+ discriminant
					+ ")/(2*"
					+ a
					+ ") = "
					+ model.getRootXTwo(a, b, discriminant);
		}
		view.writeToParagraph(solution);
	}

};


