import { addEvent } from './event'

/**
 * 1. 把 vdom 虚拟DOM 变成真实DOM dom
 * 2. 把虚拟DOM上的属性更新或同步到 dom 上
 * 3. 把此虚拟DOM的儿子也都变成真实DOM挂载到自己的dom上 dom.appendChild
 * 4. 把自己挂载到容器上
 * @param vdom 要渲染的虚拟 DOM
 * @param container 要把虚拟 DOM 转换成真实 DOM 并插入到哪个容器中去
 */
function render(vdom, container) {
  const dom = createDOM(vdom)
  container.appendChild(dom)
}

/**
 * 把虚拟DOM变成真实DOM
 * @param vdom 虚拟DOM
 */
export function createDOM(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }

  // 否则，它就是一个虚拟 DOM 对象，也就是 React 元素
  let { type, props } = vdom
  let dom

  if (typeof type === 'function') { // 函数组件
    if (type.isReactComponent) { // 说明这个type是一个类组件的虚拟DOM元素
      return mountClassComponent(vdom)
    } else {
      return mountFunctionComponent(vdom);
    }
  } else { // 原生组件
    dom = document.createElement(type);
  }

  // 使用虚拟DOM的属性更新刚创建出来的真实DOM的属性
  updateProps(dom, props)

  // 如果只有一个儿子，并且这个儿子是一个文本
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children;
    // 如果只有一个儿子，并且这个儿子是一个虚拟DOM元素
  } else if (typeof props.children === 'object' && props.children.type) {
    // 把儿子变成真实DOM插到自己身上
    render(props.children, dom)
    // 如果儿子是一个数组的话，说明儿子不止一个
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else {
    document.textContent = props.children ? props.children.toString() : "";
  }

  // 把真实DOM作为一个DOM属性放在虚拟DOM上。为以后更新做准备
  // vdom.dom = dom;

  return dom
}

/**
 * 把一个类型为自定义函数组件的虚拟DOM转化为真实DOM
 * @param vdom
 */
function mountFunctionComponent(vdom) {
  let { type: FunctionComponent, props } = vdom
  let renderVdom = FunctionComponent(props)
  return createDOM(renderVdom)
}

/**
 * 1. 创建类组件的实例
 * 2. 调用类组件实例的 render 方法获得返回的虚拟DOM (React元素)
 * 3. 把返回的虚拟DOM转成真实的DOM进行挂载
 * @param vdom 类型为类组件的虚拟DOM
 */
function mountClassComponent(vdom) {
  // 解构类的定义和类的属性对象
  let {type, props} = vdom
  // 创建类的实例
  let classInstance = new type(props)
  // 调用实例的 render 方法返回要渲染的虚拟DOM 对象
  let renderVdom = classInstance.render()
  // 根据虚拟对象创建真实 DOM 对象
  let dom = createDOM(renderVdom)
  classInstance.dom = dom
  return dom;
}

/**
 *
 * @param childrenVdom 儿子们的虚拟DOM
 * @param parentDOM 父亲们的真实DOM
 */
function reconcileChildren(childrenVdom, parentDOM) {
  for(let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    render(childVdom, parentDOM);
  }
}

/**
 * 使用虚拟DOM的属性更新刚创建出来的真实DOM的属性
 * @param dom 真实 DOM
 * @param newProps 新属性对象
 */
function updateProps(dom, newProps) {
  for(let key in newProps) {
    if (key === 'children') continue; // 单独处理，不在此处处理
    if (key === 'style') {
      let styleObj = newProps.style;
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr]
      }
    } else if (key.startsWith('on')) {
      // 给真实DOM加属性的话，onclick
      // dom[key.toLocaleLowerCase()] = newProps[key]
      addEvent(dom, key.toLocaleLowerCase(), newProps[key])
    }else {  // 在 JS 中，dom.className = 'title'
      dom[key] = newProps[key];
    }
  }
}

const ReactDOM = { render }
export default ReactDOM
