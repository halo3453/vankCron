const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const currencies = ['USD', 'EUR', 'CLP'];

const InvoiceSchema = new Schema({
  INVOICE_ID: {
    type: Number,
    required: true,
  },
  VENDOR_ID: {
    type: Number,
    required: true,
  },
  INVOICE_NUMBER: {
    type: String,
    required: true,
  },
  INVOICE_DATE: {
    type: Date,
    required: true,
  },
  INVOICE_TOTAL: {
    type: Number,
    required: true,
  },
  PAYMENT_TOTAL: {
    type: Number,
    required: true,
  },
  CREDIT_TOTAL: {
    type: Number,
    required: true,
  },
  BANK_ID: {
    type: Number,
    required: true,
  },
  INVOICE_DUE_DATE: {
    type: Date,
    required: true,
  },
  PAYMENT_DATE: {
    type: Date,
  },
  CURRENCY: {
    type: String,
    enum: currencies,
    required: true,
  }
});


module.exports = InvoiceSchema;