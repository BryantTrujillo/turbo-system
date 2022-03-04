const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: false,
    },
    description: {
      short: {
        type: String,
        required: true,
      },
      long: {
        type: String,
        required: true,
      },
    },
    image: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      short: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2,
      },
      long: {
        type: String,
        required: false,
      },
    },
    zip: {
      short: {
        type: Number,
        required: true,
        min: 5,
        max: 5,
      },
      long: {
        type: String,
        required: false,
        minlength: 9,
        maxlength: 10,
      },
    },
    email: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    social: {
      facebook: {
        type: String,
        required: false,
      },
      twitter: {
        type: String,
        required: false,
      },
      linkedin: {
        type: String,
        required: false,
      },
      instagram: {
        type: String,
        required: false,
      },
      tripadvisor: {
        type: String,
        required: false,
      },
      airbnb: {
        type: String,
        required: false,
      },
      vrbo: {
        type: String,
        required: false,
      },
    },
    isSeasonal: {
      type: Boolean,
      required: true,
    },
    hours: {
      monday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      tuesday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      wednesday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      thursday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      friday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      saturday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      sunday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Stay = mongoose.model('Stay', staySchema);
module.exports = Stay;
