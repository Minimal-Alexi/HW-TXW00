import { request, expect } from "./config.js";

describe("Airport API", function () {
  
  describe("POST /favorites", function () {
    describe("when saving favorite airports", function () {
      it("requires authentication", async function () {
        const response = await request.post("/favorites").send({
          airport_id: "YBR",
          note: "Going to Canada",
        });

        expect(response.status).to.eql(401);
      });

      it("allows a user to get their favorite airports", async function () {
        const response = await request
          .get("/favorites")
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");

        expect(response.status).to.eql(200);
      });

      it("allows a user to save, update, and delete their favorite airports", async function () {
        // Save favorite airport
        const postResponse = await request
          .post("/favorites")
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
          .send({
            airport_id: "YBR",
            note: "Going to Canada",
          });

        expect(postResponse.status).to.eql(201);
        expect(postResponse.body.data.attributes.airport.name).to.eql(
          "Brandon Municipal Airport"
        );
        expect(postResponse.body.data.attributes.note).to.eql("Going to Canada");

        const favoriteId = postResponse.body.data.id;

        // Update favorite airport note
        const putResponse = await request
          .put(`/favorites/${favoriteId}`)
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
          .send({
            note: "My usual layover when visiting family and friends",
          });

        expect(putResponse.status).to.eql(200);
        expect(putResponse.body.data.attributes.note).to.eql(
          "My usual layover when visiting family and friends"
        );

        // Delete favorite airport
        const deleteResponse = await request
          .delete(`/favorites/${favoriteId}`)
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");

        expect(deleteResponse.status).to.eql(204);

        // Verify deletion
        const getResponse = await request
          .get(`/favorites/${favoriteId}`)
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");

        expect(getResponse.status).to.eql(404);
      });
    });
  });

});
