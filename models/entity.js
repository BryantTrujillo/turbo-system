const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timpestamps: true,
  }
);

const entitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: false,
    },
    subcategory: {
      type: Array,
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
    comments: [commentSchema],
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
      default: false,
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

const Entity = mongoose.model('Entity', entitySchema);
module.exports = Entity;
