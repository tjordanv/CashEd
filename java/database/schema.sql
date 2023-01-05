BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(30)  NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,

	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

INSERT INTO users (username, password_hash, role) VALUES ('deno', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'ROLE_USER');
INSERT INTO users (username, password_hash, role) VALUES ('ty', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'ROLE_ADMIN');

CREATE TABLE user_contact (
	id serial NOT NULL,
	user_id int UNIQUE NOT NULL,
	city varchar(50) NOT NULL,
	state varchar(2) NOT NULL,
	email varchar(50) NOT NULL,
	phone varchar(11),

	CONSTRAINT PK_user_contact PRIMARY KEY (id),
	CONSTRAINT FK_user_contact_users FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO user_contact (user_id, city, state, email, phone) VALUES (1, 'Hershey', 'PA', 'tylervicari@yahoo.com', '7245455529');
INSERT INTO user_contact (user_id, city, state, email, phone) VALUES (2, 'Harrisburg', 'PA', 'tylervicari@gmail.com', '7245455529');


CREATE TABLE user_info (
	id serial NOT NULL,
	user_id int UNIQUE NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	join_date date NOT NULL,
	termination_date date, 
	mission_statement varchar(250) NOT NULL,

	CONSTRAINT PK_user_info PRIMARY KEY (id),
	CONSTRAINT FK_user_info_users FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO user_info (user_id, first_name, last_name, join_date, mission_statement) 
VALUES (1, 'Denali', 'Davis', '2021-11-19', 'this is a placeholder paragraph for the personal mission statememnt');
INSERT INTO user_info (user_id, first_name, last_name, join_date, mission_statement) 
VALUES (2, 'Tyler', 'Vicari', '2021-11-20', 'this is a placeholder paragraph for the personal mission statememnt');

CREATE TABLE custom_visibility (
	id int UNIQUE NOT NULL,
	community boolean NOT NULL,
	circle boolean NOT NULL,
	partner boolean NOT NULL
);

INSERT INTO custom_visibility (id, community, circle, partner) 
VALUES (1, true, false, false);
INSERT INTO custom_visibility (id, community, circle, partner) 
VALUES (2, false, true, false);
INSERT INTO custom_visibility (id, community, circle, partner) 
VALUES (3, false, false, true);
INSERT INTO custom_visibility (id, community, circle, partner) 
VALUES (4, false, false, false);

CREATE TABLE goals (
	goal_id serial NOT NULL,
	user_id int NOT NULL,
	summary varchar(25) NOT NULL,
	description varchar(800) NOT NULL, 
	goal int NOT NULL,
	movement varchar(25) NOT NULL,
	units varchar(25) NOT NULL,
	start_date date NOT NULL, 
	end_date date NOT NULL,
	active boolean NOT NULL,
	early_termination boolean NOT NULL,
	favorite boolean DEFAULT false NOT NULL,
	visibility int DEFAULT 0 NOT NULL,

	CONSTRAINT PK_goals PRIMARY KEY (goal_id),
	CONSTRAINT FK_goals_users FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO goals (user_id, summary, description, goal, movement, units, start_date, end_date, active) VALUES 
(2, 'my weight', 'how much do I weigh each day when I wake up? I want to lose weight', 200, 'average down', 'pounds', '2021-11-01', '2021-12-01', false, true);
INSERT INTO goals (user_id, summary, description, goal, movement, units, start_date, end_date, active) VALUES 
(2, 'money', 'cash is king, I need to stack this paper', 20000, 'total up', 'dollars', '2021-10-01', '2021-12-21', false, true);
INSERT INTO goals (user_id, summary, description, goal, movement, units, start_date, end_date, active) VALUES
(2, 'student debt', 'I want to pay off all of this student debt', 0, 'total down', 'dollars', '2021-03-01', '2021-04-20', false, false);
INSERT INTO goals (user_id, summary, description, goal, movement, units, start_date, end_date, active) VALUES 
(2, 'Wake up time', 'the early bird gets the worm right?', 0545, 'average down', 'time', '2021-11-01', '2021-12-19', false, true);

CREATE TABLE default_goal_visibility (
	id serial NOT NULL,
	user_id int UNIQUE NOT NULL,
	community boolean DEFAULT false NOT NULL, 
	circle boolean DEFAULT true NOT NULL,
	partner boolean DEFAULT false NOT NULL
);

INSERT INTO default_goal_visibility (user_id) VALUES (1);
INSERT INTO default_goal_visibility (user_id) VALUES (2);

CREATE TABLE goal_scores (
	score_id serial NOT NULL,
	goal_id int NOT NULL,
	date date NOT NULL,
	score int NOT NULL,
	notes varchar(200),

	CONSTRAINT PK_goal_scores PRIMARY KEY (score_id),
	CONSTRAINT FK_goal_scores_goal FOREIGN KEY (goal_id) REFERENCES goals (goal_id)
);

INSERT INTO goal_scores (goal_id, date, score, notes) VALUES (1, '2021-11-02', 210, 'these are the notes');
INSERT INTO goal_scores (goal_id, date, score, notes) VALUES (2, '2021-10-12', 150, 'theses are the notes');
INSERT INTO goal_scores (goal_id, date, score, notes) VALUES (2, '2021-10-19', 350, 'these are also notes baby');
INSERT INTO goal_scores (goal_id, date, score) VALUES (2, '2021-10-20', 75);
INSERT INTO goal_scores (goal_id, date, score, notes) VALUES (3, '2021-03-23', 50, 'more notes on the scores yeahhhh');
INSERT INTO goal_scores (goal_id, date, score) VALUES (3, '2021-04-07', 1050);
INSERT INTO goal_scores (goal_id, date, score) VALUES (4, '2021-11-11', 0630);

CREATE TABLE goal_total_score (
	total_id serial NOT NULL,
	goal_id int UNIQUE NOT NULL, 
	score_count int NOT NULL, 
	score int NOT NULL,

	CONSTRAINT PK_goal_total_score PRIMARY KEY (total_id),
	CONSTRAINT FK_goal_total_score_goal FOREIGN KEY (goal_id) REFERENCES goals (goal_id)
);

INSERT INTO goal_total_score (goal_id, score_count, score) VALUES (1, 1, 210);
INSERT INTO goal_total_score (goal_id, score_count, score) VALUES (2, 3, 575);
INSERT INTO goal_total_score (goal_id, score_count, score) VALUES (3, 2, 1100);
INSERT INTO goal_total_score (goal_id, score_count, score) VALUES (4, 1, 630);

CREATE TABLE shared_goals (
	shared_goal_id serial NOT NULL,
	goal_id int NOT NULL,
	user_id int NOT NULL,
	active boolean NOT NULL,

	CONSTRAINT PK_shared_goals PRIMARY KEY (shared_goal_id),
	CONSTRAINT FK_shared_goals_goal FOREIGN KEY (goal_id) REFERENCES goals (goal_id),
	CONSTRAINT FK_shared_goals_user FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE journal_entries (
	entry_id serial NOT NULL,
	user_id int NOT NULL,
	date date NOT NULL,
	time time NOT NULL,
	mood int NOT NULL, 
	energy int NOT NULL, 
	text varchar(500) NOT NULL,
	visibility int DEFAULT 0 NOT NULL,

	CONSTRAINT PK_journal_entries PRIMARY KEY (entry_id),
	CONSTRAINT FR_journal_entries_user FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE default_journal_visibility (
	id serial NOT NULL,
	user_id int UNIQUE NOT NULL,
	community boolean DEFAULT false NOT NULL, 
	circle boolean DEFAULT false NOT NULL,
	partner boolean DEFAULT true NOT NULL
);

INSERT INTO default_journal_visibility (user_id) VALUES (1);
INSERT INTO default_journal_visibility (user_id) VALUES (2);

CREATE TABLE shared_journals (
	shared_journal_id serial NOT NULL,
	entry_id int NOT NULL,
	user_id int NOT NULL,
	active boolean NOT NULL,

	CONSTRAINT PK_shared_journals PRIMARY KEY (shared_journal_id),
	CONSTRAINT FK_shared_journals_journal FOREIGN KEY (entry_id) REFERENCES journal_entries (entry_id),
	CONSTRAINT FK_shared_journals_user FOREIGN KEY (user_id) REFERENCES users (user_id)
);

COMMIT TRANSACTION;
