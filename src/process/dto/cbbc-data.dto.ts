export interface FeedMetadata {
  lastUpdated: string;
  isMarketOpen: boolean | string;
}

export interface UnderlyingData {
  id: string;
  underlying_pchng: string;
  moneyflow_long: string;
  moneyflow_short: string;
  result: [
    {
      code1: string;
      name1: string;
      calllv1: string;
      gearing1: string;
      maturity1: string;
      entitlement1: string;
      type1: string;
      comment1: string;
    },
    {
      code2: string;
      name2: string;
      calllv2: string;
      gearing2: string;
      maturity2: string;
      entitlement2: string;
      type2: string;
      comment2: string;
    },
  ];
}

export type CbbcDataDto = [FeedMetadata, ...Array<UnderlyingData>];
