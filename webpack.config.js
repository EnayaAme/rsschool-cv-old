const webpack = require('webpack');
const path = require('path'); // хранит в себе относительные пути до каждого из файлов //
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //добавляем плагин по очищению папки//
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // себерет все стили в 1 файл //
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => { // это environment, в options можно достать нужный мод //
    const isProdustion = options.mode === 'production'; // true or false

    const config = { // объект с ключами//
        mode: isProdustion ? 'production' : 'development', //обозначаем, в каком моде мы работаем.Не обязательно, просто страховка от ошибок //
        devtool: isProdustion ? 'none' : 'source-map', // это маппинг. бывают разные. некоторые для продакшена используются, некоторые нет//
        watch: !isProdustion,
        entry: ['./src/index.js', './src/SASS/style.scss'], // entry это точка входа, откуда начинается сборка //
        output: { // тоже объект с ключами. сюда надо передать, куда мы складываем файл сборки + имя файла//
            path: path.join(__dirname, '/dist'), //куда мы складываем файл сборки//
            filename: 'script.js', //имя файла//
        },

        module: { // передаем правила //
            rules: [ // массив, который отрабатывает по правилам js, картинки, стили, аудио и т.д. //
                {
                    test: /\.js$/, // проверяем файлы типа js //
                    exclude: /node_modules/, // что исключаем из сборки //
                    use: {
                      loader: 'babel-loader', // я так понимаю, он помогает преобразовать наш код так, чтобы он был понятен старым браузерам//
                      options: {
                        presets: ['@babel/preset-env'] // это пакет позволяет использовать последние js фичи //
                      }
                    }
                }, {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' // webpack читает лоудеры в обратной последовательности //
                    ]
                }, {
                    test: /\.(png|svg|jpe?g|gif|ico)$/i, 
                    type: 'asset/resource', // это новая встроенная фича 5 версии. теперь нет проблем с пропавшими картинками //
                }, {
                    test: /\.html$/,
                    loader: "html-loader",
                  }
            ]
        },

        plugins: [ // складываем в массив все добавляемые плагины //
            new CleanWebpackPlugin(), // добавляем плагин по очищению папки //
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }) // себерет все стили в 1 файл //

        ]
    }

    return config; // главное вернуть этот объект
}