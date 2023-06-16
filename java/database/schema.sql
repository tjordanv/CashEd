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
	ID int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	Username varchar(50) NOT NULL,
	Password_Hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	
	CONSTRAINT PK_user PRIMARY KEY (ID)
);

CREATE TABLE Email_Addresses (
	ID serial NOT NULL,
	Email_Address varchar(100) NOT NULL,
	Is_Active boolean NOT NULL,
	Is_Verified boolean NOT NULL,
	
	CONSTRAINT PK_email_Address PRIMARY KEY (ID)
);

CREATE TABLE User_Email_Addresses_xref (
	User_ID int NOT NULL,
	Email_Address_ID int NOT NULL,
	
	CONSTRAINT FK_user_ID FOREIGN KEY (User_ID) REFERENCES Users (ID),
	CONSTRAINT FK_Email_Address_ID FOREIGN KEY (Email_Address_ID) REFERENCES Email_Addresses (ID)
);

CREATE TABLE test (
	id serial NOT NULL,
	nums int NOT NULL,
	names varchar(50) NOT NULL,   
	
	CONSTRAINT PK_test PRIMARY KEY (id)
);

INSERT INTO Users (Username, Password_Hash, Role) VALUES ('user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER'),
        ('admin', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

INSERT INTO Email_Addresses (Email_Address, Is_Active, Is_Verified) VALUES ('tylervicari@yahoo.com', true, true), ('tylervicari@gmail.com', true, true);

INSERT INTO User_Email_Addresses_xref (User_ID, Email_Address_ID) VALUES (1, 1), (2, 2);

INSERT INTO test (nums, names)  
VALUES (100, 'random words'),
       (999, 'words words words'); 

COMMIT TRANSACTION;
