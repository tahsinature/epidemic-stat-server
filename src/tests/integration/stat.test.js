const supertest = require("supertest");
const app = require("../../app");
const flags = require("../../util/flags");
const delayReq = require("../util/delayReq");
const Joi = require("@hapi/joi");

const request = supertest(app);
const url = "/stat";

describe("Manifest Route", () => {
  test("should get META_HEADER_NOT_PRESENT error if no meta header", async () => {
    const response = await request.get(url);
    expect(response.status).toBe(400);
    expect(response.body.flag).toBe(flags.META_HEADER_NOT_PRESENT);
  });

  test("should get INVALID_META_HEADER error if no meta header is arbitory", async () => {
    const response = await request.get(url).set("meta-data", "test");
    expect(response.status).toBe(400);
    expect(response.body.flag).toBe(flags.INVALID_META_HEADER);
  });

  test("should get REQUESTED_COUNTRY_NOT_AVAILABLE error if no there is no country name in query", async () => {
    const response = await request.get(url).set("meta-data", `{"appVersion":"0.0.1","systemVersion":"10","model":"ONEPLUS A6013"}`);
    expect(response.status).toBe(400);
    expect(response.body.flag).toBe(flags.REQUESTED_COUNTRY_NOT_AVAILABLE);
  });

  test("should get REQUESTED_COUNTRY_NOT_AVAILABLE error if no there is no country name in query", async () => {
    const response = await request.get(`${url}?country=Worldwide`).set("meta-data", `{"appVersion":"0.0.1","systemVersion":"10","model":"ONEPLUS A6013"}`);
    expect(response.status).toBe(400);
    expect(response.body.flag).toBe(flags.REQUESTED_COUNTRY_NOT_AVAILABLE);
  });

  test("should get REQUESTED_COUNTRY_NOT_AVAILABLE error if no there is no country name in query", async () => {
    jest.setTimeout(10000);
    const countryName = "Worldwide";

    const schema = Joi.object({
      [countryName]: Joi.object({
        confirmed: Joi.number().integer().required(),
        deaths: Joi.number().integer().required(),
        recovered: Joi.number().integer().required(),
      }).required(),
    }).required();

    const response = await delayReq(() => request.get(`${url}?country=${countryName}`).set("meta-data", `{"appVersion":"0.0.1","systemVersion":"10","model":"ONEPLUS A6013"}`), 3000);
    expect(response.status).toBe(200);
    const { error } = schema.validate(response.body.data);
    expect(error).toBeUndefined();
  });
});
