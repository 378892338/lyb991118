# Nginx 配置片段 — /admin Basic Auth

## 步骤 1: 服务器端创建密码文件

```bash
sudo apt install apache2-utils -y
sudo htpasswd -c /etc/nginx/.htpasswd admin
# 输入密码（两次）
```

## 步骤 2: Nginx 添加 location 块

在 `/etc/nginx/sites-available/liuybhub.top` 的 server 块中添加：

```nginx
location /admin {
    auth_basic "CMS Admin";
    auth_basic_user_file /etc/nginx/.htpasswd;
    try_files $uri $uri/ =404;
}

location /config.yml {
    deny all;
}
```

## 步骤 3: 重载

```bash
sudo nginx -t && sudo systemctl reload nginx
```

访问 `https://liuybhub.top/admin` → 弹出浏览器登录框 → 输入用户名 `admin` + 设置的密码 → 进入 CMS。
