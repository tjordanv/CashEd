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

INSERT INTO Users (Username, Password_Hash, Role) VALUES 
	('user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER'),
    ('admin', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

CREATE TABLE Email_Addresses (
	ID serial NOT NULL,
	Email_Address varchar(100) NOT NULL,
	Is_Active boolean NOT NULL,
	Is_Verified boolean NOT NULL,
	
	CONSTRAINT PK_email_Address PRIMARY KEY (ID)
);

INSERT INTO Email_Addresses (Email_Address, Is_Active, Is_Verified) VALUES ('tylervicari@yahoo.com', true, true), ('tylervicari@gmail.com', true, true);

CREATE TABLE User_Email_Addresses_xref (
	User_ID int NOT NULL,
	Email_Address_ID int NOT NULL,
	
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
	is_expired boolean NOT NULL DEFAULT false, 

	CONSTRAINT PK_security_question_answers PRIMARY KEY (id)
);

INSERT INTO security_question_answers (answer) VALUES
	('answer'),
	('answer 2'),
	('answer 3'),
	('answer 4');

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

COMMIT TRANSACTION;
