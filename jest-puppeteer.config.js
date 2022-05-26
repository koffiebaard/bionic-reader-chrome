const extension_path = __dirname;

module.exports = {
  launch: {
    headless: false, // extension are allowed only in the head-full mode
    args: [
        `--disable-extensions-except=${extension_path}`,
        `--load-extension=${extension_path}`
    ]
  }
}
