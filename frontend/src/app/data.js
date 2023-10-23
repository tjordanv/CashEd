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
  ],
  transactionsNew: [
    {
      transactionType: "SPECIAL",
      pendingTransactionId: null,
      categoryId: "22001000",
      category: ["Travel", "Airlines and Aviation Services"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: null
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "United Airlines",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: -500,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-09-25",
      pending: false,
      transactionId: "Xx1L1VZbL1ijQN6JkzaKtDMPeNPE5Lf1EqXq9",
      merchantName: "United Airlines",
      logoUrl:
        "https://plaid-merchant-logos.plaid.com/united_airlines_1065.png",
      website: "united.com",
      checkNumber: null,
      paymentChannel: "IN_STORE",
      authorizedDate: "2023-09-25",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "TRAVEL",
        detailed: "TRAVEL_FLIGHTS"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_TRAVEL.png",
      counterparties: [
        {
          name: "United Airlines",
          type: "MERCHANT",
          website: "united.com",
          logoUrl:
            "https://plaid-merchant-logos.plaid.com/united_airlines_1065.png"
        }
      ]
    },
    {
      transactionType: "PLACE",
      pendingTransactionId: null,
      categoryId: "13005032",
      category: ["Food and Drink", "Restaurants", "Fast Food"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: "3322"
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "McDonald's",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: 12,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-09-24",
      pending: false,
      transactionId: "DJRlRzmnlRcDdZpvn9oaI4zWbBWR8Xf4QxoxZ",
      merchantName: "McDonald's",
      logoUrl: "https://plaid-merchant-logos.plaid.com/mcdonalds_619.png",
      website: "mcdonalds.com",
      checkNumber: null,
      paymentChannel: "IN_STORE",
      authorizedDate: "2023-09-24",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "FOOD_AND_DRINK",
        detailed: "FOOD_AND_DRINK_FAST_FOOD"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
      counterparties: [
        {
          name: "McDonald's",
          type: "MERCHANT",
          website: "mcdonalds.com",
          logoUrl: "https://plaid-merchant-logos.plaid.com/mcdonalds_619.png"
        }
      ]
    },
    {
      transactionType: "PLACE",
      pendingTransactionId: null,
      categoryId: "13005043",
      category: ["Food and Drink", "Restaurants", "Coffee Shop"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: null
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "Starbucks",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: 4.33,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-09-24",
      pending: false,
      transactionId: "VB1M1yeZM1CLaG4pv13NipoGEbGvRWFqdeVel",
      merchantName: "Starbucks",
      logoUrl: "https://plaid-merchant-logos.plaid.com/starbucks_956.png",
      website: "starbucks.com",
      checkNumber: null,
      paymentChannel: "IN_STORE",
      authorizedDate: "2023-09-24",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "FOOD_AND_DRINK",
        detailed: "FOOD_AND_DRINK_COFFEE"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
      counterparties: [
        {
          name: "Starbucks",
          type: "MERCHANT",
          website: "starbucks.com",
          logoUrl: "https://plaid-merchant-logos.plaid.com/starbucks_956.png"
        }
      ]
    },
    {
      transactionType: "PLACE",
      pendingTransactionId: null,
      categoryId: "13005000",
      category: ["Food and Drink", "Restaurants"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: null
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "SparkFun",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: 89.4,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-09-23",
      pending: false,
      transactionId: "wvA4AX7R4AipRLdMB9n6uk7D96DALvcEVjpjK",
      merchantName: "FUN",
      logoUrl: null,
      website: null,
      checkNumber: null,
      paymentChannel: "IN_STORE",
      authorizedDate: "2023-09-22",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "FOOD_AND_DRINK",
        detailed: "FOOD_AND_DRINK_RESTAURANT"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
      counterparties: [
        {
          name: "FUN",
          type: "MERCHANT",
          website: null,
          logoUrl: null
        }
      ]
    },
    {
      transactionType: "SPECIAL",
      pendingTransactionId: null,
      categoryId: "22016000",
      category: ["Travel", "Taxi"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: null
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "Uber 072515 SF**POOL**",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: 6.33,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-09-10",
      pending: false,
      transactionId: "l6WwWQrmwWi4qJwby6M5Ug6JzRn8NrhpqbGnx",
      merchantName: "Uber",
      logoUrl: "https://plaid-merchant-logos.plaid.com/uber_1060.png",
      website: "uber.com",
      checkNumber: null,
      paymentChannel: "ONLINE",
      authorizedDate: "2023-09-09",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "TRANSPORTATION",
        detailed: "TRANSPORTATION_TAXIS_AND_RIDE_SHARES"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
      counterparties: [
        {
          name: "Uber",
          type: "MERCHANT",
          website: "uber.com",
          logoUrl: "https://plaid-merchant-logos.plaid.com/uber_1060.png"
        }
      ]
    },
    {
      transactionType: "SPECIAL",
      pendingTransactionId: null,
      categoryId: "22016000",
      category: ["Travel", "Taxi"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: null
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "Uber 063015 SF**POOL**",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: 5.4,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-08-28",
      pending: false,
      transactionId: "qvXzX1dJzXiebKDPyBgqCPd7vrxn5qcgjwAL5",
      merchantName: "Uber",
      logoUrl: "https://plaid-merchant-logos.plaid.com/uber_1060.png",
      website: "uber.com",
      checkNumber: null,
      paymentChannel: "ONLINE",
      authorizedDate: "2023-08-27",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "TRANSPORTATION",
        detailed: "TRANSPORTATION_TAXIS_AND_RIDE_SHARES"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
      counterparties: [
        {
          name: "Uber",
          type: "MERCHANT",
          website: "uber.com",
          logoUrl: "https://plaid-merchant-logos.plaid.com/uber_1060.png"
        }
      ]
    },
    {
      transactionType: "SPECIAL",
      pendingTransactionId: null,
      categoryId: "22001000",
      category: ["Travel", "Airlines and Aviation Services"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: null
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "United Airlines",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: -500,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-08-26",
      pending: false,
      transactionId: "KJaxaNzAxacak3bNmXrnipbnljBQEWfR9zWK7",
      merchantName: "United Airlines",
      logoUrl:
        "https://plaid-merchant-logos.plaid.com/united_airlines_1065.png",
      website: "united.com",
      checkNumber: null,
      paymentChannel: "IN_STORE",
      authorizedDate: "2023-08-26",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "TRAVEL",
        detailed: "TRAVEL_FLIGHTS"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_TRAVEL.png",
      counterparties: [
        {
          name: "United Airlines",
          type: "MERCHANT",
          website: "united.com",
          logoUrl:
            "https://plaid-merchant-logos.plaid.com/united_airlines_1065.png"
        }
      ]
    },
    {
      transactionType: "PLACE",
      pendingTransactionId: null,
      categoryId: "13005032",
      category: ["Food and Drink", "Restaurants", "Fast Food"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: "3322"
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "McDonald's",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: 12,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-08-25",
      pending: false,
      transactionId: "rvRBRWa7BRiQ9rbP1k8qcr8DWVoZXqF7AZqpL",
      merchantName: "McDonald's",
      logoUrl: "https://plaid-merchant-logos.plaid.com/mcdonalds_619.png",
      website: "mcdonalds.com",
      checkNumber: null,
      paymentChannel: "IN_STORE",
      authorizedDate: "2023-08-25",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "FOOD_AND_DRINK",
        detailed: "FOOD_AND_DRINK_FAST_FOOD"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
      counterparties: [
        {
          name: "McDonald's",
          type: "MERCHANT",
          website: "mcdonalds.com",
          logoUrl: "https://plaid-merchant-logos.plaid.com/mcdonalds_619.png"
        }
      ]
    },
    {
      transactionType: "PLACE",
      pendingTransactionId: null,
      categoryId: "13005043",
      category: ["Food and Drink", "Restaurants", "Coffee Shop"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: null
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "Starbucks",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: 4.33,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-08-25",
      pending: false,
      transactionId: "zvMjMwZljMi8DNjJnaBoiQEyZXb7KoTlyxJME",
      merchantName: "Starbucks",
      logoUrl: "https://plaid-merchant-logos.plaid.com/starbucks_956.png",
      website: "starbucks.com",
      checkNumber: null,
      paymentChannel: "IN_STORE",
      authorizedDate: "2023-08-25",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "FOOD_AND_DRINK",
        detailed: "FOOD_AND_DRINK_COFFEE"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
      counterparties: [
        {
          name: "Starbucks",
          type: "MERCHANT",
          website: "starbucks.com",
          logoUrl: "https://plaid-merchant-logos.plaid.com/starbucks_956.png"
        }
      ]
    },
    {
      transactionType: "PLACE",
      pendingTransactionId: null,
      categoryId: "13005000",
      category: ["Food and Drink", "Restaurants"],
      location: {
        address: null,
        city: null,
        region: null,
        postalCode: null,
        country: null,
        lat: null,
        lon: null,
        storeNumber: null
      },
      paymentMeta: {
        referenceNumber: null,
        ppdId: null,
        payee: null,
        byOrderOf: null,
        payer: null,
        paymentMethod: null,
        paymentProcessor: null,
        reason: null
      },
      accountOwner: null,
      name: "SparkFun",
      originalDescription: null,
      accountId: "LJjdjNBpdjcyglaNDJxRtX3NEMxEbKclNrNXj",
      amount: 89.4,
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      date: "2023-08-24",
      pending: false,
      transactionId: "BJlVlKnLVlcWZpv6Ko9Qfy6Wa1elgws4p36Xw",
      merchantName: "FUN",
      logoUrl: null,
      website: null,
      checkNumber: null,
      paymentChannel: "IN_STORE",
      authorizedDate: "2023-08-23",
      authorizedDatetime: null,
      datetime: null,
      transactionCode: null,
      personalFinanceCategory: {
        primary: "FOOD_AND_DRINK",
        detailed: "FOOD_AND_DRINK_RESTAURANT"
      },
      personalFinanceCategoryIconUrl:
        "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
      counterparties: [
        {
          name: "FUN",
          type: "MERCHANT",
          website: null,
          logoUrl: null
        }
      ]
    }
  ]
}

export default data
