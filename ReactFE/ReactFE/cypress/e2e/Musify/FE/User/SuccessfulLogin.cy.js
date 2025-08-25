context("Login tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/user/validateToken", {
      body: { isValid: false },
      statusCode: 200,
    }).as("validateToken");

    cy.visit("http://localhost:5173");
  });

  describe("Successful login", () => {
    it("can fill login form correctly", () => {
      cy.get('input[name="email"]').as("em");
      cy.get("@em").type("delia@yahoo.com");
      cy.get("@em").should("have.value", "delia@yahoo.com");

      cy.get('input[id="password"]').as("up");
      cy.get("@up").type("delia123");
      cy.get("@up").should("have.value", "delia123");
    });

    it("can login user successfully", () => {
      cy.get('input[name="email"]').type("delia@yahoo.com");
      cy.get('input[id="password"]').type("delia123");

      cy.contains("button", "Sign In").should("be.visible").click();

      cy.contains("Login successful!");
    });
  });
});
