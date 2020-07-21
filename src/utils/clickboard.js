// 复制内容到剪切板功能，可单独使用
import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess () {
  Vue.prototype.$message({ // 需要在main.js中引入elementui并注册，此方法才能使用
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError () {
  Vue.prototype.$message({ // 需要在main.js中引入elementui并注册，此方法才能使用
    message: 'Copy failed',
    type: 'error'
  })
}

export default function handleClipboard (text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
