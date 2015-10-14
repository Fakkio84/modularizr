var modularizr = (function(){
	'use strict';
	var publicMethods = {};
	var modules = {};
	
	publicMethods.register = function(name, module){
		if (!modules[name]) {
			modules[name] = module;
		}
		else {
			throw {
				code: 1,
				name: "Error",
				description: "Module already exists",
				message: "A module with name '" + name + "' has already been registered",
				toString: function(){
					return this.name + ": " + this.message;
				} 
			};
		}
	};
	
	publicMethods.make = function () {
		//Te object to make
		var object = {publicMethods: {}, protectedMethods: {}};
		
		//Convert the arguments object to an array
		var args = Array.prototype.slice.call(arguments);
		
		//Loop trought arguments and append module to the object
		args.forEach(function(module){
			if (modules[module]) {
				object = modules[module](object.publicMethods, object.protectedMethods);
			}
			else {
				throw {
					code: 2,
					name: "Error",
					description: "Module doesn't exist",
					message: "Module with name '" + name + "' hasn't been registered yet",
					toString: function(){
						return this.name + ": " + this.message;
					} 
				};
			}
		});
		
		return object.publicMethods;
	};
	
	return publicMethods;
}());

modularizr.register('module1', function(publicMethods, protectedMethods){
	'use strict';
	var property1 = "Private property";
	var method1 = function () {
		console.log("I'm a private module1's method");
		console.log("I'm visible only to module1's methods");
		console.log("I can access " + property1);
		console.log("I can access " + protectedMethods.property1);
		console.log("I can access " + publicMethods.property1);
		console.log("I can access " + protectedMethods.property2);
		console.log("I can access " + publicMethods.property2);
	};

	protectedMethods.property1 = "Protected module1's properties";
	protectedMethods.method1 = function () {
		console.log("I'm a protected module1's method");
		console.log("I'm visible to module1 and module2's methods");
		console.log("I can access " + property1);
		console.log("I can access " + protectedMethods.property1);
		console.log("I can access " + publicMethods.property1);
		console.log("I can access " + protectedMethods.property2);
		console.log("I can access " + publicMethods.property2);
	};

	publicMethods.property1 = "Public module1's properties";
	publicMethods.method1 = function () {
		console.log("I'm a public module1's method");
		console.log("I'm visible to everyone can access the outer object, in addition to module1 and module2's methods");
		console.log("I can access " + property1);
		console.log("I can access " + protectedMethods.property1);
		console.log("I can access " + publicMethods.property1);
		console.log("I can access " + protectedMethods.property2);
		console.log("I can access " + publicMethods.property2);
	};
	
	return {
		publicMethods: publicMethods,
		protectedMethods: protectedMethods
	};
});

modularizr.register('module2', function(publicMethods, protectedMethods){
	'use strict';
	var property2 = "Private property";
	var method2 = function () {
		console.log("I'm a private module2's method");
		console.log("I'm visible only to module2's methods");
		console.log("I can access " + property1);
		console.log("I can access " + protectedMethods.property1);
		console.log("I can access " + publicMethods.property1);
		console.log("I can access " + protectedMethods.property2);
		console.log("I can access " + publicMethods.property2);
	};

	protectedMethods.property2 = "Protected module2's properties";
	protectedMethods.method2 = function () {
		console.log("I'm a protected module2's method");
		console.log("I'm visible to module1 and module2's methods");
		console.log("I can access " + property1);
		console.log("I can access " + protectedMethods.property1);
		console.log("I can access " + publicMethods.property1);
		console.log("I can access " + protectedMethods.property2);
		console.log("I can access " + publicMethods.property2);
	};

	publicMethods.property2 = "Public module2's properties";
	publicMethods.method2 = function () {
		console.log("I'm a public module2's method");
		console.log("I'm visible to everyone can access the outer object, in addition to module1 and module2's methods");
		console.log("I can access " + property1);
		console.log("I can access " + protectedMethods.property1);
		console.log("I can access " + publicMethods.property1);
		console.log("I can access " + protectedMethods.property2);
		console.log("I can access " + publicMethods.property2);
	};
	
	return {
		publicMethods: publicMethods,
		protectedMethods: protectedMethods
	};
});

var myModularizr = modularizr.make('module1', 'module2');