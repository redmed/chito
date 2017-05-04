## Animater 0.1.1

一个支持计算颜色变化的动画库。

### 1. 安装

您可以通过`npm`安装

```sh
npm i animater --save
```

或者直接[下载](./animater.js)库文件，通过`script`标签引用

```html
<script src="js/animater.js"></script>
```

### 2. 模块引入

`Animater`采用 `UMD` 的模块引用方式，因此可以考虑一下方式引用。


By ES6

```js
import { Animation, ShaderClip } from 'animater';
```

By AMD

```js
let Animater = require('animater');
let { Animation, ShaderClip } = Animater;
```

By global

```js
let { Animation, ShaderClip } = window.Animater;
```

### 3. 使用

```js
// 创建 Animation 实例，控制动画主进程
let ani = new Animation()

// 创建 ShaderClip 实例，控制具体动画片段
let clip = new ShaderClip({
	duration: 10000,
	repeat: 10
}, {
	x: [ 0, 10 ],
	y: [ 10, 0 ],
	color: [ '#ff0000', '#0000ff' ]
})

// 增加 Clip 的 Update 事件
clip.on(Clip.Event.UPDATE, (frame) => {
	// frame 中包含了当前时刻下的数据
	// frame.x
	// frame.y
	// frame.color
	// 根据数据绘制 UI
})

// 将 clip 添加至动画主进程
ani.addClip(clip)

// 启动动画
ani.start()

```

### 4. 文档

[API](./doc/api.md)

<!-- [DEMO](./demo) -->

### 5. 代码修改及本地调试

源码使用`ES6`语法开发，具体语法规则请参考[babelrc](./.babelrc)文件

```sh
# 1. 安装依赖
npm i

# 2. 运行本地开发环境
npm run dev

# 3. 打开浏览器调试 (或者自行打开浏览器，使用以下url)
open http://localhost:8082

```

### 许可
本软件 (Animater) 实施 BSD 许可协议