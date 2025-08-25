describe("Song Page Tests", () => {
  const artistId = 7;

  before(() => {
    cy.login("delia@yahoo.com", "delia123").as("jwt");
  });

  it("should fetch songs by artist ID and validate response", function () {
    cy.request({
      method: "GET",
      url: `http://localhost:8081/songs/artist/${artistId}`,
      headers: {
        accept: "*/*",
        authorization: "Bearer " + this.jwt,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);

      const songs = res.body;

      expect(songs).to.be.an("array").that.is.not.empty;

      songs.forEach((song) => {
        expect(song).to.have.all.keys(
          "id",
          "title",
          "alternative_title",
          "duration",
          "creation_date",
          "url",
        );
        expect(song.id).to.be.a("number");
        expect(song.title).to.be.a("string");
        expect(song.alternative_title).to.be.a("string");
        expect(song.duration).to.be.a("number");
        expect(song.creation_date).to.match(/^\d{4}-\d{2}-\d{2}$/);
        expect(song.url).to.be.a("string");
      });
    });
  });
});
