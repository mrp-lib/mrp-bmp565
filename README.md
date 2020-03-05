# MRP-BMP565

用于处理mrp中的bmp565格式的图片，将rgb565格式处理成常规的24位颜色位图。

## 使用
```typescript
import fs from 'fs'
import { decode } from 'mrp-bmp565'

const result = decode(fs.readFileSync('<mrp bmp filepath>'))
console.log(result)
```