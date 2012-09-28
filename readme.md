#C9Live

Live preview and Auto refresh for Cloud9 IDE in Google Chrome.

##Features
- **Live Preview** for current opened file
- **Auto Refresh** for all opened tabs with files from current project
- **Auto switching** between files when in **Live Preview** mode

##Install
1. Download and extract the zip from the unpacked folder
2. Install the plugin:
![image](https://www.evernote.com/shard/s132/sh/bd17ccdf-1d09-4398-8ff5-56206b3f8ac6/e75ee73e075ca691fec28138c3b9bdbd/res/4d9f0a77-71f8-40dd-951b-9c606a250969/skitch.png)

	- Go to Properties - > Extensions or type chrome:extensions in your address bar
	- Be sure to have **Developer mode** turned **ON**
	- Click Load unpacked extension
	- Select the folder that contains C9Live
	
##How it works

### Start previewing
First you need to start previewing a file the old fashion way by clicking the default Cloud9 IDE **Preview button**

Than arrange your tabs side by side so you can see them both at the same time.

![image](https://www.evernote.com/shard/s132/sh/01082dfc-34fa-4990-887b-21466015e723/3c9381472703dfef151116d3eeb91aba/res/06645cc0-f5df-4342-87e0-10572038c813/skitch.png)

### New IDE buttons
In the top bar of the IDE you'll find the triggers for Live Preview and Auto Refresh. They can be both turned on simultaneously.
![image](https://www.evernote.com/shard/s132/sh/e5fbfc30-3313-4e75-a595-95827ca4b282/d1d567bc7ac6bfa605f3153d9e8fc68f/res/9cc84845-fc4f-4a2b-834d-64967cfc4145/skitch.png)

####Live Preview
Every time you make a change to your document, C9Live will take the content of your current page and inject it into the preview tab. If you're previewing a different file, the plugin will first switch to the latest edited file than start live preview. This work best for writing HTML & CSS

####Auto Refresh
There are times when you need a refresh to the page ( to fire up javascript events ). Then you can turn on Auto Refresh mode. Every time your document is saved C9Live will refresh any files from your current project that are open for preview. So for example you're editing a code.js file and you need to see how your changes affect your project. You can start previewing your index.html and every time you change the code.js file the HTML document will be refreshed. Sweet, right?