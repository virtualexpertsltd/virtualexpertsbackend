const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    invoiceNo: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientAddress: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    taxPercentage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    selectedServices: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('invoice', InvoiceSchema);
