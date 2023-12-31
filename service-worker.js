chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {
      message: 'tabUpdatedSendFromFLDetector',
      url: tab.url,
    })
  }
})
