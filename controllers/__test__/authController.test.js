// ПРИКЛАД. Це не зовсім юніт тест, тому що тут тестується комплекс, звертаючись до серверу

// щоб тести самі собі відправили реквест (немає залежності, працює без постману)
const request = require("supertest");
// буду звертатись до серверу, його використати
const server = require("../../server");

describe("POST /auth/login", () => {
  // є декілька хуків:
  beforeAll(() => {
    console.log("before all");
  });
  beforeEach(() => {
    console.log("before each");
  });
  afterEach(() => {
    console.log("after each");
  });
  afterAll(() => {
    console.log("after all");
  });

  // it - те ж саме, що й test
  it("should return user and token", async () => {
    const testData = {
      email: "admin@example.com",
      password: "admin1",
    };

    // створюється пост реквест з цими даними testData і відправляється на сервер (по суті замість постмана)
    const response = await request(server)
      .post("/api/auth/login")
      .send(testData);

    // що очікую в респонсі:
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        user: expect.any(Object),
        token: expect.any(String),
      })
    );
  });

  it("should return unauthorized error", async () => {
    const testData = {
      email: "admina@example.com",
      password: "admin1",
    };

    const response = await request(server)
      .post("/api/auth/login")
      .send(testData);

    expect(response.statusCode).toBe(401);
  });

  it("should return unauthorized error", async () => {
    const testData = {
      email: "admin@example.com",
    };

    const response = await request(server)
      .post("/api/auth/login")
      .send(testData);

    expect(response.statusCode).toBe(401);
  });
});
