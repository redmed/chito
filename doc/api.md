## API 文档

## Animation

动画主控进程


### Animation 方法

#### 1. addClip(clip)

添加`Clip`实例至动画主进程

##### 参数:  

* clip `Clip|Array.<Clip>`  添加的`Clip`实例

#### 2. removeClip(clip)

在动画主进程中移除`Clip`实例。

##### 参数:  

* clip `Clip=` 	`可选` 移除的`Clip`实例，默认移除全部。

#### 3. start()

启动动画，会同时启动内部的 `Clip`。如果已启动，则不会重复启动。

#### 4. stop()

停止动画

#### 5. restart()

重启动画

#### 6. getClips()

获取正在进行的`Clip`

##### 返回:

`Array.<Clip>` 


#### 7. destory()

析构函数，清空内部状态。

---

## ShaderClip

动画执行片段，提供配置计算动画中各属性变换。

### ShaderClip 构造函数

`new ShaderClip(options, keyframe)`

##### 参数: 

* options `options` 动画配置项

* keyframe `options` 关键帧属性配置

具体配置请参考下面文档: 

#### 1. 动画配置项

```js
options = {
	duration: 1000, // 每次动画播放总时长，单位: 毫秒ms
	repeat: 10, // 动画重复次数
	delay: 1000, // 动画起始运行延迟运行时间，单位: 毫秒ms
	interval: 200, // 重复播放的间隔时间, 单位: 毫秒ms
	yoyo: false, // 溜溜球模式，会按照动画会按原路返回，且占用一次repeat
	startAt: 0.2, // 动画起始位置，0 - 1 区间
	easing: 'Linear' // 时间算法，默认线性算法
}
```

#### duration: `number` 

每次动画播放总时长，单位毫秒

#### repeat: `number=0`

动画重复次数，默认值 0

#### delay: `number=0` (optional)

动画首次运行延迟执行的时间(只有首次运行，重复播放的时间间隔不受影响)。  
单位: 毫秒ms，可选，默认值 0

#### interval: `number=0` (optional)

每次重复播放的间隔时间, 单位: 毫秒ms，可选，默认值 0。

#### yoyo: `boolean=false` (optional)

溜溜球模式，开启后，第二次重复时，动画变化会按原路返回。  
只有在 `repeat > 1`的时候生效。可选，默认关闭。

#### startAt: `number=[0, 1]` (optional)

动画起始位置，可以指定动画起始于总时长(`duration`)播放位置的百分比。默认值 0。  
例如: duration = 1000, startAt = 0.45 则表示动画从第 450ms 的状态下开始播放。

#### easing: `string|function` (optional)

* 时间缓动函数名称，默认为线性函数 'Linear'。

可选参数有: Linear, QuadraticIn, QuadraticOut, QuadraticInOut, CubicIn, CubicOut, CubicInOut, QuarticIn, QuarticOut, QuarticInOut, QuinticIn, QuinticOut, QuinticInOut, SinusoidalIn, SinusoidalOut, SinusoidalInOut, ExponentialIn, ExponentialOut, ExponentialInOut, CircularIn, CircularOut, CircularInOut, ElasticIn, ElasticOut, ElasticInOut, BackIn, 
BackOut, BackInOut, BounceIn, BounceOut, BounceInOut.

<!-- 缓动函数效果，请参考[DEMO]() -->

* 也可以使用自定义缓动函数。

只要保证以下两点:  
1. 自定义函数接受一个缓动进度 `k`, 范围为 [0, 1]  
2. 必须返回一个和`k`相关的值，范围为 [0, 1]

例如:   

```js
function tenStepEasing(k) {
	return Math.floor(k * 10) / 10;
}
```

各个参数关系请参考下图:

```text
               startAt                   |           yoyo             |            |   yoyo   |
start()          |                       |          repeat            |   repeat   |  repeat  |
 |----------|-----------------|----------|-----------------|----------|------- ... |------ ...|
    delay        duration       interval      duration       interval

```


#### 2. keyframe 关键帧配置

`Object - Key.<string>: Value.<Array>`  

```js
keyframe = {
	x: [ 0, 10, 20 ], // x 从 0 -> 10 -> 20 变化
	y: [ 10, 0, -10 ],
	color: [ '#f00', '#0f0', '#00f' ], // color 从 #f00 -> #0f0 -> #00f 变化
	borderColor: [ 'red', 'blue' ],
	backgroundColor: [ 'rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 255, 0.9)' ]
}
```

* `key`: `string` 属性名称
* `value`: `Array.<number|color>` 数组中指定了数据变化的关键帧，变化过程会按照缓动函数进行。   
其中数据格式支持 `number` 和 `CSS` 的 `color` 类型 - 颜色名称, #RRGGBB, #RGB, rgb(R,G,B), rgba(R,G,B,A)   
其中，`Array` 的长度必须 >1，否则 `value` 不会变化。
