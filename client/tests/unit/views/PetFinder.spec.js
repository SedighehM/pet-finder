import PetFinder from "@/views/PetFinder";
import { getStatics } from "@/views/PetFinder/service";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

jest.mock("@/views/PetFinder/service", () => ({
  getStatics: jest.fn().mockResolvedValue("statics"),
}));

describe("PetFinder view", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(PetFinder, { vuetify });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("when sumbit button is clicked", () => {
    beforeEach(() => {
      const button = wrapper.find('[data-testid="button"]');
      button.vm.$emit("click");
      wrapper.vm.$data.selectedValue = "selected-value";
    });

    it("Should call getStatics with expected args", () => {
      expect(getStatics).toHaveBeenCalledTimes(1);
    });

    it("Should set submitted to true", () => {
      expect(wrapper.vm.$data.submitted).toEqual(true);
    });

    it("Should set attribute to selectedValue", () => {
      expect(wrapper.vm.$data.attribute).toEqual("selected-value");
    });

    it("Should set first header of table to selectedValue", () => {
      expect(wrapper.vm.$data.headers[0].text).toEqual("selected-value");
    });
  });
});
