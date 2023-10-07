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

COMMIT TRANSACTION;
