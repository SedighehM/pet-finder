import { getToken, setToken, removeToken } from "@/utils/auth";
jest.mock("@/utils/request", () => ({}));

describe("getToken function", () => {
  let result;
  beforeEach(() => {
    jest
      .spyOn(window.sessionStorage.__proto__, "getItem")
      .mockReturnValue("token-mock");
    result = getToken();
  });
  it("Should call sessionStorage.getItem with expected args", () => {
    expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.sessionStorage.getItem).toHaveBeenCalledWith("token");
  });
  it("Should return expected value", () => {
    expect(result).toEqual("token-mock");
  });
});

describe("setToken function", () => {
  const token = "token-mock";
  beforeEach(() => {
    jest.spyOn(window.sessionStorage.__proto__, "setItem");
    setToken(token);
  });
  it("Should call sessionStorage.setItem with expected args", () => {
    expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith("token", token);
  });
});

describe("removeToken function", () => {
  const token = "token-mock";
  beforeEach(() => {
    jest.spyOn(window.sessionStorage.__proto__, "removeItem");
    removeToken(token);
  });
  it("Should call sessionStorage.removeItem with expected args", () => {
    expect(window.sessionStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith("token");
  });
});
