/// <reference types="cypress" />

describe("Album Page Tests", () => {
  it("add song to album", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8081/albums/16/28/songs",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);

        cy.request({
          method: "GET",
          url: "http://localhost:8081/albums/16",
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
        }).then((getRes) => {
          expect(getRes.status).to.eq(200);
          expect(getRes.body.albumId).to.eq(16);
          expect(getRes.body.title).to.eq("Nocturn");
          expect(getRes.body.description).to.eq("romanian album");
          expect(getRes.body.artist.artistId).to.eq(1);
          expect(getRes.body.genre).to.eq("Pop");
          expect(getRes.body.releaseDate).to.eq("2018-02-20");
          expect(getRes.body.label).to.eq("global record");
          getRes.body.songs.forEach((element) => {
            expect(element.id).to.eq(28);
          });
        });
      });
    });
  });
});
