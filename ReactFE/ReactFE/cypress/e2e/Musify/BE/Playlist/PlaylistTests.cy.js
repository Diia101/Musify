

describe("Playlist BE Tests", () => {
  it("should create a playlist", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8081/playlists",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
        body: {
          name: "TEST PLAYLIST",
          isPublic: true,
        },
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body).to.have.property("name", "TEST PLAYLIST");
        expect(res.body).to.have.property("isPublic", true);
      });
    });
  });

  it("should get all public playlists", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/playlists/public",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.length.greaterThan(0);
      });
    });
  });

  it("should get certain playlists", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/playlists/public",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        const maxIdObject = res.body.reduce(
          (max, obj) => (obj.playlistId > max.playlistId ? obj : max),
          res.body[0],
        );
        const url = `http://localhost:8081/playlists/${maxIdObject.playlistId}`;
        cy.request({
          method: "GET",
          url: url,
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property("name", "TEST PLAYLIST");
          expect(res.body).to.have.property("isPublic", true);
        });
      });
    });
  });

  it("should update playlist created before", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/playlists/public",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        const maxIdObject = res.body.reduce(
          (max, obj) => (obj.playlistId > max.playlistId ? obj : max),
          res.body[0],
        );
        const url = `http://localhost:8081/playlists/${maxIdObject.playlistId}`;
        cy.request({
          method: "PUT",
          url: url,
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
          body: {
            name: "TEST NEW PLAYLIST",
            isPublic: true,
          },
        }).then((res) => {
          expect(res.status).to.eq(204);
        });
      });
    });
  });

  it("should get certain modified playlists", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/playlists/public",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        const maxIdObject = res.body.reduce(
          (max, obj) => (obj.playlistId > max.playlistId ? obj : max),
          res.body[0],
        );
        const url = `http://localhost:8081/playlists/${maxIdObject.playlistId}`;
        cy.request({
          method: "GET",
          url: url,
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property("name", "TEST NEW PLAYLIST");
          expect(res.body).to.have.property("isPublic", true);
        });
      });
    });
  });

  it("should add two songs in last created playlist", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/playlists/public",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        const maxIdObject = res.body.reduce(
          (max, obj) => (obj.playlistId > max.playlistId ? obj : max),
          res.body[0],
        );
        const url = (songId) =>
          `http://localhost:8081/playlists/${maxIdObject.playlistId}/song/${songId}`;
        const songIds = [1, 3, 9];
        songIds.forEach((id) => {
          cy.request({
            method: "PUT",
            url: url(id),
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

  it("should get songs from playlist", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/playlists/public",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        const maxIdObject = res.body.reduce(
          (max, obj) => (obj.playlistId > max.playlistId ? obj : max),
          res.body[0],
        );
        const url = `http://localhost:8081/playlists/${maxIdObject.playlistId}`;
        cy.request({
          method: "GET",
          url: url,
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property("songs");
          expect(res.body.songs).to.have.length(3);
          res.body.songs.forEach((element) => {
            expect(element.id).to.be.oneOf([1, 3, 9]);
          });
        });
      });
    });
  });

  it("should change order of songs", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/playlists/public",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        const maxIdObject = res.body.reduce(
          (max, obj) => (obj.playlistId > max.playlistId ? obj : max),
          res.body[0],
        );
        const url = `http://localhost:8081/playlists/${maxIdObject.playlistId}/song`;
        cy.request({
          method: "PUT",
          url: url,
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
          body: {
            oldIndex: 0,
            newIndex: 2,
            changeType: "SHIFT",
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          cy.request({
            method: "GET",
            url: `http://localhost:8081/playlists/${maxIdObject.playlistId}`,
            headers: {
              accept: "*/*",
              authorization: "Bearer " + jwt,
            },
          }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("songs");
            expect(res.body.songs).to.have.length(3);
            expect(res.body.songs[0]).to.have.property("id", 3);
            expect(res.body.songs[1]).to.have.property("id", 9);
            expect(res.body.songs[2]).to.have.property("id", 1);
          });
        });
      });
    });
  });

  it("should delete playlist created before", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8081/playlists/public",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        const maxIdObject = res.body.reduce(
          (max, obj) => (obj.playlistId > max.playlistId ? obj : max),
          res.body[0],
        );
        const url = `http://localhost:8081/playlists/${maxIdObject.playlistId}`;
        cy.request({
          method: "DELETE",
          url: url,
          headers: {
            accept: "*/*",
            authorization: "Bearer " + jwt,
          },
        }).then((res) => {
          expect(res.status).to.eq(204);
        });
      });
    });
  });

  it("should get all owned playlists", () => {
    cy.login("munteandiana101@gmail.com", "diana123").then((jwt) => {
      cy.request({
        method: "GET",
        url: `http://localhost:8081/playlists/3/owned`,
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.length.greaterThan(0);
      });
    });
  });
});
