import dotenv from 'dotenv'
dotenv.config()
import puppeteer from 'puppeteer'
import * as _ from 'omnibelt'
import { requestBinary, writeFileBinary, promiseAll, sleepT } from './utils'
import { makeMediaNameFactory, getUrlExtension } from './lib'
import tr from 'treis'

const { log } = console
const { EMAIL, PASS, ALBUM } = process.env
const makeMediaName = makeMediaNameFactory({
  path: 'output',
  initialNum: 0,
  title: ALBUM
})

// TODO: enum for elementType: img, video, span
const lightboxElementByType = elementType =>
  `#u_0_0 > div > span > div._1or5 > ${elementType}:not(._1vez)`
const lightboxImageElement = lightboxElementByType('img')
const lightboxVideoElement = `${lightboxElementByType('span')} > video`

const main = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('https://www.facebook.com/moments_app')

  // login
  await page.click('#email')
  await page.keyboard.type(EMAIL)
  await page.click('#pass')
  await page.keyboard.type(PASS)
  await page.click('#loginbutton')
  await page.waitForNavigation()

  // click album
  // TODO: Find by title text
  await page.click(
    'body > div._2_kd > div:nth-child(2) > a > div > div > div._4599 > div._459a'
  )

  // wait for the thumbnails to show up
  await page.waitFor('._10uj > ._10uk > ._10ul')

  // click the first picture and wait for load
  await page.click('#u_0_6 > a > div')
  await page.waitFor(lightboxImageElement)

  const page$eval = async selector =>
    page.$eval(selector, x => x.src).catch(_.always(null))

  const findMediaLink = async () => {
    const imageSrc = await page$eval(lightboxImageElement)
    if (_.isNotNil(imageSrc)) return imageSrc

    const videoSrc = await page$eval(lightboxVideoElement)
    if (_.isNotNil(videoSrc)) return videoSrc

    throw new Error('Media could not be determined')
  }

  const downloadMedia = () => {
    return findMediaLink()
      .then(_.juxt([makeMediaName, requestBinary]))
      .then(promiseAll)
      .then(_.tap(_.apply(writeFileBinary)))
      .then(([fileName]) => log(`downloaded media: ${fileName}`))
      .then(sleepT(100))
  }

  // Download first image, then keep downloading until there are no more
  const nextButtonSelector = '#u_0_0 > div > span > a._1or7._1or8 > div > div'
  await downloadMedia()
  while ((await page.$(nextButtonSelector)) !== null) {
    await page.click(nextButtonSelector)
    await downloadMedia()
  }

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
