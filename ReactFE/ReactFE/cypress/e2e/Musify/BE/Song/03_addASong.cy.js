describe("Song Page Tests", () => {
  it("Create a new song, get 201", () => {
    cy.login("delia@yahoo.com", "delia123").then((jwt) => {
      cy.request({
        method: "POST",
        url: "http://localhost:8081/songs",
        headers: {
          accept: "*/*",
          authorization: "Bearer " + jwt,
        },
        body: {
          title: "backendT",
          alternative_title: "backendt",
          duration: 10,
          creation_date: "2024-08-12",
          url: "https://www.youtube.com/watch?v=q3zqJs7JUCQ",
          artistIds: [7],
        },
      }).then((res) => {
        expect(res.status).to.eq(201);
      });
    });
  });
});
