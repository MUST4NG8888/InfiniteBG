import supertest from "supertest";
import { cleanData, disconnect, connect } from "./mms/mms.helper";
import app from "../app";
import { env } from "../utility/envParser";
import { getIdToken } from "../api/google"

const testApp = supertest(app);
jest.mock("../api/google");

beforeAll(async () => await connect());
beforeEach(async () => await cleanData());
afterAll(async () => await disconnect());

describe("POST /api/vaults", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given
    const testData = {
      collectionName: "forTrade",
      gameId: 2568,
    };

    // when
    const resp = await testApp
      .post("/api/vaults")
      .set("Authorization", "Bearer " + env.TEST_TOKEN)
      .send(testData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(/Game has been added to your collection!/);
  });
});

describe("GET /api/vaults/id", () => {
  it("should return status 200 with an object containing", async () => {
    // when

    const resp = await testApp
      .get(`/api/vaults/${env.TEST_SUB}`)
      .set("Authorization", "Bearer " + env.TEST_TOKEN);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("DELETE /api/vaults/id", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given
    const testData = {
      gameId: 2568,
    };

    const testData2 = {
      collectionName: "forTrade",
      gameId: 2568,
    };

    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );

    const response = await testApp.post("/api/login").send({ code });

    await testApp
    .post(`/api/vaults`)
    .set("Authorization", "Bearer " + response.body)
    .send(testData2);

    // when

    const resp = await testApp
      .delete(`/api/vaults/${testData.gameId}`)
      .set("Authorization", "Bearer " + response.body)

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(/Game has been deleted from your collection!/);
  });
});
