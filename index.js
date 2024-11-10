// Sample menu data (Consider fetching this data from a server in a real-world scenario)
//object called menu that contains Keys:categories and values:[]
const menu = {
    Starters: ["Garlic Bread", "Bruschetta"],
    MainCourses: ["Margherita Pizza", "Spaghetti Carbonara"],
    Desserts: ["Tiramisu", "Cheesecake"]
};
console.log(menu)

// Function to display menu items by category
function displayMenuItems(menu) {
    // Get the menu container element from the HTML
   const menuContainer = document.getElementById("menu");
    // Loop through each category and its items in the menu object
    //retrieves all the category names as an array
    Object.keys(menu).forEach(category => {

        // Create an element to represent the category
        const categoryHeading = document.createElement('h3');
       
        // Set the text content of the category element to the category name
        categoryHeading.textContent = category;
        // Append the category element to the menu container
        menuContainer.appendChild(categoryHeading);
        // Create an element to represent a list of items
        
         // Create an unordered list element to represent a list of items
         const itemList = document.createElement('ul');


        // Loop through the items in the category and create list items
        menu[category].forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
        

            // Attach a click event listener to the list item to add it to the order
            listItem.addEventListener('click', function() {
                addToOrder(item);
            });
            // Append the list item to the list of items
            itemList.appendChild( listItem);
        });
        
           // Append the item list to the menu container
           menuContainer.appendChild(itemList);
        });
}

// Closure to maintain the state of the order
const orderSystem = (function() {
    // variables that hold the list of items in order and total price
    let order = [];
    let total = 0.00;

    // Function to add an item to the order
    function addItem(itemName) {
        // Here, each item is assumed to have a fixed price of R50.00 for simplicity
        const itemPrice = 50.00;

        // Add the item to the order list
        order.push({ name: itemName, price: itemPrice });

        // Update the total price
        total += itemPrice;
    }

    // Function to get the current order(returns the current order)
    function getOrder() {
        return order;
    }

    // Function to get the total price
    function getTotal() {
        return total.toFixed(2); // Format to 2 decimal places
    }

 // Expose public methods to add an item, get the order, and get the total

  /* returns an object that exposes the three functions (addItem, getOrder, and getTotal),
 making them publicly accessible while keeping order and total private. */
    return {
        addItem,
        getOrder,
        getTotal
    };
})();

// Callback function for adding an item to the order
function addToOrder(itemName) {
       // Add the item to the order using the orderSystem closure
       orderSystem.addItem(itemName);

    // Get the order items list and the order total element from the HTML
    const orderItemsList = document.getElementById("order-items");
    const orderTotalElement = document.getElementById("order-total");

     // Clear the current list of order items
     orderItemsList.innerHTML = '';

     // Get the updated order and total
     const currentOrder = orderSystem.getOrder();
     const currentTotal = orderSystem.getTotal();
 
     // Populate the order list with the updated order
     currentOrder.forEach(orderItem => {
         const orderListItem = document.createElement('li');
         orderListItem.textContent = orderItem.name + " - R" + orderItem.price.toFixed(2);
         orderItemsList.appendChild(orderListItem);
     });
 
     // Update the total price in the HTML
     orderTotalElement.textContent = currentTotal;
 };



// Function to initialize the menu system
const initMenuSystem = function(menu) {
    // Call the function to display menu items
    displayMenuItems(menu);
};

// Start the menu system by calling the init function
initMenuSystem(menu);
