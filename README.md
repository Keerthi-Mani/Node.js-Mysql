# Node.js-Mysql
# BAMazon
This is bamazon. Bamazon, as it's name suggests, is a simple e-commerce app, or at least the backend for it. 

Bamazon uses some third-party node modules, has it's own modules, and connects to a mysql database to store and retrieve product and department information.

### Getting Started
To get started on this project, follow the installations instructions below.

* Clone repo.
* Run command in Terminal or Gitbash 'npm install'
* Run command depending which mode you would like to be on:
    * Customer - 'npm run customer'
    * Manager - 'npm run manager'
    * Exective - 'npm run exective'
    * Run 'ctrl + c' to exit each mode

### What Each JavaScript Does

1. BamazonCustomer.js

* Prints the products in the store.

* Prompts customer which product they would like to purchase by ID number.

* Asks for the quantity.

    * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
    * However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
    * If the purchase goes through, it updates the stock quantity to reflect the purchase.
    * It will also update the product sales in the department table.
* To run this module in the terminal:
```sh
node bamazonManager.js
```

2. BamazonManager.js

    * Starts with a menu:

        - View Products for Sale
        - View Low Inventory
        - Add to Inventory
        - Add New Product
        
* If the manager selects View Products for Sale, it lists all of the products in the store including all of their details.

* If the manager selects View Low Inventory, it'll list all the products with less than five items in its StockQuantity column.

* If the manager selects Add to Inventory, it allows the manager to select a product and add inventory.

* If the manager selects Add New Product, it allows the manager to add a new product to the store.

* To run this module in the terminal:
```sh
node bamazonManager.js
```

### Technologies used

Bamazon uses these node modules: 

- [console.table](https://www.npmjs.com/package/console.table) 
- [inquirer](https://www.npmjs.com/package/inquirer) 
- [mysql](https://www.npmjs.com/package/mysql)

They are all dependencies in the [package.json](https://docs.npmjs.com/files/package.json), so just run:

```sh
npm install
```

#### Prerequisites
```sh
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'Bamazon', reference schema.sql
```
### Built With

- [MySQLWorkbench](https://www.mysql.com/products/workbench/)
- [Terminal/Gitbash](https://openterminal.en.softonic.com/mac)


