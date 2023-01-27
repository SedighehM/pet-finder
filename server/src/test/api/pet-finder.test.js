const request = require("supertest");
const app = require("../../app");
const axios = require("axios");
const utils = require("../../api/utils");

describe("Token endpoint", () => {
  const tokenURL = "https://api.petfinder.com/v2/oauth2/token";
  const tokenBody = {
    client_id: process.env.API_KEY,
    client_secret: process.env.SECRET,
    grant_type: "client_credentials",
  };

  it("Status should be 200", async () => {
    const res = await request(app).get("/pet-finder/token");

    expect(res.statusCode).toEqual(200);
  });

  it("Should call axios.post with expected args", async () => {
    jest.spyOn(axios, "post");
    await request(app).get("/pet-finder/token");

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(tokenURL, tokenBody);
  });

  it("The response should be equal to response of petfinder", async () => {
    const mockedData = "mocked-data";
    jest.spyOn(axios, "post").mockResolvedValue({ data: mockedData });
    const res = await request(app).get("/pet-finder/token");

    expect(res.body).toEqual(mockedData);
  });
});

describe("Statics endpoint", () => {
  const staticsURL = "https://api.petfinder.com/v2/animals";
  const tokenMocked = "token-mock";
  const attributeMocked = "attribute-mock";

  it("Should call axios.get with expected args", async () => {
    jest.spyOn(axios, "get");
    await request(app).get("/pet-finder/statics").query({ token: tokenMocked });
    const staticsHeader = {
      headers: { Authorization: "Bearer token-mock" },
    };

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(staticsURL, staticsHeader);
  });

  it("Should call utils.getStatics with expected args", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { animals: "animals" } });
    jest.spyOn(utils, "getStatics");

    await request(app)
      .get("/pet-finder/statics")
      .query({ token: tokenMocked, attribute: attributeMocked });

    expect(utils.getStatics).toHaveBeenCalledTimes(1);
    expect(utils.getStatics).toHaveBeenCalledWith(attributeMocked, "animals");
  });

  it("The response should be equal to returned value of getStatics", async () => {
    jest.spyOn(utils, "getStatics").mockReturnValue("statics");
    const res = await request(app).get("/pet-finder/statics");

    expect(res.body).toEqual("statics");
  });

  it("Status should be 200", async () => {
    const res = await request(app).get("/pet-finder/statics");

    expect(res.statusCode).toEqual(200);
  });
});
