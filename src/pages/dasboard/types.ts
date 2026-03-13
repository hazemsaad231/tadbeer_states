export interface BestPerformingYear {
  year: number;
  net_profit: number;
  revenues: number;
}

export interface YoYGrowth {
  current_year: number;
  previous_year: number;
  revenues: { current: string; previous: string; growth_rate: number };
  net_profit: { current: string; previous: string; growth_rate: number };
}

export interface ClientStats {
  best_performing_year: BestPerformingYear | null;
  records_count: number;
  yoy_growth: YoYGrowth | null;
  financial_averages: {
    avg_revenues: number | null;
    avg_total_expenses: number | null;
  };
  financial_ratios: {
    profitability_ratios: {
      gross_profit_margin: number | null;
      net_profit_margin: number | null;
      return_on_assets: number | null;
      return_on_equity: number | null;
    };
    liquidity_ratios: {
      current_ratio: number | null;
      quick_ratio: number | null;
      cash_ratio: number | null;
    };
    leverage_ratios: {
      debt_ratio: number | null;
      debt_to_equity: number | null;
    };
    activity_ratios: {
      asset_turnover: number | null;
      inventory_turnover: number | null;
    };
  };
}

export interface Report {
  id: string;
  title: string;
  status: string;
  date: string;
}


export interface AdminStats {
  user_metrics: {
    total_users: number;
    new_users_this_month: number;
  };
  record_metrics: {
    total_financial_records: number;
  };
  service_requests_analytics: {
    total_service_requests: number;
    by_type: Record<string, number>;
  };
}

export interface ServiceRequest {
  id: number;
  service_type: string;
  notes: string;
  status: string;
  created_at: string;
}

export interface ServiceRequestsResponse {
  service_requests: ServiceRequest[] | null;
}