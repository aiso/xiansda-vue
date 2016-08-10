# xiansda-vue
> 基于vue、vuex、vue-router实现的移动端SPA框架模版

## Technologies
- Vue
- Vuex
- Vue-Router
- PostCSS
- Webpack
- Koa
- ES6

## Change Logs


## Plans
- 修改c-form组件用法
- 修改c-image组件，支持Lazyload
- 数据缓存
- components组件目录化，将样式移到对应组件文件夹中

## Quick Start

```bash
$ git clone git@https://github.com/aiso/xiansda-vue.git
$ cd xiansda-vue
$ npm install
$ npm start
# open http://localhost:3200
```
## Docs
```
# open http://localhost:3200/#!/docs
```

## Demo
```
# open http://localhost:3200/#!/demo
```

## Usage
|Command|Description|
|---|---|
|npm install|Install dependencies|
|npm run dev|Run webpack and restart server with hot-reload enabled|
|npm run dev:weinre|Run webpack and restart server with hot-reload enabled and open weinre function|
|npm start|Run webpack and server with hot-reload enabled|
|npm run deploy|Build assets for development use, dumped in `./dist`|
|npm run deploy:prod|Build assets for production use, dumped in `./dist`|
|npm run start:prod|Run static server to check `dist` files|
|npm run weinre|Run weinre server|


## Regulation
- 使用 ES6 编写
- 数据使用vuex管理
- 使用 .vue 单文件组件，组件中不建议直接写css
- 组件commponents以c-开头，view公共组件以v-开头
- 逻辑尽量写在 script 里，保持 template 逻辑简单
- i18n, validator，request 可以正常使用，components中的组件还不稳定，随时会改
- 不限制使用何种 UI 组件，可以使用第三方，或自己开发（请尽量考虑复用性）
- 尽量使用小的依赖库
- 整体尽量向 [vue2.0](https://github.com/vuejs/vue/issues/2873) 靠近
- v-for中禁止使用$index and $key，vue2.0会去掉
- 禁止使用partials、elementDirective、$dispatch、$broadcast等
- v-model 中的debounce尽量少用


## Directories
```
redx-vue
├── bin
├── build
├── config
├── server
│   ├── lib
│   └── middleware
└── src                                 #核心代码
    ├── components                      #ui组件库（目前自建）
    ├── plugins                         #插件库
    │   ├── i18n
    │   ├── iscroll
    │   └── validator
    ├── routes                          ＃路由
    ├── static                          ＃静态文件
    │   ├── docs
    │   ├── i18n                        
    │   └── images
    ├── themes                          ＃主题
    │   └── default
    │       ├── components              
    │       ├── fonts                   
    │       ├── images
    │       ├── mixins                  
    │       ├── variables               
    │       └── views                   
    ├── utils                           ＃公共库（request）
    ├── views                           ＃业务组件
    │   ├── common                      
    │   ├── demo                        
    │   └── docs                        
    └── store                              ＃vuex数据管理
        ├── plugins
        └── modules
```

## Link
- [vue](https://github.com/vuejs/vue) 
- [vue-router](https://github.com/vuejs/vue-router)
- [vuex](https://github.com/vuejs/vuex)
- [vue-resource](https://github.com/vuejs/vue-resource)
- [vue-cli](https://github.com/vuejs/vue-cli)
- [vue-devtools](https://github.com/vuejs/vue-devtools)
- [awesome-vue](https://github.com/vuejs/awesome-vue)
- [plato Boilerplate](https://github.com/crossjs/plato)

## License

MIT &copy; [Redx](https://github.com/redgang)