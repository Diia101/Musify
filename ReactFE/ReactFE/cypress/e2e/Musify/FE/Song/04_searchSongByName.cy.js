context("Register tests", () => {
  beforeEach(() => {
    cy.loginAdmin();
  });

  it("should navigate to the song page and search for a specific song", () => {
    cy.get("#navBarSongButton").click();

    cy.get("#songList").children().should("have.length.greaterThan", 1);

    cy.get('input[class*="MuiOutlinedInput-input"]').type("Halo");

    cy.get("#songList").children().should("have.length", 1);

    cy.get('input[class*="MuiOutlinedInput-input"]').clear();
    cy.get('input[class*="MuiOutlinedInput-input"]').type("ABCDEFGH");

    cy.get("#songList").contains("No songs found");
  });
});
