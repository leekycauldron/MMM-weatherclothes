//MMM-ready-weather.js
Module.register("MMM-ready-weather", {

    // Module config.
    defaults: {
        api_key: "", // Get FREE API key from darksky.net (check documentation for api key link)
        lat: "40.123456", // Latitude 
        long: "-74.123456" // Longitude
},

	//main mod loop
	getDom: function() {
		//html element output temperature
		var weatherOut = document.createElement("weatherOut");
		//html element output clothing choice
		var clothingChoice = document.createElement("clothingChoice");
		//init and assign var to user's coordinates
        	long = this.config.long;
		//init and assign var to user's coordinates
        	lat = this.config.lat;
		//proxy to create a fetch req to DS
        	const proxy = "https://cors-anywhere.herokuapp.com/"
		//url to connect to API
        	const api = `${proxy}https://api.darksky.net/forecast/12fa8f6c761f04b1e096f824aeb3a36a/${lat},${long}`;
		//fetch JSON from DS
        	fetch(api)
		//return JSON
        	.then(response => {
          		return response.json();
   	 	})
		//get and filter the data
    		.then(data => {
			//current temperature
        		const temperature = data.currently.temperature;
			//temperature output in degrees celsius
        		weatherOut.innerHTML = Math.round((temperature - 32) * (5/9)) + "ºC";
			
			//switch case for the temperature
			switch(temperature){
				//check for temperature	
			}
			
    });


		return weatherOut;
	}
});
