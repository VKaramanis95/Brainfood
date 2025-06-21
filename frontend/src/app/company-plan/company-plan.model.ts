export interface Company {
  ID: number;
  Name: string; 
}

export interface Plan {
  ID: number;
  Name: string;
  allowsocialaccounts?: number;
  allowpostspermonth?: number;
  allowswitchboardtemplates?: number;
  allowinstcarousels?: number;
  allowcreatomatevideospermonth?: number;
  allowxxx?: number;
  initialpricemonth?: string;
  initialpricediscount?: string | null;
}

export interface CompanyPlan {
  ID: number; 
  Name?: string; 
  Description?: string;
  companyID: number;
  company?: Company;
  plan?: Plan;
  pricingPlanID: number;
  start_date?: string;
  end_date?: string | null;
  price?: string;
  discount?: string;
  finalprice?: string;
  monthyear?: 'month' | 'year' | '';
}
