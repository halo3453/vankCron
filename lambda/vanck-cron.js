const fetch = require('node-fetch');
const mongoose = require('mongoose');
const InvoiceSchema = require('database/models/invoice');

let conn = null;
const uri = process.env.CONNECTION_STRING;

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    if (conn == null) {
      conn = mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000
    });

    await conn;
    conn.model('Invoice', InvoiceSchema);
  }
  
  const InvoiceModel = conn.model('Invoice');
 
  try {
    const url = process.env.URL_CSV;
    const res = await fetch(url, {
      method: 'get',
      headers: {
          'content-type': 'text/csv;charset=UTF-8',
      }
    });
    
    if (res.status === 200) {
      const data = await res.text();
      const lines = data.split("\n");
      const keys = lines[0].split(",");
      const invoiceObj = {};
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        const invoice = await InvoiceModel.findOne({INVOICE_ID:values[0]});
        
        keys.forEach(function (element, index, array) {
          invoiceObj[keys[index]] = values[index];
        });
        
        if(invoice){
          await InvoiceModel.findOneAndUpdate({INVOICE_ID:values[0]}, invoiceObj);    
        }else{    
          const newInvoice = new InvoiceModel(invoiceObj); 
          await newInvoice.save();
        }
      }
    } else {
      console.log(`Error code ${res.status}`);
    }
  } catch (err) {
    console.log(err)
  }
};