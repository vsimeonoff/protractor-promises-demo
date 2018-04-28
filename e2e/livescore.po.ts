import { browser, by, element } from 'protractor';

export class LivescorePage {  
  navigateTo() {
    browser.waitForAngularEnabled(false);
    browser.get(browser.baseUrl);
    this.getAllowCookies().click();
  }

  scrollToIfNeeded(elm) {
    browser.executeScript("arguments[0].scrollIntoViewIfNeeded();", elm.getWebElement());
  }

  findEvent(iterator, results, limit, finish) {
    const item = iterator.next().value;

    if (!item || results.length == limit) {
      return finish(results);
    } else {
      const homeEl = this.getHome(item.home);
      const awayEl = this.getAway(item.away);

      return Promise.all([ homeEl.isPresent(), awayEl.isPresent() ])
      .then(isElementsPresent => {
        console.log(`H: ${item.home}, present:${isElementsPresent[0]}`);
        console.log(`A: ${item.away}, present:${isElementsPresent[1]}`);
        
        if (isElementsPresent[0]) {
          this.scrollToIfNeeded(homeEl);

          return homeEl.click().then(() => {
            results.push(item);
            browser.navigate().back();
            return this.findEvent(iterator, results, limit, finish);
          });
        } else {
          return this.findEvent(iterator, results, limit, finish);
        }
      });
    }    
  }

  findEvents(items, limit = items.length) {
    let foundEvents = [];

    return new Promise((resolve, reject) => {
      return this.findEvent(items[Symbol.iterator](), foundEvents, limit, resolve);
    });
  }

  foundEvents(matches) {
    console.log('Found Matches:', matches.map(match => `${match.home} - ${match.away}`));
  }

  getHome(home) {
    return element(by.cssContainingText('.ply.tright.name > span', home));
  }

  getAway(away) {
    return element(by.cssContainingText('.ply.name > span', away));
  }

  getAllowCookies() {
    return element(by.css('[data-id=confirm]'));
  }
}
