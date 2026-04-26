--
-- Table structure for table `Archer`
--

CREATE TABLE `Archer` (
  `Archer_ID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Age_DOB` date DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Def_Equipment_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Arrow`
--

CREATE TABLE `Arrow` (
  `Arrow_ID` int(11) NOT NULL,
  `End_ID` int(11) DEFAULT NULL,
  `Arrow_Score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Championship`
--

CREATE TABLE `Championship` (
  `Champ_ID` int(11) NOT NULL,
  `Champ_Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Class_Definition`
--

CREATE TABLE `Class_Definition` (
  `Class_ID` int(11) NOT NULL,
  `Class_Name` varchar(100) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Age_From` int(11) DEFAULT NULL,
  `Age_To` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Competition`
--

CREATE TABLE `Competition` (
  `Comp_ID` int(11) NOT NULL,
  `Comp_Date` date DEFAULT NULL,
  `Comp_Name` varchar(255) DEFAULT NULL,
  `Champ_ID` int(11) DEFAULT NULL,
  `Round_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `End_Result`
--

CREATE TABLE `End_Result` (
  `End_ID` int(11) NOT NULL,
  `Score_ID` int(11) DEFAULT NULL,
  `Sequence` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Equipment_Definition`
--

CREATE TABLE `Equipment_Definition` (
  `Equipment_ID` int(11) NOT NULL,
  `Equipment_Name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Face_Definition`
--

CREATE TABLE `Face_Definition` (
  `Face_ID` int(11) NOT NULL,
  `Size_cm` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Range_Definition`
--

CREATE TABLE `Range_Definition` (
  `Range_ID` int(11) NOT NULL,
  `Round_ID` int(11) DEFAULT NULL,
  `Distance` int(11) DEFAULT NULL,
  `Face_ID` int(11) DEFAULT NULL,
  `End_Count` int(11) DEFAULT NULL,
  `Sequence` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Round_Definition`
--

CREATE TABLE `Round_Definition` (
  `Round_ID` int(11) NOT NULL,
  `Round_Name` varchar(100) DEFAULT NULL,
  `Max_Score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Round_Equivalent`
--

CREATE TABLE `Round_Equivalent` (
  `Equivalent_ID` int(11) NOT NULL,
  `Base_Round_ID` int(11) DEFAULT NULL,
  `Equiv_Round_ID` int(11) DEFAULT NULL,
  `Class_ID` int(11) DEFAULT NULL,
  `Equipment_ID` int(11) DEFAULT NULL,
  `Valid_From` date DEFAULT NULL,
  `Valid_To` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Score`
--

CREATE TABLE `Score` (
  `Score_ID` int(11) NOT NULL,
  `Archer_ID` int(11) DEFAULT NULL,
  `Range_ID` int(11) DEFAULT NULL,
  `Comp_ID` int(11) DEFAULT NULL,
  `Equipment_ID` int(11) DEFAULT NULL,
  `Score_Date` date DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Archer`
--
ALTER TABLE `Archer`
  ADD PRIMARY KEY (`Archer_ID`),
  ADD KEY `Def_Equipment_ID` (`Def_Equipment_ID`);

--
-- Indexes for table `Arrow`
--
ALTER TABLE `Arrow`
  ADD PRIMARY KEY (`Arrow_ID`),
  ADD KEY `End_ID` (`End_ID`);

--
-- Indexes for table `Championship`
--
ALTER TABLE `Championship`
  ADD PRIMARY KEY (`Champ_ID`);

--
-- Indexes for table `Class_Definition`
--
ALTER TABLE `Class_Definition`
  ADD PRIMARY KEY (`Class_ID`);

--
-- Indexes for table `Competition`
--
ALTER TABLE `Competition`
  ADD PRIMARY KEY (`Comp_ID`),
  ADD KEY `Champ_ID` (`Champ_ID`),
  ADD KEY `Round_ID` (`Round_ID`);

--
-- Indexes for table `End_Result`
--
ALTER TABLE `End_Result`
  ADD PRIMARY KEY (`End_ID`),
  ADD KEY `Score_ID` (`Score_ID`);

--
-- Indexes for table `Equipment_Definition`
--
ALTER TABLE `Equipment_Definition`
  ADD PRIMARY KEY (`Equipment_ID`);

--
-- Indexes for table `Face_Definition`
--
ALTER TABLE `Face_Definition`
  ADD PRIMARY KEY (`Face_ID`);

--
-- Indexes for table `Range_Definition`
--
ALTER TABLE `Range_Definition`
  ADD PRIMARY KEY (`Range_ID`),
  ADD KEY `Round_ID` (`Round_ID`),
  ADD KEY `Face_ID` (`Face_ID`);

--
-- Indexes for table `Round_Definition`
--
ALTER TABLE `Round_Definition`
  ADD PRIMARY KEY (`Round_ID`);

--
-- Indexes for table `Round_Equivalent`
--
ALTER TABLE `Round_Equivalent`
  ADD PRIMARY KEY (`Equivalent_ID`),
  ADD KEY `Base_Round_ID` (`Base_Round_ID`),
  ADD KEY `Equiv_Round_ID` (`Equiv_Round_ID`),
  ADD KEY `Class_ID` (`Class_ID`),
  ADD KEY `Equipment_ID` (`Equipment_ID`);

--
-- Indexes for table `Score`
--
ALTER TABLE `Score`
  ADD PRIMARY KEY (`Score_ID`),
  ADD KEY `Archer_ID` (`Archer_ID`),
  ADD KEY `Range_ID` (`Range_ID`),
  ADD KEY `Comp_ID` (`Comp_ID`),
  ADD KEY `Equipment_ID` (`Equipment_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Archer`
--
ALTER TABLE `Archer`
  ADD CONSTRAINT `Archer_ibfk_1` FOREIGN KEY (`Def_Equipment_ID`) REFERENCES `Equipment_Definition` (`Equipment_ID`);

--
-- Constraints for table `Arrow`
--
ALTER TABLE `Arrow`
  ADD CONSTRAINT `Arrow_ibfk_1` FOREIGN KEY (`End_ID`) REFERENCES `End_Result` (`End_ID`);

--
-- Constraints for table `Competition`
--
ALTER TABLE `Competition`
  ADD CONSTRAINT `Competition_ibfk_1` FOREIGN KEY (`Champ_ID`) REFERENCES `Championship` (`Champ_ID`),
  ADD CONSTRAINT `Competition_ibfk_2` FOREIGN KEY (`Round_ID`) REFERENCES `Round_Definition` (`Round_ID`);

--
-- Constraints for table `End_Result`
--
ALTER TABLE `End_Result`
  ADD CONSTRAINT `End_Result_ibfk_1` FOREIGN KEY (`Score_ID`) REFERENCES `Score` (`Score_ID`);

--
-- Constraints for table `Range_Definition`
--
ALTER TABLE `Range_Definition`
  ADD CONSTRAINT `Range_Definition_ibfk_1` FOREIGN KEY (`Round_ID`) REFERENCES `Round_Definition` (`Round_ID`),
  ADD CONSTRAINT `Range_Definition_ibfk_2` FOREIGN KEY (`Face_ID`) REFERENCES `Face_Definition` (`Face_ID`);

--
-- Constraints for table `Round_Equivalent`
--
ALTER TABLE `Round_Equivalent`
  ADD CONSTRAINT `Round_Equivalent_ibfk_1` FOREIGN KEY (`Base_Round_ID`) REFERENCES `Round_Definition` (`Round_ID`),
  ADD CONSTRAINT `Round_Equivalent_ibfk_2` FOREIGN KEY (`Equiv_Round_ID`) REFERENCES `Round_Definition` (`Round_ID`),
  ADD CONSTRAINT `Round_Equivalent_ibfk_3` FOREIGN KEY (`Class_ID`) REFERENCES `Class_Definition` (`Class_ID`),
  ADD CONSTRAINT `Round_Equivalent_ibfk_4` FOREIGN KEY (`Equipment_ID`) REFERENCES `Equipment_Definition` (`Equipment_ID`);

--
-- Constraints for table `Score`
--
ALTER TABLE `Score`
  ADD CONSTRAINT `Score_ibfk_1` FOREIGN KEY (`Archer_ID`) REFERENCES `Archer` (`Archer_ID`),
  ADD CONSTRAINT `Score_ibfk_2` FOREIGN KEY (`Range_ID`) REFERENCES `Range_Definition` (`Range_ID`),
  ADD CONSTRAINT `Score_ibfk_3` FOREIGN KEY (`Comp_ID`) REFERENCES `Competition` (`Comp_ID`),
  ADD CONSTRAINT `Score_ibfk_4` FOREIGN KEY (`Equipment_ID`) REFERENCES `Equipment_Definition` (`Equipment_ID`);
COMMIT;
