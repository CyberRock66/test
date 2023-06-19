module.exports = {
  "**/*.(ts|tsx|js)": (filenames) => [
    `yarn lint . ${filenames.join(" ")}`,
  ],
  "**/*.css": (filenames) => [
    `yarn stylelint --fix ${filenames.join(" ")}`,
  ],
};