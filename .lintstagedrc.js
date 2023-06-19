module.exports = {
  "**/*.(ts|tsx|js)": (filenames) => [
    `yarn lint . ${filenames.join(" ")}`,
  ],
};