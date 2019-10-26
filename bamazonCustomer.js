// Pull in dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('console.table');

// Define the MYSQL connection parameters
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

});

var displayProducts = function () {
    // query the database for all items being listed
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        else {
            //console.log(results);
            console.log('_____________________________.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._________________________')
            console.log("----------------------------------------------------------------------------------------------------");

            for (var i = 0; i < results.length; i++) {
                var listProducts = [
                    {
                        Item_id: results[i].item_id,
                        Product_Name: results[i].product_name,
                        Department_Name: results[i].department_name,
                        Price: results[i].price,
                        Stock_quantity: results[i].stock_quantity
                    }
                ]
                console.table(listProducts);
            }
        }
        userPurchase();
    });
}

function userPurchase() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter the ID of the product you would like to buy: ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many do you need? ",
            validate: function (valiue) {
                if (isNaN(valiue) === false) {
                    return true;
                }
                return false;
            }
        },

    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE item_id = ?", answer.item_id, function (err, results) {
            // console.log(results);
            if (err) throw err;
            else {
                for (var i = 0; i < results.length; i++) {
                    if (answer.stock_quantity > results[i].stock_quantity) {
                        console.log("=======================================");
                        console.log("\nInsufficient Quantity!");
                        console.log("\n=======================================");

                        userPurchase();
                    }
                    else {
                        //list item information for user to confirm
                        console.log("---------------------------------------");
                        console.log("\nCheck and confirm your order!");
                        console.log("\n---------------------------------------");
                        console.log("\nItem :" + results[i].product_name);
                        console.log("Department :" + results[i].department_name);
                        console.log("Price :" + results[i].price);
                        console.log("Quantity :" + answer.stock_quantity);
                        var totalCost = results[i].price * answer.stock_quantity;
                        console.log("Total :" + "$" + totalCost + "\n");
                        console.log("=======================================");


                        // Calculating new stock_quantity
                        var newStock = results[i].stock_quantity - answer.stock_quantity;
                        var purchaseId = answer.item_id;
                        confirmPrompt();
                    }
                }
            }
        });
    });
}

function confirmPrompt() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Would you like to place an order?",
            default: true
        }
    ]).then(function (user) {
        if (user.continue === true) {
            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStock, purchaseId], function (err, res) {

            });
            console.log("=======================================");
            console.log("\nYour order has placed successfully!");
            console.log("\nThank You!!");
            console.log("\n=======================================");
        }
        else {
            console.log("=======================================");
            console.log("\nNo Worries!! Thank you! Come back soon!");
            console.log("\n=======================================");
        }
    });
}

// run the displayUser function after the connection is made to prompt the user
displayProducts();