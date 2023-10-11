const data = {
  categories: [
    { name: "Income", ID: 1 },
    { name: "Savings & Investments", ID: 2 },
    { name: "Variable Expenditures", ID: 3 },
    { name: "Fixed Expenditures", ID: 4 }
  ],

  subcategories: [
    [
      {
        name: "Work Payroll",
        id: 9,
        categoryID: 1,
        Total: 0,
        isSelected: false
      },
      {
        name: "Passive Income",
        id: 10,
        categoryID: 1,
        Total: 0,
        isSelected: false
      }
    ],
    [
      { name: "Savings", id: 11, categoryID: 2, Total: 0, isSelected: false },
      { name: "401k", id: 12, categoryID: 2, Total: 0, isSelected: false }
    ],
    [
      { name: "Groceries", id: 1, categoryID: 3, Total: 0, isSelected: false },
      { name: "Alcohol", id: 2, categoryID: 3, Total: 0, isSelected: false },
      { name: "Eating Out", id: 3, categoryID: 3, Total: 0, isSelected: false },
      {
        name: "Entertainment",
        id: 4,
        categoryID: 3,
        Total: 0,
        isSelected: false
      },
      { name: "Shopping", id: 13, categoryID: 3, Total: 0, isSelected: false },
      {
        name: "Home & Vehicle Maintenance",
        id: 14,
        categoryID: 3,
        Total: 0,
        isSelected: false
      },
      {
        name: "Some Filler Category",
        id: 15,
        categoryID: 3,
        Total: 0,
        isSelected: false
      },
      {
        name: "Another Filler",
        id: 16,
        categoryID: 3,
        Total: 0,
        isSelected: false
      },
      {
        name: "Yup, another filler",
        id: 17,
        categoryID: 3,
        Total: 0,
        isSelected: false
      },
      {
        name: "Miscellaneous",
        id: 18,
        categoryID: 3,
        Total: 0,
        isSelected: false
      },
      { name: "Travel", id: 5, categoryID: 3, Total: 0, isSelected: false }
    ],
    [
      { name: "Rent", id: 6, categoryID: 4, Total: 0, isSelected: false },
      {
        name: "Car Payment",
        id: 7,
        categoryID: 4,
        Total: 0,
        isSelected: false
      },
      { name: "Phone Bill", id: 8, categoryID: 4, Total: 0, isSelected: false }
    ]
  ],

  transactions: [
    {
      id: 40,
      description: "Tusker's Indian Fusion",
      Amount: 46.2,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 1,
      description: "Giant Grocery",
      Amount: 6.67,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 2,
      description: "Bob's Beer Barn",
      Amount: 19.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 3,
      description: "Wendy's 1821",
      Amount: 14.03,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 4,
      description: "Jimbo's Downtown Comedy",
      Amount: 29.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 5,
      description: "Walmart",
      Amount: 89.14,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },

    {
      id: 6,
      description: "Teleosoft Payroll",
      Amount: 200.0,
      subcategoryId: null,
      categoryId: null,
      isCredit: true,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 7,
      description: "Tusker's Indi",
      Amount: 46.2,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 8,
      description: "Giant ery",
      Amount: 6.67,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 9,
      description: "Bob's Barn",
      Amount: 19.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 10,
      description: "Wen 1821",
      Amount: 14.03,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 11,
      description: "Jimbo's Downomedy but really long w overflow",
      Amount: 29.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 12,
      description: "mart",
      Amount: 89.14,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },

    {
      id: 13,
      description: "Teleosyroll",
      Amount: 200.0,
      subcategoryId: null,
      categoryId: null,
      isCredit: true,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 14,
      description: "Wen 1821 is super crappy",
      Amount: 14.03,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 15,
      description:
        "Jimbo's Downomedy but really long w overflow plus even more so it is super super long for no good reason really. idk",
      Amount: 2329.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 16,
      description: "mart super boiii",
      Amount: 11289.14,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },

    {
      id: 17,
      description: "Teleosyroll but also longer",
      Amount: 200.0,
      subcategoryId: null,
      categoryId: null,
      isCredit: true,
      date: "12/02/2022",
      accountID: 1
    }
  ]
}

export default data
