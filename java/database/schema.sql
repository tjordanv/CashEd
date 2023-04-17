BEGIN TRANSACTION;

DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	
	CONSTRAINT PK_user PRIMARY KEY (id)
);

CREATE TABLE test (
	id serial NOT NULL,
	nums int NOT NULL,
	names varchar(50) NOT NULL,   
	
	CONSTRAINT PK_test PRIMARY KEY (id)
);

INSERT INTO users (username,email,password_hash,role) VALUES ('user','test@email.com','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER'),
        ('admin', 'test2@email.com', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

INSERT INTO test (nums, names)  
VALUES (100, 'random words'),
       (999, 'words words words'); 

COMMIT TRANSACTION;
