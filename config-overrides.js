const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader,
} = require('customize-cra');
const path = require('path');

module.exports = override(
  // 按需加载antd的组件
  fixBabelImports(
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
    {
      libraryName: 'lodash',
      libraryDirectory: 'es',
    }
  ),
  // 设置绝对路径
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  // 设置主题,配置less(若出现Less Loader不匹配的问题，需将less-loader降到5.x.x的版本)
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#00A0D8' },
  })
);
