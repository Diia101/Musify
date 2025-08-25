/// <reference types="cypress" />

describe("Album Page Tests", () => {
  it("delete album by ID", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "DELETE",
        url: "http://localhost:8081/albums/16",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((deleteRes) => {
        expect(deleteRes.status).to.eq(200);
      });
    });
  });
});
