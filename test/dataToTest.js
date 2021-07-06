const deepCloneData = {
  simple: {
    name: "Paddy",
    address: {
      town: "Lerum",
      country: "Sweden",
    },
  },
  complex: {
    a: null,
    b: "string",
    c: new Date(),
    d: 12,
    e: Infinity,
    f: undefined,
    g: NaN,
    h: (txt) => txt.replace(/([^ \t]+)/g, "$1"),
    i: {
      a: {
        a: "444",
      },
    },
    j: new Map().set(1, 1),
    k: [1, 2, 3, 4, [1, 2, 3, { 1: "string" }]],
  },
};

module.exports = { deepCloneData };
