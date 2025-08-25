describe("Song Page Tests", () => {
  it("get song by title", () => {
    cy.login("delia123@yahoo.com", "delia123").then((jwt) => {
      const songTitle = "Halo";

      cy.request({
        method: "GET",
        url: `http://localhost:8081/songs?title=${encodeURIComponent(songTitle)}`,
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);

        const song = res.body.find((s) => s.title === songTitle);

        expect(song).to.exist;
        expect(song.id).to.eq(37);
        expect(song.title).to.eq("Halo");
        expect(song.alternative_title).to.eq("Halo");
        expect(song.creation_date).to.eq("2024-08-13");
        expect(song.url).to.eq(
          "https://open.spotify.com/track/0al3bW8xF8L0KLDojMkkq1",
        );
      });
    });
  });
});
