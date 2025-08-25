import jsonData from "../../../../fixtures/create-user.json";
import jsonValidation from "../../../../fixtures/validate-user.json";

describe("post user requests", () => {
  let randomString = "";
  let testEmail = "";

  var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 10; ++i) {
    randomString += pattern.charAt(Math.floor(Math.random() * pattern.length));
  }
  testEmail = randomString + "@email.com";

  it("delete user", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/user/register",
      body: {
        firstname: jsonData.firstname,
        lastname: jsonData.lastname,
        email: testEmail,
        userPassword: jsonData.userPassword,
        country: jsonData.country,
        birthday: jsonData.birthday,
      },
    })
      .then((res) => {
        const body = JSON.parse(res.requestBody);

        expect(res.status).to.eq(201);
        expect(body).has.property("firstname", jsonData.firstname);
        expect(body).has.property("lastname", jsonData.lastname);
        expect(body).has.property("email", testEmail);
        expect(body).has.property("userPassword", jsonData.userPassword);
        expect(body).has.property("country", jsonData.country);
        expect(body).has.property("birthday", jsonData.birthday);
      })
      .then(() => {
        cy.request({
          method: "GET",
          url: "http://localhost:8081/user/validate?email=" + testEmail,
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).has.property("status", jsonValidation.status);
          expect(res.body).has.property(
            "userExists",
            jsonValidation.userExists,
          );
        });
      });

    cy.request({
      method: "POST",
      url: "http://localhost:8081/user/login",
      body: {
        email: testEmail,
        userPassword: jsonData.userPassword,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).has.property("userId");
      expect(res.body).has.property("isAdmin");
      expect(res.body).has.property("artist");
      expect(res.body).has.property("jwt");

      const jwtToken = res.body.jwt;

      cy.request({
        method: "DELETE",
        url: "http://localhost:8081/user",
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      }).then((res) => {
        expect(res.status).to.eq(204);
      });
    });
  });
});
