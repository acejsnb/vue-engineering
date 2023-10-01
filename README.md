# vue-engineering：
- 本项目基于vue3 + vite4 + typescript + less
- 建议node版本16+
- 项目支持.vue写法&tsx写法（建议使用tsx）

## 目录
 - 📁 config
   - 📝 dev.config.ts 开发配置
   - 📝 prod.config.ts 打包配置
 - 📁 i18n 国际化翻译（key规范：多个单词下划线命名）
 - 📁 public 静态资源目录，打包会把目录里的所有文件拷贝到输出目录的更目录（注意：不要在此手动添加任何文件）
 - 📁 src 开发模板目录
   - 📁 assets 全局静态资源
   - 📁 components 公共组件
   - 📁 scripts 存放项目运行依赖脚本
   - 📁 template 存放模板
   - 📁 views 存放公共布局
 - 📁 tenant 租户配置
 - 📁 theme 主题

## 启动命令
   - `npm run dev` 启动模板开发环境
   - `npm run build` 启动所有配置的模板打包
   - `npm run dev:tenant` 启动单租户开发环境
   - `npm run build:tenant` 启动单租户打包





