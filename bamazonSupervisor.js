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

function menuOptions() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Select any options from the menu : ",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function (supervisorChoice) {
        switch (supervisorChoice.options) {
            case "View Product Sales by Department":
                viewProductDepartment();
                break;

            case "Create New Department":
                createNewDepartment();
                break;
        }
    });
}

//Supervisor views the product sales by department
function viewProductDepartment() {
    //prints the items for sale and their details
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.log("\n--------------------------------------------");

        for (var i = 0; i < res.length; i++) {
            console.table(
                {
                    department_id: res[i].department_id,
                    over_head_costs: res[i].over_head_costs
                }
            );
        }
        console.log("\n--------------------------------------------");
        menuOptions();
    });
}

//Supervisor creates new department
function createNewDepartment() {


}
menuOptions();