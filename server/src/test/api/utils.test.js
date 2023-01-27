const utils = require("../../api/utils");

describe("getStatics", () => {
  describe("when data is null", () => {
    it("Should return empty array", () => {
      const statics = utils.getStatics("colors", null);
      expect(statics).toEqual([]);
    });
  });

  describe("when data is not null", () => {
    const data = [
      { name: "X", colors: { primary: "Brown" } },
      { name: "Y", colors: { primary: "Brown" } },
      { name: "Z", colors: { primary: "Black" } },
      { name: "P", colors: { primary: "Black" } },
      { name: "T", colors: { primary: "White" } },
    ];
    const expectedResult = [
      { name: "Brown", count: 2, percent: 40 },
      { name: "Black", count: 2, percent: 40 },
      { name: "White", count: 1, percent: 20 },
    ];

    it("Should return expected result", () => {
      const statics = utils.getStatics("colors", data);
      expect(statics).toEqual(expectedResult);
    });
  });
});
