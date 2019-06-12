const { wrapCustomClass, resolve } = require("./build/utils")
const { mdLoaderConfig } = require("./build/md-loader")
const vueMarkdown = {
	raw: true,
	preprocess: (MarkdownIt, source) => {
		// TODO: 此处待优化，对 type 为 fence 的重新处理，以及 inline-html 重新处理
		// 该处调用 mardownIt 方法
		MarkdownIt.renderer.rules.table_open = function() {
			return "<table class=\"table\">"
		}
		MarkdownIt.renderer.rules.table_close = function() {
			return "</table>"
		}
		// 遍历粗体标签转换成 b 标签
		MarkdownIt.renderer.rules.strong_open = function() {
			return "<b>"
		}
		MarkdownIt.renderer.rules.strong_close = function() {
			return "</b>"
		}
		// ```html``` 给这种样式加个class hljs
		MarkdownIt.renderer.rules.fence = wrapCustomClass(
			MarkdownIt.renderer.rules.fence
		)
		// ```code``` 给这种样式加个class code_inline
		const codeInline = MarkdownIt.renderer.rules.code_inline
		MarkdownIt.renderer.rules.code_inline = function(...args) {
			args[0][args[1]].attrJoin("class", "code_inline")
			return codeInline(...args)
		}
		return source
	},
	use: mdLoaderConfig
}

module.exports = {
	lintOnSave: false,
	publicPath: "./",
	devServer: {
		port: 8080
	},
	// 修改 src 目录 为 examples 目录
	pages: {
		index: {
			entry: "examples/pc/main.js",
			template: "public/index.html",
			filename: "index.html"
		}
	},
	// 扩展 webpack 配置，使 packages 加入编译
	chainWebpack: config => {
		config.resolve.alias
			.set("@", resolve("examples"))
			.set("@#", resolve("packages"))
			.set("@mobile", resolve("examples/mobile"))
		config.module
			.rule("md")
			.test(/\.md/)
			.use("vue-loader")
			.loader("vue-loader")
			.end()
			.use("vue-markdown-loader")
			.loader("vue-markdown-loader/lib/markdown-compiler")
			.options(vueMarkdown)
	},
	css: {
		loaderOptions: {
			stylus: {
				test: /\.styl$/,
				loader: "style-loader!css-loader!stylus-loader"
			},
			postcss: {
				plugins: [
					require("autoprefixer")({
						overrideBrowserList: [
							// 加这个后可以出现额外的兼容性前缀
							"> 0.01%",
							"last 7 versions",
							"not ie <= 8",
							"ios >= 8",
							"android >= 4.0"
						]
					})
				]
			}
		}
	},
	productionSourceMap: false
}
