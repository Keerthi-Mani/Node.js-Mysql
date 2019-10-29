// Pull in dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

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

});

//prompt for manager to choose either to view products or add inventory or view low inventory or add new product
function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu_options",
            message: "Select any options from the menu : ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        },
    ]).then(function (chose) {
        switch (chose.menu_options) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Quit":
                exit();
                break;
        }
    });
}

//Manager views all the available products in the store
function viewProducts() {
    // query the database for all items being listed
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, results) {
        if (err) throw err;

        //console.log(results);
        console.log('----------------------------------------------------------------------');
        console.log('___________.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._____________');
        console.log('----------------------------------------------------------------------');
        console.table(results);
        start();
    });
}

//Manager views inventory's stocks count lower than 5
function viewInventory() {
    // query the database for all items being listed
    connection.query("SELECT * FROM products WHERE stock_quantity <=5 ", function (err, results) {
        if (err) throw err;
        //console.log(results);
        console.log('View Low Inventory');
        console.log("");
        console.table(results);
        start();
    });
}

//Manager updates an inventory in the stock
function addInventory() {
    inquirer.prompt([
        {
            name: "Item_id",
            type: "input",
            message: "Please enter the ID number of the item you would like to add inventory to it"
        },
        {
            name: "add_inv",
            type: "input",
            message: "How many units of this item would you like to have in the in store stock quantity?",
        }

    ]).then(function (managerInput) {

        connection.query("SELECT * FROM products", function (err, results) {

            var chosenItem;

            // Gets product who's stock needs to be updated.
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === parseInt(managerInput.Item_id)) {
                    chosenItem = results[i];
                }
            }

            // Adds new stock  to existing stock.
            var updatedStock = parseInt(chosenItem.stock_quantity) + parseInt(managerInput.add_inv);
            console.log("\n============================");
            console.log("Updated stock: " + updatedStock);
            console.log("\n============================");

            connection.query(
                "UPDATE products SET ? WHERE ?",
                [{

                    stock_quantity: updatedStock
                },
                {
                    item_id: managerInput.Item_id
                }
                ],
                function (err, res) {
                    if (err) throw err;
                });
            start();
        });

    });
}

//Manager adds new items in the products
function addProduct() {
    console.log("\nAdding new product!");
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "Enter the name of the new product :"
        },
        {
            name: "department_name",
            type: "input",
            message: "Enter the department name of the product :"
        },
        {
            name: "price",
            type: "input",
            message: "Enter the cost of the product :",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                else {
                    return false;
                }
            },
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Enter the total quantity of the product :",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                else {
                    return false;
                }
            },
        },
    ]).then(function (managerChoice) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: managerChoice.product_name,
                department_name: managerChoice.department_name,
                price: managerChoice.price,
                stock_quantity: managerChoice.stock_quantity
            },
            function (err, res) {
                if (err) throw err;
                console.log("\n======================================= ");
                console.log("");
                console.log("Your product is added successfully!");
                console.log("");
                console.log("=======================================");
            });
        start();
    });
}

function exit() {
    console.log("See you again!!!");
    connection.end();
}
start();