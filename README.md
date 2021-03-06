# Bionic reader
A Chrome extension for translating pages to bionic reading, which can be very beneficial to neurodiverse readers.

[Check it out in the Chrome Web Store.](https://chrome.google.com/webstore/detail/bionic-reader/afofodfmpeikmcpjoobibhipehodefjc?hl=en&authuser=0)

[Read more about Bionic Reading here.](https://bionic-reading.com/)

## Features

- Bionic reading on any webpage with a click on a button;
- Keeps links and highlighting intact;
- Configurable font & font size;
- Automated tests.

## Example screenshot

![Example screenshot](docs/example-screenshot.png)

## Font
It overrides the font of the webpage as many (many) fonts don't work with Bionic Reading. This is mainly because of the size of bold and thin letters, and it seems having mono-spaced sans fonts improves neurodiverse reading capabilities anyway.

The font is configurable, you can choose one of these fonts:
- Open Sans
- Noto Sans
- Source Sans Pro

## How to install
[Check it out in the Chrome Web Store!](https://chrome.google.com/webstore/detail/bionic-reader/afofodfmpeikmcpjoobibhipehodefjc?hl=en&authuser=0)

Or, you can add it with these steps:

- Download the repo (git clone, or as a zip and unpack)
- Go to `Settings`, and then `Extensions`
- Enable `Developer mode` on the right top side
- Press the `Load unpackaged` button on the left top side
- Select the directory with the repository


## Development
Automated tests are set up using `Jest`, so to collaborate you'll need to install `node`.

Run tests:
```bash
npm test
```

Build new artifact:
```bash
npm run build
```

## Automated tests
Unit tests cover the logic of Bionic Reading translations.

Integration tests cover how the popup is functioning. Storing and retrieving values from the Chrome storage for example. This is set up using `puppeteer`, launching a headful instance of Chrome, installing our own extension and visiting the popup html to do tests on.

To do this, we need to know beforehand which application ID the extension has. For this we have a key in the manifest, [as explained in the docs here.](https://developer.chrome.com/docs/extensions/mv2/manifest/key/). For development this results in a specific application ID.

Run unit tests:
```bash
npm run test:unit
```

Run integration tests:
```bash
npm run test:int
```
