import "singleton.html";
import "@babel/polyfill";

/*
Factory 單例模式
  定義：保證一個類僅有一個實例，並提供一個訪問它的全局訪問點
  應用：單例模式是一種常用的模式，有一些對象我們往往只需要一個，
  比如線程池、全局緩存、瀏覽器中的 window 對象等。
*/

class SingleObject {
  login() {
    console.log("login...");
  }
}

SingleObject.getInstance = (function() {
  let instance;
  return function() {
    if (!instance) {
      instance = new SingleObject();
    }
    return instance;
  };
})();
let obj1 = SingleObject.getInstance();
obj1.login();
let obj2 = SingleObject.getInstance();
obj2.login();
console.log(obj1 === obj2);

// 應用場景
/*
1.) jQuery 只有一個$
2.) 登入框只有一個
3.) 購物車
4.) vuex、redux中的store
*/

// == jQuery 應用範例
/*
if (window.jQuery != null) {
  return window.jQuery;
} else {
  // 初始化...
}
*/

// == 登入框 應用範例
class LoginForm {
  constructor() {
    this.state = "hide";
  }
  show() {
    if (this.state === "show") {
      alert("目前為顯示狀態");
      return;
    }
    this.state = "show";
    console.log("登入框顯示");
  }
  hide() {
    if (this.state === "hide") {
      alert("目前為隱藏狀態");
      return;
    }
    this.state = "hide";
    console.log("登入框隱藏");
  }
}

// 只會引用到一個個創建的實例
LoginForm.getInstance = (function() {
  let instance;
  return function() {
    if (!instance) {
      instance = new LoginForm();
    }
    return instance;
  };
})();

// 測試
let login1 = LoginForm.getInstance();
login1.show();
let login2 = LoginForm.getInstance();
login2.hide();

console.log("login1 === login2", login1 === login2);
