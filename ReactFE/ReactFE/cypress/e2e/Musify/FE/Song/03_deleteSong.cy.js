/// <reference types="cypress" />

context("Register tests", () => {
  beforeEach(() => {
    cy.loginAdmin();
  });

  it("should navigate to the song page and delete a song", () => {
    cy.get("#navBarSongButton").click();

    cy.fixture("create-song").then((data) => {
      cy.createSong();
      cy.contains(".MuiCard-root", data.title).should("exist");

      cy.deleteSong(data.title);

      cy.contains(".MuiCard-root", data.title).should("not.exist");
    });
  });
});
