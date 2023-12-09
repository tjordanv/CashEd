BEGIN TRANSACTION;

DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS User_Email_Addresses_xref;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Email_Addresses;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE Users (
	ID bigint DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	Username varchar(50) NOT NULL,
	first_name varchar(40) NOT NULL,
	last_name varchar(40) NOT NULL,
	Password_Hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	
	CONSTRAINT PK_user PRIMARY KEY (ID)
);

INSERT INTO Users (Username, first_name, last_name, Password_Hash, Role) VALUES 
	('user', 'Tyler', 'Vicari', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER'),
    ('admin', 'Tyler', 'Vicari', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

CREATE TABLE Email_Addresses (
	ID serial NOT NULL,
	Email_Address varchar(100) NOT NULL,
	Is_Active boolean NOT NULL,
	Is_Verified boolean NOT NULL,
	
	CONSTRAINT PK_email_Address PRIMARY KEY (ID)
);

INSERT INTO Email_Addresses (Email_Address, Is_Active, Is_Verified) VALUES ('tylervicari@yahoo.com', true, true), ('tylervicari@gmail.com', true, true);

CREATE TABLE User_Email_Addresses_xref (
	User_ID bigint NOT NULL,
	Email_Address_ID bigint NOT NULL,
	
	CONSTRAINT FK_user_ID FOREIGN KEY (User_ID) REFERENCES Users (ID),
	CONSTRAINT FK_Email_Address_ID FOREIGN KEY (Email_Address_ID) REFERENCES Email_Addresses (ID)
);

INSERT INTO User_Email_Addresses_xref (User_ID, Email_Address_ID) VALUES (1, 1), (2, 2);

CREATE TABLE test (
	id serial NOT NULL,
	nums int NOT NULL,
	names varchar(50) NOT NULL,   
	
	CONSTRAINT PK_test PRIMARY KEY (id)
);

INSERT INTO test (nums, names)  
VALUES (100, 'random words'),
       (999, 'words words words'); 

CREATE TABLE security_questions (
	id serial NOT NULL, 
	question varchar(100) NOT NULL, 
	
	CONSTRAINT PK_security_questions PRIMARY KEY (id)
);

INSERT INTO security_questions (question) VALUES 
	('What was the first thing you learned to cook and who taught you?'),
	('What was the breed and name of the third pet you ever had?'),
	('What is your least favorite piece of trivia that you still remember?'),
	('Who was your second grade teacher and what color was their hair?'),
	('What is the first movie that made you cry?'),
	('What was the name of your second favorite childhood toy?'),
	('What was the destination of your first airplane ride?'),
	('Which fictional character would you not want to meet?');

CREATE TABLE security_question_answers (
	id serial NOT NULL, 
	answer varchar(50) NOT NULL, 
	answer_date timestamptz DEFAULT Now(), 
	expiration_date timestamptz DEFAULT (Now() + INTERVAL '200 days'),
	is_active boolean NOT NULL DEFAULT true, 

	CONSTRAINT PK_security_question_answers PRIMARY KEY (id)
);

INSERT INTO security_question_answers (answer) VALUES
	('answer'),
	('answer'),
	('answer'),
	('answer');

CREATE TABLE user_security_question_answers_xref (
	user_id bigint NOT NULL, 
	question_id bigint NOT NULL, 
	answer_id bigint NOT NULL, 

	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id),
	CONSTRAINT FK_questions_id FOREIGN KEY (question_id) REFERENCES security_questions (id),
	CONSTRAINT FK_answer_id FOREIGN KEY (answer_id) REFERENCES security_question_answers (id)
);

INSERT INTO user_security_question_answers_xref (user_id, question_id, answer_id) VALUES
	(1,3,1),
	(1,1,2),
	(2,6,3),
	(2,5,4);

CREATE TABLE password_reset_jwt (
	id serial NOT NULL,
	token varchar(4096) NOT NULL,
	created_date timestamptz DEFAULT Now(),
	expiration_date timestamptz DEFAULT (Now() + INTERVAL '20 minutes'),
	is_active boolean NOT NULL DEFAULT true,

	CONSTRAINT PK_password_reset_jwt PRIMARY KEY (id)
);

COMMENT ON COLUMN password_reset_jwt.token IS 'This token contains the user''s ID and email address as well as an expiration date that is set to be 20 minutes after creation';


CREATE TABLE notification_categories (
	id serial NOT NULL,
	name varchar(25) NOT NULL,

	CONSTRAINT PK_notification_categories PRIMARY KEY (id)
);

INSERT INTO notification_categories (name) VALUES 
	('message'), 
	('profile'), 
	('settings'), 
	('budget');

CREATE TABLE notifications (
	id serial NOT NULL,
	category_id int NOT NULL,
	urgency_level int NOT NULL,
	subject varchar(100) NOT NULL,
	message varchar(1000) NOT NULL,
	created_date timestamptz DEFAULT Now(),
	is_read boolean NOT NULL DEFAULT false,
	is_protected boolean NOT NULL DEFAULT false,

	CONSTRAINT PK_notifications PRIMARY KEY (id),
	CONSTRAINT FK_category_id FOREIGN KEY (category_id) REFERENCES notification_categories (id)
);

COMMENT ON COLUMN notifications.urgency_level IS 'Urgency is rated on a 1-5 scale with 1 being the lowest and 5 being the highest';
COMMENT ON COLUMN notifications.is_protected IS 'If a notification is protected, it must remain unread until the necessary action is taken. For example, 
if a user''s email address is not verified, they will receive a notification telling them to verify and they cannot mark it as read or delete it until after their email 
is verified. Once the necessary criteria is met, the system will mark it read and no longer protected';


INSERT INTO notifications (category_id, urgency_level, subject, message) VALUES 
	(1, 1, 'subject', 'this is a test notification'), 
	(1, 2, 'subject', 'this is a second test notification'),
	(1, 3, 'subject', 'this is a third test notification'),
	(1, 4, 'subject', 'this is a fourth test notification'),
	(1, 5, 'subject', 'this is the final test notification');


CREATE TABLE user_notifications_xref (
	notification_id int NOT NULL,
	user_id int NOT NULL,

	CONSTRAINT FK_notification_id FOREIGN KEY (notification_id) REFERENCES notifications (id),
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO user_notifications_xref (notification_id, user_id) VALUES 
	(1, 1), 
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 1);

CREATE TABLE contact_Info (
	id serial NOT NULL,
	is_active_user boolean NOT NULL,
	first_name varchar(40),
	last_name varchar(40),
	message varchar(300) NOT NULL,
	created_date timestamptz DEFAULT Now(),

	CONSTRAINT PK_contact_info PRIMARY KEY (id)
);	
CREATE TABLE Contact_Info_Email_Address_xref (
	contact_Info_ID int NOT NULL,
	Email_Address_ID int NOT NULL,
	
	CONSTRAINT FK_contact_info_ID FOREIGN KEY (contact_Info_ID) REFERENCES contact_info (ID),
	CONSTRAINT FK_Email_Address_ID FOREIGN KEY (Email_Address_ID) REFERENCES Email_Addresses (ID)
);

CREATE TABLE Contact_Info_user_xref (
	contact_Info_ID int NOT NULL,
	user_id int NOT NULL,
	
	CONSTRAINT FK_contact_info_ID FOREIGN KEY (contact_Info_ID) REFERENCES contact_info (ID),
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (ID)
);
CREATE TABLE access_tokens (
	id serial NOT NULL,
	token varchar(200) NOT NULL,
	user_id int NOT NULL, 
	is_deleted boolean NOT NULL DEFAULT false,
	deleted_date date,
	created_date timestamptz DEFAULT Now(),
	
	CONSTRAINT PK_access_tokens PRIMARY KEY (id)
);
-- CREATE TABLE temp_access_tokens (
-- 	id serial NOT NULL,
-- 	token varchar(200) NOT NULL,
-- 	user_id int NOT NULL, 
-- 	expiration_date timestamptz NOT NULL DEFAULT (Now() + INTERVAL '20 minutes'),

-- 	CONSTRAINT PK_access_tokens PRIMARY KEY (id)
-- );
CREATE TABLE account_types (
	id serial NOT NULL,
	name varchar(40),

	CONSTRAINT PK_account_types PRIMARY KEY (id)
);
INSERT INTO account_types (name) VALUES 
	('depository'),
	('credit'),
	('loan'), 
	('investment');
CREATE TABLE account_subtypes (
	id serial NOT NULL,
	name varchar(40),
	description varchar(150),
	type_id int NOT NULL,

	CONSTRAINT PK_account_subtypes PRIMARY KEY (id),
	CONSTRAINT FK_type_id FOREIGN KEY (type_id) REFERENCES account_types (id)
);
INSERT INTO account_subtypes (name, description, type_id) VALUES 
	('checking', 'Checking account', 1),
	('savings', 'Savings account', 1),
	('hsa', 'Health Savings Account (US only)', 1),
	('cd', 'Certificate of deposit account', 1),
	('money market', 'Money Market Account', 1),
	('paypal', 'PayPal depository account', 1),
	('prepaid', 'Prepaid debit card', 1),
	('cash management', 'A cash management account', 1),
	('ebt', 'An electronic Benefit Transfer account', 1),
	('paypal', 'PayPal-issued credit card', 2),
	('credit card', 'Bank-issued credit card', 2),
	('auto', 'Auto loan', 3),
	('business', 'Business loan', 3),
	('commercial', 'Commercial loan', 3),
	('construction', 'Construction loan', 3),
	('consumer', 'Consumer loan', 3),
	('home equity', 'Home Equity Line of Credit (HELOC)', 3),
	('loan', 'General loan', 3),
	('mortgage', 'Mortgage loan', 3),
	('overdraft', 'Pre-approved overdraft account, usually tied to a checking account', 3),
	('line of credit', 'Pre-approved line of credit', 3),
	('student', 'Student loan', 3),
	('other', 'Other loan type or unknown loan type', 3),
	('529', 'Tax-advantaged college savings and prepaid tuition 529 plans (US)', 4),
	('401a', 'Employer-sponsored money-purchase 401(a) retirement plan (US)', 4),
	('401k', 'Standard 401(k) retirement account (US)', 4),
	('403B', '403(b) retirement savings account for non-profits and schools (US)', 4),
	('457b', 'Tax-advantaged deferred-compensation 457(b) retirement plan for governments and non-profits (US)', 4),
	('brokerage', 'Standard brokerage account', 4),
	('cash isa', 'Individual Savings Account (ISA) that pays interest tax-free (UK)', 4),
	('crypto exchange', 'Standard cryptocurrency exchange account', 4),
	('education savings account', 'Tax-advantaged Coverdell Education Savings Account (ESA) (US)', 4),
	('fixed annuity', 'Fixed annuity', 4),
	('gic', 'Guaranteed Investment Certificate (Canada)', 4),
	('health reimbursement arrangement', 'Tax-advantaged Health Reimbursement Arrangement (HRA) benefit plan (US)', 4),
	('hsa', 'Non-cash tax-advantaged medical Health Savings Account (HSA) (US)', 4),
	('ira', 'Traditional Individual Retirement Account (IRA) (US)', 4),
	('isa', 'Non-cash Individual Savings Account (ISA) (UK)', 4),
	('keogh', 'Keogh self-employed retirement plan (US)', 4),
	('lif', 'Life Income Fund (LIF) retirement account (Canada)', 4),
	('life insurance', 'Life insurance account', 4),
	('lira', 'Locked-in Retirement Account (LIRA) (Canada)', 4),
	('lrif', 'Locked-in Retirement Income Fund (LRIF) (Canada)', 4),
	('lrsp', 'Locked-in Retirement Savings Plan (Canada)', 4),
	('mutual fund', 'Mutual fund account', 4),
	('non-custodial wallet', 'A cryptocurrency wallet where the user controls the private key', 4),
	('non-taxable brokerage account', 'A non-taxable brokerage account that is not covered by a more specific subtype', 4),
	('other', 'An account whose type could not be determined', 4),
	('other annuity', 'An annuity account not covered by other subtypes', 4),
	('other insurance', 'An insurance account not covered by other subtypes', 4),
	('pension', 'Standard pension account', 4),
	('prif', 'Prescribed Registered Retirement Income Fund (Canada)', 4),
	('profit sharing plan', 'Plan that gives employees share of company profits', 4),
	('qshr', 'Qualifying share account', 4),
	('rdsp', 'Registered Disability Savings Plan (RSDP) (Canada)', 4),
	('resp', 'Registered Education Savings Plan (Canada)', 4),
	('retirement', 'Retirement account not covered by other subtypes', 4),
	('rlif', 'Restricted Life Income Fund (RLIF) (Canada)', 4),
	('roth', 'Roth IRA (US)', 4),
	('roth 401k', 'Employer-sponsored Roth 401(k) plan (US)', 4),
	('rrif', 'Registered Retirement Income Fund (RRIF) (Canada)', 4),
	('rrsp', 'Registered Retirement Savings Plan (Canadian, similar to US 401(k))', 4),
	('sarsep', 'Salary Reduction Simplified Employee Pension Plan (SARSEP), discontinued retirement plan (US)', 4),
	('sep ira', 'Simplified Employee Pension IRA (SEP IRA), retirement plan for small businesses and self-employed (US)', 4),
	('simple ira', 'Savings Incentive Match Plan for Employees IRA, retirement plan for small businesses (US)', 4),
	('sipp', 'Self-Invested Personal Pension (SIPP) (UK)', 4),
	('stock plan', 'Standard stock plan account', 4),
	('tfsa', 'Tax-Free Savings Account (TFSA), a retirement plan similar to a Roth IRA (Canada)', 4),
	('trust', 'Account representing funds or assets held by a trustee for the benefit of a beneficiary. Includes both revocable and irrevocable trusts.', 4),
	('ugma', 'Uniform Gift to Minors Act (brokerage account for minors, US)', 4),
	('utma', 'Uniform Transfers to Minors Act (brokerage account for minors, US)', 4),
	('variable annuity', 'Tax-deferred capital accumulation annuity contract', 4);

CREATE TABLE accounts (
	id serial NOT NULL,
	account_id varchar(500) NOT NULL,
	access_token_id int NOT NULL,
	user_id int NOT NULL,
	nickname varchar(50),
	name varchar(100),
	official_name varchar(150),
	mask varchar(4) NOT NULL,
	subtype_id int,
	logo_id int,
	created_date timestamptz DEFAULT Now(),
	is_deleted boolean NOT NULL DEFAULT false,
	deleted_date date,

	CONSTRAINT PK_accounts PRIMARY KEY (id),
	CONSTRAINT FK_access_token_id FOREIGN KEY (access_token_id) REFERENCES access_tokens (id),
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id)
 );
