describe("Song Page Tests", () => {
  it("should fetch songs by artist ID", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      const artistName = "Carla's Dreams";

      cy.request({
        method: "GET",
        url: `http://localhost:8081/songs/byArtistName?artistName=${encodeURIComponent(artistName)}`,
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);

        const songs = res.body;

        expect(songs).to.be.an("array").that.is.not.empty;

        const songsByArtistId = songs.filter(
          (song) =>
            Array.isArray(song.artistsOfASong) &&
            song.artistsOfASong.some((artist) => artist.artistId === 7),
        );

        expect(songsByArtistId).to.have.length.greaterThan(0);

        const song = songsByArtistId[0];
        expect(song.id).to.exist;
        expect(song.title).to.exist;
        expect(song.alternative_title).to.exist;
        expect(song.creation_date).to.be.a("number");
        expect(song.url).to.exist;
        expect(song.artistsOfASong[0].artistId).to.eq(7);
      });
    });
  });
});
