function startDevtools() {
	'use strict';
	const resource = document.createElement('script'); 
    resource.async = 'true';
    resource.src = 'http://localhost:8098';
    const script = document.getElementsByTagName('script')[0];
    script.parentNode.insertBefore(resource, script);
};

startDevtools();