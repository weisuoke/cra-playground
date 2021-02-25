import React from './react'
import ReactDOM from './react-dom'

/**
 * 合成事件和批量更新
 * 1. 在 React 里，事件的更新可能是异步的，是批量的，不是同步的
 *    调用 state 之后状态并没有立即更新,而是先缓存起来了
 *    等事件函数完成之后，再进行批量更新，一次更新并重新渲染
 * 因为 jsx 事件处理函数是 react 控制的，只要归 react 控制就是批量，只要不归 react 管了，就是非批量
 */

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      number: 0
    }
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    }, () => {
      console.log('cb1')
    })
    console.log(this.state.number)
    this.setState({
      number: this.state.number + 1
    }, () => {
      console.log('cb2')
    })
    console.log(this.state.number)
    setTimeout(() => {
      this.setState({
        number: this.state.number + 1
      })
      console.log(this.state.number)
      this.setState({
        number: this.state.number + 1
      })
      console.log(this.state.number)
    }, 1000)
  }

  render() {
    return (
      <div>
        <p>{ this.state.name }</p>
        <p>{ this.state.number }</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter name="weisuoke"/>, document.getElementById('root'))
