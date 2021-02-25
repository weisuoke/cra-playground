import { updateQueue } from './Component'

/**
 * 给真实DOM添加事件处理函数
 * 为什么要这么做？合成事件？为什么要做事件委托或者事件代理
 * 1. 做兼容处理，不同的浏览器 event 是不一样的。处理浏览器的兼容性
 * 2. 可以在你写的事件处理函数之前和之后做一些事情，比如修改
 *    之前 updateQueue.isBatchingUpdate = true;
 *    之后 updateQueue.batchUpdate()
 * @param dom 真实DOM
 * @param eventType 事件类型
 * @param listener 监听函数
 */
export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {})
  store[eventType] = listener
  if (!document[eventType]) {
    // 事件托管，不管你给哪个DOM元素上绑事件，最后都统一代理到document上去
    document[eventType] = dispatchEvent
  }
}

let syntheticEvent = {}

function dispatchEvent(event) {
  let { target, type } = event; // 事件源 = button 那个DOM元素 类型 type = click
  let eventType = `on${type}`;  // onclick
  updateQueue.isBatchingUpdate = true;  // 把队列设置成批量更新模式
  syntheticEvent = createSyntheticEvent(event);
  while (target) {
    let { store } = target;
    let listener = store && store[eventType];
    listener && listener.call(target, syntheticEvent)
    target = target.parentNode
  }
  for(let key in syntheticEvent) {
    syntheticEvent[key] = null
  }
  updateQueue.batchUpdate()
}

function createSyntheticEvent(nativeEvent) {
  for(let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key]
  }
  return syntheticEvent
}
