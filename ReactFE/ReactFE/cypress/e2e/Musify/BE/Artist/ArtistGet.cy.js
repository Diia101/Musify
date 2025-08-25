import artistJson from "../../../../fixtures/get-artist.json";

describe("get user requests", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:8081/user/login", {
      email: "delia@yahoo.com",
      userPassword: "delia123",
    }).then((response) => {
      const token = response.body.jwt;
      cy.wrap(token).as("jwtToken");
    });
  });

  it("gets one artist by id", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "GET",
        url: `http://localhost:8081/artists/${1}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });

  it("gets all artists", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "GET",
        url: `http://localhost:8081/artists`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });

  it("gets the albums of an artist by artistId", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "GET",
        url: `http://localhost:8081/artists/${1}/albums`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });

  it("verifies if the user is an artist or not, deduces id", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "GET",
        url: `http://localhost:8081/artists/user`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });

  it("searches artist by name", () => {
    cy.get("@jwtToken").then((token) => {
      cy.request({
        method: "GET",
        url: `http://localhost:8081/artists/search?searchName=${artistJson.name}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});
