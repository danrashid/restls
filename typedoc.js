module.exports = {
  out: "./docs/typedoc",
  includes: "./src",
  exclude: ["**/*.test.ts", "**/index.ts", "**/utils/**/*"],
  excludeExternals: true,
  README: "none"
};
