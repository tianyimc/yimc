# /savior/images — SAVIOR 的生日头像

这个目录只放**一张**图片：SAVIOR 的十八岁生日头像。

| 文件名 | 用途 | 建议 |
| --- | --- | --- |
| `savior_birthday.jpg` | 页面第 4 区「十八岁的生日头像」展示的圆形头像 | 正方形（1:1）最佳，长边 1000px 左右，单张 400KB 以内 |

## 换图

1. 用同名新文件覆盖 `savior_birthday.jpg` 即可，页面无需改动（建议仍是正方形）。
2. 若想换文件名或格式（如 `.png` / `.webp`），请同步修改 `../index.html` 中的
   `<img src="images/savior_birthday.jpg">` 以及同一处的 `images/savior_birthday.jpg` 文字说明。

## 说明

- 头像以**圆形**呈现：金环描边 + 柔和发光，边缘用径向蒙版过渡，浅色底的插画也能自然融入深紫夜空。
- 点击头像可放大预览，预览下方的一句话来自 `index.html` 中的 `data-caption`。
- 文件**不存在时不会显示浏览器破图图标**：会退化为一个虚线占位圆圈，并显示 `Savior · 18`。
