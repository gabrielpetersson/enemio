import gulp from "gulp"
import babel from "gulp-babel"
import typescript from "gulp-typescript"
import { createRequire } from "module"

const require = createRequire(import.meta.url)

const src = "./src/**/*.ts"
const out = "../server/build/public"
const project = typescript.createProject("tsconfig.json", {
  outDir: out,
  typescript: require("typescript")
})

gulp.task('build', function () {
  const tsResult = project.src()
    .pipe(project());
  return tsResult.js.pipe(babel({ presets: ['es2015'] }).pipe(gulp.dest(out)))
})

gulp.task("watch", gulp.series("build", function () {
  gulp.watch(src, gulp.series("build"))
}))

gulp.task("default", gulp.series("build"))
