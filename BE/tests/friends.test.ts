import supertest from "supertest";
import { cleanData, disconnect, connect } from "./mms/mms.helper";
import app from "../app";
import { env } from "../utility/envParser";
import { getIdToken } from "../api/google";
import { User, type UserType } from "../model/User";

const testApp = supertest(app);
jest.mock("../api/google");

beforeAll(async () => await connect());
beforeEach(async () => await cleanData());
afterAll(async () => await disconnect());

describe("POST /api/friends", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given
    const testData = {
      id: "6438548b6bccec38e3ebde36",
    };
    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );
    const response = await testApp.post("/api/login").send({ code });

    // when
    const resp = await testApp
      .post("/api/friends")
      .set("Authorization", "Bearer " + response.body)
      .send(testData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(/Friend request has been sent!/);
  });
});

describe("GET /api/friends/accept/:id", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given
    const testData = {
      id: "6438548b6bccec38e3ebde36",
    };
    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );
    const response = await testApp.post("/api/login").send({ code });
    // when

    const resp = await testApp
      .get(`/api/friends/accept/${testData.id}`)
      .set("Authorization", "Bearer " + response.body);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(/Friend request has been accepted!/);
  });
});

describe("GET /api//friends/:id", () => {
  it("should return status 200 with an objects containing the user friends", async () => {
    // given
    const testData = {
      id: "6438548b6bccec38e3ebde36",
    };
    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );
    const response = await testApp.post("/api/login").send({ code });
    const user: any = await User.find();
    // when

    const resp = await testApp
      .get(`/api/friends/${user[0]._id}`)
      .set("Authorization", "Bearer " + response.body);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("DELETE /api/friends/:id", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given

    const testData = {
      avatar: "avatar",
      subs: ["12235546688"],
      email: "email@email.com",
      profile: {
        name: "MR. X",
        firstName: "Mici",
        lastName: "mackó",
      },
    };

    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );
    const response = await testApp.post("/api/login").send({ code });

    const user: any = await User.create(testData);

    // when
    const resp = await testApp
      .delete(`/api/friends/${user._id}`)
      .set("Authorization", "Bearer " + response.body);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(
      /The user has been removed from your connections!/
    );
  });
});
