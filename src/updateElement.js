import React from 'react'
import ReactDOM from 'react-dom'

/**
 *  React 元素是不可变的
 *
 *  React 只会更新必要的部分
 */

function tick() {
  const element = (
    <div>
      <div>当前时间</div>
      <span>
        { new Date().toLocaleTimeString() }
      </span>
      <div>中国</div>
    </div>
  )

  ReactDOM.render(element, document.getElementById("root"))
}

setInterval(tick, 1000)
