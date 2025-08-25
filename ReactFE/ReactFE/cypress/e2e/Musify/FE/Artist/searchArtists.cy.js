/// <reference types="cypress" />
import axios from "axios";
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("example to-do app", () => {
  Cypress.Commands.add("visitWithoutTrailingSlash", (url) => {
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    cy.visit(url);
  });

  const login = () => {
    cy.window().then(async (win) => {
      const data = {
        email: "munteandiana101@gmail.com",
        userPassword: "diana123",
      };
      const response = await axios.post(
        "http://localhost:8081/user/login",
        data,
      );
      await new Promise((resolve) => setTimeout(resolve, 650));
      win.localStorage.setItem("userId", response.data.userId);
      win.localStorage.setItem("jwt", response.data.jwt);
      win.localStorage.setItem("isAdmin", response.data.isAdmin);
      if (response.data.artist) {
        localStorage.setItem("user-artist-id", response.data.artist.artistId);
        localStorage.setItem("artist-flag", true);
      } else {
        localStorage.setItem("user-artist-id", null);
        localStorage.setItem("artist-flag", false);
      }
      win.localStorage.setItem("route", "home");
    });
  };

  beforeEach(() => {
    // Cypress starts out with a blank slate for each test

    login();

    cy.visitWithoutTrailingSlash("http://localhost:5173");
    cy.get("#navBarArtistButton").click();
  });

  it("search artists", () => {
    cy.get("#artistList").children().should("have.length.greaterThan", 0);

    cy.get("input#searchArtist").type("Charlotte");
    cy.get("#artistList").children().should("have.length", 1);
  });
});
