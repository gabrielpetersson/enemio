import gulp from "gulp"
// import babel from "gulp-babel"
// import typescript from "gulp-typescript"
// import { createRequire } from "module"
import imagemin from "gulp-imagemin"
import imageminWebp from "imagemin-webp"
import rename from "gulp-rename"
import watch from "gulp-rename"
// import concat from "gulp-concat"
// import rollup from "gulp-rollup"
// import run from "gulp-run"
// import bundle from 'gulp-bundle-assets'
// import useref from 'gulp-useref'
import {build} from "./rollup.config.js"

// const require = createRequire(import.meta.url)

const src = "./src/**/*.ts"
// const out = "./public"
const imgsPath = "./src/images"

// const ts = typescript.createProject("tsconfig.json")

// gulp.task('build', function () {
//   return ts.src()
//     .pipe(ts()).js.pipe(babel())
//     .pipe(rollup({
//       // any option supported by Rollup can be set here.
//       input: './src/index.ts'
//     })).pipe(gulp.dest(out))
  
// })

gulp.task('build', function (done) {
  return build(done)
})

// gulp.task('build-bundle', function () {
//   return gulp.src('../public/*.html')
//       .pipe(useref())
//       .pipe(gulp.dest('../public2'));
// });

gulp.task('images', function () {
  return gulp.src(`${imgsPath}/*.{png, jpeg, jpg}`)
      .pipe(imagemin([imageminWebp({
          method: 6,
      })]))
      .pipe(rename({ extname: '.webp' }))
      .pipe(gulp.dest(imgsPath));
});

// gulp.task('bundle-js', function() {
//   return gulp.src('../public/**/*.{js,webp}')
//     .pipe(concat('index.bundle.js'))
//     .pipe(gulp.dest('../public2'));
// });


 
// gulp.task('bundle', function() {
//   return gulp.src('./bundle.config.js')
//     .pipe(bundle())
//     .pipe(gulp.dest('./public2'));
// });

gulp.task("watch", gulp.series("images", 'build', function () {
  gulp.watch(src, gulp.series("build"))
}))

// gulp.task("watch",  (done)=>watch({glob: src }, ()=>build(done)))
// gulp.task("default", gulp.series("build"))

