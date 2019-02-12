import "observer.html";
import "@babel/polyfill";

/*
觀察者模式 Observers 又稱為 Publish / Subscribe 發布/訂閱模式
物件之間的一對多依賴關係，當一個物件狀態發生改變時，所有依賴於它的物件都得到通知。

= 應用場景
1.) 網頁事件綁定
2.) Promise
3.) jQuery callbacks
4.) nodejs 自定義事件
5.) Vue、React 組件的生命週期觸發
6.) Vue watch
*/

// 基礎範例
// Subject 主題
// 保存狀態，狀態變化後觸發所有觀察者對象
class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }

  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }
  // 遍歷所有觀察者調用更新方法
  notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.update();
    });
  }
  // 新增觀察者
  attach(observer) {
    this.observers.push(observer);
  }
}

// 觀察者
class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }

  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`);
  }
}

// 測試
let subject = new Subject();

// 三個觀察者訂閱同一個主題
let observer1 = new Observer("observer1", subject);
let observer2 = new Observer("observer2", subject);
let observer3 = new Observer("observer3", subject);

// 主題一更新狀態，就會觸發以上有訂閱的三個觀察者 update() 方法
subject.setState(1);
subject.setState(2);

// == 應用場景範例 - Promise 圖片加載
/*
Promise 裡面的 resolve()跟 reject(), 只要調用，就會更新狀態
更新狀態時就會觸發對應 function, .then() 跟 .catch() 來執行接續步驟
*/
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject("圖片載入失敗");
    };
    img.src = src;
  });
}

const imgSrc =
  "https://images.pexels.com/photos/1095965/pexels-photo-1095965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const result = loadImg(imgSrc);
result
  .then(img => {
    console.log("圖片載入完成 ", img);
  })
  .catch(err => console.log(err));

// == 應用場景範例 - jQuery Callbacks
// 自定義事件，跟 callback
const callbacks = $.Callbacks();
callbacks.add(info => console.log("fn1", info));
callbacks.add(info => console.log("fn2", info));
callbacks.add(info => console.log("fn3", info));
callbacks.fire("hello");
callbacks.fire("fire");

// == 應用場景範例 - Nodejs 自定義事件
// 使用 events 內的 EventEmitter API
const EventEmitter = require("events").EventEmitter;
const emitter1 = new EventEmitter();

// 監聽 some 事件
emitter1.on("some", () => {
  console.log("some event is occured 1");
});
emitter1.on("some", () => {
  console.log("some event is occured 2");
});

// 觸發 some 事件
emitter1.emit("some");

// 監聽 some2 事件 + 接收參數
emitter1.on("some2", name => {
  console.log("some2 event is occured", name);
});
// 觸發 some2 事件 + 傳遞參數
emitter1.emit("some2", "Mars");

// 任何建構函數都可繼承 EventEmitter 的 on、emit 方法
class Mars extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }
}

const mars = new Mars("Mars");
mars.on("sayHello", function() {
  console.log(`Hello , I'm ${this.name}`);
});
setTimeout(() => {
  mars.emit("sayHello");
}, 1000);
