Module.register("MMM-weatherclothes", {
    defaults: {
        api_key: "", // Get FREE API key from darksky.net (check documentation for api key link).
        lat: "43.8877171",
        long: "-79.3014735",
		cof: "C",    
		refreshRate: 300000 
},


	getStyles: function() {
		return [
				"MMM-weatherclothes.css",
		];
	},	


	//Refreshes the module every x minutes.
	start: function() {
		var timeFormat = this.config.refreshRate;
		console.log(`Starting Module: ${this.name}`)
		var self = this;
		setInterval( function(){
			self.updateDom();
		}, timeFormat);
	},


	//Gets the time and formats it into a easier-to-read format.
	getTime: function() {
		let date = new Date();
		let hour = date.getHours();
		let minute = date.getMinutes();
		let time = hour + ":" + minute;

		return time;
	},

	getDom: function() {
    	var wrapper = document.createElement("div");
		let time = this.getTime();
		wrapper.className = "MMM-weatherclothes-wrapper";
		let clothing = [];
		window.imgs = " ";
		window.tempDep = false;
		
		long = this.config.long;
			
		lat = this.config.lat;

		const proxy = "https://cors-anywhere.herokuapp.com/"

		const api = `${proxy}https://api.darksky.net/forecast/${this.config.api_key}/${lat},${long}`;
	
		fetch(api)
	
		.then(response => {
			return response.json();
		})
		
		.then(data => {
			
			const temperature = data.currently.temperature;
	
			const hourly = data.hourly.summary;
			const icon = data.hourly.icon;
			//Check the temperature type.
			if(this.config.cof === "C"){
				window.weather = Math.round((temperature - 32) * (5/9));

			}
				
			else if(this.config.cof === "F"){
				window.weather = Math.round(temperature);

			}
				
			else{
				window.weather = "Invalid input in setting: 'cof'. Please Enter C (celsius) or F (farenheit).";
	
			}

			//Check if there is snow/rain scheduled for the day.
			hourly.toLowerCase();
			window.summary = hourly + "</p>";
			if(hourly.includes("snow")){
				clothing.push("hat");
				clothing.push("wjacket");
				clothing.push("scarf");
				clothing.push("gloves");
				clothing.push("slacks");
				clothing.push("boots");
			}
			
			else if(hourly.includes("rain")){
				clothing.push("rjacket");
				clothing.push("umbrella");
				clothing.push("slacks");
				clothing.push("rboots");
			}

			else {
				window.summary = hourly;
				tempDep = true;
			}
			/************************************************************************************************************************************************************************ */
			//Check the current temperature.
			if(window.weather <= -15){
				window.temp ="<p>It's extremely <span style='color:aqua;'>cold!</span> Wear a heavy jacket, scarf, hat, gloves or stay inside!";
				if(tempDep){
					clothing.push("hat");
					clothing.push("wjacket");
					clothing.push("scarf");
					clothing.push("gloves");
					clothing.push("slacks");
					clothing.push("boots");
				}
			}
			
			if(window.weather <= 0  && window.weather > -15){
				window.temp = "<p>Wear a jacket. It is <span style='color:aqua;'>freezing</span> outside!";
				if(tempDep){
					clothing.push("hat");
					clothing.push("wjacket");
					clothing.push("gloves");
					clothing.push("slacks");
					clothing.push("boots");
				}
			}

			else if(window.weather > 0 && window.weather <= 10){
				window.temp = "<p>I suggest you wear a sweater. It is a little bit <span style='color:grey;'>chilly.</span>";
				if(tempDep){
					clothing.push("wjacket");
					clothing.push("slacks");
					clothing.push("shoe");
				}
			}

			else if(window.weather > 10 && window.weather <= 20){
				window.temp = "<p>It is not too <span style='color:aqua;'>cold</span> but maybe wear a light hoodie.";
				if(tempDep){
					clothing.push("hoodie");
					clothing.push("tshirt");
					clothing.push("slacks");
					clothing.push("shoe");
				}
			}

			else if(window.weather > 20 && window.weather <= 30){
				window.temp = "<p>It is <span style='color:orange;'>warm.</span> I suggest going out with a t-shirt and shorts.";
				if(tempDep){
					clothing.push("tshirt");
					clothing.push("shorts");
					clothing.push("shoe");
				}
			}

			else if(window.weather > 30){
				window.temp = "<p>It's really <span style='color:red;'>hot!</span> A t-shirt, shorts should do and don't forget the sunscreen!";
				if(tempDep){
					clothing.push("tshirt");
					clothing.push("shorts");
					clothing.push("shoe");
				}
			}
			else {
				window.temp =  "Wear some clothes";
			}
			//Go through the list of clothes and save the images to a variable.
			for(let i = 0; i < clothing.length;i++){
				window.imgs += `<img src="modules/MMM-weatherclothes/images/${clothing[i]}.png" height="100" width="100"/>`;
			}
			//Combine all the text into one variable.
			let text = "<p style='font-size:25px; text-align:right;'>Your Daily Clothing Recommendations</p> <hr> " + window.temp + " " + window.summary + "<br> " + window.imgs;
			
			wrapper.innerHTML = text;
		});
	
				
		return wrapper;
		
	}

	//TODO: Add support for temperature in farenheit.
});