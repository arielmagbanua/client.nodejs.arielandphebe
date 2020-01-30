module.exports = {
  pages: {
    social: {
      // entry for the page
      entry: 'src/social.js',
      // the source template
      template: 'src/shell/social.html',
      // output as dist/index.html
      filename: 'social.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Ariel and Phebe'
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
