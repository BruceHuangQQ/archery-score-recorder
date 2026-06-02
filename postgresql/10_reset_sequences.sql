-- Reset all sequences after seeding
SELECT setval(pg_get_serial_sequence('"Championship"', 'Champ_ID'), (SELECT MAX("Champ_ID") FROM "Championship"));
SELECT setval(pg_get_serial_sequence('"Competition"', 'Comp_ID'), (SELECT MAX("Comp_ID") FROM "Competition"));
SELECT setval(pg_get_serial_sequence('"Archer"', 'Archer_ID'), (SELECT MAX("Archer_ID") FROM "Archer"));
SELECT setval(pg_get_serial_sequence('"Round_Definition"', 'Round_ID'), (SELECT MAX("Round_ID") FROM "Round_Definition"));
SELECT setval(pg_get_serial_sequence('"Range_Definition"', 'Range_ID'), (SELECT MAX("Range_ID") FROM "Range_Definition"));
SELECT setval(pg_get_serial_sequence('"Face_Definition"', 'Face_ID'), (SELECT MAX("Face_ID") FROM "Face_Definition"));
SELECT setval(pg_get_serial_sequence('"Equipment_Definition"', 'Equipment_ID'), (SELECT MAX("Equipment_ID") FROM "Equipment_Definition"));
SELECT setval(pg_get_serial_sequence('"Class_Definition"', 'Class_ID'), (SELECT MAX("Class_ID") FROM "Class_Definition"));
SELECT setval(pg_get_serial_sequence('"Score"', 'Score_ID'), (SELECT MAX("Score_ID") FROM "Score"));
SELECT setval(pg_get_serial_sequence('"End_Result"', 'End_ID'), (SELECT MAX("End_ID") FROM "End_Result"));
SELECT setval(pg_get_serial_sequence('"Arrow"', 'Arrow_ID'), (SELECT MAX("Arrow_ID") FROM "Arrow"));
SELECT setval(pg_get_serial_sequence('"Round_Equivalent"', 'Equivalent_ID'), (SELECT MAX("Equivalent_ID") FROM "Round_Equivalent"));
