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
        categoryId: 1,
        total: 0,
        isSelected: false
      },
      {
        name: "Passive Income",
        id: 10,
        categoryId: 1,
        total: 0,
        isSelected: false
      }
    ],
    [
      { name: "Savings", id: 11, categoryId: 2, total: 0, isSelected: false },
      { name: "401k", id: 12, categoryId: 2, total: 0, isSelected: false }
    ],
    [
      { name: "Groceries", id: 1, categoryId: 3, total: 0, isSelected: false },
      { name: "Alcohol", id: 2, categoryId: 3, total: 0, isSelected: false },
      { name: "Eating Out", id: 3, categoryId: 3, total: 0, isSelected: false },
      {
        name: "Entertainment",
        id: 4,
        categoryId: 3,
        total: 0,
        isSelected: false
      },
      { name: "Shopping", id: 13, categoryId: 3, total: 0, isSelected: false },
      {
        name: "Home & Vehicle Maintenance",
        id: 14,
        categoryId: 3,
        total: 0,
        isSelected: false
      },
      {
        name: "Some Filler Category",
        id: 15,
        categoryId: 3,
        total: 0,
        isSelected: false
      },
      {
        name: "Another Filler",
        id: 16,
        categoryId: 3,
        total: 0,
        isSelected: false
      },
      {
        name: "Yup, another filler",
        id: 17,
        categoryId: 3,
        total: 0,
        isSelected: false
      },
      {
        name: "Miscellaneous",
        id: 18,
        categoryId: 3,
        total: 0,
        isSelected: false
      },
      { name: "Travel", id: 5, categoryId: 3, total: 0, isSelected: false }
    ],
    [
      { name: "Rent", id: 6, categoryId: 4, total: 0, isSelected: false },
      {
        name: "Car Payment",
        id: 7,
        categoryId: 4,
        total: 0,
        isSelected: false
      },
      { name: "Phone Bill", id: 8, categoryId: 4, total: 0, isSelected: false }
    ]
  ],

  transactions: [
    {
      id: 40,
      name: "Tusker's Indian Fusion",
      amount: 46.2,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 1,
      name: "Giant Grocery",
      amount: 6.67,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 2,
      name: "Bob's Beer Barn",
      amount: 19.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 3,
      name: "Wendy's 1821",
      amount: 14.03,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 4,
      name: "Jimbo's Downtown Comedy",
      amount: 29.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 5,
      name: "Walmart",
      amount: 89.14,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },

    {
      id: 6,
      name: "Teleosoft Payroll",
      amount: 200.0,
      subcategoryId: null,
      categoryId: null,
      isCredit: true,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 7,
      name: "Tusker's Indi",
      amount: 46.2,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 8,
      name: "Giant ery",
      amount: 6.67,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 9,
      name: "Bob's Barn",
      amount: 19.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 10,
      name: "Wen 1821",
      amount: 14.03,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 11,
      name: "Jimbo's Downomedy but really long w overflow",
      amount: 29.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 12,
      name: "mart",
      amount: 89.14,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },

    {
      id: 13,
      name: "Teleosyroll",
      amount: 200.0,
      subcategoryId: null,
      categoryId: null,
      isCredit: true,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 14,
      name: "Wen 1821 is super crappy",
      amount: 14.03,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 15,
      name: "Jimbo's Downomedy but really long w overflow plus even more so it is super super long for no good reason really. idk",
      amount: 2329.99,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },
    {
      id: 16,
      name: "mart super boiii",
      amount: 11289.14,
      subcategoryId: null,
      categoryId: null,
      isCredit: false,
      date: "12/02/2022",
      accountID: 1
    },

    {
      id: 17,
      name: "Teleosyroll but also longer",
      amount: 200.0,
      subcategoryId: null,
      categoryId: null,
      isCredit: true,
      date: "12/02/2022",
      accountID: 1
    }
  ]
}

export default data
