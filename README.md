# 产品工具合集官网

面向客户的静态产品合集站点，用于集中展示当前和后续新增的小工具，并为每个产品提供独立说明页。

线上站点：

- https://data-365.cn/
- https://www.data-365.cn/

备案信息：

- 浙ICP备2023041540号-3
- 备案链接：https://beian.miit.gov.cn/

## 项目定位

- 站点类型：客户侧产品合集官网
- 目标受众：客户、交付人员、维护人员
- 首页重点：展示已有产品、规划中产品和进入详情页的入口
- 详情页重点：说明产品用途、适用场景、界面截图、操作步骤和常见问题
- 内容原则：克制、清楚、偏工具说明，不做单产品强营销

## 技术结构

本项目是纯静态站点，不依赖构建工具。

```text
index.html                  首页
products/                   产品详情页
  scheduler.html            定时任务调度器说明页
src/
  styles.css                全站样式
  main.js                   首页筛选交互
public/images/              产品图标和真实界面截图
docs/PRD.md                 产品需求文档
```

## 本地预览

在项目根目录运行：

```powershell
cd "F:\05ai_project\2026061102Web_Product Introduction"
python -m http.server 5178
```

访问：

```text
http://localhost:5178/
```

建议使用本地服务预览，不建议只双击 `index.html`，避免后续多页面路径行为和线上不一致。

## 常规维护

常见修改位置：

- 首页产品卡片：`index.html`
- 产品详情页：`products/*.html`
- 全站样式：`src/styles.css`
- 首页筛选交互：`src/main.js`
- 截图和图标：`public/images/`
- 需求说明：`docs/PRD.md`

新增产品流程：

1. 将真实截图放入 `public/images/`。
2. 复制 `products/scheduler.html` 作为新产品详情页模板。
3. 在 `index.html` 的产品列表中新增产品卡片。
4. 保持产品卡片包含产品名、短说明、状态、场景标签和详情链接。
5. 保持详情页包含产品概览、界面截图、核心能力、使用步骤、客户场景和 FAQ。
6. 本地预览并检查移动端文字、按钮和图片不重叠。

## Git 推送

远端仓库：

```text
本地推送：git@github.com:yiyuan8023/2026061102Web_Product-Introduction.git
服务器拉取：https://github.com/yiyuan8023/2026061102Web_Product-Introduction.git
```

本地提交并推送：

```powershell
git status --short
git add .
git commit -m "Update product site"
git push
```

首次推送后，本地 `main` 分支应跟踪 `origin/main`。后续只需要正常提交和 `git push`。

## 服务器部署

服务器和旧站 `zhongyi-365.cn` 共用同一台主机，但本项目是独立静态站点。

```text
服务器：49.235.157.150
系统用户：ubuntu
线上目录：/var/www/data-365.cn
Nginx 配置：/etc/nginx/sites-available/data-365
HTTPS 证书：/etc/letsencrypt/live/data-365.cn/
```

服务器从 GitHub 通过 HTTPS 拉代码。更新线上站点时，在服务器执行：

```bash
cd /var/www/data-365.cn
git pull --ff-only
sudo nginx -t
sudo systemctl reload nginx
```

线上目录由 `ubuntu` 用户维护，Nginx 只读取静态文件。不要把私钥、密码、Token 写进仓库。如果仓库以后改成私有，需要给服务器单独配置 deploy key 或访问令牌。

## 线上验证

每次上线后至少检查：

```powershell
curl.exe -I https://data-365.cn/
curl.exe -I https://www.data-365.cn/
curl.exe -I http://data-365.cn/
```

预期结果：

- `https://data-365.cn/` 返回 `200 OK`
- `https://www.data-365.cn/` 返回 `200 OK`
- `http://data-365.cn/` 返回 `301 Moved Permanently` 并跳转到 HTTPS
- 首页和详情页能看到 `浙ICP备2023041540号-3`

## 注意事项

- 文本文件使用 UTF-8。
- 所有图片和链接使用相对路径，外部备案链接除外。
- 不依赖远程 CDN。
- 不提交 `.runtime/`、本地配置、证书、密钥、临时包或系统日志。
- Nginx 和证书只在服务器维护，不放入项目源码。
