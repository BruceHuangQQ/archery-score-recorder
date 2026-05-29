-- First, create tables that have no foreign dependencies
CREATE TABLE `Championship` (
  `Champ_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Champ_Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Champ_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Class_Definition` (
  `Class_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Class_Name` varchar(100) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Age_From` int(11) DEFAULT NULL,
  `Age_To` int(11) DEFAULT NULL,
  PRIMARY KEY (`Class_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Equipment_Definition` (
  `Equipment_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Equipment_Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Equipment_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Face_Definition` (
  `Face_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Size_cm` int(11) DEFAULT NULL,
  PRIMARY KEY (`Face_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Round_Definition` (
  `Round_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Round_Name` varchar(100) DEFAULT NULL,
  `Max_Score` int(11) DEFAULT NULL,
  PRIMARY KEY (`Round_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Then create tables that reference the above tables
CREATE TABLE `Archer` (
  `Archer_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Age_DOB` date DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Def_Equipment_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Archer_ID`),
  KEY `Def_Equipment_ID` (`Def_Equipment_ID`),
  CONSTRAINT `Archer_ibfk_1` FOREIGN KEY (`Def_Equipment_ID`) REFERENCES `Equipment_Definition` (`Equipment_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Competition` (
  `Comp_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Comp_Date` date DEFAULT NULL,
  `Comp_Name` varchar(255) DEFAULT NULL,
  `Champ_ID` int(11) DEFAULT NULL,
  `Round_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Comp_ID`),
  KEY `Champ_ID` (`Champ_ID`),
  KEY `Round_ID` (`Round_ID`),
  CONSTRAINT `Competition_ibfk_1` FOREIGN KEY (`Champ_ID`) REFERENCES `Championship` (`Champ_ID`),
  CONSTRAINT `Competition_ibfk_2` FOREIGN KEY (`Round_ID`) REFERENCES `Round_Definition` (`Round_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Range_Definition` (
  `Range_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Round_ID` int(11) DEFAULT NULL,
  `Distance` int(11) DEFAULT NULL,
  `Face_ID` int(11) DEFAULT NULL,
  `End_Count` int(11) DEFAULT NULL,
  `Sequence` int(11) DEFAULT NULL,
  PRIMARY KEY (`Range_ID`),
  KEY `Round_ID` (`Round_ID`),
  KEY `Face_ID` (`Face_ID`),
  CONSTRAINT `Range_Definition_ibfk_1` FOREIGN KEY (`Round_ID`) REFERENCES `Round_Definition` (`Round_ID`),
  CONSTRAINT `Range_Definition_ibfk_2` FOREIGN KEY (`Face_ID`) REFERENCES `Face_Definition` (`Face_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Score` (
  `Score_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Archer_ID` int(11) DEFAULT NULL,
  `Range_ID` int(11) DEFAULT NULL,
  `Comp_ID` int(11) DEFAULT NULL,
  `Equipment_ID` int(11) DEFAULT NULL,
  `Score_Date` date DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Score_ID`),
  KEY `Archer_ID` (`Archer_ID`),
  KEY `Range_ID` (`Range_ID`),
  KEY `Comp_ID` (`Comp_ID`),
  KEY `Equipment_ID` (`Equipment_ID`),
  CONSTRAINT `Score_ibfk_1` FOREIGN KEY (`Archer_ID`) REFERENCES `Archer` (`Archer_ID`),
  CONSTRAINT `Score_ibfk_2` FOREIGN KEY (`Range_ID`) REFERENCES `Range_Definition` (`Range_ID`),
  CONSTRAINT `Score_ibfk_3` FOREIGN KEY (`Comp_ID`) REFERENCES `Competition` (`Comp_ID`),
  CONSTRAINT `Score_ibfk_4` FOREIGN KEY (`Equipment_ID`) REFERENCES `Equipment_Definition` (`Equipment_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `End_Result` (
  `End_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Score_ID` int(11) DEFAULT NULL,
  `Sequence` int(11) DEFAULT NULL,
  PRIMARY KEY (`End_ID`),
  KEY `Score_ID` (`Score_ID`),
  CONSTRAINT `End_Result_ibfk_1` FOREIGN KEY (`Score_ID`) REFERENCES `Score` (`Score_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Arrow` (
  `Arrow_ID` int(11) NOT NULL AUTO_INCREMENT,
  `End_ID` int(11) DEFAULT NULL,
  `Arrow_Score` int(11) DEFAULT NULL,
  PRIMARY KEY (`Arrow_ID`),
  KEY `End_ID` (`End_ID`),
  CONSTRAINT `Arrow_ibfk_1` FOREIGN KEY (`End_ID`) REFERENCES `End_Result` (`End_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Round_Equivalent` (
  `Equivalent_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Base_Round_ID` int(11) DEFAULT NULL,
  `Equiv_Round_ID` int(11) DEFAULT NULL,
  `Class_ID` int(11) DEFAULT NULL,
  `Equipment_ID` int(11) DEFAULT NULL,
  `Valid_From` date DEFAULT NULL,
  `Valid_To` date DEFAULT NULL,
  PRIMARY KEY (`Equivalent_ID`),
  KEY `Base_Round_ID` (`Base_Round_ID`),
  KEY `Equiv_Round_ID` (`Equiv_Round_ID`),
  KEY `Class_ID` (`Class_ID`),
  KEY `Equipment_ID` (`Equipment_ID`),
  CONSTRAINT `Round_Equivalent_ibfk_1` FOREIGN KEY (`Base_Round_ID`) REFERENCES `Round_Definition` (`Round_ID`),
  CONSTRAINT `Round_Equivalent_ibfk_2` FOREIGN KEY (`Equiv_Round_ID`) REFERENCES `Round_Definition` (`Round_ID`),
  CONSTRAINT `Round_Equivalent_ibfk_3` FOREIGN KEY (`Class_ID`) REFERENCES `Class_Definition` (`Class_ID`),
  CONSTRAINT `Round_Equivalent_ibfk_4` FOREIGN KEY (`Equipment_ID`) REFERENCES `Equipment_Definition` (`Equipment_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

COMMIT;