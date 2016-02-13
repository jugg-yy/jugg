node ./bin/jugg build yy
cd ./build
zip -r blog.zip ./yy/*
scp blog.zip root@101.200.150.4:/usr/share/nginx/static
