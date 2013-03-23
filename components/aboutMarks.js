Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
const Cc = Components.classes;
const Ci = Components.interfaces;

function AboutMarks() {}
AboutMarks.prototype = {
  newChannel : function(aURI)
  {
    if(!aURI.spec == "about:marks") return;

    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    var channel = ios.newChannel("chrome://aboutMarks/content/aboutMarks.xhtml", null, null);
    channel.originalURI = aURI;
    return channel;
  },

  getURIFlags: function(aURI)
  {
    return Ci.nsIAboutModule.ALLOW_SCRIPT;
  },

  classDescription: "About Marks",
  classID: Components.ID("{e9f5ffc0-93ab-11e2-9e96-0800200c9a66}"),
  contractID: "@mozilla.org/network/protocol/about;1?what=marks",
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule])
}

/**
* XPCOMUtils.generateNSGetFactory was introduced in Mozilla 2 (Firefox 4).
* XPCOMUtils.generateNSGetModule is for Mozilla 1.9.2 (Firefox 3.6).
*/
if (XPCOMUtils.generateNSGetFactory)
    var NSGetFactory = XPCOMUtils.generateNSGetFactory([AboutMarks]);
else
    var NSGetModule = XPCOMUtils.generateNSGetModule([AboutMarks]);
