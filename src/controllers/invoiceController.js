class InvoiceController {
    // GET /news
    generate_invoice(req, res) {
        res.render('generate_invoice');
    }

}

module.exports = new InvoiceController; 
