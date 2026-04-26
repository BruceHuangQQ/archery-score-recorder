-- Tables (no dependencies, safe to insert in any order):
--   - Equipment_Definition
--   - Face_Definition
--   - Round_Definition
--   - Class_Definition
-- =====================================================

-- ------------------------------------------------------
-- Equipment_Definition
-- ------------------------------------------------------
INSERT INTO `Equipment_Definition` (`Equipment_ID`, `Equipment_Name`) VALUES
(1, 'Recurve'),
(2, 'Compound'),
(3, 'Barebow'),
(4, 'Longbow');

-- ------------------------------------------------------
-- Face_Definition
-- ------------------------------------------------------
INSERT INTO `Face_Definition` (`Face_ID`, `Size_cm`) VALUES
(1, 40),
(2, 60),
(3, 80),
(4, 122),
(5, 20);

-- ------------------------------------------------------
-- Round_Definition
-- ------------------------------------------------------
INSERT INTO `Round_Definition` (`Round_ID`, `Round_Name`, `Max_Score`) VALUES
(1, 'WA 70m', 720),
(2, 'WA 50m', 720),
(3, 'WA 30m', 720),
(4, 'Indoor 18m', 600),
(5, 'Short Metric', 720),
(6, 'Long Metric', 720);

-- ------------------------------------------------------
-- Class_Definition
-- ------------------------------------------------------
INSERT INTO `Class_Definition` (`Class_ID`, `Class_Name`, `Gender`, `Age_From`, `Age_To`) VALUES
(1, 'Junior Men', 'Male', 12, 17),
(2, 'Junior Women', 'Female', 12, 17),
(3, 'Senior Men', 'Male', 18, 49),
(4, 'Senior Women', 'Female', 18, 49),
(5, 'Master Men', 'Male', 50, 120),
(6, 'Master Women', 'Female', 50, 120),
(7, 'Open Men', 'Male', 18, 120),
(8, 'Open Women', 'Female', 18, 120);

-- ------------------------------------------------------
-- Championship
-- ------------------------------------------------------
INSERT INTO `Championship` (`Champ_ID`, `Champ_Name`) VALUES
(1, 'Championship 001'),
(2, 'Championship 002'),
(3, 'Championship 003'),
(4, 'Championship 004'),
(5, 'Championship 005'),
(6, 'Championship 006'),
(7, 'Championship 007'),
(8, 'Championship 008'),
(9, 'Championship 009'),
(10, 'Championship 010'),
(11, 'Championship 011'),
(12, 'Championship 012'),
(13, 'Championship 013'),
(14, 'Championship 014'),
(15, 'Championship 015'),
(16, 'Championship 016'),
(17, 'Championship 017'),
(18, 'Championship 018'),
(19, 'Championship 019'),
(20, 'Championship 020');