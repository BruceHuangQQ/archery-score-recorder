export interface Competition {
    Comp_ID: number;
    Comp_Date: string;
    Comp_Name: string;
    Champ_ID: number;
    Round_ID: number;
    Round_Name: string;
  }
  
  export interface Archer {
    Archer_ID: number;
    Name: string;
    Age_DOB: string;
    Gender: string;
    Def_Equipment_ID: number;
    Equipment_Name: string; // joined from Equipment_Definition
  }

  export interface Equipment {
    Equipment_ID: number;
    Equipment_Name: string;
  }

  export interface Score {
    Score_ID: number;
    Archer_ID: number;
    Range_ID: number | null;
    Comp_ID: number;
    Equipment_ID: number;
    Score_Date: string;
    Status: string;
  }