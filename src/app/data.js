const data = {
    categories: [
      { name: "Income", ID: 1 },
      { name: "Savings & Investments", ID: 2 },
      { name: "Variable Expenditures", ID: 3 },
      { name: "Fixed Expenditures", ID: 4 }
    ],
  
    subCategories: [
      { name: "Groceries", ID: 1, categoryID: 3, Total: 0 },
      { name: "Alcohol", ID: 2, categoryID: 3, Total: 0 },
      { name: "Eating Out", ID: 3, categoryID: 3, Total: 0 },
      { name: "Entertainment", ID: 4, categoryID: 3, Total: 0 },
      { name: "Travel", ID: 5, categoryID: 3, Total: 0 },
      { name: "Rent", ID: 6, categoryID: 4, Total: 0 },
      { name: "Car Payment", ID: 7, categoryID: 4, Total: 0 },
      { name: "Phone Bill", ID: 8, categoryID: 4, Total: 0 },
      { name: "Work Payroll", ID: 9, categoryID: 1, Total: 0 },
      { name: "Passive Income", ID: 10, categoryID: 1, Total: 0 },
      { name: "Savings", ID: 11, categoryID: 2, Total: 0 },
      { name: "401k", ID: 12, categoryID: 2, Total: 0 }
    ],
  
    transactions: [
      {
        ID: 0,
        Description: "Tusker's Indian Fusion",
        Amount: 46.2,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 1,
        Description: "Giant Grocery",
        Amount: 6.67,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 2,
        Description: "Bob's Beer Barn",
        Amount: 19.99,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 3,
        Description: "Wendy's 1821",
        Amount: 14.03,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 4,
        Description: "Jimbo's Downtown Comedy",
        Amount: 29.99,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 5,
        Description: "Walmart",
        Amount: 89.14,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
  
      {
        ID: 6,
        Description: "Teleosoft Payroll",
        Amount: 200.0,
        subCategoryID: null,
        categoryID: null,
        isCredit: true
      },
      {
        ID: 7,
        Description: "Tusker's Indi",
        Amount: 46.2,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 8,
        Description: "Giant ery",
        Amount: 6.67,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 9,
        Description: "Bob's Barn",
        Amount: 19.99,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 10,
        Description: "Wen 1821",
        Amount: 14.03,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 11,
        Description: "Jimbo's Downomedy",
        Amount: 29.99,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
      {
        ID: 12,
        Description: "mart",
        Amount: 89.14,
        subCategoryID: null,
        categoryID: null,
        isCredit: false
      },
  
      {
        ID: 13,
        Description: "Teleosyroll",
        Amount: 200.0,
        subCategoryID: null,
        categoryID: null,
        isCredit: true
      }
    ]
  };
  
  export default data;
  