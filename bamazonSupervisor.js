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
});

// prompt for supervisor either to view product sales or create new department 
function menuOptions() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Select any options from the menu : ",
            choices: ["View Product Sales by Department", "Create New Department", "Quit"]
        }
    ]).then(function (supervisorChoice) {
        switch (supervisorChoice.options) {
            case "View Product Sales by Department":
                viewProductDepartment();
                break;

            case "Create New Department":
                createNewDepartment();
                break;
            case "Quit":
                exit();
                break;
        }
    });
}

//Supervisor views the product sales by department
function viewProductDepartment() {
    connection.query("SELECT d.department_id, d.department_name, d.over_head_costs, p.product_sales * p.price as 'Product_Sales', (p.product_sales * p.price) - d.over_head_costs AS Profit FROM departments d, products p WHERE p.department_name = d.department_name ORDER BY department_id ASC", function (err, results) {
        if (err) throw err;
        //console.log(results);
        console.log('-----------------------------------------------------------------------');
        console.log('____________.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._____________');
        console.log('-----------------------------------------------------------------------');
        console.table(results);
        menuOptions();
    });
};

//Supervisor creates new department
function createNewDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "Enter a new department name :"
        },
        {
            type: "input",
            name: "over_head_cost",
            message: "Enter overall head cost of the product :"
        }
    ]).then(function (supervisorAdds) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: supervisorAdds.department_name,
            over_head_costs: supervisorAdds.over_head_cost
        }, function (err, res) {
            if (err) throw err;
            console.log("\n------------------------------------------------");
            console.log("\nNew department is added");
            console.log("\n------------------------------------------------");

        });
        connection.query("SELECT * FROM departments", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        menuOptions();
    });

}

function exit() {
    connection.end();
    console.log("SEE YOU AGAIN!")
}
menuOptions();