import React from 'react'
import ReactDOM from 'react-dom'

/**
 * JSX 其实也是一个对象, 可以在 if 和 for 语句中使用 JSX
 * 可以把 JSX 赋值给变量，还可以作为方法的参数，作为方法的返回值
 * @type {({name: string, id: number})[]}
 */

let users = [{id: 1, name: "张三"}, {id: 2, name: "张三"}, {id: 3, name: "张三"}]
let elements = users.map((user, index) => (<p key={index}>{user.name}</p>))
ReactDOM.render(<div>{elements}</div>, document.getElementById('root'))

setTimeout(() => {
  let users = [{id: 2, name: "张三"}, {id: 1, name: "张三"}, {id: 3, name: "张三"}]
  let elements = users.map((user, index) => (<p key={index}>{user.name}</p>))
  ReactDOM.render(<div>{elements}</div>, document.getElementById('root'))
}, 3000)

/**
 * React 更新的时候会如何更新?
 * 1. 简单粗暴 把删除的，再插入全部的新元素，性能较差
 * 2. React 会把老的虚拟DOM和新的虚拟DOM进行比较，这个也就是所谓的 DOM Diff
 * 找到它们之间的差异，然后通过打补丁的方式更新差异
 */


// 参考阅读
// 1. 自己封装一个Object.freeze（）方法 https://www.cnblogs.com/rickdiculous/p/12240764.html
