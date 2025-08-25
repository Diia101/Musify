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

  it("Display song list", () => {
    cy.get("#playlistList").should("be.visible");

    cy.get("#playlistList").children().contains("Hit Songs").click();
    cy.get("#PlaylistPage").should("contain", "Hit Songs");

    cy.get("#playlistSongList").should("be.visible");
    cy.get("#playlistSongList").children().should("have.length.greaterThan", 0);
  });
});
