const list = [
  {
    name: '新聞看點 李沐陽',
    youtubeName: 'MuYangShow',
  },
]

/**
 * @description Detect text in list
 * @param {String} url
 * @returns {String | undefined}
 */
const detectTextInList = (url) => {
  let foundText = undefined

  const uploadInfoContent =
    document.querySelector('#owner').textContent || document.querySelector('#owner').innerText

  console.log('----uploadInfoContent----', uploadInfoContent)

  list.forEach((item) => {
    // check url
    if (url.indexOf(item.name) > -1) {
      foundText = item.name
      return
    }
    if (url.indexOf(item.youtubeName) > -1) {
      foundText = item.youtubeName
      return
    }

    // check uploader
    if (uploadInfoContent.indexOf(item.name) > -1) {
      foundText = item.name
      return
    }
    if (uploadInfoContent.indexOf(item.youtubeName) > -1) {
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
        <div>
          检测到页面包含
        </div>
        <div class="falun-detector-tip-small">
          Detected that the page contains
        </div>
        <span class="falun-detector-tip-found-text">${foundText}</span>
        <div>
          请注意可能是法沦功系相关的内容，请注意辨别。
        </div>
        <div class="falun-detector-tip-small">
          Please note that it may be content related to the Falun Gong. Please discern accordingly.
        </div>
        <img class="falun-detector-tip-found-close" src="https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/pics/xmark-solid.svg" alt="close" />
      </div>
    `
    document.body.insertAdjacentHTML('afterbegin', html)
  }
}

const hideTip = () => {
  const tipDom = document.querySelector('.falun-detector-tip')
  if (tipDom) {
    tipDom.style.display = 'none'
  }
}

/**
 *
 * @param {String} url
 */
const start = (url) => {
  const foundText = detectTextInList(url)
  if (foundText) {
    console.log('foundText', foundText)
    renderTip(foundText)
  } else {
    console.log('not found')
    hideTip()
  }
  document.querySelector('.falun-detector-tip-found-close').addEventListener('click', () => {
    hideTip()
  })
}

const init = () => {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'tabUpdatedSendFromFLDetector') {
      console.log('tabUpdatedSendFromFLDetector')
      hideTip()
      setTimeout(() => {
        start(request.url)
      }, 2000)
    }
  })
}

init()
