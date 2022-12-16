const sql = require("./db.js");
const Transaction = function (transaction) {
    this.username = transaction.username
    this.type = transaction.type
    this.date = transaction.date
    this.state = transaction.state // 0: nothing 1: important 2: event
    this.ref = transaction.ref
}
Transaction.create = (newTransaction, result) => {
    sql.query("INSERT INTO transactions SET ?", newTransaction, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newTransaction})
    })
}
module.exports = Transaction;