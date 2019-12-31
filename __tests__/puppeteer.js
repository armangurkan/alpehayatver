const puppeteer = require('puppeteer');

const APP = `http://localhost:${process.env.PORT || 3000}/`;

/**
 * Welcome to puppeteer! This library from Google is fast-emerging as the gold
 * standard for end-to-end browser testing.
 *
 * One of the challenges of real-time testing is that almost every single
 * action is asynchronous. Hence, puppeteer is almost always used in an
 * async/await syntax. If you aren't familiar with async/await, in short it
 * lets you "pause" a function on any Promise. While it's paused, the JS engine
 * can continue to run synchronously outside of the function (just like a
 * normal Promise or callback). Once the Promise resolves, it comes back in
 * through the event queue and the 'awaited' function can resume execution.
 *
 * For a more in-depth look at the underlying design of async/await, see
 * https://ponyfoo.com/articles/understanding-javascript-async-await
 */
describe('Front-end Integration/Features', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  describe('Initial display', () => {
    it('loads successfully', async () => {
      // We navigate to the page at the beginning of each case so we have a
      // fresh start
      await page.goto(APP);
      await page.waitForSelector('#header');
      const title = await page.$eval('#header', el => el.innerHTML);
      expect(title).toBe('MegaMarket Loyalty Cards');
    });

    it('displays a usable input field for locations', async () => {
      await page.goto(APP);
      await page.waitForSelector('#new-location');
      await page.focus('#new-location');
      await page.keyboard.type('Tallahassee');
      const inputValue = await page.$eval('#new-location', el => el.value);
      expect(inputValue).toBe('Tallahassee');
    });

    // TODO: Finish tests

    xit('renders the MarketsDisplay section', () => {
    });

    xit('renders the TotalsDisplay area', () => {
    });
  });

  describe('State interactions', () => {
    xit('can add a new market', () => {
    });

    xit('can add and remove cards', () => {
    });

    xit('cannot delete cards from a market with zero cards', () => {
    });
  });

  describe('Server interactions', () => {
    // TODO: You'll need to require in and query the test DB in order to ensure
    // that the right items show up. You may find it's easiest to start each
    // test with a fresh DB.
    xit('loads all markets from database on pageload', () => {
    });

    xit('maintains synced state after refresh', () => {
      // First you'll need to make something to sync!
    });
  });
});
