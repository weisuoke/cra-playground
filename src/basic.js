import React from 'react'
import ReactDOM from 'react-dom'

// NOTE
// JSX
// jsx 编译成 createElement 是在 webpack 编译的时候，也就是打包的时候执行的
// 打包后的代码在浏览器里执行的时候,会执行函数，返回一个 JS 对象
let element1 = <h1 id="title">hello</h1>

let element2 = React.createElement("h1", {
  id: "title"
}, "hello")

// Todo 打印 element1 中的结果， 并分析结果中的内容
console.log('element1', element1)

/**
 * {
 *   type: 'h1',
 *   props: {
 *     id: title,
 *     children: 'hello' // NOTE 如果只有一个儿子， children 就是那个独生子。如果有多个儿子的话，children就是一个儿子的数组
 *     // 只有一个儿子，不使用数组的好处
 *     // 如果全是数组，每次都要按索引取第一个元素
 *     // React 很多时候儿子只有一个
 *   }
 * }
 */

// NOTE:
// 文本节点不需要用类型标识
// 如果一个元素只有一个儿子，儿子还是文本节点的话，React 进行了优化

// QA
// 每个父节点的子节点都只能是一个, 是基于什么考虑的

// render 方法会负责把虚拟 DOM 变成真实 DOM 插入到容器里
ReactDOM.render(<h1>hello</h1>, document.getElementById('root'))
