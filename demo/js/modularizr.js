var MODULARIZR = (function(){
	'use strict';
	var publicScope = {};          //The object MODULARIZR
	var registeredModules = {};    //The modules' pairs {name: module}
	
	/**
	 * Registers a module for use it to build singletons or classes
	 * @author Fakkio84 [lazzaroni@jeflab.it]
	 * @param {string} name - The module's name 
	 * @param {function(publicScope, protectedScope, parameters): {publicScope, protectedScope}} module - The module's body
	 * @returns {boolean} - true if all went ok
	 */
	publicScope.register = function(name, module){
		if (!registeredModules[name]) {
			registeredModules[name] = module;
			return true;
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
	
	/**
	 * Builds a singleton from the modules passing them an optional array of parameters
	 * @author Fakkio84 [lazzaroni@jeflab.it]
	 * @param {string[]} modules - An array of module names from which to build the singleton
	 * @param {*[]} [parameters] - An optional array of parameters that will be passed to each modules
	 * @returns {object} - The resulting object built from the modules application
	 */
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

	/**
	 * Builds a "class" function from the modules
	 * @author Fakkio84 [lazzaroni@jeflab.it]
	 * @param {string[]} modules - An array of module names from which to build the "class" function
	 * @param {*[]} [parameters] - An optional array of parameters that will be passed to each modules
	 * @returns {function(...*):classFunction} - The resulting "class" function built from the modules application. It takes an arbitrary number of arguments and passes them to the modules.
	 */
	publicScope.class = function(modules, parameters){
		return function(){
			var object = {publicScope: {}, protectedScope: {}};
			
			//append argument array to the optional parameters array
			parameters = (parameters || []).concat(Array.prototype.slice.call(arguments));
			
			modules.forEach(function(module){
				if (registeredModules[module]) {
					object = registeredModules[module](object.publicScope, object.protectedScope, parameters);
				}
				else {
					throw {
						code: 3,
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