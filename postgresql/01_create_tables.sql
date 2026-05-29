-- First, create tables that have no foreign dependencies
CREATE TABLE "Championship" (
  "Champ_ID" SERIAL PRIMARY KEY,
  "Champ_Name" VARCHAR(255) DEFAULT NULL
);

CREATE TABLE "Class_Definition" (
  "Class_ID" SERIAL PRIMARY KEY,
  "Class_Name" VARCHAR(100) DEFAULT NULL,
  "Gender" VARCHAR(10) DEFAULT NULL,
  "Age_From" INTEGER DEFAULT NULL,
  "Age_To" INTEGER DEFAULT NULL
);

CREATE TABLE "Equipment_Definition" (
  "Equipment_ID" SERIAL PRIMARY KEY,
  "Equipment_Name" VARCHAR(100) DEFAULT NULL
);

CREATE TABLE "Face_Definition" (
  "Face_ID" SERIAL PRIMARY KEY,
  "Size_cm" INTEGER DEFAULT NULL
);

CREATE TABLE "Round_Definition" (
  "Round_ID" SERIAL PRIMARY KEY,
  "Round_Name" VARCHAR(100) DEFAULT NULL,
  "Max_Score" INTEGER DEFAULT NULL
);

-- Then create tables that reference the above tables
CREATE TABLE "Archer" (
  "Archer_ID" SERIAL PRIMARY KEY,
  "Name" VARCHAR(255) DEFAULT NULL,
  "Age_DOB" DATE DEFAULT NULL,
  "Gender" VARCHAR(10) DEFAULT NULL,
  "Def_Equipment_ID" INTEGER DEFAULT NULL,
  CONSTRAINT "Archer_ibfk_1" FOREIGN KEY ("Def_Equipment_ID") REFERENCES "Equipment_Definition" ("Equipment_ID")
);

CREATE TABLE "Competition" (
  "Comp_ID" SERIAL PRIMARY KEY,
  "Comp_Date" DATE DEFAULT NULL,
  "Comp_Name" VARCHAR(255) DEFAULT NULL,
  "Champ_ID" INTEGER DEFAULT NULL,
  "Round_ID" INTEGER DEFAULT NULL,
  CONSTRAINT "Competition_ibfk_1" FOREIGN KEY ("Champ_ID") REFERENCES "Championship" ("Champ_ID"),
  CONSTRAINT "Competition_ibfk_2" FOREIGN KEY ("Round_ID") REFERENCES "Round_Definition" ("Round_ID")
);

CREATE TABLE "Range_Definition" (
  "Range_ID" SERIAL PRIMARY KEY,
  "Round_ID" INTEGER DEFAULT NULL,
  "Distance" INTEGER DEFAULT NULL,
  "Face_ID" INTEGER DEFAULT NULL,
  "End_Count" INTEGER DEFAULT NULL,
  "Sequence" INTEGER DEFAULT NULL,
  CONSTRAINT "Range_Definition_ibfk_1" FOREIGN KEY ("Round_ID") REFERENCES "Round_Definition" ("Round_ID"),
  CONSTRAINT "Range_Definition_ibfk_2" FOREIGN KEY ("Face_ID") REFERENCES "Face_Definition" ("Face_ID")
);

CREATE TABLE "Score" (
  "Score_ID" SERIAL PRIMARY KEY,
  "Archer_ID" INTEGER DEFAULT NULL,
  "Range_ID" INTEGER DEFAULT NULL,
  "Comp_ID" INTEGER DEFAULT NULL,
  "Equipment_ID" INTEGER DEFAULT NULL,
  "Score_Date" DATE DEFAULT NULL,
  "Status" VARCHAR(50) DEFAULT NULL,
  CONSTRAINT "Score_ibfk_1" FOREIGN KEY ("Archer_ID") REFERENCES "Archer" ("Archer_ID"),
  CONSTRAINT "Score_ibfk_2" FOREIGN KEY ("Range_ID") REFERENCES "Range_Definition" ("Range_ID"),
  CONSTRAINT "Score_ibfk_3" FOREIGN KEY ("Comp_ID") REFERENCES "Competition" ("Comp_ID"),
  CONSTRAINT "Score_ibfk_4" FOREIGN KEY ("Equipment_ID") REFERENCES "Equipment_Definition" ("Equipment_ID")
);

CREATE TABLE "End_Result" (
  "End_ID" SERIAL PRIMARY KEY,
  "Score_ID" INTEGER DEFAULT NULL,
  "Sequence" INTEGER DEFAULT NULL,
  CONSTRAINT "End_Result_ibfk_1" FOREIGN KEY ("Score_ID") REFERENCES "Score" ("Score_ID")
);

CREATE TABLE "Arrow" (
  "Arrow_ID" SERIAL PRIMARY KEY,
  "End_ID" INTEGER DEFAULT NULL,
  "Arrow_Score" INTEGER DEFAULT NULL,
  CONSTRAINT "Arrow_ibfk_1" FOREIGN KEY ("End_ID") REFERENCES "End_Result" ("End_ID")
);

CREATE TABLE "Round_Equivalent" (
  "Equivalent_ID" SERIAL PRIMARY KEY,
  "Base_Round_ID" INTEGER DEFAULT NULL,
  "Equiv_Round_ID" INTEGER DEFAULT NULL,
  "Class_ID" INTEGER DEFAULT NULL,
  "Equipment_ID" INTEGER DEFAULT NULL,
  "Valid_From" DATE DEFAULT NULL,
  "Valid_To" DATE DEFAULT NULL,
  CONSTRAINT "Round_Equivalent_ibfk_1" FOREIGN KEY ("Base_Round_ID") REFERENCES "Round_Definition" ("Round_ID"),
  CONSTRAINT "Round_Equivalent_ibfk_2" FOREIGN KEY ("Equiv_Round_ID") REFERENCES "Round_Definition" ("Round_ID"),
  CONSTRAINT "Round_Equivalent_ibfk_3" FOREIGN KEY ("Class_ID") REFERENCES "Class_Definition" ("Class_ID"),
  CONSTRAINT "Round_Equivalent_ibfk_4" FOREIGN KEY ("Equipment_ID") REFERENCES "Equipment_Definition" ("Equipment_ID")
);

COMMIT;