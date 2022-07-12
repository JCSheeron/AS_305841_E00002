(function (window, undefined) {

	'use strict';

	
        

	var BreaseAutomator = function BreaseAutomator(steps) {
		//this.data = data;
		//window.onload = this.init.bind(this);
		this.init(steps);
		

	},
    p = BreaseAutomator.prototype;

	p.init = function (steps) {
		console.log("Automator init");
		//window.onbeforeunload = this.unloadHandler.bind(this);
		//this.data = localStorage.breaseAutomator;
		if (this.data === undefined) {
			
			this.data = {
				currentstep: 0,
				steps : steps,
				};
		}

		else {
			this.data = JSON.parse(this.data)
			
			
		}

		
		//this.process();
		

	}

	p.process = function () {
		var len = this.data.steps.length;
		if (this.data.currentstep >= len) {
			console.log("finished")
			document.dispatchEvent(new CustomEvent("automator_finished"));
			return;

		}
		console.log("Automator process");
		var index = this.data.currentstep;
		if (this.data.steps[index].state === undefined) {
			this.data.steps[index].state = "started";

			if (this.data.steps[index].event !== undefined) {
				var event = this.data.steps[index].event;
				this.startStepBind = this.startStep.bind(this);
				document.getElementById(event.id).addEventListener(event.event, this.startStepBind);
			}

			if (this.data.steps[index].pathname !== undefined) {
				window.location.pathname = this.data.steps[index].pathname;
				console.log("hash")
			}

			if (this.data.steps[index].hash !== undefined) {
				window.location.hash = this.data.steps[index].hash;
				console.log("hash")
			}

			if (this.data.steps[index].script !== undefined) {

				var args = this.data.steps[index].script.slice(1);
				var fun = this.data.steps[index].script[0];
				console.log("script", fun, args);
				window[fun].apply(window, args);

			}

			if (this.data.steps[index].event === undefined) {
				this.startStep();
			}

			
			

		}

		
	};
	p.reset = function () {
		this.data.currentstep = 0;
	}

	p.startStep = function (e) {
		var index = this.data.currentstep;
		
		if (e !== undefined) {
			console.log(e.type);
			var event = this.data.steps[index].event
			e.target.removeEventListener(event.event, this.startStepBind);
		}
		var that = this;
		var t = setTimeout(function () {
			that.next();
		}, this.data.steps[index].timeout);
	};


	p.next = function () {
		console.log("Automator next");
		var index = this.data.currentstep;
		this.data.steps[index].state = "finished";
		this.data.currentstep++;
		this.process()

	}

	p.unloadHandler = function () {
		
		//localStorage.breaseAutomator = JSON.stringify(this.data);




	}

	var breaseAutomator = BreaseAutomator;

	if (typeof define === "function" && define.amd) {
		define(function () { return breaseAutomator; });
	}

	if (typeof window === "object" && typeof window.document === "object") {
		window.breaseAutomator = breaseAutomator;
	}

	

})(window);
