export interface MarketFeedData {
  id: string;
  rank: number;
  code: string;
  name: string;
  underlying_id: string;
  type: string;
  comment: string;
  selected_by: string;
}

export type MarketFeedDataDto = [MarketFeedData];
