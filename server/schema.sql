-- Gigaplex relational schema (PostgreSQL-oriented).
-- Wire to Supabase / RDS / Cloud SQL in production; UUIDs + timestamptz recommended.

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('worker', 'admin')),
  phone TEXT,
  password_hash TEXT NOT NULL,
  kyc_status TEXT NOT NULL DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  rating_avg NUMERIC(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  order_id TEXT NOT NULL,
  amount NUMERIC(14,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  savings_contribution NUMERIC(14,2) NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(14,2) NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('UPI', 'Bank', 'Wallet')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  reference TEXT NOT NULL,
  encrypted_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE support_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_requested NUMERIC(14,2) NOT NULL,
  reason TEXT,
  status TEXT NOT NULL,
  ai_eligibility_score INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE savings_accounts (
  worker_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  balance NUMERIC(14,2) NOT NULL DEFAULT 0,
  lifetime_contributed NUMERIC(14,2) NOT NULL DEFAULT 0,
  last_contribution_at TIMESTAMPTZ
);

CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL,
  title TEXT NOT NULL,
  value_label TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  claimed BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_platform TEXT NOT NULL,
  value NUMERIC(3,2) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ai_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  horizon_days INT NOT NULL,
  predicted_income NUMERIC(14,2) NOT NULL,
  confidence NUMERIC(4,3) NOT NULL,
  factors JSONB NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_earnings_worker ON earnings(worker_id, completed_at DESC);
CREATE INDEX idx_payouts_worker ON payouts(worker_id, created_at DESC);
