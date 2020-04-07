const supertest = require("supertest");
const app = require("../../app");
const flags = require("../../util/flags");
const Joi = require("@hapi/joi");
const delayReq = require("../util/delayReq");

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
    const schema = Joi.object({
      hasAppUpdate: Joi.boolean().required(),
      isAppUpdateRequired: Joi.boolean().required(),
      latestAppVersion: Joi.string().required(),
      requiredAppVersion: Joi.string().required(),
      updateLinks: Joi.array()
        .items(
          Joi.object({
            source: Joi.string().required(),
            sourceIcon: Joi.string().required(),
            link: Joi.string().uri().required(),
          })
        )
        .required(),
      meta: Joi.object({
        supportedCountries: Joi.array()
          .items(
            Joi.alternatives(
              Joi.string().required(),
              Joi.object({
                name: Joi.string().required(),
                flag: Joi.string().uri().required(),
                alpha2Code: Joi.string().max(2).required(),
              }).required()
            )
          )
          .min(1),
      }),
    }).required();

    const response = await delayReq(() => request.get(url).set("meta-data", `{"appVersion":"0.0.1","systemVersion":"10","model":"ONEPLUS A6013"}`), 3000);

    expect(response.status).toBe(200);

    const { error } = schema.validate(response.body.data);
    expect(error).toBeUndefined();
  });

  // update links schema check
});
