class HomePage {

  searchSection() { return cy.get('#search-card'); }
  logRegisterButton() { return cy.xpath("//a[span[normalize-space(text())='Ingresar/Registrarse']]"); }
  welcomeMessage() { return cy.get('.text-center'); }
  loginButton() { return cy.get('button.btn-login'); }
  searchButton() { return cy.get('#search-form-submit'); }
  listFilter() { return cy.xpath("//input[contains(@class, 't8eum24') and contains(@placeholder, '')]"); }

  valueDropListTipo(optionText) {
    const escaped = optionText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return cy.contains('div[role="option"] span', new RegExp(`^${escaped}$`));
  }

  menu(menuName) {
      const xpathLiteral = (s) => {
        if (!s.includes("'")) return `'${s}'`;
        return 'concat(' + s.split("'").map((part, i, arr) => {
          const seg = `'${part}'`;
          return i < arr.length - 1 ? `${seg}, "'", ` : seg;
        }).join('') + ')';
      };
      return cy.xpath(`//a[normalize-space(.)=${xpathLiteral(menuName)}]`);
    }

  selectOptionsMenu(menuOption) {
    const xpathLiteral = (s) => {
      if (!s.includes("'")) return `'${s}'`;
      return 'concat(' + s.split("'").map((part, i, arr) => {
        const seg = `'${part}'`;
        return i < arr.length - 1 ? `${seg}, "'", ` : seg;
      }).join('') + ')';
    };

    const literal = xpathLiteral(menuOption);
    return cy.xpath(`//a[span[normalize-space(.)=${literal}]]`);
  }

  visit() {
    cy.visit('https://latam-retail-merlin-homepage-web-frontend-ore.latam.csnglobal.net/');
  }

  homeScreenIsVisible() {
    cy.url().should('include', 'homepage-web-frontend-ore');
    this.searchSection().should('be.visible');
    this.logRegisterButton().should('have.text', 'Ingresar/Registrarse');
  }

  captureCurrentUrl() {
  // Set up an intercept to capture the API response
    cy.intercept(
    { url: /.*www\.chileautos\.cl\// })
    .as('chileautosRequest');
  }

  getResponseBody() {
    cy.wait('@chileautosRequest').then((interception) => {
      const { request, response } = interception;

      cy.log('Current Url: ', request.url);
      cy.wrap(request.url).as('newUrl');
    });
  }

  saveOldUrl() {
    // Save current URL as '@oldUrl'
    cy.url().then((url) => {
      cy.wrap(url).as('oldUrl');
      cy.get('@oldUrl').then((oldUrl) => {
        cy.log('-----Old URL-----: ', oldUrl);
      });
    });
  }

  compareUrlWithSaved() {
    cy.get('@oldUrl').then((oldUrl) => {
      cy.get('@newUrl').then((newUrl) => {
        expect(newUrl).to.not.equal(oldUrl);
        cy.wrap(newUrl).as('newUrl');
      });
    });
  }

  validateUrlIsChileAutos() {
    cy.get('@newUrl').then((newUrl) => {
      expect(newUrl).to.include('chileautos.cl');
    });
  }

  selectParametersForFilter(value, filter) {
    const key = (filter || '').toString().toLowerCase();
    let index;
    switch (key) {
      case 'tipo':
        index = 0;
        break;
      case 'marca':
        index = 1;
        break;
      case 'modelo':
        index = 2;
        break;
      default:
          index = 0;
    }
    this.listFilter().should('be.visible').eq(index).click();
    cy.wait(1000);
    this.valueDropListTipo(value).should('be.visible').click({ force: true });
    cy.wait(1000);
  }

  clickSearchButton(){
    this.searchButton().should('be.visible').click();
  }

  selectMenu(menuName){
    this.menu(menuName).should('be.visible').click();
  }

  selectOption(optionName){
    this.selectOptionsMenu(optionName).should('be.visible').click();
  }

}

export default new HomePage();
