// <reference types="cypress" />

describe("Song Page Tests", () => {
  it("get song by id", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/songs/28",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.id).to.eq(28);
        expect(res.body.title).to.eq("Floricele pe campii");
        expect(res.body.alternative_title).to.eq("primavara");
        expect(res.body.creation_date).to.eq("2024-08-13");
        expect(res.body.url).to.eq(
          "https://www.youtube.com/watch?v=FA8AZSMEOD0",
        );
      });
    });
  });
});
