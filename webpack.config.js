const path = require("path"); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключаем плагин для работы с index.html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // подключаем плагин  для работы с index.css

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "src", "pages", "index.js"), // "index" - это имя которое присваевается filename: [name]
  },
  devtool: "inline-source-map",
  output: {
    filename: "[name].[contenthash].js", // каждый раз файл будет сохраняться с новым contenthash,
    //убираем опасность использования браузером более старой версии файла из куки
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"), // указываем путь до index.html
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    watchFiles: ["*/**/*.html"], // добавляем автоматическое обновление изменений в html файле
  },
};
