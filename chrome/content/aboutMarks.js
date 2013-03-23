try {
	Components.utils.import("resource://gre/modules/PlacesUtils.jsm");
	Components.utils.import("resource://gre/modules/NetUtil.jsm");
	Components.utils.import("resource://gre/modules/FileUtils.jsm");
} catch(ex) {
	Components.utils.import("resource://gre/modules/utils.js");
}

var aboutMarks = {
	taggingSvc: Components.classes["@mozilla.org/browser/tagging-service;1"]
	                           .getService(Components.interfaces.nsITaggingService),

	show: function() {

		alert("start");

		var allTags = aboutMarks.taggingSvc.allTags;
		let data = "";
		
		for (var i = 0; i < allTags.length; ++i)
		{
			var tag1uris = allTags[i];
			//alert(tag1uris);
			data += tag1uris + " ";
			data += tag1uris.length - 1;
			data += "\n";

			/*var allURLs = aboutMarks.taggingSvc.getURIsForTag(tag1uris);

			for (var j = 0; j < allURLs.length; ++j)
			{
				var url = allURLs[j];
				alert(url);
			}*/
		}

		let myFile = aboutMarks.getLocalDirectory();
 
		myFile.append("report.txt");
	 
		// file is nsIFile, data is a string
		 
		// You can also optionally pass a flags parameter here. It defaults to
		// FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE | FileUtils.MODE_TRUNCATE;
		var ostream = FileUtils.openSafeFileOutputStream(myFile);
		 
		var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].
		                createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
		converter.charset = "UTF-8";
		var istream = converter.convertToInputStream(data);
		 
		// The last argument (the callback) is optional.
		NetUtil.asyncCopy(istream, ostream, function(status) {
		  if (!Components.isSuccessCode(status)) {
		    // Handle error!
		    return;
		  }
		 
		  // Data has been written to the file.
		});

		alert("end");
	},

	getLocalDirectory : function() {
		let directoryService = Components.classes["@mozilla.org/file/directory_service;1"].
		getService(Components.interfaces.nsIProperties);
		
		// this is a reference to the profile dir (ProfD) now.
		let localDir = directoryService.get("ProfD", Components.interfaces.nsIFile);

		localDir.append("aboutMarks");

		if (!localDir.exists() || !localDir.isDirectory()) {
			// read and write permissions to owner and group, read-only for others.
			localDir.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0774);
		}

		return localDir;
	}
};

$(document).ready(function(){
  aboutMarks.show();
});
