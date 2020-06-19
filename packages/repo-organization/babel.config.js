module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    /**
     * Quasar 按需加载
     * 此代码有 quasar cli 自动生成，请勿修改
     *
     */
    [
      'transform-imports',
      {
        quasar: {
          transform: 'quasar/dist/babel-transforms/imports.js',
          preventFullImport: true,
        },
      },
    ],

    /**
     * ElementUI 按需加载
     *
     */
    // [
    //   'component',
    //   {
    //     libraryName: 'element-ui',
    //     styleLibraryName: '~src/boot/boot-element-ui-theme',
    //   },
    // ],
  ],
}
