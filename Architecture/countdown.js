/**
 * Created by TBtuo on 23/05/16.
 */
/**
 * Created by TBtuo on 23/05/16.
 */
/*
 * 1. 在类的构造函数作用域中处理私有数据成员
 我们要演示的这段代码是一个名为 Countdown 的类在 counter
 （初始值为 counter）变成0时触发一个名为 action 的回调函数。其中 action 和 counter 两个参数应被存储为私有数据。
 在这个实现方案中，我们将 action 和 counter
 存储在 constructor 这个类的环境里面。环境是指JS引擎存储参数和本地变量的内部数据结构，
 变量存在即可，无论是否进入一个新的作用域（例如通过一个函数调用或者一个类调用）。来看看代码*/
/*class Countdown {
 constructor(counter, action) {
 Object.assign(this,{
 dec(){
 if (counter<1) return;
 counter--;
 if (counter ===0){
 action();
 }
 }
 });
 }
 }

 let c = new Countdown(2, () => console.log('DONE'));
 c.dec();
 c.dec();*/
/*
 * 优点：

 私有数据非常安全；
 私有属性的命名不会与其他父类或子类的私有属性命名冲突。

 缺点：

 当你需要在构造函数内把所有方法（至少那些需要用到私有数据的方法）添加到实例的时候，代码看起来就没那么优雅了；
 作为实例方法，代码会浪费内存；如果作为原型方法，则会被共享。

 关于此方法的更多内容请参考：
 《Speaking Javascript》的 Private Data in the Environment of a Constructor
 (Crockford Privacy Pattern) (构造函数环境中的私有数据)章节*/

/*class Countdown {
 constructor (counter, action){
 this._counter = counter;
 this._action = action;
 }
 dec(){
 if (this._counter < 1) return;
 this._counter--;
 if (this._counter === 0){
 this._action();
 }
 }
 }*/
/*优点：

 代码比较美观；
 可以使用原型方法。

 缺点：

 不够安全，只能用规范去约束用户代码；
 私有属性的命名容易冲突。*/

/*
 * 3. 通过 WeakMaps 保存私有数据

 有一个利用 WeakMap 的小技巧，结合了方法一和方法二各自的优点：安全性和能够使用原型方法。
 可以参考以下代码：我们利用 _counter 和 _action 两个WeakMap来存储私有数据。*/
/*let _counter = new WeakMap();
 let _action = new WeakMap();

 class Countdown {
 constructor(counter, action){
 _counter.set(this, counter);
 _action.set(this,action);
 }
 dec(){
 let counter = _counter.get(this);
 if (counter <1) return;
 counter--;
 _counter.set(this,counter);
 if (counter === 0){
 _action.get(this)();
 }
 }
 }*/
/*_counter 和 _action 这两个 WeakMap 都分别指向各自的私有数据。由于 WeakMap 的设计目的在于键名是对象的弱引用，其所对应的对象可能会被自动回收，只要不暴露 WeakMap ，私有数据就是安全的。如果想要更加保险一点，可以将 WeakMap.prototype.get 和 WeakMap.prototype.set 存储起来再调用（动态地代替方法）。这样即使有恶意代码篡改了可以窥探到私有数据的方法，我们的代码也不会受到影响。但是，我们只保护我们的代码不受在其之后执行的代码的干扰，并不能防御先于我们代码执行的代码。

 优点：

 可以使用原型方法；
 比属性命名约定更加安全；
 私有属性命名不会冲突。

 Con:

 代码不如命名约定优雅
 * */

/*
 *4. 使用Symbol作为私有属性的键名

 另外一个存储私有数据的方式是用 Symbol 作为其属性的键名： */

const _counter = Symbol('counter');
const _action = Symbol('action');

class Countdown {
    constructor(counter, action){
        this[_counter] = counter;
        this[_action] = action;
    }
    dec(){
        if (this[_counter] < 1) return;
        this[_counter]--;
        if(this[_counter]===0){
            this[_action]();
        }
    }
}

/*每一个 Symbol 都是唯一的，这就是为什么使用 Symbol 的属性键名之间不会冲突的原因。并且，Symbol 某种程度上来说是隐式的，但也并不完全是：

 let c = new Countdown(2, () => console.log('DONE'));

 console.log(Object.keys(c));
 // []
 console.log(Reflect.ownKeys(c));
 // [Symbol(counter), Symbol(action)]

 优点：

 可以使用原型方法；
 私有属性命名不会冲突。

 缺点：

 代码不如命名约定优雅；
 不太安全：可以通过 Reflect.ownKeys() 列出一个对象所有的属性键名（即使用了 Symbol）。

 延伸阅读：

 Sect. “Keeping Data Private” in “Speaking JavaScript” (covers ES5 techniques)
 Chap. “Classes” in “Exploring ES6”
 Chap. “Symbols” in “Exploring ES6”
 * */

let c = new Countdown(2, ()=>console.log('DONE'));
c.dec();
c.dec();