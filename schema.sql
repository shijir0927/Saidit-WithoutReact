DROP DATABASE IF EXISTS saidit;
CREATE DATABASE saidit;

USE saidit;

CREATE TABLE questions_data(
  id Int( 11 ) AUTO_INCREMENT NOT NULL,
  namee VARCHAR( 255) NOT NULL,
  topic VARCHAR( 255 ) NOT NULL,
  question VARCHAR( 255 ) NOT NULL,
  created_at DATETIME NOT NULL,
   likee INT NULL,
  dislikee INT NULL,
  PRIMARY KEY ( id )
);

SELECT * FROM questions_data;

