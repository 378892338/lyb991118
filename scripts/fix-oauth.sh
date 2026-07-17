#!/bin/bash
# Second Curve Lab — one-click OAuth + config fix
set -e

echo "=== Pulling latest code ==="
cd /var/www/second-curve-lab
git pull origin main

echo "=== Writing .env.local ==="
cat > .env.local << 'ENVEOF'
GITHUB_CLIENT_SECRET=8b160d19f5bdac118c401e88df6e4d71643c6f46
ENVEOF

echo "=== Fixing Nginx — remove auth_basic from /admin ==="
sudo bash -c 'cat > /etc/nginx/sites-available/liuybhub.top.conf << NGINXEOF
server {
    listen 443 ssl;
    server_name liuybhub.top www.liuybhub.top;
    ssl_certificate /etc/letsencrypt/live/liuybhub.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/liuybhub.top/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    location / { proxy_pass http://127.0.0.1:3000; proxy_set_header Host \$host; proxy_set_header X-Real-IP \$remote_addr; proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto \$scheme; }
    location = /config.yml { deny all; }
    location /admin { alias /var/www/second-curve-lab/public/admin; index index.html; }
    rewrite ^/admin\$ /admin/ permanent;
}
server {
    if (\$host = liuybhub.top) { return 301 https://\$host\$request_uri; }
    listen 80;
    server_name liuybhub.top www.liuybhub.top;
    return 404;
}
NGINXEOF'

sudo nginx -t && sudo systemctl reload nginx

echo "=== Building ==="
npm run build

echo "=== Restarting pm2 ==="
pm2 delete scl 2>/dev/null || true
pm2 start npm --name scl -- run start

echo "=== Done! ==="
echo "Visit https://liuybhub.top/admin/ and click Login with GitHub"
