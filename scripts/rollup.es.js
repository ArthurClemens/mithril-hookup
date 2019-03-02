/* globals process */
/*
Build to a module that has ES2015 module syntax but otherwise only syntax features that node supports
https://github.com/rollup/rollup/wiki/jsnext:main
*/
import { pkg, createConfig } from "./rollup.base.js";

const env = process.env; // eslint-disable-line no-undef

const baseConfig = createConfig();
const targetConfig = Object.assign({}, baseConfig, {
  output: Object.assign(
    {},
    baseConfig.output,
    {
      file: `${env.DEST || pkg.main}.mjs`,
      format: "es"
    }
  )
});

export default targetConfig;

