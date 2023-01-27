import { nullFormatter } from "@/filters";

describe("nullFormatter function", () => {
  describe("When passed value is null", () => {
    it("Should return unknown", () => {
      const result = nullFormatter(null);
      expect(result).toEqual("Unknown");
    });
  });

  describe("When passed value is not null", () => {
    it("Should return exact value", () => {
      const result = nullFormatter("Black");
      expect(result).toEqual("Black");
    });
  });
});