CREATE TABLE logos (
	id serial NOT NULL,
	logo varchar(10000),

	CONSTRAINT PK_logos PRIMARY KEY (id)
); 
CREATE TABLE transaction_categories (
	id serial NOT NULL,
	name varchar(50) NOT NULL,

	CONSTRAINT PK_transaction_categories PRIMARY KEY (id)
 );
INSERT INTO transaction_categories (name) VALUES 
	('Income'), 
	('Saving and Investments'),
	('Variable Expenses'),
	('Fixed Expenses');

CREATE TABLE transaction_subcategories (
	id serial NOT NULL,
	name varchar(40) NOT NULL,
	category_id int NOT NULL,
	detailed_name varchar(60) NOT NULL,
	description varchar(160) NOT NULL,
	icon_url varchar(200),

	CONSTRAINT PK_transaction_subcategories PRIMARY KEY (id),
	CONSTRAINT FK_category_id FOREIGN KEY (category_id) REFERENCES transaction_categories (id)
 );

INSERT INTO transaction_subcategories (name, detailed_name, description, category_id) VALUES
	('Dividends','Income Dividends','Dividends from investment accounts', 1),
	('Interest Earned','Income Interest Earned','Income from interest on savings accounts', 1),
	('Retirement Pension','Income Retirement Pension','Income from pension payments', 1),
	('Tax Refund','Income Tax Refund','Income from tax refunds', 1),
	('Unemployment','Income Unemployment','Income from unemployment benefits, including unemployment insurance and healthcare', 1),
	('Wages','Income Wages','Income from salaries, gig-economy work, and tips earned', 1),
	('Income','Income Other Income','Other miscellaneous income, including alimony, social security, child support, and rental', 1),
	('Cash Advance and Loans','Transfer In Cash Advances and Loans','Loans and cash advances deposited into a bank account', 1),
	('Deposit','Transfer In Deposit','Cash, checks, and ATM deposits into a bank account', 1),
	('Transfer In to Investments','Transfer In Investment and Retirement Funds','Inbound transfers to an investment or retirement account', 1),
	('Transfer In to Savings','Transfer In Savings','Inbound transfers to a savings account', 1),
	('Transfer In','Transfer In Other Transfer In','Other miscellaneous inbound transactions', 1),
	('Transfer Out to Investments','Transfer Out Investment and Retirement Funds','Transfers to an investment or retirement account, including investment apps such as Acorns, Betterment', 1),
	('Transfer Out to Savings','Transfer Out Savings','Outbound transfers to savings accounts', 1),
	('Withdraw','Transfer Out Withdrawal','Withdrawals from a bank account', 1),
	('Transfer Out','Transfer Out Other Transfer Out','Other miscellaneous outbound transactions', 1),
	('Car Payment','Loan Payments Car Payment','Car loans and leases', 1),
	('Credit Card Interest','Loan Payments Credit Card Interest','Payments to a credit card to cover and accrued interest. These are positive amounts for credit card subtypes and negative for depository subtypes', 1),
	('Personal Loan','Loan Payments Personal Loan Payment','Personal loans, including cash advances and buy now pay later repayments', 1),
	('Mortgage','Loan Payments Mortgage Payment','Payments on mortgages', 1),
	('Student Loans','Loan Payments Student Loan Payment','Payments on student loans. For college tuition, refer to "General Services - Education"', 1),
	('Loan Payments','Loan Payments Other Payment','Other miscellaneous debt payments', 1),
	('ATM Fees','Bank Fees ATM Fees','Fees incurred for out-of-network ATMs', 1),
	('Foreign Transaction Fee','Bank Fees Foreign Transaction Fees','Fees incurred on non-domestic transactions', 1),
	('Insufficient Funds Fee','Bank Fees Insufficient Funds','Fees relating to insufficient funds', 1),
	('Interest Fees','Bank Fees Interest Charge','Fees incurred for interest on purchases, including not-paid-in-full or interest on cash advances', 1),
	('Overdraft Fees Fees','Bank Fees Overdraft Fees','Fees incurred when an account is in overdraft', 1),
	('Bank Fees','Bank Fees Other Bank Fees','Other miscellaneous bank fees', 1),
	('Casinos and Gambling','Entertainment Casinos and Gambling','Gambling, casinos, and sports betting', 2),
	('Music and Audio','Entertainment Music and Audio','Digital and in-person music purchases, including music streaming services', 2),
	('Entertainment Events','Entertainment Sporting Events Amusement Parks and Museums','Purchases made at sporting events, music venues, concerts, museums, and amusement parks', 3),
	('TV and Movies','Entertainment TV and Movies','In home movie streaming services and movie theaters', 3),
	('Video Games','Entertainment Video Games','Digital and in-person video game purchases', 3),
	('Entertainment','Entertainment Other Entertainment','Other miscellaneous entertainment purchases, including night life and adult entertainment', 4),
	('Beer and Liquor','Food and Drink Beer Wine and Liquor','Beer, Wine & Liquor Stores', 4),
	('Coffee Shops','Food and Drink Coffee','Purchases at coffee shops or cafes', 4),
	('Fast Food','Food and Drink Fast Food','Dining expenses for fast food chains', 4),
	('Groceries','Food and Drink Groceries','Purchases for fresh produce and groceries, including farmers markets', 4),
	('Restaurants','Food and Drink Restaurant','Dining expenses for restaurants, bars, gastropubs, and diners', 4),
	('Vending Machines','Food and Drink Vending Machines','Purchases made at vending machine operators', 4),
	('Food and Drink','Food and Drink Other Food and Drink','Other miscellaneous food and drink, including desserts, juice bars, and delis', 4),
	('Bookstores','General Merchandise Bookstores and Newsstands','Books, magazines, and news', 4),
	('Clothes and Accessories','General Merchandise Clothing and Accessories','Apparel, shoes, and jewelry', 4),
	('Convenience Stores','General Merchandise Convenience Stores','Purchases at convenience stores', 4),
	('Department Stores','General Merchandise Department Stores','Retail stores with wide ranges of consumer goods, typically specializing in clothing and home goods', 4),
	('Thrift and Discount Stores','General Merchandise Discount Stores','Stores selling goods at a discounted price', 4),
	('Electronics','General Merchandise Electronics','Electronics stores and websites', 4),
	('Gifts and Novelties','General Merchandise Gifts and Novelties','Photo, gifts, cards, and floral stores', 4),
	('Office Supplies','General Merchandise Office Supplies','Stores that specialize in office goods', 4),
	('Online Shopping','General Merchandise Online Marketplaces','Multi-purpose e-commerce platforms such as Etsy, Ebay and Amazon', 4),
	('Pet Supplies','General Merchandise Pet Supplies','Pet supplies and pet food', 4),
	('Sporting Goods','General Merchandise Sporting Goods','Sporting goods, camping gear, and outdoor equipment', 4),
	('Superstores','General Merchandise Superstores','Superstores such as Target and Walmart, selling both groceries and general merchandise', 4),
	('Tobacco and Vape','General Merchandise Tobacco and Vape','Purchases for tobacco and vaping products', 4),
	('General Merchandise Other','General Merchandise Other General Merchandise','Other miscellaneous merchandise, including toys, hobbies, and arts and crafts', 4),
	('Furniture','Home Improvement Furniture','Furniture, bedding, and home accessories', 1),
	('Home Improvement Hardware','Home Improvement Hardware','Building materials, hardware stores, paint, and wallpaper', 1),
	('Home Maintenance and Repair','Home Improvement Repair and Maintenance','Plumbing, lighting, gardening, and roofing', 1),
	('Home Security','Home Improvement Security','Home security system purchases', 1),
	('Home Improvement','Home Improvement Other Home Improvement','Other miscellaneous home purchases, including pool installation and pest control', 1),
	('Dental Care','Medical Dental Care','Dentists and general dental care', 2),
	('Eye Care','Medical Eye Care','Optometrists, contacts, and glasses stores', 2),
	('Nursing Care','Medical Nursing Care','Nursing care and facilities', 3),
	('Medication and Supplements','Medical Pharmacies and Supplements','Pharmacies and nutrition shops', 3),
	('Veterinary Services','Medical Veterinary Services','Prevention and care procedures for animals', 3),
	('Medical','Medical Other Medical','Other miscellaneous medical, including blood work, hospitals, and ambulances', 3),
	('Gym and Fitness','Personal Care Gyms and Fitness Centers','Gyms, fitness centers, and workout classes', 3),
	('Hair and Beauty','Personal Care Hair and Beauty','Manicures, haircuts, waxing, spa/massages, and bath and beauty products ', 3),
	('Laundry and Dry Cleaning','Personal Care Laundry and Dry Cleaning','Wash and fold, and dry cleaning expenses', 3),
	('Personal Care','Personal Care Other Personal Care','Other miscellaneous personal care, including mental health apps and services', 3),
	('Financial Services','General Services Accounting and Financial Planning','Financial planning, and tax and accounting services', 3),
	('Automotive Services','General Services Automotive','Oil changes, car washes, repairs, and towing', 3),
	('Childcare','General Services Childcare','Babysitters and daycare', 3),
	('Consulting and Legal','General Services Consulting and Legal','Consulting and legal services', 3),
	('Education','General Services Education','Elementary, high school, professional schools, and college tuition', 3),
	('Insurance','General Services Insurance','Insurance for auto, home, and healthcare', 3),
	('Postage and Shipping','General Services Postage and Shipping','Mail, packaging, and shipping services', 3),
	('Storage Services','General Services Storage','Storage services and facilities', 3),
	('General Services','General Services Other General Services','Other miscellaneous services, including advertising and cloud storage ', 3),
	('Donations','Government and Non-Profit Donations','Charitable, political, and religious donations', 4),
	('Tax Payments','Government and Non-Profit Tax Payment','Tax payments, including income and property taxes', 3),
	('Government and Non-Profit','Government and Non-Profit Other Government and Non-Profit','Other miscellaneous government and non-profit agencies', 4),
	('Bike and Scooter Rental','Transportation Bikes and Scooters','Bike and scooter rentals', 3),
	('Gasoline','Transportation Gas','Purchases at a gas station', 3),
	('Parking','Transportation Parking','Parking fees and expenses', 3),
	('Public Transportation','Transportation Public Transit','Public transportation, including rail and train, buses, and metro', 3),
	('Ride Sharing','Transportation Taxis and Ride Shares','Taxi and ride share services', 3),
	('Tolls','Transportation Tolls','Toll expenses', 4),
	('Transportation','Transportation Other Transportation','Other miscellaneous transportation expenses', 3),
	('Airline expenses','Travel Flights','Airline expenses', 3),
	('Lodging','Travel Lodging','Hotels, motels, and hosted accommodation such as Airbnb', 4),
	('Rental Car','Travel Rental Cars','Rental cars, charter buses, and trucks', 3),
	('Travel','Travel Other Travel','Other miscellaneous travel expenses', 3),
	('Gas and Electric Bill','Rent and Utilities Gas and Electricity','Gas and electricity bills', 3),
	('Cable and Internet','Rent and Utilities Internet and Cable','Internet and cable bills', 3),
	('Rent','Rent and Utilities Rent','Rent payment', 3),
	('Sewage and Waste Management','Rent and Utilities Sewage and Waste Management','Sewage and garbage disposal bills', 4),
	('Phone Bill','Rent and Utilities Telephone','Cell phone bills', 3),
	('Water Bill','Rent and Utilities Water','Water bills', 3),
	('Utilities','Rent and Utilities Other Utilities','Other miscellaneous utility bills', 3);
	
