-- Supabase Setup Instructions for email_subscribers table
-- Run this SQL in your Supabase SQL Editor

-- 1. Create the email_subscribers table
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- 3. Create a write-only policy (allows INSERT but not SELECT, UPDATE, or DELETE)
CREATE POLICY "Allow public insert only"
ON email_subscribers
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);

-- 5. Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_email_subscribers_created_at ON email_subscribers(created_at DESC);

-- Note: With these policies, anonymous users can only INSERT data.
-- They cannot SELECT, UPDATE, or DELETE any data.
-- You'll need to use the Supabase Dashboard or a service role key to view the data.
