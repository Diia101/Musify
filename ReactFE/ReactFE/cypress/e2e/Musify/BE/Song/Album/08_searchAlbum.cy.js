/// <reference types="cypress" />

describe("Album Page Tests", () => {
  it("search album", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/albums/search?albumName=f.a.m.e",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.length.greaterThan(0);
        expect(res.body[0]).to.have.property("title", "F.A.M.E");
      });
    });
  });
});
