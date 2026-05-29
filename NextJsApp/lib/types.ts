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

  export interface ScoreDetail extends Score {
    Archer_Name: string
    Equipment_Name: string
    Round_Name: string
    Comp_Name: string
    Round_ID: number
  }

  export interface RangeDefinition {
    Range_ID: number;
    Round_ID: number;
    Distance: number;
    Face_ID: number;
    End_Count: number;
    Sequence: number;
    Size_cm: number;
  }

  export interface EndResult {
    End_ID: number
    Sequence: number
    Distance: number
    Size_cm: number
    arrows: number[]
  }

  export interface RecentScore {
    Score_ID: number
    Score_Date: string
    Status: string
    Archer_Name: string
    Round_Name: string
    Equipment_Name: string
    Total: number
  }