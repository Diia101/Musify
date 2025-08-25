/// <reference types="cypress" />

describe("example to-do app", () => {
  Cypress.Commands.add("visitWithoutTrailingSlash", (url) => {
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    cy.visit(url);
  });

  beforeEach(() => {
    cy.login("delia@yahoo.com", "delia123");

    cy.visitWithoutTrailingSlash("http://localhost:5173");
    cy.get("#navBarAlbumButton").click();
  });

  it("filters albums by Pop genre", () => {
    const genreToTest = "Pop";
    const filterButtonSelector = `#filterButton-${genreToTest}`;
    cy.get(filterButtonSelector).click();
    cy.get("#albums").should("be.visible");
    cy.get("#albums")
      .children()
      .each(($album) => {
        cy.wrap($album)
          .find(".spacingTop")
          .invoke("text")
          .then((text) => {
            expect(text.trim()).to.be.oneOf(["Nocturn", "Antiexemplu"]);
          });
      });
  });
});
