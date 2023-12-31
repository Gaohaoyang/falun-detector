chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('first line detector: tab updated', tabId, changeInfo, tab)
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {
      message: 'tabUpdatedSendFromFLDetector',
    })
  }
})
