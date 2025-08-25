import userJson from "../../../../fixtures/get-user.json";

describe("get user requests", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:8081/user/login", {
      email: "delia@yahoo.com",
      userPassword: "delia123",
    }).then((response) => {
      const token = response.body.jwt;
      cy.wrap(token).as("jwtToken");
    });
  });

  it("gets one user by id", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "GET",
        url: `http://localhost:8081/user/${userJson.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });

  it("validates one user by email", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "GET",
        url: `http://localhost:8081/user/validate?email=${encodeURIComponent(userJson.email)}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.userExists).to.eq(true);
      });
    });
  });

  it("validates one user by email", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "GET",
        url: `http://localhost:8081/user/validateToken?jwt=${encodeURIComponent(token)}`,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.isValid).to.eq(true);
      });
    });
  });
});
