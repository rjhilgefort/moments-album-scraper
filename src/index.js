#!/usr/bin/env node

require('dotenv').config()
const puppeteer = require('puppeteer')
const _ = require('omnibelt')
const request = require('request-promise')
const fs = require('fs-extra')
const { log } = console
const { EMAIL, PASS, ALBUM } = process.env

const stupidClone = _.compose(JSON.parse, JSON.stringify)
const thenP = success => promise => promise.then(success)

const main = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('https://www.facebook.com/moments_app')
  // await page.screenshot({ path: 'output/initial-load.png' })

  // login
  await page.click('#email')
  await page.keyboard.type(EMAIL)
  await page.click('#pass')
  await page.keyboard.type(PASS)
  await page.click('#loginbutton')
  await page.waitForNavigation()
  // await page.screenshot({ path: 'output/signed-in.png' })

  // goto album
  // TODO: Find by title text
  await page.click(
    'body > div._2_kd > div:nth-child(2) > a > div > div > div._4599 > div._459a'
  )
  const picSelector = '._10uj > ._10uk > ._10ul'
  await page.waitFor(picSelector)
  const picElements = await page.evaluate(() =>
    Array.from(document.querySelectorAll('._10uj > ._10uk > ._10ul')).map(x =>
      JSON.parse(JSON.stringify(getComputedStyle(x)))
    )
  )
  const mapIndexed = _.addIndex(_.map)
  const foo = _.mapIndexed(
    (val, i) =>
      _.compose(
        thenP(image =>
          fs.writeFile(`output/COLORADO_${i}.jpg`, image, {
            encoding: 'binary',
            flag: 'w'
          })
        ),
        (url) => request(url, { encoding: 'binary' }),
        _.nth(1),
        _.match(/^url\("(.*)"\)/),
        _.prop('backgroundImage')
      )(val),
    picElements
  )
  await Promise.all(foo).then(() => console.log('done!'))

  browser.close()
}

main().then(
  () => {
    log('all done')
  },
  e => {
    log('there was an error')
    log(e)
  }
)
