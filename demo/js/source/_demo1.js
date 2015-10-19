modularizr.register('module1', function(publicScope, protectedScope, parameters){
	'use strict';
	var property1 = "Private module1's properties";
	var method1 = function () {
		console.log("I'm a private module1's method");
		console.log("I'm visible only to module1's methods");
		console.log("I can access " + property1);
		console.log("I can access " + protectedScope.property1);
		console.log("I can access " + publicScope.property1);
		console.log("I can access " + protectedScope.property2);
		console.log("I can access " + publicScope.property2);
	};

	protectedScope.property1 = "Protected module1's properties";
	protectedScope.method1 = function () {
		console.log("I'm a protected module1's method");
		console.log("I'm visible to module1 and module2's methods");
		console.log("I can access " + property1);
		console.log("I can access " + protectedScope.property1);
		console.log("I can access " + publicScope.property1);
		console.log("I can access " + protectedScope.property2);
		console.log("I can access " + publicScope.property2);
	};

	publicScope.property1 = "Public module1's properties";
	publicScope.method1 = function () {
		console.log("I'm a public module1's method");
		console.log("I'm visible to everyone can access the outer object, in addition to module1 and module2's methods");
		console.log("I can access " + property1);
		console.log("I can access " + protectedScope.property1);
		console.log("I can access " + publicScope.property1);
		console.log("I can access " + protectedScope.property2);
		console.log("I can access " + publicScope.property2);
	};
	
	return {
		publicScope: publicScope,
		protectedScope: protectedScope
	};
});

modularizr.register('module2', function(publicScope, protectedScope, parameters){
	'use strict';
	var property2 = "Private module2's properties";
	var method2 = function () {
		console.log("I'm a private module2's method");
		console.log("I'm visible only to module2's methods");
		console.log("I can access " + property2);
		console.log("I can access " + protectedScope.property1);
		console.log("I can access " + publicScope.property1);
		console.log("I can access " + protectedScope.property2);
		console.log("I can access " + publicScope.property2);
	};

	protectedScope.property2 = "Protected module2's properties";
	protectedScope.method2 = function () {
		console.log("I'm a protected module2's method");
		console.log("I'm visible to module1 and module2's methods");
		console.log("I can access " + property2);
		console.log("I can access " + protectedScope.property1);
		console.log("I can access " + publicScope.property1);
		console.log("I can access " + protectedScope.property2);
		console.log("I can access " + publicScope.property2);
	};

	publicScope.property2 = "Public module2's properties";
	publicScope.method2 = function () {
		console.log("I'm a public module2's method");
		console.log("I'm visible to everyone can access the outer object, in addition to module1 and module2's methods");
		console.log("I can access " + property2);
		console.log("I can access " + protectedScope.property1);
		console.log("I can access " + publicScope.property1);
		console.log("I can access " + protectedScope.property2);
		console.log("I can access " + publicScope.property2);
	};
	
	return {
		publicScope: publicScope,
		protectedScope: protectedScope
	};
});

modularizr.register('module3', function(publicScope, protectedScope, parameters){
	'use strict';
	
	publicScope.logArg = function(){
		console.log(parameters);
	};

	return {
		publicScope: publicScope,
		protectedScope: protectedScope
	};
});

var myObject = modularizr.singleton(['module1', 'module2']);