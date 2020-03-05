const tsNode = require('ts-node')
const path = require('path')
const fs = require('fs')

tsNode.register({
	project: path.join(__dirname, '../tsconfig.json'),
	files: true,
})

const { decode } = require('../src/index.ts')
//解码
const file = path.join(__dirname, 'm2_n8.bmp')
const content = fs.readFileSync(file)
const colors = decode(content)
//生成HTML
const arr = new Array(colors.length)
for (let i = 0; i < colors.length; i++) {
	arr[i] = colors[i]
}
const script = `<script>window.colors=${JSON.stringify(arr)}</script>`
const http = require('http')
http.createServer((req, res) => {
	let html = fs.readFileSync(path.join(__dirname, 'test.html')) + script
	res.end(html)
}).listen(3001)

