var modularizr = (function(){
	'use strict';
	var publicScope = {};
	var registeredModules = {};
	
	publicScope.register = function(name, module){
		if (!registeredModules[name]) {
			registeredModules[name] = module;
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
	
	publicScope.singleton = function(modules, parameters){
		//Te object to make
		var object = {publicScope: {}, protectedScope: {}};
		
		//Loop trought modules and append module to the object
		modules.forEach(function(module){
			if (registeredModules[module]) {
				object = registeredModules[module](object.publicScope, object.protectedScope, parameters);
			}
			else {
				throw {
					code: 2,
					name: "Error",
					description: "Module doesn't exist",
					message: "Module with name '" + module + "' hasn't been registered yet",
					toString: function(){
						return this.name + ": " + this.message;
					} 
				};
			}
		});
		return object.publicScope;
	};

	publicScope.class = function(modules){
		return function(){
			var object = {publicScope: {}, protectedScope: {}};
			var argLen, parameters = [], a;
			
			/* Arrayfy arguments, don't use, 
			 * var parameters = Array.prototype.slice.call(arguments);
			 * see: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
			 */
			argLen = arguments.length; for (a = 0; a < argLen; a++) {parameters[a] = arguments[a];}
			
			modules.forEach(function(module){
				if (registeredModules[module]) {
					object = registeredModules[module](object.publicScope, object.protectedScope, parameters);
				}
				else {
					throw {
						code: 2,
						name: "Error",
						description: "Module doesn't exist",
						message: "Module with name '" + module + "' hasn't been registered yet",
						toString: function(){
							return this.name + ": " + this.message;
						} 
					};
				}
			});
			return object.publicScope;
		};
	};
	
	return publicScope;
}());