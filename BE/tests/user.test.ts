import supertest from "supertest";
import { cleanData, disconnect, connect } from "./mms/mms.helper";
import app from "../app";
import { env } from "../utility/envParser";
import { getIdToken } from "../api/google";

const testApp = supertest(app);
jest.mock("../api/google");

beforeAll(async () => await connect());
beforeEach(async () => await cleanData());
afterAll(async () => await disconnect());

describe("GET /api/users", () => {
  it("should return status 200 with an object containing an objects", async () => {
    // given
    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );

    const response = await testApp.post("/api/login").send({ code });

    // when

    const resp = await testApp
      .get(`/api/users/`)
      .set("Authorization", "Bearer " + response.body);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("PUT /api/users", () => {
  it("should return status 200 with an object containing an objects", async () => {
    // given
    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );

    const updateData = {
      userName: "TesztEL3K",
    };

    const response = await testApp.post("/api/login").send({ code });

    // when
    const resp = await testApp
      .put(`/api/users/`)
      .set("Authorization", "Bearer " + response.body)
      .send(updateData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("GET /api/users", () => {
  it("should return status 200 with an object containing an objects", async () => {
    // given
    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );

    const response = await testApp.post("/api/login").send({ code });

    const query = {
      keyWord: "Andrew",
    };

    // when

    const resp = await testApp
      .get(`/api/users/`)
      .query(query)
      .set("Authorization", "Bearer " + response.body);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});