CREATE TABLE transaction_subcategory_user_xref (
	subcategory_id int NOT NULL,
	user_id int NOT NULL, 
	is_deleted boolean NOT NULL DEFAULT false,
	deleted_date timestamptz,
	created_date timestamptz NOT NULL DEFAULT Now(),

	CONSTRAINT FK_subcategory_id FOREIGN KEY (subcategory_id) REFERENCES transaction_subcategories (id), 
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id)
 );
CREATE TABLE payment_channels (
	id serial NOT NULL,
	name varchar(50) NOT NULL,

	CONSTRAINT PK_payment_channels PRIMARY KEY (id)
 );
 INSERT INTO payment_channels (name) VALUES 
	('online'),
	('in store'),
	('other');
CREATE TABLE transactions (
	id serial NOT NULL,
	transaction_id varchar(100) NOT NULL,
	account_id int NOT NULL,
	user_id int NOT NULL, 
	subcategory_id int NOT NULL,
	name varchar(50) NOT NULL,
	description varchar(200),
	merchant_logo_url varchar(200),
	merchant_website varchar(100),
	date date, 
	amount numeric(10,2) NOT NULL,
	payment_channel_id int,
	check_number varchar(40),
	address varchar(150),
	city varchar(75),
	region varchar(75),
	postal_code varchar(20),
	country varchar(75),
	created_date timestamptz DEFAULT Now(),
	is_deleted boolean NOT NULL DEFAULT false,
	deleted_date timestamptz,

	CONSTRAINT PK_transactions PRIMARY KEY (id),
	CONSTRAINT FK_account_id FOREIGN KEY (account_id) REFERENCES accounts (id),
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id),
	CONSTRAINT FK_subcategory_id FOREIGN KEY (subcategory_id) REFERENCES transaction_subcategories (id), 
	CONSTRAINT FK_payment_channel_id FOREIGN KEY (payment_channel_id) REFERENCES payment_channels (id)
 );
COMMIT TRANSACTION;
