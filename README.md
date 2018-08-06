Moments Album Scraper
=====================

Given an album name, scrape all the pictures and videos and download them to your computer!

# Install

```shell
git clone <this_repo>
cd ./moments-scraper
yarn install
```

# Usage

`yarn install` should setup a "blank" `.env` file which you can modify to fit your needs. See the "Variables" section for more info on them. An example `.env` file might look something like:

```
HEADLESS=false
EMAIL=your.address@gmail.com
PASS=N0tR3alPa55w0rd
ALBUM=Summer 2018!
```


After that, simply:

```shell
yarn start
```

# Variables

Set these however you wish. The easiest way is to set them in `.env`.

| Variable | Default | Description |
| --- | --- | --- |
| HEADLESS | `false` | Whether or not you want the browser to run headless or not.
| EMAIL |  | Your Facebook Moments email address. |
| PASS |  | Your Facebook Moments password. |
| ALBUM |  | The album you wish to download. |
