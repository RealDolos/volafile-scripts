// ==UserScript==
// @name        Volafile chat timestamps
// @namespace   volafile.improvements
// @description Adds timestamps to chat messages on Volafile.
// @match       https://volafile.io/r/*
// @include     https://volafile.io/r/*
// @version     6
// ==/UserScript==

/*
 *	@Author: Dongmaster
 *	@Author: lg188
 *
 *	Changelog:
 *	Version 1:
 *		Basic script
 *	Version 2:
 *		Cleaned out the script
 *	Version 3:
 *		Fixed the duplication bug
 * 	Version 4:
 *  		Fixed hours not having a 0 (zero) behind them if the hour is 9 or below.
 * 	Version 5:
 * 		Fixed moderators not being able to bring up the ban menu by clicking an IP.
 *  Version 6:
 *    Added a class to the timestamp (userscript_chat_timestamp).
 **/

console.debug("volafile-timestamps is running ");

function create_element(elem, text) {
    var uelem = document.createElement(elem);
    var uelem_text = document.createTextNode(text);
    
    uelem.appendChild(uelem_text);
    
    return uelem;
}

function id(input) {
    return document.getElementById(input);
}

var target = document.querySelector('#chat_messages');
var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		
		var nodes = mutation.addedNodes;
		
		for(var i = 0; i < nodes.length; i++) {
			var valid = nodes[i];
			var bla = valid.hasAttribute('timeAdded');

			if(bla == false ){
				addTimestamp(nodes[i]);
				valid.setAttribute('timeAdded','true');
			} else {
				valid.setAttribute("timeAdded", 'false');
			}
		}
	});
});

var config = {
	childList: true
};

var date, hours, minutes, seconds, finalTime;

function addTimestamp(node) {
	date = new Date();
	hours = date.getHours()
	minutes = date.getMinutes();
	seconds = date.getSeconds();
    
	if (seconds <= 9) {
		seconds = '0' + seconds;
	}
    
	if (minutes <= 9) {
		minutes = '0' + minutes;
	}
    
  if (hours <= 9) {
   	hours = '0' + hours;
	}
    
	finalTime = hours + ':' + minutes + ':' + seconds;
  
	var timestamp = create_element('SPAN', finalTime + ' | ');
	timestamp.setAttribute("class", "userscript_chat_timestamp");

	//var usernames = document.getElementsByClassName('username');
	var usernames = node.children[0];

	usernames.insertBefore(timestamp, usernames.childNodes[0]);
}

observer.observe(target, config);
