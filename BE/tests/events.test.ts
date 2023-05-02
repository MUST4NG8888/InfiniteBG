import supertest from "supertest";
import { cleanData, disconnect, connect } from "./mms/mms.helper";
import app from "../app";
import { env } from "../utility/envParser";
import { getIdToken } from "../api/google";
import { User, type UserType } from "../model/User";
import { Event } from "../model/Event";

const testApp = supertest(app);
jest.mock("../api/google");

beforeAll(async () => await connect());
beforeEach(async () => await cleanData());
afterAll(async () => await disconnect());

describe("POST /api/events", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given

    const testData = {
      startDate: "2023-04-12T16:00:03.137Z",
      endDate: "2023-04-12T18:00:03.137Z",
      title: "TESZT EVENT",
      summary: "dsdsa",
      description: "Budapest",
      location: "Budapest",
      public: true,
    };
    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );
    const response = await testApp.post("/api/login").send({ code });

    // when
    const resp = await testApp
      .post("/api/events")
      .set("Authorization", "Bearer " + response.body)
      .send(testData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(/The event has been created!/);
  });
});

describe("GET /api/events", () => {
  it("should return status 200 with an array of objects containing the Public events", async () => {
    // given

    const testData = {
      startDate: "2023-04-12T16:00:03.137Z",
      endDate: "2023-04-12T18:00:03.137Z",
      title: "TESZT EVENT",
      summary: "dsdsa",
      description: "Budapest",
      location: "Budapest",
      public: true,
    };
    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );
    const response = await testApp.post("/api/login").send({ code });

    await testApp
      .post("/api/events")
      .set("Authorization", "Bearer " + response.body)
      .send(testData);

    // when
    const resp = await testApp
      .get("/api/events")
      .set("Authorization", "Bearer " + response.body);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("GET /api/events/:id", () => {
  it("should return status 200 with an array of objects containing the User's events", async () => {
    // given

    const testData = {
      startDate: "2023-04-12T16:00:03.137Z",
      endDate: "2023-04-12T18:00:03.137Z",
      title: "TESZT EVENT",
      summary: "dsdsa",
      description: "Budapest",
      location: "Budapest",
      public: true,
    };
    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );
    const response = await testApp.post("/api/login").send({ code });

    const user = await User.find();

    await testApp
      .post("/api/events")
      .set("Authorization", "Bearer " + response.body)
      .send(testData);

    // when
    const resp = await testApp
      .get(`/api/events/${user[0]._id}`)
      .set("Authorization", "Bearer " + response.body);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("PUT /api/events/:id", () => {
  it("should return status 200 with an array of objects containing the User's events", async () => {
    // given

    const testData = {
      startDate: "2023-04-12T16:00:03.137Z",
      endDate: "2023-04-12T18:00:03.137Z",
      title: "TESZT EVENT",
      summary: "dsdsa",
      description: "Budapest",
      location: "Budapest",
      public: true,
    };

    const updateData = {
      title: "TEST EVENT 2",
    };

    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );
    const response = await testApp.post("/api/login").send({ code });

    await testApp
      .post("/api/events")
      .set("Authorization", "Bearer " + response.body)
      .send(testData);

    const event = await Event.find();

    // when
    const resp = await testApp
      .put(`/api/events/${event[0]._id}`)
      .set("Authorization", "Bearer " + response.body)
      .send(updateData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("DELETE /api/events/:id", () => {
    it("should return status 200 with an status message", async () => {
      // given
  
      const testData = {
        startDate: "2023-04-12T16:00:03.137Z",
        endDate: "2023-04-12T18:00:03.137Z",
        title: "TESZT EVENT",
        summary: "dsdsa",
        description: "Budapest",
        location: "Budapest",
        public: true,
      };
  
  
      const code = "as56df5w5a8d823djak";
      const mockedGetIdToken = jest.mocked(getIdToken);
      mockedGetIdToken.mockReturnValueOnce(
        Promise.resolve(env.GOOGLE_TEST_TOKEN)
      );
      const response = await testApp.post("/api/login").send({ code });
  
      await testApp
        .post("/api/events")
        .set("Authorization", "Bearer " + response.body)
        .send(testData);
  
      const event = await Event.find();
  
      // when
      const resp = await testApp
        .delete(`/api/events/${event[0]._id}`)
        .set("Authorization", "Bearer " + response.body)
   
      // then
      expect(resp.status).toBe(200);
      expect(resp).toBeDefined();
      expect(resp.body).toMatch(/Event has been deleted!/);
    });
  });

describe("POST /api/events/join/:id", () => {
    it("should return status 200 with a status message", async () => {
      // given
      const testData = {
        startDate: "2023-04-12T16:00:03.137Z",
        endDate: "2023-04-12T18:00:03.137Z",
        title: "TESZT EVENT",
        summary: "dsdsa",
        description: "Budapest",
        location: "Budapest",
        public: true,
      };
  
      const testData2 = {
        chosen: "going"
      };
  
  
      const code = "as56df5w5a8d823djak";
      const mockedGetIdToken = jest.mocked(getIdToken);
      mockedGetIdToken.mockReturnValueOnce(
        Promise.resolve(env.GOOGLE_TEST_TOKEN)
      );
      const response = await testApp.post("/api/login").send({ code });
  
      await testApp
        .post("/api/events")
        .set("Authorization", "Bearer " + response.body)
        .send(testData);
  
      const event = await Event.find();
  
      // when
      const resp = await testApp
        .post(`/api/events/join/${event[0]._id}`)
        .set("Authorization", "Bearer " + env.TEST_TOKEN)
        .send(testData2);
   
      // then
      expect(resp.status).toBe(200);
      expect(resp).toBeDefined();
      expect(resp.body).toMatch(/Successfuly joined!/);
    });
  });

describe("POST /api/events/invite/:id", () => {
    it("should return status 200 with a status message", async () => {
      // given
      const testData = {
        startDate: "2023-04-12T16:00:03.137Z",
        endDate: "2023-04-12T18:00:03.137Z",
        title: "TESZT EVENT",
        summary: "dsdsa",
        description: "Budapest",
        location: "Budapest",
        public: true,
      };

      const code = "as56df5w5a8d823djak";
      const mockedGetIdToken = jest.mocked(getIdToken);
      mockedGetIdToken.mockReturnValueOnce(
        Promise.resolve(env.GOOGLE_TEST_TOKEN)
      );
      const response = await testApp.post("/api/login").send({ code });
  
      await testApp
        .post("/api/events")
        .set("Authorization", "Bearer " + response.body)
        .send(testData);
  
      const event = await Event.find();
  
      // when
      const resp = await testApp
        .post(`/api/events/invite/${event[0]._id}`)
        .set("Authorization", "Bearer " + response.body)
        .send(env.TEST_SUB);
   
      // then
      expect(resp.status).toBe(200);
      expect(resp).toBeDefined();
      expect(resp.body).toMatch(/Successfuly invited the user!/);
    });
  });
  