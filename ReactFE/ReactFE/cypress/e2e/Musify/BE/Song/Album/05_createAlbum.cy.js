/// <reference types="cypress" />

describe("Album Page Tests", () => {
  it("create album", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8081/albums",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
        body: {
          title: "F.A.M.E.E",
          description: "latino",
          artistId: 3,
          genre: "reggaeton",
          releaseDate: "2020-06-16T08:31:47.468Z",
          label: "fiesta",
        },
      }).then((res) => {
        expect(res.status).to.eq(200);

        cy.request({
          method: "GET",
          url: "http://localhost:8081/albums/21",
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
        }).then((getRes) => {
          expect(getRes.status).to.eq(200);
          //increment
          expect(getRes.body.albumId).to.eq(21);
          expect(getRes.body.title).to.eq("F.A.M.E.E");
          expect(getRes.body.description).to.eq("latino");
          expect(getRes.body.artist.artistId).to.eq(3);
          expect(getRes.body.genre).to.eq("reggaeton");
          expect(getRes.body.releaseDate).to.eq("2020-06-16");
          expect(getRes.body.label).to.eq("fiesta");
        });
      });
    });
  });
});
