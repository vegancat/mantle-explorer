import mongoose from "mongoose";

const ExampleSchema = new mongoose.Schema({
  name: {
    /* The name of this Example */

    type: String,
    required: [true, "Please provide a name for this Example."],
  },

  owner_id: {
    /* The id of the owner of this Example */

    type: String,
    required: [true, "Please provide an owner id for this Example."],
  },

  image_url: {
    /* Url to Example image */

    required: [true, "Please provide an image url for this Example."],
    type: String,
  },

  accepts_private_payments: {
    /* Whether or not this Example accepts private payments */

    type: Boolean,
    required: true,
  },

  wallets: [
    /* Wallets associated with this Example */

    {
      tokenType: String,
      address: String,
    },
  ],

  transactions: [
    {
      state: {
        /* The state of this transaction */
        /* 1 = success, 2 = failed */

        type: Number,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      tx_hash: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

export default mongoose.models.Example ||
  mongoose.model("Example", ExampleSchema);
