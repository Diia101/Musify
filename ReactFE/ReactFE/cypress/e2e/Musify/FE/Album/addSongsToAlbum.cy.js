/// <reference types="cypress" />
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

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

  it("add song to album", () => {
    cy.get("#albumsPage").should("exist");

    cy.get("#albumCard").click();
    cy.get("#albumPage").should("exist");

    cy.get("#addSongToAlbum").click();
    cy.get("#addModalToAlbum").should("exist");
    cy.get("#addModalToAlbum").click();
    cy.get("#closeModalToAlbum").click();
    cy.get("#albumPage").should("exist");
  });
});
