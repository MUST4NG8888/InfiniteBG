import supertest from "supertest";
import { cleanData, disconnect, connect } from "./mms/mms.helper";
import app from "../app";
import { env } from "../utility/envParser";
import { Play, type PlayType } from "../model/Play";
import { getIdToken } from "../api/google";

const testApp = supertest(app);
jest.mock("../api/google");

beforeAll(async () => await connect());
beforeEach(async () => await cleanData());
afterAll(async () => await disconnect());

describe("POST /api/plays", () => {
  it("should return status 200 with an object containing a success message", async () => {
    // given
    const testData = {
      date: "2023-04-12T18:00:03.137Z",
      gameTitle: "Brass Birmingham",
      gameId: 224517,
      playerNumber: 4,
      players: [
        {
          name: "Andrew",
          userId: "642ef65b3a859d2e4770b3d6",
          points: 147,
          colour: "blue",
          position: 1,
        },
        {
          name: "Gábor",
          points: 132,
          colour: "green",
          position: 2,
        },
        {
          name: "Anita",
          points: 117,
          colour: "red",
          position: 3,
        },
        {
          name: "Zoli",
          points: 112,
          colour: "gray",
          position: 4,
        },
      ],
      title: "A nagy Brasstelenség V2",
      location: "Ignác",
    };

    // when
    const resp = await testApp
      .post("/api/plays")
      .set("Authorization", "Bearer " + env.TEST_TOKEN)
      .send(testData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
    expect(resp.body).toMatch(/The play has been created!/);
  });
});

describe("GET /api/plays", () => {
  it("should return status 200 with an object containing all plays data", async () => {
    // given
    const testData = {
      date: "2023-04-12T18:00:03.137Z",
      gameTitle: "Brass Birmingham",
      gameId: 224517,
      playerNumber: 4,
      players: [
        {
          name: "Andrew",
          userId: "642ef65b3a859d2e4770b3d6",
          points: 147,
          colour: "blue",
          position: 1,
        },
        {
          name: "Gábor",
          points: 132,
          colour: "green",
          position: 2,
        },
        {
          name: "Anita",
          points: 117,
          colour: "red",
          position: 3,
        },
        {
          name: "Zoli",
          points: 112,
          colour: "gray",
          position: 4,
        },
      ],
      title: "A nagy Brasstelenség V2",
      location: "Ignác",
    };

    await testApp
      .post("/api/plays")
      .set("Authorization", "Bearer " + env.TEST_TOKEN)
      .send(testData);

    // when
    const resp = await testApp
      .get("/api/plays")
      .set("Authorization", "Bearer " + env.TEST_TOKEN)
      .send(testData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("GET /api/plays/:id", () => {
  it("should return status 200 with an array of objects", async () => {
    // given
    const testData = {
      date: "2023-04-12T18:00:03.137Z",
      gameTitle: "Brass Birmingham",
      gameId: 224517,
      playerNumber: 4,
      players: [
        {
          name: "Andrew",
          userId: "642ef65b3a859d2e4770b3d6",
          points: 147,
          colour: "blue",
          position: 1,
        },
        {
          name: "Gábor",
          points: 132,
          colour: "green",
          position: 2,
        },
        {
          name: "Anita",
          points: 117,
          colour: "red",
          position: 3,
        },
        {
          name: "Zoli",
          points: 112,
          colour: "gray",
          position: 4,
        },
      ],
      title: "A nagy Brasstelenség V2",
      location: "Ignác",
    };

    const code = "as56df5w5a8d823djak";
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockReturnValueOnce(
      Promise.resolve(env.GOOGLE_TEST_TOKEN)
    );

    const response = await testApp.post("/api/login").send({ code });

    // when
    const resp = await testApp
      .get(`/api/plays/${response.body._id}`)
      .set("Authorization", "Bearer " + response.body);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("PUT /api/plays/:id", () => {
  it("should return status 200 with an object containing an updated object", async () => {
    // given
    const testData = {
      date: "2023-04-12T18:00:03.137Z",
      gameTitle: "Brass Birmingham",
      gameId: 224517,
      playerNumber: 4,
      players: [
        {
          name: "Andrew",
          userId: "642ef65b3a859d2e4770b3d6",
          points: 147,
          colour: "blue",
          position: 1,
        },
        {
          name: "Gábor",
          points: 132,
          colour: "green",
          position: 2,
        },
        {
          name: "Anita",
          points: 117,
          colour: "red",
          position: 3,
        },
        {
          name: "Zoli",
          points: 112,
          colour: "gray",
          position: 4,
        },
      ],
      title: "A nagy Brasstelenség V2",
      location: "Ignác",
    };

    const updateData = {
      gameTitle: "Brass Lanceshire",
    };

    const play = await Play.create(testData);

    // when
    const resp = await testApp
      .put(`/api/plays/${play._id}`)
      .set("Authorization", "Bearer " + env.TEST_TOKEN)
      .send(updateData);

    // then
    expect(resp.status).toBe(200);
    expect(resp).toBeDefined();
  });
});

describe("DELETE /api/plays/:id", () => {
    it("should return status 200 with an object containing a success message", async () => {
      // given
      const testData = {
        date: "2023-04-12T18:00:03.137Z",
        gameTitle: "Brass Birmingham",
        gameId: 224517,
        playerNumber: 4,
        players: [
          {
            name: "Andrew",
            userId: "642ef65b3a859d2e4770b3d6",
            points: 147,
            colour: "blue",
            position: 1,
          },
          {
            name: "Gábor",
            points: 132,
            colour: "green",
            position: 2,
          },
          {
            name: "Anita",
            points: 117,
            colour: "red",
            position: 3,
          },
          {
            name: "Zoli",
            points: 112,
            colour: "gray",
            position: 4,
          },
        ],
        title: "A nagy Brasstelenség V2",
        location: "Ignác",
      };
  
      const updateData = {
        gameTitle: "Brass Lanceshire",
      };
  
      const play = await Play.create(testData);
  
      // when
      const resp = await testApp
        .delete(`/api/plays/${play._id}`)
        .set("Authorization", "Bearer " + env.TEST_TOKEN)
  
      // then
      expect(resp.status).toBe(200);
      expect(resp).toBeDefined();
      expect(resp.body).toMatch(/Play has been deleted!/);
    });
  });