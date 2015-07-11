var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var nodemon = require("gulp-nodemon")
var reload = browserSync.reload;

gulp.task("start", function() {
	nodemon({
		script: "app.js",
		ext: "js",
		env: { "NODE_ENV" : "devemopment" }
	});
});

gulp.task("serve", function() {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
		port: 8081
	});

	gulp.watch(["views/*.hbs", "public/css/*.css", "public/js/*.js"]).on("change", reload);
});

gulp.task("default", ["start", "serve"]);