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
    {
      Name: "Entertainment",
      ID: 4,
      categoryID: 3,
      Total: 0,
      isSelected: false
    },
    { Name: "Travel", ID: 5, categoryID: 3, Total: 0, isSelected: false },
    { Name: "Rent", ID: 6, categoryID: 4, Total: 0, isSelected: false },
    { Name: "Car Payment", ID: 7, categoryID: 4, Total: 0, isSelected: false },
    { Name: "Phone Bill", ID: 8, categoryID: 4, Total: 0, isSelected: false },
    { Name: "Work Payroll", ID: 9, categoryID: 1, Total: 0, isSelected: false },
    {
      Name: "Passive Income",
      ID: 10,
      categoryID: 1,
      Total: 0,
      isSelected: false
    },
    { Name: "Savings", ID: 11, categoryID: 2, Total: 0, isSelected: false },
    { Name: "401k", ID: 12, categoryID: 2, Total: 0, isSelected: false },
    { Name: "Shopping", ID: 13, categoryID: 3, Total: 0, isSelected: false },
    {
      Name: "Home & Vehicle Maintenance",
      ID: 14,
      categoryID: 3,
      Total: 0,
      isSelected: false
    },
    {
      Name: "Some Filler Category",
      ID: 15,
      categoryID: 3,
      Total: 0,
      isSelected: false
    },
    {
      Name: "Another Filler",
      ID: 16,
      categoryID: 3,
      Total: 0,
      isSelected: false
    },
    {
      Name: "Yup, another filler",
      ID: 17,
      categoryID: 3,
      Total: 0,
      isSelected: false
    },
    {
      Name: "Miscellaneous",
      ID: 18,
      categoryID: 3,
      Total: 0,
      isSelected: false
    }
  ],

  transactions: [
    {
      ID: 0,
      Description: "Tusker's Indian Fusion",
      Amount: 46.2,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 1,
      Description: "Giant Grocery",
      Amount: 6.67,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 2,
      Description: "Bob's Beer Barn",
      Amount: 19.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 3,
      Description: "Wendy's 1821",
      Amount: 14.03,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 4,
      Description: "Jimbo's Downtown Comedy",
      Amount: 29.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 5,
      Description: "Walmart",
      Amount: 89.14,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },

    {
      ID: 6,
      Description: "Teleosoft Payroll",
      Amount: 200.0,
      subcategoryID: null,
      categoryID: null,
      isCredit: true,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 7,
      Description: "Tusker's Indi",
      Amount: 46.2,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 8,
      Description: "Giant ery",
      Amount: 6.67,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 9,
      Description: "Bob's Barn",
      Amount: 19.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 10,
      Description: "Wen 1821",
      Amount: 14.03,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 11,
      Description: "Jimbo's Downomedy but really long w overflow",
      Amount: 29.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 12,
      Description: "mart",
      Amount: 89.14,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },

    {
      ID: 13,
      Description: "Teleosyroll",
      Amount: 200.0,
      subcategoryID: null,
      categoryID: null,
      isCredit: true,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 14,
      Description: "Wen 1821 is super crappy",
      Amount: 14.03,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 15,
      Description:
        "Jimbo's Downomedy but really long w overflow plus even more so it is super super long for no good reason really. idk",
      Amount: 2329.99,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      ID: 16,
      Description: "mart super boiii",
      Amount: 11289.14,
      subcategoryID: null,
      categoryID: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },

    {
      ID: 17,
      Description: "Teleosyroll but also longer",
      Amount: 200.0,
      subcategoryID: null,
      categoryID: null,
      isCredit: true,
      date: "12/02/2022",
      accountID: 1
    }
  ]
}

export default data
