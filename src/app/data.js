const data = {
  categories: [
    { Name: "Income", ID: 1 },
    { Name: "Savings & Investments", ID: 2 },
    { Name: "Variable Expenditures", ID: 3 },
    { Name: "Fixed Expenditures", ID: 4 }
  ],

  subcategories: [
    { Name: "Groceries", ID: 1, categoryID: 3, Total: 0, isSelected: false },
    { Name: "Alcohol", ID: 2, categoryID: 3, Total: 0, isSelected: false },
    { Name: "Eating Out", ID: 3, categoryID: 3, Total: 0, isSelected: false },
    { Name: "Entertainment", ID: 4, categoryID: 3, Total: 0, isSelected: false },
    { Name: "Travel", ID: 5, categoryID: 3, Total: 0, isSelected: false },
    { Name: "Rent", ID: 6, categoryID: 4, Total: 0, isSelected: false },
    { Name: "Car Payment", ID: 7, categoryID: 4, Total: 0, isSelected: false },
    { Name: "Phone Bill", ID: 8, categoryID: 4, Total: 0, isSelected: false },
    { Name: "Work Payroll", ID: 9, categoryID: 1, Total: 0, isSelected: false },
    { Name: "Passive Income", ID: 10, categoryID: 1, Total: 0, isSelected: false },
    { Name: "Savings", ID: 11, categoryID: 2, Total: 0 },
    { Name: "401k", ID: 12, categoryID: 2, Total: 0 }
  ],

  transactions: [
    {
      ID: 0,
      Description: "Tusker's Indian Fusion",
      Amount: 46.2,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 1,
      Description: "Giant Grocery",
      Amount: 6.67,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 2,
      Description: "Bob's Beer Barn",
      Amount: 19.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 3,
      Description: "Wendy's 1821",
      Amount: 14.03,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 4,
      Description: "Jimbo's Downtown Comedy",
      Amount: 29.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 5,
      Description: "Walmart",
      Amount: 89.14,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },

    {
      ID: 6,
      Description: "Teleosoft Payroll",
      Amount: 200.0,
      subcategoryID: null,
      categoryID: null,
      isCredit: true
    },
    {
      ID: 7,
      Description: "Tusker's Indi",
      Amount: 46.2,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 8,
      Description: "Giant ery",
      Amount: 6.67,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 9,
      Description: "Bob's Barn",
      Amount: 19.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 10,
      Description: "Wen 1821",
      Amount: 14.03,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 11,
      Description: "Jimbo's Downomedy but really long w overflow",
      Amount: 29.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 12,
      Description: "mart",
      Amount: 89.14,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },

    {
      ID: 13,
      Description: "Teleosyroll",
      Amount: 200.0,
      subcategoryID: null,
      categoryID: null,
      isCredit: true
    },
    {
      ID: 14,
      Description: "Wen 1821 is super crappy",
      Amount: 14.03,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 15,
      Description: "Jimbo's Downomedy but really long w overflow plus even more",
      Amount: 2329.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },
    {
      ID: 16,
      Description: "mart super boiii",
      Amount: 11289.14,
      subcategoryID: null,
      categoryID: null,
      isCredit: false
    },

    {
      ID: 17,
      Description: "Teleosyroll but also longer",
      Amount: 200.0,
      subcategoryID: null,
      categoryID: null,
      isCredit: true
    }
  ]
}

export default data
