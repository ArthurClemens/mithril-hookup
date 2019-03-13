import fs from "fs";
import commonjs from "rollup-plugin-commonjs";
import pathmodify from "rollup-plugin-pathmodify";

export const pkg = JSON.parse(fs.readFileSync("./package.json"));
const name = "mithrilHookup";

export const createConfig = () => {
  const config = {
    input: "src/index.js",
    output: {
      name,
    },
    plugins: [

      pathmodify({
        aliases: [
          {
            id: "mithril",
            resolveTo: "node_modules/mithril/mithril.js"
          }
        ]
      }),

      commonjs(),
    ]
  };
  
  return config;
};