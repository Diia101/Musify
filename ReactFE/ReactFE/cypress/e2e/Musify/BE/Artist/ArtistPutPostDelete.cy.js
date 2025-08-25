describe("Arist BE Tests", () => {
  it("should create an artist", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8081/artists",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
        body: {
          artistName: "TEST ARTIST",
          location: "TEST LOCATION",
          activePeriod: 2000,
          userIds: [3],
          person: true,
        },
      }).then((res) => {
        expect(res.status).to.eq(201);
      });
    });
  });

  it("should update last created artist", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/artists",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        const maxIdObject = res.body.reduce(
          (max, obj) => (obj.artistId > max.artistId ? obj : max),
          res.body[0],
        );
        const url = `http://localhost:8081/artists/${maxIdObject.artistId}`;
        cy.request({
          method: "PUT",
          url: url,
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
          body: {
            artistName: "TEST NEW ARTIST",
            location: "TEST NEW LOCATION",
            activePeriod: 2010,
            userIds: [3],
            person: true,
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property("artistName", "TEST NEW ARTIST");
          expect(res.body).to.have.property("location", "TEST NEW LOCATION");
          expect(res.body).to.have.property("activePeriod", 2010);
          expect(res.body).to.have.property("person", true);
        });
      });
    });
  });

  it("should delete last created artist", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/artists",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        const maxIdObject = res.body.reduce(
          (max, obj) => (obj.artistId > max.artistId ? obj : max),
          res.body[0],
        );
        const url = `http://localhost:8081/artists/${maxIdObject.artistId}`;
        cy.request({
          method: "DELETE",
          url: url,
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
        });
      });
    });
  });
});
