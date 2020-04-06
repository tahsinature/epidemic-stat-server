const supertest = require("supertest");
const app = require("../../app");
const flags = require("../../util/flags");

const request = supertest(app);
const url = "/manifest";

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

  test("should get success response", async () => {
    const response = await request.get(url).set("meta-data", `{"appVersion":"0.0.1","systemVersion":"10","model":"ONEPLUS A6013"}`);
    expect(response.status).toBe(200);
    expect(Object.keys(response.body.data)).toEqual(["hasAppUpdate", "isAppUpdateRequired", "latestAppVersion", "requiredAppVersion", "appUpdateLinks", "updateLinks", "meta"]);
    expect(response.body.data.meta).toHaveProperty("supportedCountries");
  });

  // update links schema check
});
