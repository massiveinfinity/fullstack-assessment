# Fullstack Assessment

In this assessment, you will be required to demonstrate your understanding on:

1. Developing CRUD features with REST APIs. 
2. Performing validations and showing error messages appropriately.
3. Integration with third-party libraries.
4. Implementing best practises and clean codes, e.g. reusable codes that can be used repetitively, in different screens, projects, or by other team members.
5. Implement best security practises and frameworks, e.g. implementing OWASP top 10

# Tech Requirements
1. Develop frontend with ReactJS
2. Develop APIs with NodeJS using Express. You may choose your database of choice (Preferbly MySQL or MongoDB)

# Deliverables 

## Page 1

1. Search form (mandatory fields)
    * Brand
    * Product Name

2. List of Groceries
    * Create a screen that display a list of 20 products by default, with the Product Name arranged in alphabetical order
    * Options to sort grocery list by Brand or Product Name from A-Z and Z-A
    * Each product in the grocery list should display the following:
        * UPC12 Barcode
        * Brand
        * Product Name
        * Edit button (that will lead to Page 2)
    * Search result should include all possibilities based on keywords found in Brand or Product Name fields
    * You may use GET or POST methods for the search


## Page 2

1. Edit product form (mandatory fields)
    * Brand (varchar)
    * Product Name (varchar)
    * UPC12 Number (bigint)
    * Save button (saves changes made before returning to the Grocery List)
    * Cancel button (brings you back to the Grocery List without saving)
    * Prevent saving of empty Brand and Product Name fields
    * Warn if invalid characters are entered into the fields (e.g. UPC12 field should accept only integers)

2. Editing a product
    * Pre-populate the form with the product’s info (i.e. if you entered this page by clicking on the Edit button of Product A, the form should display the Brand, Product Name, and UPC12 Number of Product A)
    * Saving should be done by the POST or PUT method only
    * Grocery List should also reflect the changes made to the product

These are the sample mockup designs, feel free to improvise!
<img width="650" alt="Screenshot 2021-09-09 at 2 20 50 PM" src="https://user-images.githubusercontent.com/15083795/132633896-d700a7ca-3eab-4882-adcb-22e6096d53ba.png">
<img width="653" alt="Screenshot 2021-09-09 at 2 23 54 PM" src="https://user-images.githubusercontent.com/15083795/132633909-4efd3944-b122-459b-a3bc-1b3ebc61b74a.png">

# Submission
The project codes must be uploaded onto an online GIT repository (e.g Github, Bitbucket, Gitlab) and shared with us for final review. Please use .gitignore to avoid uploading unnecessary files to the repo. Upload all screenshots in your README file.
