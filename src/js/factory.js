import "factory.html";
import "@babel/polyfill";

// Factory 工廠模式設計原則
/*
1.) 構造函數和創建者(new 實例)分離
2.) 符合開放封閉原則
*/

class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log(`${this.name} init`);
  }
  fun1() {
    console.log("fun1");
  }
  fun2() {
    console.log("fun2");
  }
}

// 將new Product封裝在Creator內
class Creator {
  create(name) {
    return new Product(name);
  }
}

// 測試
const creator = new Creator();
const mars = creator.create("Mars");
mars.init();
mars.fun1();

// 應用場景
/*
1.) jQuery - $('div')
2.) React.createElement
3.) vue異步組件
*/

// == jQuery 應用範例
class jQuery {
  constructor(selector) {
    const slice = Array.prototype.slice;
    const dom = slice.call(document.querySelectorAll(selector));
    const len = dom ? dom.length : 0;
    for (let i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || "";
  }
  append(node) {}
  addClass(name) {}
  html(data) {}
  // ...
}

// 將new jQuery封裝在$內
window.$ = function(selector) {
  return new jQuery(selector);
};

const p = $("p");
console.log(p);

// == React.createElement 應用範例
/*
虛擬dom
class Vnode(tag, attrs, children) {
  // ....
}
將new Vnode封裝在React.createElement內
React.createElement = function(tag, attrs, children) {
  return new Vnode(tag, attrs, children)
}

原本 JSX
var profile =
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
  </div>

React.createElement編譯完後
var profile =
  React.createElement("div", null,
    React.createElement("img", { src: "avatar.png", className: "profile"}),
    React.createElement("h3", null, [user.firstName, user.lastName].join(' '))
  );
*/

// == vue異步組件 應用範例
/*
Vue.component('async-example', function(resolve, reject) {
  setTimeout(function() {
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
*/
