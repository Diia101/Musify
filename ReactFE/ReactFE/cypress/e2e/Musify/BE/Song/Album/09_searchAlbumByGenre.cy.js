/// <reference types="cypress" />

describe("Album Page Tests", () => {
  it("search album", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/albums/genre/pop",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        res.body.forEach((element) => {
          expect(element.genre).to.eq("Pop");
        });
      });
    });
  });
});
