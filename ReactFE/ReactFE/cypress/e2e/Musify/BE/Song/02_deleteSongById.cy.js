/// <reference types="cypress" />

describe("Song Page Tests", () => {
  it("should create and then delete a song by ID", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8081/songs",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
        body: {
          title: "testTitleToDelete",
          alternative_title: "testAlternativeToDelete",
          duration: 10,
          creation_date: "2024-08-09",
          url: "https://www.youtube.com/watch?v=q3zqJs7JUCQ",
          artistIds: [3],
        },
      }).then((res) => {
        expect(res.status).to.eq(201);

        cy.request({
          method: "GET",
          url: "http://localhost:8081/songs",
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
        }).then((getSongsRes) => {
          expect(getSongsRes.status).to.eq(200);

          const createdSong = getSongsRes.body.find(
            (song) => song.title === "testTitleToDelete",
          );

          expect(createdSong).to.not.be.undefined;

          const songID = createdSong.id;

          cy.request({
            method: "DELETE",
            url: `http://localhost:8081/songs/${songID}`,
            headers: {
              accept: "*/*",
              authorization: "Bearer " + jwt,
            },
          }).then((deleteRes) => {
            expect(deleteRes.status).to.eq(204);
          });
        });
      });
    });
  });
});
