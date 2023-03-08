**QGIS 生成 XYZ 瓦片（目录）位于 `server/public`**

```bash
$ cd server
```

启动服务器：

```bash
# $ pnpm install
$ pnpm start
```

加载本地瓦片：

```js
L.tileLayer("http://localhost:3000/tiles/{z}/{x}/{y}.png", {
  minZoom: 16,
  maxZoom: 18,
}).addTo(map);
```
