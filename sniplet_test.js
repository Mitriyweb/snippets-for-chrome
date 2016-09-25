function timeConverter(UNIX_timestamp) {
	'use strict';
	var time = new Date(UNIX_timestamp).toString().match(/(\d{2}:\d{2}:\d{2})/)[0];
	return time;
}

function baseTesting() {
	'use strict';
	var message = {},
		connectTime = (window.performance.timing.connectEnd - window.performance.timing.connectStart) / 1000,
		loadTime = (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) / 1000,
		jQ = null,
		speed = {},
		timing = window.performance.timing,
		parametr = null,
		value = null,
		start = new Date(),
		stop = null,
		request = new XMLHttpRequest(),
		headers = {},
		cookies = {};
	
	request.open('HEAD', window.location, true);
	request.onload = request.onerror = function () {
		var tmp = request.getAllResponseHeaders();
		tmp.split("\n").map(function (h) {
			parametr = h.split(": ")[0];
			value = h.split(": ")[1];
			if (parametr && value) {
				headers[parametr] = {value: value};
			}
    });
		console.table(headers);
		console.table(cookies);
		console.table(speed);
		console.table(message);
	};

	request.send(null);

	if (document.cookie) {
		document.cookie.split(/; ?/).map(function (index) {
			parametr = index.split('=')[0];
			value = index.split('=')[1];
			if (parametr && value) {
				cookies[parametr] = {value: value};
			}
		});
	}
		

	for (parametr in timing) {
		value =  timing[parametr];
		if (value > 0) {
			value = timeConverter(value);
			speed[parametr] = {value: value};
		}
	}
	
	if (typeof $ !== 'underfined' && $) {
		jQ = $;
	}
	
	if (typeof jQuery !== 'undefined' && jQuery) {
		jQ = jQuery;
	}
			
	if (typeof jQ.fn !== 'undefined' && jQ.fn) {
		message.jquery = {value: 'jQuery version: ' + jQ.fn.jquery + ' has been found'};
		if (typeof angular !== 'undefined' && angular) {
			message.angular = {value: 'Angular version: ' + angular.version.full + ' has been found'};
		}
	}
	
	message.scripts = {value: document.scripts.length};
	message.styleSheets = {value: document.styleSheets.length};
	message.connected = {value: connectTime + ' sec'};
	message.loaded = {value: loadTime + ' sec'};
	
	stop = new Date();
	return (stop - start) / 1000 + 'sec';
}

if (document.readyState === "complete") {
	baseTesting();
} else {
	console.info('The page does not ready.');
}

//other for window.performance.timing
//connectEnd                 Time when server connection is finished.
//connectStart               Time just before server connection begins.
//domComplete                Time just before document readiness completes.
//domContentLoadedEventEnd   Time after DOMContentLoaded event completes.
//domContentLoadedEventStart Time just before DOMContentLoaded starts.
//domInteractive             Time just before readiness set to interactive.
//domLoading                 Time just before readiness set to loading.
//domainLookupEnd            Time after domain name lookup.
//domainLookupStart          Time just before domain name lookup.
//fetchStart                 Time when the resource starts being fetched.
//loadEventEnd               Time when the load event is complete.
//loadEventStart             Time just before the load event is fired.
//navigationStart            Time after the previous document begins unload.
//redirectCount              Number of redirects since the last non-redirect.
//redirectEnd                Time after last redirect response ends.
//redirectStart              Time of fetch that initiated a redirect.
//requestStart               Time just before a server request.
//responseEnd                Time after the end of a response or connection.
//responseStart              Time just before the start of a response.
//timing                     Reference to a performance timing object.
//navigation                 Reference to performance navigation object.
//performance                Reference to performance object for a window.
//type                       Type of the last non-redirect navigation event.
//unloadEventEnd             Time after the previous document is unloaded.
//unloadEventStart           Time just before the unload event is fired.
