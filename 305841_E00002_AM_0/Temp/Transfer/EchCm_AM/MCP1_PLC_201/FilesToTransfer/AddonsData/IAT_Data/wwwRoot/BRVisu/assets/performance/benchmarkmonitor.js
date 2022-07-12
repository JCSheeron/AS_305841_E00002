(function (window, undefined) {

	'use strict';

	var _host = window.location.pathname,
		t = performance,
        _settings = {

        };
        

	var BreaseMonitor = function BreaseMonitor() {
		this.init();
		//this.timing = {
		//	navigationStart: performance.timing.navigationStart,
		//	unloadEventStart: performance.timing.unloadEventStart,
		//	fetchStart: performance.timing.fetchStart,
		//	connectStart: performance.timing.connectStart,
		//	connectEnd: performance.timing.connectEnd,
		//	requestStart: performance.timing.requestStart,
		//	responseStart: Performance.timing.responseStart,
		//	responseEnd: Performance.timing.responseEnd,
		//	domLoading: Performance.timing.domLoading
		//};

	},
    p = BreaseMonitor.prototype;

	p.init = function () {
		console.log("Benchmarkmonitor init");
		this.events = [];
		this.start();

	}

	p.profile = function (type, data) {
		var time = t.now();
		var entry = {
			time: time,
			type: type,
			detail: data
		};
		this.events.push(entry);
	}

	p.start = function () {
		document.onreadystatechange = this.readyHandler.bind(this);
		window.onbeforeunload = this.unloadHandler.bind(this);
		

	}

	p.stop = function () {
		document.removeEventListener("brease-binding", this.bindingHandler.bind(this))
		
	}

	p.readyHandler = function (e) {
		console.log("readyStateHandler", document.readyState);
		var entry = {
			time: t.now(),
			type: "readyStateChange",
			detail: {
				readyState: document.readyState
			}
		};
		this.events.push(entry);
		if (document.readyState === "complete") {
			this.timing = performance.timing;
		}
		

	};

	p.bindingHandler = function (e) {
		console.log("bindingHandler", e.detail);
		var entry = {
			time: t.now(),
			type: e.type,
			detail: e.detail
			};
		this.events.push(entry);

	};

	p.fragmentHandler = function (e) {
		console.log("fragmentHandler", e.type);
		e.detail.type = e.type;
		var entry = {
			time: t.now(),
			type: "fragment",
			detail: e.detail
		};
		this.events.push(entry);

	};
	p.uiHandler = function (e) {
		e.detail.type = e.type;
		var entry = {
			time: t.now(),
			type: "uiChange",
			detail: e.detail
		};
		this.events.push(entry);

	};

	p.compHandler = function (e) {
		e.detail.type = e.type;
		var entry = {
			time: t.now(),
			type: "component",
			detail: e.detail
		};
		this.events.push(entry);

	};

	p.unloadHandler = function () {
		var data = localStorage.breaseProfiler;
		if (data !== undefined) {
			data = JSON.parse(data);
		}
		else {
			data = {};
		}
		var url = data[_host];
		if (url === undefined) {
			data[_host] = [];
		}
		var item = {
			id : new Date(),
			timing: this.timing,
			events: this.events
		};

		data[_host].push(item);

		//var dataSave = JSON.stringify(data);
		//var blob = new Blob([dataSave], { type: "application/json" });
		//saveAs(blob, new Date() + "data.json");

		try {
			localStorage.setItem("name", "Hello World!"); //saves to the database, "key", "value"
			localStorage.setItem('breaseProfiler', JSON.stringify(data));
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Quota exceeded! Local Storage not Working Save data as JSON File'); //data wasn't successfully saved due to quota exceed so throw an error
				var dataSave = JSON.stringify(data);
				var blob = new Blob([dataSave], { type: "application/json" });
				saveAs(blob, new Date() + "data.json");
			}
			
		}
		

		


	}

	

	var breaseMonitor = new BreaseMonitor();

	if (typeof define === "function" && define.amd) {
		define(function () { return breaseMonitor; });
	}

	if (typeof window === "object" && typeof window.document === "object") {
		window.performanceMonitor = breaseMonitor;
	}

})(window);
