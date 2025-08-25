/// <reference types="cypress" />

describe("Album Page Tests", () => {
  it("update album by id", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "PUT",
        url: "http://localhost:8081/albums/16",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
        body: {
          title: "Nocturn",
          description: "romanian album",
          artistId: 1,
          genre: "pop",
          releaseDate: "2018-02-20T08:00:58.869Z",
          label: "global record",
        },
      }).then((res) => {
        expect(res.status).to.eq(200);

        cy.request({
          method: "GET",
          url: "http://localhost:8081/songs",
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
        }).then(() => {
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
            expect(getRes.body.genre).to.eq("pop");
            expect(getRes.body.releaseDate).to.eq("2018-02-20");
            expect(getRes.body.label).to.eq("global record");
          });
        });
      });
    });
  });
});
