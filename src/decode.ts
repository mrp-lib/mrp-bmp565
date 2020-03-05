/*
* rrrrrggg gggbbbbb => rrrrrRRRggggggGGbbbbbBBB
* RRR = R5[2:0]
*  GG = G6[1:0]
* BBB = B5[2:0]
* */


/**
 * 将bmp565的图片数据转换成24位rgb颜色。
 * @param src 一个565颜色的内容（注意：只是内容而已，也就是说一开始就是颜色列表）
 */
export function decode(src: Buffer) {
	//定义一个buffer来存放颜色（因为565用两位表示一个颜色，所以颜色数=长度/2）(>>1表示除以2)
	const colors: Buffer = Buffer.alloc((src.length >> 1) * 3)
	//遍历src，取得每个像素，并得到结果
	for (let i = 0; i < src.length; i += 2) {
		//取得565像素，共16位
		const color = src.readUInt16LE(i)
		//红色处理
		let r = (color >> 11)				//得到r5
		r = (r << 3) | (r & 0b0111)	 		//将r5左移3位，并用r5的后3位补齐
		//绿色处理
		let g = (color >> 5) & 0b0111111	//得到g6
		g = (g << 2) | (g & 0b0011)			//将g6的左移2位，并用g6的后2位补齐
		//蓝色处理
		let b = (color & 0b011111)			//得到b5，直接取后5位即可
		b = (b << 3) | (b & 0b0111)			//同r5
		//保存颜色
		const offset = (i >> 1) * 3
		colors.writeUInt8(r, offset)
		colors.writeUInt8(g, offset + 1)
		colors.writeUInt8(b, offset + 2)
	}
	return colors
}