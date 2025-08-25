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
    cy.visit("http://localhost:5173/");

    cy.get("#navBarHomeButton").click();
  });

  it("create album", () => {
    cy.get("#addAlbumButton").click();
    cy.get("#addAlbumPopUp").should("be.visible");
    cy.get("#albumTitle").type("Album Test");
    cy.get("#description").type("Test create album");
    cy.get("#genre").type("pop");
    cy.get("#releaseDate").type("2012-05-12");
    cy.get("#label").type("label test");

    cy.get("#albumTitle").should("have.value", "Album Test");
    cy.get("#description").should("have.value", "Test create album");
    cy.get("#genre").should("have.value", "pop");
    cy.get("#releaseDate").should("have.value", "2012-05-12");
    cy.get("#label").should("have.value", "label test");

    cy.get("#albumList")
      .children()
      .its("length")
      .then((initialCount) => {
        cy.get("#createButton").click();
        cy.get("#addAlbumPopUp").should("not.exist");
        cy.get("#albumList")
          .children()
          .should("have.length", initialCount);
      });
  });
});
