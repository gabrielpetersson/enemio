// import  {rollup} from 'rollup'

// import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from "@rollup/plugin-replace"
import babel from 'rollup-plugin-babel';
// import eslint from 'rollup-plugin-eslint';
// import html from 'rollup-plugin-html';
// import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
// import path from 'path';
// import serve from 'rollup-plugin-serve';
// import stylus from 'rollup-plugin-stylus-css-modules';
// import uglify from 'rollup-plugin-uglify';
import typescript from '@rollup/plugin-typescript';

// export default {

//   input: 'src/index.ts',
//   output: {
//     dir: 'output',
//     format: 'cjs',
//   },
//   plugins: [typescript()],
// };
// see below for details on the options
export default  {
    input: "src/index.ts",
    plugins: [
      typescript(), 
      resolve(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development")
      }),
      commonjs({
        include: 'node_modules/**'
      })],
    external: {},
    output: {
      file: 'public/index.bundle.js',
      format: 'cjs'
    }

};
const outputOptions = {
    dir: "public",
    name: "index.bundle.js",
    format: "cjs"
};

export async function build(done) {
  // create a bundle
  const bundle = await rollup(inputOptions);

  // console.log(bundle.watchFiles); // an array of file names this bundle depends on

  // generate output specific code in-memory
  // you can call this function multiple times on the same bundle object
  const { output } = await bundle.generate(outputOptions);

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      // For assets, this contains
      // {
      //   fileName: string,              // the asset file name
      //   source: string | Uint8Array    // the asset source
      //   type: 'asset'                  // signifies that this is an asset
      // }
      // console.log('Asset', chunkOrAsset);
    } else {
      // For chunks, this contains
      // {
      //   code: string,                  // the generated JS code
      //   dynamicImports: string[],      // external modules imported dynamically by the chunk
      //   exports: string[],             // exported variable names
      //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
      //   fileName: string,              // the chunk file name
      //   implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
      //   imports: string[],             // external modules imported statically by the chunk
      //   importedBindings: {[imported: string]: string[]} // imported bindings per dependency
      //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
      //   isEntry: boolean,              // is this chunk a static entry point
      //   isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
      //   map: string | null,            // sourcemaps if present
      //   modules: {                     // information about the modules in this chunk
      //     [id: string]: {
      //       renderedExports: string[]; // exported variable names that were included
      //       removedExports: string[];  // exported variable names that were removed
      //       renderedLength: number;    // the length of the remaining code in this module
      //       originalLength: number;    // the original length of the code in this module
      //     };
      //   },
      //   name: string                   // the name of this chunk as used in naming patterns
      //   referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
      //   type: 'chunk',                 // signifies that this is a chunk
      // }
      // console.log('Chunk', chunkOrAsset.modules);
    }
  }

  // or write the bundle to disk
  await bundle.write(outputOptions);
  done()
}




// const a =  {
//   input: path.join(__dirname, 'src/index.ts'),
//   dest: path.join(__dirname, 'public2/index.js'),
//   format: 'cjs',
//   sourceMap: true,
//   plugins: [
//     // stylus({
//     //   include: path.join(__dirname, 'src/stylus/main.styl'),
//     //   output: path.join(__dirname, 'public/css/bundle.css'),
//     //   sourceMap: true,
//     // }),
//     typescript(),
//     babel({
//       exclude: path.join(__dirname, 'node_modules/**'),
//     }),
//     // eslint({
//     //   // exclude: path.join(__dirname, 'src/stylus/**'),
//     // }),
//     html({
//       include: path.join(__dirname, 'src/index.html'),
//       htmlMinifierOptions: {
//         collapseWhitespace: true,
//         collapseBooleanAttributes: true,
//         conservativeCollapse: true,
//         html5: true,
//         minifyCSS: true,
//         minifyJS: true,
//       },
//     }),
//     resolve({
//       browser: true,
//       preferBuiltins: false,
//     }),
//     commonjs({
//       // non-CommonJS modules will be ignored, but you can also
//       // specifically include/exclude files
//       include: 'node_modules/**',  // Default: undefined
//       // exclude: ['node_modules/foo/**', 'node_modules/bar/**'],  // Default: undefined

//       // search for files other than .js files (must already
//       // be transpiled by a previous plugin!)
//       extensions: ['.js', '.ts'],  // Default: ['.js']

//       // if true then uses of `global` won't be dealt with by this plugin
//       ignoreGlobal: false,  // Default: false

//       // if false then skip sourceMap generation for CommonJS modules
//       sourceMap: false,  // Default: true

//       // explicitly specify unresolvable named exports
//       // (see below for more details)
//       // namedExports: { './module.js': ['foo', 'bar'] }, // Default: undefined
//     }),
//     // uglify(),
//     serve({
//       // Folder to serve files from,
//       contentBase: path.join(__dirname, 'public'),

//       // Set to true to return index.html instead of 404
//       historyApiFallback: false,

//       // Options used in setting up server
//       host: 'localhost',
//       port: 8080,
//     }),
//     livereload({
//       watch: path.join(__dirname, 'src/'),
//       // Disable console output
//       verbose: false,
//       // other livereload options
//       // https: true
//     }),
//   ],
// };

const commonConfig = {
  input: 'src/index.ts',
  output: {
      name: 'r',
      sourcemap: true
  },
  plugins: [
      typescript(),
      resolve({
          customResolveOptions: {
              moduleDirectory: 'node_modules'
          }
      }),
      babel({
          exclude: 'node_modules/**',
          extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts'],
      }),
      commonjs({
          extensions: ['.js', '.ts'],
          include: 'node_modules/**',  // Default: undefined
      })
      
  ]
};

