/// <reference types="cypress" />

// This spec file contains tests for the song page.

describe("Song Page Tests", () => {
  it("should show all songs", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/songs",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.length.greaterThan(0);
      });
    });
  });
});
