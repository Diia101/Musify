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

  it("Follow Playlist", () => {
    cy.get("#navBarPlaylistButton").click();
    cy.get("#playlistList").should("be.visible");

    cy.get("#playlistList").children().contains("Public Music").click();
    cy.get("#PlaylistPage").should("contain", "Public Music");

    cy.get("#followPlaylistButton").should("contain", "🤍");
    cy.get("#followPlaylistButton").click();
    cy.get("#followPlaylistButton").should("contain", "❤️");
  });

  it("Unfollow Playlist", () => {
    cy.get("#navBarPlaylistButton").click();
    cy.get("#playlistList").should("be.visible");

    cy.get("#playlistList").children().contains("Public Music").click();
    cy.get("#PlaylistPage").should("contain", "Public Music");

    cy.get("#followPlaylistButton").should("contain", "❤️");
    cy.get("#followPlaylistButton").click();
    cy.get("#followPlaylistButton").should("contain", "🤍");
  });

  it("Follow Playlist button does not exist on owned playlist page", () => {
    cy.get("#navBarPlaylistButton").click();
    cy.get("#playlistList").should("be.visible");

    cy.get("#playlistList").children().contains("Hit Songs").click();
    cy.get("#PlaylistPage").should("contain", "Hit Songs");

    cy.get("#followPlaylistButton").should("not.exist");
  });
});
