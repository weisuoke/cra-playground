import { createDOM } from './react-dom'
class Component {
  static isReactComponent = true

  constructor(props) {
    this.props = props
    this.state = {};
  }

  setState(partialState) {
    let state = this.state;
    this.state = {...state, ...partialState}
    let newVdom = this.render();
    updateClassComponent(this, newVdom);
  }

  render() {
    throw new Error("此方法为抽象方法，需要子类实现")
  }
}

function updateClassComponent(classInstance, newVdom) {
  let oldDom =  classInstance.dom;  // 取出这个类组件上传渲染的真实 DOM
  let newDom = createDOM(newVdom);
  oldDom.parentNode.replaceChild(newDom, oldDom)
  classInstance.dom = newDom
}

export default Component
