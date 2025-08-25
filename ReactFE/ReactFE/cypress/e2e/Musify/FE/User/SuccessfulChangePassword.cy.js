/// <reference types="cypress" />

context("Change Password Test", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginAdmin();
  });

  it("reaches the profile page and makes 3 attempts", () => {
    cy.get('[data-testid="profileIcon"]').should("be.visible").click();
    cy.get('[data-testid="profileButton"]').should("be.visible").click();
    cy.contains("div", "My Profile").should("be.visible");

    cy.changePasswordSamePassword();
    cy.contains("Provided new password mustn't be identical to the old one");

    cy.changePasswordWrongPassword();
    cy.contains("Provided old password doesn't match");

    cy.changePasswordSuccess();
    cy.contains("Your password has been changed!");
  });
});
