# x-vue-ui：
- 基于vue的ui库

## 注意
- 此UI框架是针对移动端开发，所以请使用移动端相关事件，如：`@touchend="handleTouchend"`

## config
- 所有组件打包到一起 `webpack.config.js`
- 组件单独打包 `webpack.single.config.js`

## components.json
- 组件引用路径

## 安装
- `npm install -S s-vue-ui`

## 全局引入
```
    import Sui from 's-vue-ui';
    
    Vue.use(Sui);
```
## 按需引入
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```
    [
      "component",
      {
        "libraryName": "s-vue-ui",
        "styleLibrary": {
          "name": "theme",
          "base": false
        }
      }
    ]
```
- 使用
```
    <template>
      <div class="app">
        <Button type="default">default</Button>
        <Button type="normal">normal</Button>
        <Button type="warning">warning</Button>
        <Button type="error">error</Button>
        <Button type="disabled">disabled</Button>
      </div>
    </template>
    
    <script>    
      import { Button } from 's-vue-ui';
      export default {
        name: 'App',
        components: { Button }
      }
    <script>
```
    
