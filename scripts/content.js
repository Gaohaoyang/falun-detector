const list = [
  {
    name: '新聞看點 李沐陽',
    youtubeName: 'MuYangShow',
  },
]

/**
 * @description Detect text in list
 * @returns {String | undefined}
 */
const detectTextInList = () => {
  let foundText = undefined
  list.forEach((item) => {
    const textContent = document.body.textContent || document.body.innerText
    if (textContent.indexOf(item.name) > -1) { // todo
      foundText = item.name
      return
    }
    if (textContent.indexOf(item.youtubeName) > -1) { // todo
      foundText = item.youtubeName
      return
    }
  })
  return foundText
}

/**
 *
 * @description Render tip
 * @param {String} foundText
 *
 */
const renderTip = (foundText) => {
  const tipDom = document.querySelector('.falun-detector-tip')
  if (tipDom) {
    tipDom.style.display = 'flex'
    tipDom.querySelector('.falun-detector-tip-found-text').innerText = foundText
  } else {
    const html = `
      <div class="falun-detector-tip">
        检测到页面包含 &nbsp;
        <span class="falun-detector-tip-found-text">${foundText}</span>，请注意这个可能是FLG系相关的内容，请注意辨别。
      </div>
    `
    document.body.insertAdjacentHTML('beforebegin', html)
  }
}

const hideTip = () => {
  const tipDom = document.querySelector('.falun-detector-tip')
  if (tipDom) {
    tipDom.style.display = 'none'
  }
}

const start = () => {
  window.addEventListener('locationchange', () => {
    console.log('location changed!')
  })
  window.addEventListener('popstate', (event) => {
    // Code here for URL change
    console.log('popstate')
  })
  const foundText = detectTextInList()
  if (foundText) {
    console.log('foundText', foundText)
    renderTip(foundText)
  } else {
    console.log('not found')
    hideTip()
  }
}

const init = () => {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'tabUpdatedSendFromFLDetector') {
      console.log('tabUpdatedSendFromFLDetector')
      start()
    }
  })
}

init()
