/* ------------------------------------------------------------------------------------------
 * This is to simulate a file is saved
 * --------------------------------------------------------------------------------------- */
var maxTries = 20;

function getPlaceholder(){
    if( $(".c9-mbar-logo .fakehbox.aligncenter:nth-child(2)").length ) {
        var previewBar = $(".c9-mbar-logo .fakehbox.aligncenter:nth-child(2)")
        var refreshBar = $(previewBar).clone();
        $("*:not(.c9-divider-double)", refreshBar).remove();


        /* ------------------------------------------------------------------------------------------
         * CSS Style
         * --------------------------------------------------------------------------------------- */
        var c9Live = JSON.parse( localStorage.getItem("c9Live") )

        $("<style id='c9LiveStyle'></style")
            .html(
                "#refreshBar {\
                    padding: 0 8px !important;\
                    -webkit-perspective: 100px;\
                }\
                #refreshBar .c9-divider-double {\
                    padding-right: 0 6px !important\
                }\
                .c9LiveBtn {\
                    background: -webkit-linear-gradient(top, #2B2B2B 0, #292929 50%, #191919 50%, #2B2B2B 100%);\
                    border: 1px solid black;\
                    border-radius: 3px;\
                    box-shadow: 0 0 0 1px rgba(255,255,255,.1) inset;\
                    cursor: pointer;\
                    display: inline-block;\
                    font-family: Helvetica;\
                    font-size: 8px;\
                    font-weight: bold;\
                    height: 21px;\
                    line-height: 21px;\
                    margin: 0 2px 0;\
                    padding: 0 8px;\
                    text-shadow: 0 1px 0 black;\
                    text-transform: uppercase;\
                }\
                .c9LiveBtn.active {\
                    background: -webkit-linear-gradient(top, #238316 0, #1E7D14 50%, #176F10 50%, #1E7D14 100%);\
                    box-shadow: 0 0 0 1px rgba(255,255,255,.1) inset;\
                    text-shadow: none;\
                    -webkit-transform: rotateX(-360deg);\
                }")
            .appendTo($("head"));
        
        /* ------------------------------------------------------------------------------------------
         * Buttons
         * --------------------------------------------------------------------------------------- */
        var livePreviewBtn = $("<div id='c9LivePreviewBtn' class='c9LiveBtn' style='color: white;'>LIVE</div>");
        if( c9Live )
            if( c9Live.livePreview ) {
                $( livePreviewBtn ).addClass("active");
            }

        var autoRefreshBtn = $("<div id='c9AutoRefreshBtn' class='c9LiveBtn' style='color: white;'>Refresh</div>");
        // console.log( c9Live );
        if( c9Live )
            if( c9Live.autoRefresh ) {
                $( autoRefreshBtn ).addClass("active")
            }

        $(".c9LiveBtn").live("click", function(){
            // console.log( $(this).attr("id") );

            $(this).toggleClass("active");
            /* ------------------------------------------------------------------------------------------
             * SAVE IT TO LOCALSTORAGE
             * --------------------------------------------------------------------------------------- */
            var c9Live = JSON.parse( localStorage.getItem("c9Live") );

            if( !c9Live ){
                var project = window.location.href.match(/^[^?#]+/)[0];
                if (project[project.length - 1] == "/")
                    project = project.slice(0, -1);

                c9Live = {
                    project: project
                }
            }
            if( $(this).attr("id") === "c9LivePreviewBtn" ){
                if( $(this).hasClass("active") ) {
                    c9Live.livePreview = true;
                } else {
                    c9Live.livePreview = false;
                    c9Live.action = false;
                }
            } else if( $(this).attr("id") === "c9AutoRefreshBtn" ){
                if( $(this).hasClass("active") ) {
                    c9Live.autoRefresh = true;
                } else {
                    c9Live.autoRefresh = false;
                    c9Live.action = false;
                }
            }

            setTimeout(function() {
                localStorage.setItem("c9Live", JSON.stringify( c9Live ));
            }, 20);

        });

        $( "<div id='refreshBar'></div>" )
            .append( livePreviewBtn, autoRefreshBtn )
            .appendTo( refreshBar );
        previewBar.before(refreshBar);

    }else if( maxTries-- ){
        setTimeout(getPlaceholder, 250);
    }
}
getPlaceholder();

var code = '(' + function() {
    //get project name
    var project = window.location.href.match(/^[^?#]+/)[0];
    if (project[project.length - 1] == "/")
        project = project.slice(0, -1);

    var previewInterval = 250;
    /* ------------------------------------------------------------------------------------------
     * Live preview
     * --------------------------------------------------------------------------------------- */
    var livePreview = function(){
        var btn = document.getElementById("c9LivePreviewBtn");
        //if the button is active
        if( btn )
            if( (' ' + btn.className + ' ').indexOf(' ' + 'active' + ' ') > -1 ){
                var c9Live = JSON.parse( localStorage.getItem("c9Live") );
                if( c9Live ) {
                    if( c9Live.livePreview ) {
                        c9Live.currentFile = window.location.href + tabEditors.activepage.substr( tabEditors.activepage.indexOf("/workspace") );
                        c9Live.fileContent = tabEditors.getPage().$doc.getValue();
                        c9Live.project = project;
                        c9Live.action = "livePreview";

                        setTimeout(function() {
                            localStorage.setItem("c9Live", JSON.stringify( c9Live ));
                        }, 20);
                    }
                }
            }

        setTimeout(livePreview, 250);

    }
    setTimeout(livePreview, previewInterval);

    /* ------------------------------------------------------------------------------------------
     * Auto Refresh
     * --------------------------------------------------------------------------------------- */
    var timer, c9Live;
    var autoRefresh = function(e) {
        if (e.silentsave)
            return;
        var c9Live = JSON.parse( localStorage.getItem("c9Live") );
        if( c9Live ){
            if( c9Live.autoRefresh ) {
                c9Live.timestamp = new Date().getTime(),
                c9Live.project = project
                c9Live.action = "autoRefresh";
                
                timer = setTimeout(function() {
                    localStorage.setItem("c9Live", JSON.stringify( c9Live ));
                }, 20);
            }
        }

    };
    
    var maxTries = 20;
    function register() {
        if (!window.ide && maxTries--) 
            setTimeout(register, 500);
        else if (window.ide) 
            window.ide.addEventListener("afterfilesave", autoRefresh);
    }
    register();
} + ')();';

//inject JS into header
setTimeout(function() {
    var script = document.createElement('script');
    script.textContent = code;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}, 500);

localStorage.removeItem("c9AutoRefresh");