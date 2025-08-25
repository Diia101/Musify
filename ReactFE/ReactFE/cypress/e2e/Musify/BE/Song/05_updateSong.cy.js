/// <reference types="cypress" />

describe("Song Page Tests", () => {
  it("should create and then update a song", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      const initialTitle = `initialTitle_${Date.now()}`;
      const updatedTitle = `updatedTitle_${Date.now()}`;

      cy.request({
        method: "POST",
        url: "http://localhost:8081/songs",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
        body: {
          title: initialTitle,
          alternative_title: "initialAlternative",
          duration: 10,
          creation_date: "2024-08-12",
          url: "https://www.youtube.com/watch?v=q3zqJs7JUCQ",
          artistIds: [7],
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
        }).then((res) => {
          const song = res.body.find((song) => song.title === initialTitle);
          expect(song).to.not.be.undefined;
          const songID = song.id;

          cy.request({
            method: "PUT",
            url: `http://localhost:8081/songs/${songID}`,
            headers: {
              accept: "*/*",
              authorization: "Bearer " + jwt,
            },
            body: {
              title: updatedTitle,
              alternative_title: "updatedAlternative",
              duration: 12,
              creation_date: "2023-08-13",
              url: "https://www.youtube.com/watch?v=q3zqJs7JUCQ",
              artistIds: [7],
            },
          }).then((updateRes) => {
            expect(updateRes.status).to.eq(200);

            cy.request({
              method: "GET",
              url: `http://localhost:8081/songs/${songID}`,
              headers: {
                accept: "*/*",
                authorization: "Bearer " + jwt,
              },
            }).then((getRes) => {
              expect(getRes.status).to.eq(200);
              expect(getRes.body.title).to.eq(updatedTitle);
              expect(getRes.body.alternative_title).to.eq("updatedAlternative");
              expect(getRes.body.duration).to.eq(12);
            });

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
});
