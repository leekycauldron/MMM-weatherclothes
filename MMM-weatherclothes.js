Module.register("MMM-weatherclothes", {

    // Module config.
    defaults: {
        api_key: "", // Get FREE API key from darksky.net (check documentation for api key link).
        lat: "43.8877171", // Latitude.
        long: "-79.3014735", // Longitude
		cof: "C",    //choose C (celsius) or F (farenheit) in capitals 
		refreshRate: 3600 //Format in seconds i.e. 1 second = 1.
},


	getStyles: function () {
		return ["font-awesome.css"];
	},



	start: function() {
		var timeFormat = this.config.refreshRate * 1000;
		console.log(`Starting Module: ${this.name}`)
		var self = this;
		setInterval( function(){
			self.updateDom(3000);
		}, timeFormat);
	},



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
		
 
		long = this.config.long;
			//init and assign var to user's coordinates
		lat = this.config.lat;
			//proxy to create a fetch req to DS
		const proxy = "https://cors-anywhere.herokuapp.com/"
			//url to connect to API
		const api = `${proxy}https://api.darksky.net/forecast/${this.config.api_key}/${lat},${long}`;
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
			const precipprob = data.daily.data(0).precipProbability;
				//temperature output in degrees celsius/ farenheit
			if(this.config.cof === "C"){
				window.weather = Math.round((temperature - 32) * (5/9));

			}
				
			else if(this.config.cof === "F"){
				window.weather = Math.round(temperature);

			}
				
			else{
				window.weather = "Invalid input in setting: 'cof'. Please Enter C (celsius) or F (farenheit).";
	
			}

			window.pp = precipprob * 100;

			if(window.weather <= 0){
				window.temp = "Wear a jacket. It is freezing outside!";
			}

			else if(window.weather > 0 && window.weather <= 10){
				window.temp = "I suggest you wear a sweater. It is a little bit chilly.";
			}
			else {
				window.temp =  "Wear some clothes";
			}
			let text = document.createTextNode(window.temp);
			wrapper.appendChild(text);	
		
		});
	
				
		return wrapper;
		
	}
});