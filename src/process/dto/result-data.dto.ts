export interface ResultData {
  id: string;
  underlying_pchng: string;
  moneyflow_long: number;
  moneyflow_short: number;
  rank: number;
  result: [
    {
      code1: string;
      name1: string;
      strike1: string;
      egearing1: string;
      maturity1: string;
      type1: string;
      comment1: string;
    },
    {
      code2: string;
      name2: string;
      strike2: string;
      egearing2: string;
      maturity2: string;
      type2: string;
      comment2: string;
    },
  ];
}

export type ResultDataDto = [ResultData];
