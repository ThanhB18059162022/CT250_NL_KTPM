const ModelDAO = require("../../app/daos/ModelDAO");

describe("ModelDAO Abstract", () => {
  test("Init abstract class", () => {
    expect(() => new ModelDAO()).toThrowError();
  });
});
