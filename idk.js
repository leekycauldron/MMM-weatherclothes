Module.register("idk",{
	// Default module config.
	defaults: {
		app_key: "#############"
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.app_key;
		return wrapper;
	}
});
