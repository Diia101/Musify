import passwordJson from "../../../../fixtures/change-password-success.json";
import userJson from "../../../../fixtures/get-user.json";
import putJson from "../../../../fixtures/put-user.json";

describe("put user requests", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:8081/user/login", {
      email: "delia@yahoo.com",
      userPassword: "delia123",
    }).then((response) => {
      const token = response.body.jwt;
      cy.wrap(token).as("jwtToken");
    });
  });

  it("modify user details", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "PUT",
        url: `http://localhost:8081/user/${userJson.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: putJson,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.firstname).to.eq(putJson.firstname);
        expect(res.body.lastname).to.eq(putJson.lastname);
        expect(res.body.country).to.eq(putJson.country);
      });
    });
  });

  it("modify user password", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "PUT",
        url: `http://localhost:8081/user/${userJson.id}/change-password`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: passwordJson,
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});
