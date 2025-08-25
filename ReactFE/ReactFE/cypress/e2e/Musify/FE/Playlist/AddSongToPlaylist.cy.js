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
  });

  it("Add song to playlist", () => {
    cy.get("#navBarSongButton").click();
    cy.get("#songList").should("be.visible");

    cy.get("#songList div")
      .contains("Mountain Echoes")
      .get("#addSongToPlaylistButton")
      .click();
    cy.get("#addSongToPlaylistPopUp").should("be.visible");

    cy.get("#playlistId option").should("have.length.above", 0);
    cy.get("#playlistId").select("Hit Songs");

    cy.get("#submitButton").click();

  });
});
