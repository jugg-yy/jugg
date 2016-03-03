# jugg
A blog template
===============

开发
----

```bash
git clone https://github.com/jugg-yy/jugg.git
cd jugg
npm install

node bin/jugg.js create myBlog
node bin/jugg.js build myBlog
node bin/jugg.js server myBlog
```
访问 http://localhost:8001/ 预览


写博客
-----

* 在生成的 local/myBlog 下配置 *.toml 文件内容
* 文章需要放在 local/myBlog/articles 下，使用 markdown 语法
* 自定义页面需要放在 local/myBlog/pages 下，使用 markdown 语法


发布到服务器
----------
配置 publish.exp 文件中的 dir_server 为服务器中对应目录位置。如：/usr/share/nginx/static/blog。然后执行：
```bash
cd jugg
expect publish.exp [博客目录名(e.g. myBlog)] [服务器IP] [服务器登录用户名] [服务器登录密码]
```

# TODO

1. 首页文章分页 ( DONE )

2. 文章页前后文章 ( DONE )

3. RSS 支持

4. 文章分类 ( DONE )

5. 文章 TAG

6. 插件模块

7. 分享模块（桌面/移动）

8. 自适应布局

9. 支持风格导入

...

# License
[The MIT License (MIT)](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Yangyuan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
