const projectConstraints = {
    date: {
        required: true,
        regex: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        type: ["string"]
      },
      title: {
        required: true,
        type: ["string"]
      },
      shortDescription: {
        required: true,
        type: ["string"]
      },
      mdDescription: {
        required: true,
        type: ["string"]
      },
      context: {
        required: true,
        type: ["string"]
      },
      contextUrl: {
        regex: /(https?):\/\/[a-z0-9\/:%_+.,#?!@&=-]+/,
        type: ["string"]
      },
      urlGithub: {
        regex: /(https?):\/\/[a-z0-9\/:%_+.,#?!@&=-]+/,
        type: ["string"]
      },
      urlTest: {
        regex: /(https?):\/\/[a-z0-9\/:%_+.,#?!@&=-]+/,
        type: ["string"]
      },
      imgPrefix: {
        required: true,
        type: ["string"]
      },
      background: {
        required: true,
        regex: /^#(?:[0-9a-fA-F]{3}){1,2}$/
      },
      nbImages: {
        type: ["number", "string"],
          range: [0, 20],
        regex: /^(?:[1-9]|0[1-9]|1[0-9]|20)$/
      },
      technos: {
        required: true,
        type: ["object"],
        length: 1
      },
      active: {
        type: ["boolean"]
      }
};

export default projectConstraints
