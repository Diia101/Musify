/// <reference types="cypress" />

describe("example to-do app", () => {
  Cypress.Commands.add("visitWithoutTrailingSlash", (url) => {
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    cy.visit(url);
  });

  beforeEach(() => {


    cy.login("munteandiana101@gmail.com", "diana123");

    cy.visitWithoutTrailingSlash("http://localhost:5173");

    cy.get("#navBarPlaylistButton").click();
  });

  it("create song", () => {
    cy.get("#createPlaylistButton").click();
    cy.get("#createPlaylistModal").should("be.visible");
    cy.get("#name").type("TES PLAY");
    cy.get("#isPublic").check();

    cy.get("#name").should("have.value", "TEST PLAYLIST");
    cy.get("#isPublic").should("have.value", "on");

    cy.get("#playlistList")
      .children()
      .its("length")
      .then((initialCount) => {
        cy.get("#submitButton").click();
        cy.get("#createPlaylistModal").should("exist");
        cy.get("#createPlaylistModalClose").click();
        cy.get("#createPlaylistModal").should("not.exist");
        cy.get("#playlistList").children().should("have.length", initialCount);
      });
  });
});
