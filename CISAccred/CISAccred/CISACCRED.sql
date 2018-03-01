DROP TABLE CIS_CLASS 				CASCADE CONSTRAINTS;
DROP TABLE CIS_RUBRIC 				CASCADE CONSTRAINTS;
DROP TABLE CIS_TASK 				CASCADE CONSTRAINTS;
DROP TABLE CIS_SESSION				CASCADE CONSTRAINTS;
DROP TABLE CIS_PROFESSOR			CASCADE CONSTRAINTS;
DROP TABLE CIS_SURVEY 				CASCADE CONSTRAINTS;
DROP TABLE CIS_OBJECTIVE 			CASCADE CONSTRAINTS;
DROP TABLE CIS_SURVEY_OBJECTIVE 	CASCADE CONSTRAINTS;
DROP TABLE CIS_OUTCOME 				CASCADE CONSTRAINTS;
DROP TABLE CIS_OUTCOME_OBJ_MAP 		CASCADE CONSTRAINTS;
DROP TABLE CIS_SCORESET				CASCADE CONSTRAINTS;
DROP TABLE CIS_CRITERIA 			CASCADE CONSTRAINTS;
DROP TABLE CIS_OUTCOME_CRITERIA_MAP CASCADE CONSTRAINTS;
DROP TABLE CIS_SCORESET_CRITERIA 	CASCADE CONSTRAINTS;
CREATE TABLE CIS_CLASS
(
	C_SEMESTER VARCHAR2 (20),
	C_COURSE_NUM NUMBER (5) ,
	C_SECTION NUMBER (5) , 
	CONSTRAINT CLASS_PRIMARY_KEY PRIMARY KEY (C_COURSE_NUM, C_SEMESTER,C_SECTION)
);
CREATE TABLE CIS_RUBRIC
(
	R_ID NUMBER (5),
	R_NAME VARCHAR2(255),
	R_ASSESSMENT_METH VARCHAR2(4000),
	CONSTRAINT RUBRIC_PRIMARY_KEY PRIMARY KEY (R_ID)
);
CREATE TABLE CIS_TASK
(
	R_ID NUMBER (5),
	C_SEMESTER VARCHAR2 (20),
	C_COURSE_NUM NUMBER (5) ,
	C_SECTION NUMBER (5) , 
	CONSTRAINT TASK_PRIMARY_KEY PRIMARY KEY (R_ID, C_COURSE_NUM),
	CONSTRAINT TASK_R_ID_FOREIGN_KEY FOREIGN KEY (R_ID) REFERENCES CIS_RUBRIC(R_ID),
	CONSTRAINT TASK_COURSE_FOREIGN_KEY FOREIGN KEY (C_COURSE_NUM, C_SEMESTER,C_SECTION) REFERENCES CIS_CLASS(C_COURSE_NUM, C_SEMESTER,C_SECTION)	
);
CREATE TABLE CIS_PROFESSOR
(
	P_ID NUMBER (5),
	P_NAEM VARCHAR2 (45),
	P_USERNAME VARCHAR2 (45),
	P_PASSWORD VARCHAR2 (45),
	CONSTRAINT P_ID_PRIMARY_KEY PRIMARY KEY (P_ID)	
);
CREATE TABLE CIS_SESSION
(
	P_ID NUMBER (5),
	S_SESSION_KEY VARCHAR2(45),
	S_DATE DATE,
	CONSTRAINT S_ID_SESSION_KEY PRIMARY KEY (P_ID,S_SESSION_KEY)
);
CREATE TABLE CIS_SURVEY
(
	S_ID NUMBER(5),
	P_ID NUMBER (5),
	S_NAME VARCHAR2(250),
	CONSTRAINT S_ID_PRIMARY_KEY PRIMARY KEY (S_ID),
	CONSTRAINT P_ID_FOREIGN_KEY FOREIGN KEY (P_ID) REFERENCES CIS_PROFESSOR (P_ID)
);
CREATE TABLE CIS_OBJECTIVE
(
	OBJ_ID VARCHAR2(10),
	OBJ_NAME VARCHAR2(255),
	OBJ_DESC VARCHAR2(4000),
	OBJ_BENCH NUMBER(4,3),
	CONSTRAINT OBJECTIVE_PRIMARY_KEY PRIMARY KEY (OBJ_ID)	
);
CREATE TABLE CIS_SURVEY_OBJECTIVE
(
	S_ID NUMBER (5),
	OBJ_ID VARCHAR2 (10),
	SUR_OBJ_SCORE NUMBER (5),
	CONSTRAINT SURVEY_OBJECTIVE_PRIMARY_KEYS PRIMARY KEY (S_ID, OBJ_ID),
	CONSTRAINT S_ID_FOREIGN_KEY FOREIGN KEY (S_ID) REFERENCES CIS_SURVEY(S_ID),
	CONSTRAINT OBJ_ID_FOREIGN_KEY FOREIGN KEY (OBJ_ID) REFERENCES CIS_OBJECTIVE (OBJ_ID)
);
CREATE TABLE CIS_OUTCOME
(
	OUT_ID NUMBER (5),
	OUT_NAME VARCHAR2 (50),
	OUT_DESC VARCHAR2 (4000),
	OUT_BENCHMARK NUMBER (4,3),
	CONSTRAINT OUT_ID_PRIMARY_KEY PRIMARY KEY (OUT_ID)
);
CREATE TABLE CIS_OUTCOME_OBJ_MAP
(
	OUT_ID NUMBER (5),
	OBJ_ID VARCHAR2 (10),
	CONSTRAINT OUTCOME_OBJECTIVE_PRIMARY_KEYS PRIMARY KEY (OUT_ID, OBJ_ID),
	CONSTRAINT OBJECT_ID_FOREIGN_KEY FOREIGN KEY (OBJ_ID) REFERENCES CIS_OBJECTIVE (OBJ_ID),
	CONSTRAINT OUT_ID_FOREIGN_KEY FOREIGN KEY (OUT_ID) REFERENCES CIS_OUTCOME (OUT_ID)
);
CREATE TABLE CIS_SCORESET
(
	SCORE_ID NUMBER(5),
	STUDENT_FNAME VARCHAR2 (255) NOT NULL,
	STUDENT_LNAME VARCHAR2 (255) NOT NULL,
	R_ID NUMBER (5),
	P_ID NUMBER (5),
	C_SEMESTER VARCHAR2 (20),
	C_COURSE_NUM NUMBER (5) ,
	C_SECTION NUMBER (5) , 
	CONSTRAINT SCORE_ID_PRIMARY_KEY PRIMARY KEY (SCORE_ID),
	CONSTRAINT R_ID_FOREIGN_KEY FOREIGN KEY (R_ID) REFERENCES CIS_RUBRIC (R_ID),
	CONSTRAINT CLASS_FOREIGN_KEY FOREIGN KEY (C_COURSE_NUM, C_SEMESTER,C_SECTION) REFERENCES CIS_CLASS (C_COURSE_NUM, C_SEMESTER,C_SECTION),
	CONSTRAINT PROF_ID_FOREIGN_KEY FOREIGN KEY (P_ID) REFERENCES CIS_PROFESSOR (P_ID)
);
CREATE TABLE CIS_CRITERIA
(
	CRITERIA_LINE VARCHAR2 (4000),
	R_ID NUMBER (5),
	CRIT_TASK_NAME VARCHAR2 (255),
	CRIT_TASK_DESC VARCHAR2 (4000),
	CONSTRAINT CIS_CRITERIA_PRIMARY_KEY PRIMARY KEY (CRITERIA_LINE, R_ID),
	CONSTRAINT CRIT_R_ID_FOREIGN_KEY FOREIGN KEY (R_ID) REFERENCES CIS_RUBRIC (R_ID)
);
CREATE TABLE CIS_OUTCOME_CRITERIA_MAP
(
	CRITERIA_LINE VARCHAR2(4000),
	R_ID NUMBER(5),
	OUT_ID NUMBER(5),
	CONSTRAINT CIS_OUT_CRIT_PRIMARY_KEY PRIMARY KEY (CRITERIA_LINE, R_ID, OUT_ID),
	CONSTRAINT R_OUT_CRI_FOREIGN_KEY FOREIGN KEY (R_ID) REFERENCES CIS_RUBRIC (R_ID),
	CONSTRAINT OUT_ID_CRI_FOREIGN_KEY FOREIGN KEY (OUT_ID) REFERENCES CIS_OUTCOME (OUT_ID),
	CONSTRAINT CRIT_LINE_CRI_FOREIGN_KEY FOREIGN KEY (CRITERIA_LINE,R_ID) REFERENCES CIS_CRITERIA (CRITERIA_LINE,R_ID)
);
CREATE TABLE CIS_SCORESET_CRITERIA
(
	SCORE_ID NUMBER(5),
	R_ID NUMBER(5),
	CRITERIA_LINE VARCHAR2(4000),
	SCORESET_SCORE NUMBER(5,3),
	CONSTRAINT CIS_SCORESET_CRI_PRIM_KEY PRIMARY KEY (SCORE_ID, CRITERIA_LINE),
	CONSTRAINT CRIT_LINE_FOR_KEY FOREIGN KEY (CRITERIA_LINE, R_ID) REFERENCES CIS_CRITERIA (CRITERIA_LINE, R_ID),
	CONSTRAINT SCORE_ID_FOR_KEY FOREIGN KEY (SCORE_ID) REFERENCES CIS_SCORESET (SCORE_ID)
);
