// <reference types="cypress" />

describe("Album Page Tests", () => {
  it("get album by id", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/albums/16",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});
