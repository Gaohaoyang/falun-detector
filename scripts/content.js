const list = [
  {
    name: '干净世界',
    linkKeywords: 'ganjingworld',
  },
  {
    name: '新聞看點 李沐陽',
    linkKeywords: 'MuYangShow',
  },
  {
    name: '天亮時分',
    linkKeywords: 'TianLiangTimes',
  },
  {
    name: '世界的十字路口 唐浩',
    linkKeywords: 'TangHaoCrossroads',
  },
  {
    name: '新聞拍案驚奇 大宇',
    linkKeywords: 'DayuShow',
  },
  {
    name: '江峰时刻',
    linkKeywords: 'JiangFengTimes',
  },
  {
    name: '蕭茗看世界',
    linkKeywords: 'user-tc3ev4bs8i',
  },
  {
    name: '睿眼看世界',
    linkKeywords: 'user-tp1lk6kj1g',
  },
  {
    name: '文昭談古論今',
    linkKeywords: 'wenzhaoofficial',
  },
  {
    name: '新唐人電視台',
    linkKeywords: 'NTDCHINESE',
  },
  {
    name: '中國禁聞',
    linkKeywords: 'Health8899-ml5ct',
  },
  {
    name: '弟子規動畫卡通',
    linkKeywords: 'heaven_kid_',
  },
  {
    name: '未解之謎 扶搖',
    linkKeywords: 'WJZM-FY',
  },
  {
    name: 'China Uncensored',
    linkKeywords: 'ChinaUncensored',
  },
  {
    name: 'America Uncovered',
    linkKeywords: 'AmericaUncovered',
  },
  {
    name: '老北京茶館',
    linkKeywords: 'BeijingTeahouse',
  },
  {
    name: '石濤.TV',
    linkKeywords: 'TVNo-dy2wx',
  },
  {
    name: 'Mr.姜光宇',
    linkKeywords: 'MrFunnyNewsJGY',
  },
  {
    name: '方菲時間',
    linkKeywords: 'fangfeitime',
  },
  {
    name: '郝毅博 Ben Hedges',
    linkKeywords: 'laowaikanzhongguo',
  },
  {
    name: '秦鵬觀察',
    linkKeywords: 'user-iz1qr7vh6j',
  },
  {
    name: '石山視點',
    linkKeywords: 'shishansoutlook7810',
  },
  {
    name: '珍言真語',
    linkKeywords: 'ZhenYanZhenYu',
  },
  {
    name: '遠見快評 唐靖遠',
    linkKeywords: 'TangJingYuan',
  },
  {
    name: '役情最前線 Zac主播',
    linkKeywords: 'zac2147',
  },
  {
    name: '新聞大破解',
    linkKeywords: 'News_Insight',
  },
  {
    name: '薇羽看世間',
    linkKeywords: 'weiyuksj',
  },
  {
    name: 'New Realm Studios',
    linkKeywords: 'NewsDetox',
  },
  {
    name: '真觀點',
    linkKeywords: 'zhenguandian',
  },
  {
    name: '橫河觀點',
    linkKeywords: 'hengheguandian',
  },
  {
    name: '紀元頭條頻道',
    linkKeywords: 'epochheadlines',
  },
  {
    name: '雅蘭訪談',
    linkKeywords: 'Yalantalk',
  },
  {
    name: '馨香雅句',
    linkKeywords: 'user-hn5rn5xv9m',
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
    document.querySelector('#owner')?.textContent || document.querySelector('#owner')?.innerText
  const uploadInfoContentATag = document.querySelector('#owner a')
  console.log('----uploadInfoContent----', uploadInfoContent)

  list.forEach((item) => {
    // check url
    if (url.indexOf(item.name) > -1) {
      foundText = item.name
      return
    }
    if (url.indexOf(item.linkKeywords) > -1) {
      foundText = item.name
      return
    }

    // check uploader
    if (uploadInfoContent && uploadInfoContent.indexOf(item.name) > -1) {
      foundText = item.name
      return
    }
    if (uploadInfoContent && uploadInfoContent.indexOf(item.linkKeywords) > -1) {
      foundText = item.linkKeywords
      return
    }
    if (uploadInfoContentATag && uploadInfoContentATag.href.indexOf(item.linkKeywords) > -1) {
      foundText = item.linkKeywords
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
  const closeDom = document.querySelector('.falun-detector-tip-found-close')
  if (closeDom) {
    closeDom.addEventListener('click', () => {
      hideTip()
    })
  }
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
