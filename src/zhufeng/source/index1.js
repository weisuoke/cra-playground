// import React from 'react'
import React from 'react'
import ReactDOM from 'react-dom'

let element1 = (
  <div className="title" style={{ color: 'red', backgroundColor: 'green' }}>
    <span>hello</span>
    world
  </div>
)

// Todo JSX -> React.createElement
// NOTE:
// React17 以前 JSX 转换成 React.createElement。但是在 React17 之后不再转成 React.createElement
// let element2 = React.createElement();
// let element2 = _jsx("div");

console.log(JSON.stringify(element1, null, 2))

ReactDOM.render(element1, document.getElementById('root'))

/**
 {
    "type": "div",
    "key": null,
    "ref": null,
    "props": {
      "className": "title",
      "children": [
        {
          "type": "span",
          "key": null,
          "ref": null,
          "props": {
            "children": "hello"
          },
          "_owner": null,
          "_store": {}
        },
        "world"
      ]
    },
    "_owner": null,
    "_store": {}
  }
 */
