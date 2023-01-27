// calculate aggregations
function getStatics(attribute, data) {
  let statics = [];
  let primaryAttribute;

  if (data && data.length > 0) {
    data.forEach((animal) => {
      //color and breed attribute are plural and has primary
      if (attribute === "color" || attribute === "breed") {
        tempAttribute = attribute + "s";
        primaryAttribute = animal[tempAttribute]?.primary;
      } else {
        primaryAttribute = animal[attribute];
      }
      var result = statics.find((item) => item.name === primaryAttribute);

      //create new static if it already doesn't exist in statics
      if (result === undefined) {
        let newStatic = {
          name: primaryAttribute,
          count: 1,
          percent: (1 / data.length) * 100,
        };
        statics.push(newStatic);
      }
      // update count and percent if static already exists
      else {
        result.count++;
        result.percent = Math.floor((result.count / data.length) * 100);
      }
    });
  }

  return statics;
}
module.exports = { getStatics };
