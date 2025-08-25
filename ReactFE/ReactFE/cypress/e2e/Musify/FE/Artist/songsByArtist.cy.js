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

    login();

    cy.visitWithoutTrailingSlash("http://localhost:5173");
    cy.get("#navBarArtistButton").click();
  });

  it("get songs by artist", () => {
    cy.get("#artistList").children().should("have.length.greaterThan", 0);

    cy.get("#artistList").children().contains("Charlotte Cardin").click();

    cy.get("#ArtistPage").should("contain", "Charlotte Cardin");

    cy.get("#songList").children().should("have.length.greaterThan", 0);

    cy.get("#songList")
      .children()
      .its("length")
      .then((initialCount) => {
        cy.get("#songList").children().should("have.length", initialCount);
      });
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    cy.get("#songList").children().contains("Phoenix").click();
    cy.get("@windowOpen").should(
      "be.calledWith",
      "https://open.spotify.com/track/50zfJv2p95W1jCJp1SmFBH?si=00340ec7d2914c33",
    );
  });
});
