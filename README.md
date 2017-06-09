## Chito (原 Animater)

[![](https://img.shields.io/npm/v/chito.svg)](https://www.npmjs.com/package/chito)
[![](https://api.travis-ci.org/redmed/chito.svg?branch=develop)](https://www.travis-ci.org/redmed/chito)

`赤兔` 一个支持计算颜色变化的动画库。


### 1. 安装

您可以通过`npm`安装

```sh
npm i chito --save
```

或者直接[下载](./chito.js)库文件，通过`script`标签引用

```html
<script src="js/chito.js"></script>
```

### 2. 模块引入

`Chito`采用 `UMD` 的模块引用方式，因此可以考虑以下方式引用。


By AMD + ES6

```js
import { Animation, Clip } from 'chito';
```

By global

```js
let { Animation, Clip } = window.Chito;
```

### 3. 使用

HTML

```html
<div id="p1">
</div>
```

Javascript

```js
// 创建 Animation 实例，控制动画主进程
let ani = new Animation()

// 创建 Clip 实例，控制具体动画片段
let clip = new Clip({
	duration: 10000,
	repeat: 10
}, {
	x: [ 0, 10 ],
	y: [ 10, 0 ],
	color: [ '#ff0000', '#0000ff' ]
})

// 增加 Clip 的 Update 事件
clip.on('update', (progress, frame) => {
	// frame 中包含了当前时刻下的数据
	// 根据数据绘制 UI
	let $el = document.getElementById('p1');

	$el.style.left = frame.x + 'px'
	$el.style.top = frame.y + 'px'
	$el.style.backgroundColor = frame.color
})

// 将 clip 添加至动画主进程
ani.addClip(clip)

// 启动动画
ani.start()
```

```js
// 暂停动画
ani.pause()
```
```js
// 停止动画
ani.stop()
```

### 4. 文档

[API](./doc/api.md)文档

### 5. 例子

* [HelloWorld](https://redmed.github.io/chito/example/01.helloworld.html)
* [Yoyo](https://redmed.github.io/chito/example/02.yoyo.html)
* [Delay & Interval](https://redmed.github.io/chito/example/03.delay_interval.html)
* [StartAt](https://redmed.github.io/chito/example/04.startat.html)
* [Easing](https://redmed.github.io/chito/example/05.easing.html)
* [Chain](https://redmed.github.io/chito/example/06.chain.html)

### 6. 代码修改及本地调试

源码使用`ES6`语法开发，具体语法规则请参考[babelrc](./.babelrc)文件

```sh
# 代码下载
git clone https://github.com/redmed/chito

# 1. 安装依赖
npm i

# 2. 运行本地开发环境
npm run dev

# 3. 打开浏览器调试 (或者自行打开浏览器，使用以下url)
open http://localhost:8082

```

### 许可
本软件 (Chito) 实施 BSD 许可协议
