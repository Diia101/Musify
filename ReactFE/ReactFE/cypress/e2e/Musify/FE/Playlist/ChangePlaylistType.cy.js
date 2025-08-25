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

  it("Chage Playlist Type", () => {
    cy.get("#navBarPlaylistButton").click();
    cy.get("#playlistList").should("be.visible");

    cy.get("#playlistList").children().contains("Hit Songs").click();
    cy.get("#PlaylistPage").should("contain", "Hit Songs");

    cy.get("#changePlaylistTypeButton").within(() => {
      cy.get("#publicType").should("exist");
    });

    cy.get("#changePlaylistTypeButton").click();

    cy.get("#changePlaylistTypeButton").within(() => {
      cy.get("#privateType").should("exist");
    });
    cy.get("#changePlaylistTypeButton").click();

    cy.get("#changePlaylistTypeButton").within(() => {
      cy.get("#publicType").should("exist");
    });
  });

  it("Change Playlist type button does not exist on not owned playlist page", () => {
    cy.get("#navBarPlaylistButton").click();
    cy.get("#playlistList").should("be.visible");

    cy.get("#playlistList").children().contains("Public Music").click();
    cy.get("#PlaylistPage").should("contain", "Public Music");

    cy.get("#changePlaylistTypeButton").should("not.exist");
  });
});
