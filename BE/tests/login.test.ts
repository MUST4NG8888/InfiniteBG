import supertest from 'supertest'
import { cleanData, disconnect, connect } from './mms/mms.helper'
import app from '../app'
import { User } from "../model/User"
import { getIdToken } from "../api/google"
import { env } from '../utility/envParser'


const testApp = supertest(app)
jest.mock("../api/google")

beforeAll(async () => await connect())
beforeEach(async () => await cleanData())
afterAll(async () => await disconnect())

describe('Post /api/login ', () =>{

it("should return 200 and save user to database", async () => {
    // given
    const code = "as56df5w5a8d823djak"
    const mockedGetIdToken = jest.mocked(getIdToken)
    mockedGetIdToken.mockReturnValueOnce(Promise.resolve(env.GOOGLE_TEST_TOKEN))
    // when
    const response = await testApp.post("/api/login").send({code})
    // then
    const dbContent = await User.find()
    expect(dbContent).toHaveLength(1)
    expect(response.status).toBe(201)
  })
})