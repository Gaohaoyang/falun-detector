chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab) => {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js
  console.log('tabId', tabId)
  console.log('changeInfo', changeInfo)
  console.log('tab', tab)
  if (changeInfo.status === 'complete') {
    console.log('changeInfo', changeInfo.url)
    chrome.tabs.sendMessage(tabId, {
      message: 'tabUpdatedSendFromFLDetector',
    })
  }
})
