#!/usr/bin/env node

require('dotenv').config()
const puppeteer = require('puppeteer')
const _ = require('omnibelt')
const { log } = console
const { EMAIL, PASS, ALBUM } = process.env

const main = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('https://www.facebook.com/moments_app')

  await page.screenshot({ path: 'output/initial-load.png' })

  // login
  await page.click('#email')
  await page.keyboard.type(EMAIL)
  await page.click('#pass')
  await page.keyboard.type(PASS)
  await page.click('#loginbutton')
  await page.waitForNavigation()
  await page.screenshot({ path: 'output/signed-in.png' })

  // goto album
  await page.click(
    'body > div._2_kd > div:nth-child(2) > a > div > div > div._4599 > div._459a'
  )
  await page.screenshot({ path: 'output/album.png' })

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
