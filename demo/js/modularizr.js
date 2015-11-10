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
		//If a module with this name has already been registered throws an error
		if (registeredModules[name]) {
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
		//Else registers the module;
		registeredModules[name] = module;
		return true;
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
			//If module doesn't exist throws an error
			if (!registeredModules[module]) {
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
			//else applies module to the object
			object = registeredModules[module](object.publicScope, object.protectedScope, parameters);
			//If a module doesn't return an object with {protectedScope, publicScope} throws error
			if (!object.protectedScope || !object.publicScope) {
				throw {
					code: 4,
					name: "Error",
					description: "Module error",
					message: "The module '" + module + "' doesn't return the right object (it must return {protectedScope, publicScope}).",
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
				//If module doesn't exist throws an error
				if (!registeredModules[module]) {
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
				//else applies module to the object
				object = registeredModules[module](object.publicScope, object.protectedScope, parameters);
				//If a module doesn't return an object with {protectedScope, publicScope} throws error
				if (!object.protectedScope || !object.publicScope) {
					throw {
						code: 4,
						name: "Error",
						description: "Module error",
						message: "The module '" + module + "' doesn't return the right object (it must return {protectedScope, publicScope}).",
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