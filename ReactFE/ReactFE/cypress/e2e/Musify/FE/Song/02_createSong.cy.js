/// <reference types="cypress" />

context("Register tests", () => {
  beforeEach(() => {
    cy.loginAdmin();
  });

  it("should navigate to the song page and create a new song", () => {
    cy.get("#navBarSongButton").click();

    cy.createSong();

    cy.contains(".MuiCard-root", "Test Title").should("exist");

    cy.deleteSong("Test Title");
  });
});
