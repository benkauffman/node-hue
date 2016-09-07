
var hueInc = require("node-hue-api");
var HueApi = hueInc.HueApi;
var lightState = hueInc.lightState;
var bridgeip = "";
var hue = new HueApi();
var sleep = require('sleep');
// set this to your valid bridge username
var username = "fM3x8le6rXeRuCnIk2qpjAt258pYRuIVxIWVzSyd"; 


var displayError = function(err) {
    console.log(err);
};

var foundBridges = function(bridges) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridges));

    // use the first bridge
    var bridge = bridges[0];
    bridgeip = bridge.ipaddress;

    // try to log in as the user
    try {
    	// try logging in
    	var api = new HueApi(bridgeip, username);

    	// check if login is valid
    	api.config().then(function(result) {

    		// invalid usernames return a config object w/ very little data
    		// if "timezone" is missing then the username wasn't valid

    		if (result.timezone) {
    			// user is valid
    			console.log("VALID USER");

		    	// search for existing lights on the bridge
			    api.lights()
			    .then(function(result) {

			    	// DO SOMETHING WITH THE LIGHTS WE FOUND
			    	// TODO: move this out into a separate function or something
			    	
					console.log("Lights found: " + result.lights.length);

					console.log("Setting random colors & slow transition another random color");
					// set some light colors
				    result.lights.forEach(function(light) {
				    	//console.log(light);
				    	var lightid = light.id;

				    	// setLightState sends commands to the bridge for a given light
				    	// it can return a callback (in case you want to do things after you set the state)
				    	// but you can also send commands one after the other, like below

				    	// set random color & brightness
				    	var r = Math.floor(Math.random() * 256);
				    	var g = Math.floor(Math.random() * 256);
				    	var b = Math.floor(Math.random() * 256);
				    	var brightness = Math.floor((Math.random() * 150) + 50);
				    	var randomState = lightState.create().on().rgb(r,g,b).brightness(brightness);
				    	api.setLightState(lightid, randomState);

				    	// tell light to then transition to another random color over the next 5 seconds
				    	r = Math.floor(Math.random() * 256);
				    	g = Math.floor(Math.random() * 256);
				    	b = Math.floor(Math.random() * 256);
				    	api.setLightState(lightid, lightState.create().transition(2000).rgb(r,g,b));
				    });


					// kick off the next part after 5 seconds
					setTimeout(function () {

						// now let's set a random color every few seconds for the lights, looping 20 times
						var x = 0;
						var intervalID = setInterval(function () {

							console.log("Bonus Round " + (x+1));

						    result.lights.forEach(function(light) {
						    	//console.log(light);
						    	var lightid = light.id;

						    	// set random color & brightness
						    	// have the new color take effect in 50ms (fast)
						    	var r = Math.floor(Math.random() * 256);
						    	var g = Math.floor(Math.random() * 256);
						    	var b = Math.floor(Math.random() * 256);
						    	var brightness = ((x % 2) == 0) ? 100 : 250;
						    	var randomState = lightState.create().on().transition(50).rgb(r,g,b).brightness(brightness);
						    	api.setLightState(lightid, randomState);
						    });

						   if (++x === 20) {
						       clearInterval(intervalID);
						   }
						}, 1000);

					}, 5000);
					// now we're done

				});
    		}
    		else {
    			// user is invalid
    			console.log("INVALID USER");

		    	// login failed...so, try to register the user
			    console.log("Press the link button on your bridge...you have 10 seconds");

			    sleep.sleep(10); // sleep for ten seconds

			    // register the user on the bridge
			    hue.registerUser(bridgeip, "Hue Node Test App")
			    .then(function(result) {
				    console.log("Created user: " + JSON.stringify(result));
				    console.log("Keep a record of this username to log in with!");
				})
			    .fail(displayError);   
    		}
    	}).done();
    }
    catch (err) {
    	console.log(err);

 	
    }
};


// Look for the bridge
hueInc.nupnpSearch().then(foundBridges).done();