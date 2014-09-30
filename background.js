var loaded=false;
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  if(loaded)return;
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({file: 'js/zepto.min.js'},
  	function(){
  		chrome.tabs.executeScript({file: 'js/marker.js'});
  	});
  loaded=true;
});