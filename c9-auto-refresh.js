chrome.extension.sendRequest({}, function(response) {});
    

window.addEventListener("storage", function(e){
    var c9Live = JSON.parse( localStorage.getItem("c9Live") );

    var project = window.location.href.split('/workspace/'); //get project name
    if(c9Live) {
	    if( project[0] === c9Live.project ) { //if latest updated project is opened in this tab
	        if( c9Live.action === "autoRefresh" ){
	        	window.location.reload( true ); //refresh page
	        } else if( c9Live.action === "livePreview" ) {
	        	if( c9Live.currentFile ) {
	        		if( c9Live.currentFile === window.location.href )
		        		document.getElementsByTagName("html")[0].innerHTML = c9Live.fileContent;
		        	else
		        		window.location.href = c9Live.currentFile
	        	}
	        }
	    }
    }
});