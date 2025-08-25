/// <reference types="cypress" />

describe("Album Page Tests", () => {
  it("get all songs to album", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/albums/17/songs",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        res.body.forEach((element) => {
          expect(element).to.be.oneOf(["Luna 2"]);
        });
      });
    });
  });
});
