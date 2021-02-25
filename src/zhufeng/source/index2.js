import React from 'react'
import ReactDOM from 'react-dom'

// 函数组件的实现
function FunctionComponent(props) {
  return (
    <div className="title" style={{backgroundColor: 'green', color: 'red'}}>
      <span>{props.name}</span>
      {props.children}
    </div>
  )
}

ReactDOM.render((
  <FunctionComponent name="zhufeng">
    1
  </FunctionComponent>
), document.getElementById("root"))
