context("User tests", () => {
  let testEmail;

  before(() => {
    const uniqueEmailTag = Math.floor(Math.random() * 10000000);
    testEmail = "freddiem" + uniqueEmailTag + "@yahoo.com";
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept("GET", "/user/validateToken", {
      body: { isValid: false },
      statusCode: 200,
    }).as("validateToken");

    cy.visit("http://localhost:5173");
  });

  it("can load application", () => {
    cy.contains("h2", "Login to Musify").should("be.visible");
    cy.get("form").within(() => {
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="userPassword"]').should("be.visible");
      cy.contains("button", "Sign In").should("be.visible");
    });
    cy.contains("Register here").should("be.visible");
  });

  describe("Successful register", () => {
    it("can switch to register page", () => {
      cy.contains("Register here").click();

      cy.contains("h2", "Register to start using Musify").should("be.visible");
      cy.get("form").within(() => {
        cy.get('input[name="firstname"]').should("be.visible");
        cy.get('input[name="lastname"]').should("be.visible");
        cy.get('input[name="email"]').should("be.visible");
        cy.get('input[name="userPassword"]').should("be.visible");
        cy.get('[data-testid="countrySelect"]').should("be.visible");
        cy.get('input[name="birthday"]').should("be.visible");
        cy.contains("button", "Register").should("be.visible");
      });
    });

    it("can fill register form correctly and register user", () => {
      cy.contains("Register here").click();

      cy.get('input[name="firstname"]').as("fn");
      cy.get("@fn").type("Freddie");
      cy.get("@fn").should("have.value", "Freddie");

      cy.get('input[name="lastname"]').as("ln");
      cy.get("@ln").type("Mercury");
      cy.get("@ln").should("have.value", "Mercury");

      cy.get('input[name="email"]').as("em");
      cy.get("@em").type(testEmail);
      cy.get("@em").should("have.value", testEmail);

      cy.get('input[name="userPassword"]').as("up");
      cy.get("@up").type("freddieRocks123");
      cy.get("@up").should("have.value", "freddieRocks123");

      cy.get('[data-testid="countrySelect"]').click();
      cy.contains("li", "United Kingdom").click();

      cy.get('input[name="birthday"]').as("bd");
      cy.get("@bd").type("1946-09-05");
      cy.get("@bd").should("have.value", "1946-09-05");

      cy.contains("button", "Register").should("be.visible").click();

      cy.contains("Register sucessful!");
    });

    it("can fill register form correctly and fails to register user because email is already used", () => {
      cy.contains("Register here").click();

      cy.get('input[name="firstname"]').as("fn");
      cy.get("@fn").type("Freddie");
      cy.get("@fn").should("have.value", "Freddie");

      cy.get('input[name="lastname"]').as("ln");
      cy.get("@ln").type("Mercury");
      cy.get("@ln").should("have.value", "Mercury");

      cy.get('input[name="email"]').as("em");
      cy.get("@em").type(testEmail);
      cy.get("@em").should("have.value", testEmail);

      cy.get('input[name="userPassword"]').as("up");
      cy.get("@up").type("freddieRocks123");
      cy.get("@up").should("have.value", "freddieRocks123");

      cy.get('[data-testid="countrySelect"]').click();
      cy.contains("li", "United Kingdom").click();

      cy.get('input[name="birthday"]').as("bd");
      cy.get("@bd").type("1946-09-05");
      cy.get("@bd").should("have.value", "1946-09-05");

      cy.contains("button", "Register").should("be.visible").click();

      cy.contains("Email already used!");
    });
  });

  describe("Successful user details update", () => {
    it("can fill form correctly and login user", () => {
      cy.get('input[name="email"]').as("em");
      cy.get("@em").type(testEmail);
      cy.get("@em").should("have.value", testEmail);

      cy.get('input[name="userPassword"]').as("up");
      cy.get("@up").type("freddieRocks123");
      cy.get("@up").should("have.value", "freddieRocks123");

      cy.contains("button", "Sign In").click();
      cy.contains("Login successful!");
    });
    it("can get to profile page and update user details", () => {
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="userPassword"]').type("freddieRocks123");
      cy.contains("button", "Sign In").click();

      cy.get('[data-testid="profileIcon"]').should("be.visible").click();
      cy.get('[data-testid="profileButton"]').should("be.visible").click();

      cy.contains("div", "My Profile").should("be.visible");
      cy.contains("Change details").should("be.visible").click();

      cy.get('input[name="firstname"]').as("fn");
      cy.get("@fn").type(" 2");
      cy.get("@fn").should("have.value", "Freddie 2");

      cy.get('input[name="lastname"]').as("ln");
      cy.get("@ln").type(" 2");
      cy.get("@ln").should("have.value", "Mercury 2");

      cy.contains("button", "Save").should("be.visible").click();
      cy.contains("Your modifications have been saved!");
    });
  });
  describe("Successful user delete", () => {
    it("can fill form correctly and login user", () => {
      cy.get('input[name="email"]').as("em");
      cy.get("@em").type(testEmail);
      cy.get("@em").should("have.value", testEmail);

      cy.get('input[name="userPassword"]').as("up");
      cy.get("@up").type("freddieRocks123");
      cy.get("@up").should("have.value", "freddieRocks123");

      cy.contains("button", "Sign In").click();
      cy.contains("Login successful!");
    });

    it("can get to profile page and delete user", () => {
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="userPassword"]').type("freddieRocks123");
      cy.contains("button", "Sign In").click();

      cy.get('[data-testid="profileIcon"]').should("be.visible").click();
      cy.get('[data-testid="profileButton"]').should("be.visible").click();

      cy.contains("div", "My Profile").should("be.visible");
      cy.contains("button", "Delete account!").should("be.visible").click();
      cy.contains("button", "DELETE ACCOUNT").should("be.visible").click();
      cy.contains("You have successfully deleted your account!");
    });
  });
});
