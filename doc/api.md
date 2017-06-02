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

启动动画，startClip 控制是否启动内部的 `Clip`。  
如果已启动，则不会重复启动。  
如果已暂停，则恢复播放。

#### 4. stop()

停止动画

#### 5. pause()

暂停动画

#### 6. reset()

重置动画

重置全部的`Clip`状态，包括已完成和未完成的`Clip`

#### 7. getClips()

获取正在进行的`Clip`

##### 返回:

`Array.<Clip>` 


#### 7. destory()

析构函数，清空内部状态。


### Animation 事件

#### 1. on(eventName, handler)

添加事件

##### 参数:

* eventName: `string` 事件名称
* handler: `function` 事件回调函数

其中`eventName`支持类型: 

* `'start' | Animation.Event.START` Animation 启动
* `'stop' | Animation.Event.STOP`  Animation 停止
* `'pause' | Animation.Event.PAUSE` Animation 暂停
* `'reset' | Animation.Event.RESET` Animation 重置
* `'update' | Animation.Event.UPDATE`  Animation 每次更新调用时，此时未触发 Clip
* `'afterUpdate' | Animation.Event.AFTER_UPDATE`  Animation 每次更新 Clip 后触发
* `'complete' | Animation.Event.COMPLETE`  Animation 动画全部(Clip)结束触发

`update`handler 提供一个参数:

* timestamp: `number` 当前时间戳

#### 2.off(eventName, handler)

移除事件

参数:

* eventName: `string=` 事件名称，默认移除全部函数
* handler: `function=` 事件回调函数，默认移除`eventName`下的全部事件


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

#### duration: `number=1000` 

每次动画播放总时长，单位毫秒(ms)

#### repeat: `number=1`

动画重复次数，默认值 1

#### delay: `number=0` (optional)

动画首次运行延迟执行的时间(只有首次运行，重复播放的时间间隔不受影响)。  
单位: 毫秒(ms)，可选，默认值 0

#### interval: `number=0` (optional)

每次重复播放的间隔时间, 单位: 毫秒(ms)，可选，默认值 0。

#### yoyo: `boolean=false` (optional)

溜溜球模式，开启后，第二次重复时，动画变化会按原路返回。  
只有在 `repeat > 1`的时候生效。可选，默认关闭。

#### startAt: `number=[0, 1]` (optional)

动画起始位置，可以指定动画起始于总时长(`duration`)播放位置的百分比。默认值 0。  
例如: duration = 1000, startAt = 0.45 则表示动画从第 450ms 的状态下开始播放。

#### easing: `string|function` (optional)

* 时间缓动函数名称，默认为线性函数 'Linear'。

可选参数有: Linear, QuadraticIn, QuadraticOut, QuadraticInOut, CubicIn, CubicOut, CubicInOut, QuarticIn, QuarticOut, QuarticInOut, QuinticIn, QuinticOut, QuinticInOut, SinusoidalIn, SinusoidalOut, SinusoidalInOut, ExponentialIn, ExponentialOut, ExponentialInOut, CircularIn, CircularOut, CircularInOut, ElasticIn, ElasticOut, ElasticInOut, BackIn, 
BackOut, BackInOut, BounceIn, BounceOut, BounceInOut.

缓动函数效果，请参考[Easing DEMO](http://redmed.github.com/chito/example/easing.html)

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

### ShaderClip 方法

#### 1. chain(clip, ...clipN) 

链接/清除 `Clip`，被连接的`Clip`在当前`Clip`执行结束后，会被自动调用。

##### 参数: 

* clipN `Clip|undefined` 被连接的 Clip

例如，下面的 clipA 运行2次后，会自动调用 clipB，并执行1次。

```js
var ani = new Animation();

var clipA = new ShaderClip({ 
		duration: 1000,
		repeat: 2
	}, {
		x: [ 0, 100 ]
	});
	
var clipB = new ShaderClip({ 
		duration: 2000,
		repeat: 1
	}, {
		y: [ 100, 0 ]
	});

clipA.chain(clipB);

ani.addClip(clipA);
ani.start();

```

另外，使用`.chain()`可以进行循环调用。  
例如，clipB 执行结束后，可以链接 clipA 继续运行。当然，这种情况下，`Clip`会一直执行下去。直到调用`Animation.stop()`

```js

var ani = new Animation();

var clipA = new ShaderClip({ 
        duration: 1000,
        repeat: 2
    }, {
        x: [ 0, 100 ]
    });
    
var clipB = new ShaderClip({ 
        duration: 2000,
        repeat: 1
    }, {
        y: [ 100, 0 ]
    });

clipA.chain(clipB);
// 循环调用
clipB.chain(clipA);

ani.addClip(clipA);
ani.start();

```
清除作用链使用`clip.chain()`(不传值)即可。


### ShaderClip 事件

#### 1. on(eventName, handler)

添加事件

参数:

* eventName: `string` 事件名称
* handler: `function` 事件回调函数

其中`eventName`支持类型: 

* `'start' | ShaderClip.Event.START`  clip 启动
* `'update' | ShaderClip.Event.UPDATE`  clip 每次更新动画帧
* `'pause' | ShaderClip.Event.PAUSE`  clip 暂停
* `'stop' | ShaderClip.Event.STOP`  clip 停止
* `'complete' | ShaderClip.Event.COMPLETE`  clip  动画结束(repeat运行全部结束)
* `'repeatComplete' | ShaderClip.Event.REPEAT_COMPLETE`  clip repeat结束后(单词repeat执行结束后)  

其中 `update` handler 提供两个参数:

* progress: `number=[0, 1]` 缓动进度
* keyframe: `Object` 关键帧在当前进度下的值

例如: 

```js
let clip = new ShaderClip({
	duration: 2000,
	repeat: 10
}, {
	x: [0, 10]
})

clip.on(ShaderClip.Event.UPDATE, (progress, keyframe) => {
	console.log(progress) // output: 0 .. 0.5 .. 1 
	console.log(keyframe) // output: {x: 0} .. {x: 5} .. {x: 10}
})
```

#### 2.off(eventName, handler)

移除事件

参数:

* eventName: `string=` 事件名称，默认移除全部函数
* handler: `function=` 事件回调函数，默认移除`eventName`下的全部事件