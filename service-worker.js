chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log('changeInfo', changeInfo, tab)
    chrome.tabs.sendMessage(tabId, {
      message: 'tabUpdatedSendFromFLDetector',
      url: tab.url,
    })
  }
})
