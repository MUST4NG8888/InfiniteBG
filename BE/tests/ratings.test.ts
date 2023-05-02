import supertest from "supertest";
import { cleanData, disconnect, connect } from "./mms/mms.helper";
import app from "../app";
import { env } from "../utility/envParser";
import { Rating, RatingType } from "../model/Rating";
const testApp = supertest(app);

beforeAll(async () => await connect());
beforeEach(async () => await cleanData());
afterAll(async () => await disconnect());

describe("POST /api/ratings", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given
    const testData = {
      ratedBy: env.TEST_SUB,
      gameId: 27587,
      rating: 8.5,
      reviewTitle: "Test Review Title",
      review: "Test Review with rating",
    };

    // when
    const resp = await testApp
      .post("/api/ratings")
      .set("Authorization", "Bearer " + env.TEST_TOKEN)
      .send(testData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(/The ratings has been saved!/);
  });
});

describe("GET /api/ratings/:id", () => {
  it("should return status 200 with an array of objects containing the user ratings", async () => {
    // given

    const testData = {
      ratedBy: env.TEST_SUB,
      gameId: 27587,
      rating: 8,
      reviewTitle: "Test Review Title",
      review: "Test Review with rating",
    };

    await testApp
      .post("/api/ratings")
      .set("Authorization", "Bearer " + env.TEST_TOKEN)
      .send(testData);
    // when

    const resp = await testApp
      .get(`/api/ratings/${env.TEST_SUB}`)
      .set("Authorization", "Bearer " + env.TEST_TOKEN);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("GET /api/ratings/game/:id", () => {
  it("should return status 200 with an array of objects containing the game ratings", async () => {
    // given

    const testData = {
      ratedBy: env.TEST_SUB,
      gameId: 27587,
      rating: 8,
      reviewTitle: "Test Review Title",
      review: "Test Review with rating",
    };

    await testApp
      .post("/api/ratings")
      .set("Authorization", "Bearer " + env.TEST_TOKEN)
      .send(testData);
    // when

    const resp = await testApp
      .get(`/api/ratings/game/${testData.gameId}`)
      .set("Authorization", "Bearer " + env.TEST_TOKEN);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("PUT /api/ratings/:id", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given
    const testData = {
      ratedBy: env.TEST_SUB,
      gameId: 27587,
      rating: 8.5,
      reviewTitle: "Test Review Title",
      review: "Test Review with rating",
    };

    const testData2 = {
      reviewTitle: "Test Review Title2",
      review: "Test Review with rating2",
    };

    const rating = await Rating.create(testData);

    // when
    const resp = await testApp
      .put(`/api/ratings/${rating._id}`)
      .set("Authorization", "Bearer " + env.TEST_TOKEN)
      .send(testData2);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(/The ratings has been updated!/);
  });
});

describe("DELETE /api/ratings/:id", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given
    const testData = {
      ratedBy: env.TEST_SUB,
      gameId: 27587,
      rating: 8.5,
      reviewTitle: "Test Review Title",
      review: "Test Review with rating",
    };

    const rating = await Rating.create(testData);

    // when
    const resp = await testApp
      .delete(`/api/ratings/${rating._id}`)
      .set("Authorization", "Bearer " + env.TEST_TOKEN);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(/Rating has been deleted!/);
  });
});
