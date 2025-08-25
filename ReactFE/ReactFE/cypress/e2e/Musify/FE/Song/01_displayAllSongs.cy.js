/// <reference types="cypress" />

describe("Song Page Tests", () => {
  beforeEach(() => {
    cy.loginAdmin();
  });

  it("should show all songs", () => {
    cy.intercept("GET", "/songs/bySongName*").as("getSongs");

    cy.get("#navBarSongButton").click();
    cy.wait("@getSongs");

    cy.get("#songList", { timeout: 20000 }).should("be.visible");

    cy.get("#songList").children().should("have.length.greaterThan", 0);

    cy.contains("Halo").should("be.visible");
    cy.contains("Sky").should("be.visible");
  });
});
