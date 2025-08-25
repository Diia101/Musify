// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import axios from "axios";

Cypress.Commands.add("login", (email, password) => {
  cy.window().then((win) => {
    return axios
      .post("http://localhost:8081/user/login", {
        email: email,
        userPassword: password,
      })
      .then((response) => {
        const jwt = response.data.jwt;
        win.localStorage.setItem("userId", response.data.userId);
        win.localStorage.setItem("jwt", jwt);
        win.localStorage.setItem("isAdmin", response.data.isAdmin);
        if (response.data.artist) {
          win.localStorage.setItem(
            "user-artist-id",
            response.data.artist.artistId,
          );
          win.localStorage.setItem("artist-flag", true);
        } else {
          win.localStorage.setItem("user-artist-id", null);
          win.localStorage.setItem("artist-flag", false);
        }
        win.localStorage.setItem("route", "home");

        // Return the jwt wrapped in cy.wrap
        return cy.wrap(jwt);
      });
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginAdmin", () => {
  cy.fixture("login-admin").then((loginData) => {
    // Intercept the token validation request
    cy.intercept("GET", "/user/validateToken", {
      body: { isValid: false },
      statusCode: 200,
    }).as("validateToken");

    // Visit the localhost page
    cy.visit("http://localhost:5173");

    // Ensure the token validation request is completed
    cy.wait("@validateToken");

    // Fill out the login form
    cy.get('input[name="email"]').type(loginData.email);
    cy.get('input[name="userPassword"]').type(loginData.password);

    // Click the Sign In button
    cy.get('button[type="submit"]').click();
  });
});

Cypress.Commands.add("createSong", () => {
  cy.fixture("create-song").then((data) => {
    cy.get("#addSongButton").click();

    cy.get("input#title").type(data.title);
    cy.get("input#alternativeTitle").type(data.alternativeTitle);
    cy.get("input#duration").type(data.duration);
    cy.get("input#creationDate").type(data.creationDate);
    cy.get("input#url").type(data.url);

    cy.get("button#submitButton").click();
  });
});

Cypress.Commands.add("deleteSong", (title) => {
  cy.contains(".MuiCard-root", title)
    .parent()
    .find('img[alt="Delete"]')
    .should("exist")
    .click();

  cy.contains("button", "Yes").click();
});

Cypress.Commands.add("changePasswordSamePassword", () => {
  cy.fixture("change-password-same-password").then((data) => {
    cy.get('[data-testid="changePasswordLink"]').should("be.visible").click();
    cy.get("#oldPassword").should("be.visible").type(data.oldPassword);
    cy.get("#reenteredOldPassword")
      .should("be.visible")
      .type(data.reEnteredOldPassword);
    cy.get("#newPassword").should("be.visible").type(data.newPassword);
    cy.get('[data-testid="changePasswordButton"]').should("be.visible").click();
    cy.get('[data-testid="changePasswordLink"]').should("be.visible").click();
  });
});

Cypress.Commands.add("changePasswordWrongPassword", () => {
  cy.fixture("change-password-wrong-password").then((data) => {
    cy.get('[data-testid="changePasswordLink"]').should("be.visible").click();
    cy.get("#oldPassword").should("be.visible").type(data.oldPassword);
    cy.get("#reenteredOldPassword")
      .should("be.visible")
      .type(data.reEnteredOldPassword);
    cy.get("#newPassword").should("be.visible").type(data.newPassword);
    cy.get('[data-testid="changePasswordButton"]').should("be.visible").click();
    cy.get('[data-testid="changePasswordLink"]').should("be.visible").click();
  });
});

Cypress.Commands.add("changePasswordSuccess", () => {
  cy.fixture("change-password-success").then((data) => {
    cy.get('[data-testid="changePasswordLink"]').should("be.visible").click();
    cy.get("#oldPassword").should("be.visible").type(data.oldPassword);
    cy.get("#reenteredOldPassword")
      .should("be.visible")
      .type(data.reEnteredOldPassword);
    cy.get("#newPassword").should("be.visible").type(data.newPassword);
    cy.get('[data-testid="changePasswordButton"]').should("be.visible").click();
    cy.get('[data-testid="changePasswordLink"]').should("be.visible").click();
  });
});
