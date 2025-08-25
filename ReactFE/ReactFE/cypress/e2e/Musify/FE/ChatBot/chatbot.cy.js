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
    cy.get("#navBarChatButton").click();
  });

  it("chat bot function", () => {
    cy.get("#chatbot").should("be.visible");
    cy.get("#user-input").type("What is your privacy policy?");
    cy.intercept("POST", "**/get_answer").as("getAnswer");
    cy.get("#sendButton").click();
    cy.wait("@getAnswer").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="message-content"]')
      .last()
      .should(
        "contain.text",
        "You can read our privacy policy on our website under Privacy Policy.",
      );

    cy.get("#user-input").type("What if I forget my account password?");
    cy.intercept("POST", "**/get_answer").as("getAnswer");
    cy.get("#sendButton").click();
    cy.wait("@getAnswer").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="message-content"]')
      .last()
      .should(
        "contain.text",
        "Click 'Forgot Password' on the login page and follow the instructions to reset your password.",
      );

    cy.get("#user-input").type("Can I recommend songs or playlists?");
    cy.intercept("POST", "**/get_answer").as("getAnswer");
    cy.get("#sendButton").click();
    cy.wait("@getAnswer").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="message-content"]')
      .last()
      .should(
        "contain.text",
        "You can recommend songs or playlists by sharing them through the app or on social media.",
      );

    cy.get("#user-input").type("How can I contact customer support?");
    cy.intercept("POST", "**/get_answer").as("getAnswer");
    cy.get("#sendButton").click();
    cy.wait("@getAnswer").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="message-content"]')
      .last()
      .should(
        "contain.text",
        "Of course! I'm here to help you. What do you need assistance with? 😊",
      );
    cy.get("#user-input").type("How do I discover new genres or artists?");
    cy.intercept("POST", "**/get_answer").as("getAnswer");
    cy.get("#sendButton").click();
    cy.wait("@getAnswer").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="message-content"]')
      .last()
      .should(
        "contain.text",
        "Discover new genres and artists by exploring the 'Discover' section or using personalized recommendations in the app.",
      );
    cy.get("#user-input").type("Fuck you");
    cy.intercept("POST", "**/get_answer").as("getAnswer");
    cy.get("#sendButton").click();
    cy.wait("@getAnswer").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="message-content"]')
      .last()
      .should(
        "contain.text",
        "The message contains licensed content and cannot be processed.",
      );

    cy.get("#user-input").type("i love you");
    cy.intercept("POST", "**/get_answer").as("getAnswer");
    cy.get("#sendButton").click();
    cy.wait("@getAnswer").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="message-content"]')
      .last()
      .should(
        "contain.text",
        "Sending you lots of love and positive vibes! ❤️",
      );
    cy.get("#user-input").type("i am so hungry");
    cy.intercept("POST", "**/get_answer").as("getAnswer");
    cy.get("#sendButton").click();
    cy.wait("@getAnswer").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="message-content"]')
      .last()
      .should("contain.text", "Maybe you should grab a snack! 🍎");

    cy.get("#user-input").type("You are such a good friend");
    cy.intercept("POST", "**/get_answer").as("getAnswer");
    cy.get("#sendButton").click();
    cy.wait("@getAnswer").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="message-content"]')
      .last()
      .should("contain.text", "I'm here for you, buddy! 😊");
  });
});
