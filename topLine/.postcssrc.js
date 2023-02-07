module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 根元素的值，lib-flexible,分成 10份，所以元素应该设成设计稿宽度的10分之一  750/10
      //  iphone6/7/8 750宽   vant基于375写的建议 37.5
      // 自己的样式用750，即75
      // rootValue: 37.5,
      rootValue({ file }) {
        // 参数中含文件路径,解构出来
        // console.log('需要处理的css文件',file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置 要转换的css属性‘height’
      // *代表 所有
      propList: ['*'],
      exclude: ['github-markdown.css'],
    },
  },
}
