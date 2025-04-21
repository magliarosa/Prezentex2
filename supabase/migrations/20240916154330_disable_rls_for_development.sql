-- Migration: 20240916154330_disable_rls_for_development.sql
-- Description: Disable Row Level Security on all tables for development purposes
-- Warning: This should NOT be used in production environments

-- disable row level security on all tables
alter table persons disable row level security;
alter table presents disable row level security;
alter table persons_presents disable row level security;

-- note: disabling RLS allows all operations on these tables without restrictions
-- comment: this is intended only for development environments 