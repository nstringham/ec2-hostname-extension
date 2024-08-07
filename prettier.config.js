/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  plugins: ["prettier-plugin-svelte"],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
