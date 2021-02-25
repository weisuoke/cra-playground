import { createDOM } from './react-dom'

// 更新队列
export let updateQueue = {
  isBatchingUpdate: false,  // 当前是否处于批量更新模式，默认值是 false
  updaters: new Set(),
  batchUpdate() { // 批量更新
    for (let updater of this.updaters) {
      updater.updateClassComponent()
    }
    this.isBatchingUpdate = false
  }
}

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance  // 类组件实例
    this.pendingStates = [] // 等待生效的的状态，可能是一个对象，也可能是一个函数
    this.callbacks = []
  }

  addState(partialState, callback) {
    this.pendingStates.push(partialState) // 等待更新的或者说等待生效的状态
    if (typeof callback === 'function') {
      this.callbacks.push(callback);  // 状态更新后的回调
    }
    if (updateQueue.isBatchingUpdate) { // 如果当前的批量模式。先缓存 updater
      updateQueue.updaters.add(this)  // 本次 setState 调用结束
    } else {
      this.updateClassComponent();  // 直接更新组件
    }
  }

  updateClassComponent() {
    let { classInstance, pendingStates, callbacks } = this;
    // 如果有等待更新的状态对象的话
    if (pendingStates.length > 0) {
      classInstance.state = this.getState() // 计算新的状态
      classInstance.forceUpdate();
      callbacks.forEach(cb => cb())
      callbacks.length = 0
    }
  }

  getState() {
    let { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      // 如果 pendingState 是一个函数的话，传入老状态，返回新状态，再进行合并
      if (typeof nextState === 'function') {
        nextState = nextState.call(classInstance, state)
      }
      state = {...state, ...nextState}
    })
    pendingStates.length = 0 // 清空数组
    return state
  }
}

class Component {
  static isReactComponent = true

  constructor(props) {
    this.props = props
    this.state = {};
    this.updater = new Updater(this)
  }

  setState(partialState, cb) {
    this.updater.addState(partialState, cb)
  }

  forceUpdate() {
    let newVdom = this.render();
    updateClassComponent(this, newVdom);
  }

  render() {
    throw new Error("此方法为抽象方法，需要子类实现")
  }
}

// 更新类组件
function updateClassComponent(classInstance, newVdom) {
  let oldDom =  classInstance.dom;  // 取出这个类组件上传渲染的真实 DOM
  let newDom = createDOM(newVdom);
  oldDom.parentNode.replaceChild(newDom, oldDom)
  classInstance.dom = newDom
}

export default Component
