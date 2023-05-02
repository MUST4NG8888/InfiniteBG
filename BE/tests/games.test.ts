import supertest from "supertest";
import { cleanData, disconnect, connect } from "./mms/mms.helper";
import app from "../app";


const testApp = supertest(app);
jest.mock("../api/google");

beforeAll(async () => await connect());
beforeEach(async () => await cleanData());
afterAll(async () => await disconnect());

describe("POST /api/games", () => {
  it("should return status 200 with an array of objects containing the games data whose ids have been given by the user", async () => {
    // given
    const testData = {
      ids: [224517, 366013],
    };
    // when
    const resp = await testApp.post("/api/games").send(testData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("GET /api/games/hot", () => {
  it("should return status 200 with an array of  objects containing the HOT50 games right now", async () => {
    // when
    const resp = await testApp.get("/api/games/hot");

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("GET /api/games/search", () => {
  it("should return status 200 with an object containing the games data which are containing the search term in their name ", async () => {
    // given
    const query = {
      term: "Brass",
    };

    // when
    const resp = await testApp.get("/api/games/search").query(query);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("GET /api/games/:id", () => {
  it("should return status 200 with an object containing the game data", async () => {
    // given
    const id = 366013;

    // when
    const resp = await testApp.get(`/api/games/${id}`);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});
