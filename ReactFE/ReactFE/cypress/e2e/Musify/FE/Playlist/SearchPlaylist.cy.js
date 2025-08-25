/// <reference types="cypress" />

describe("example to-do app", () => {
  Cypress.Commands.add("visitWithoutTrailingSlash", (url) => {
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    cy.visit(url);
  });

  beforeEach(() => {

    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      console.log(jwt);
    });

    cy.visitWithoutTrailingSlash("http://localhost:5173");
  });

  it("Search for playlists", () => {
    cy.get("#navBarPlaylistButton").click();
    cy.get("#playlistList").should("be.visible");
    cy.get("#searchPlaylistInput").type("TEST PLAYLIST");
    cy.get("#playlistList").children().should("have.length", 2);
  });
});
