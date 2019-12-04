Module.register("MMM-ready-weather", {

    // Module config defaults.
    defaults: {
        api_key: "", // Get FREE API key from darksky.net
        lat: "40.123456", // Latitude
        long: "-74.123456" // Longitude
},


	getDom: function() {
		var wrapper = document.createElement("div");
        	long = this.config.long;
        	lat = this.config.lat;
        	const proxy = "https://cors-anywhere.herokuapp.com/"
        	const api = `${proxy}https://api.darksky.net/forecast/12fa8f6c761f04b1e096f824aeb3a36a/${lat},${long}`;

        	fetch(api)
        	.then(response => {
          		return response.json();
   	 	})
    		.then(data => {
        		const temperature = data.currently.temperature;
        //const {[1,2,3,4,5,6,7,8,9,,10,11,12,13,14,15,16,17,18,19,20]}
        //console.log(data)
        		wrapper.innerHTML = Math.round((temperature - 32) * (5/9)) + "ºC";
    });


		return wrapper;
	}
});
