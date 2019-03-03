/* global process */
import fs from "fs";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pathmodify from "rollup-plugin-pathmodify";

const env = process.env;
export const pkg = JSON.parse(fs.readFileSync("./package.json"));
const external = Object.keys(pkg.dependencies || {});
const name = env.MODULE_NAME;

const globals = {};
external.forEach(ext => {
  switch (ext) {
  case "mithril":
    globals["mithril"] = "m";
    break;
  default:
    globals[ext] = ext;
  }
});

export const createConfig = () => {
  const config = {
    input: env.ENTRY || "src/index.js",
    external,
    output: {
      name,
      globals,
    },
    plugins: [

      resolve(),

      pathmodify({
        aliases: [
          {
            id: "mithril",
            resolveTo: "node_modules/mithril/mithril.js"
          }
        ]
      }),

      commonjs(),

      babel({
        exclude: "node_modules/**"
      })
    ]
  };
  
  return config;
};