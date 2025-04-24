-- Migration: Add description column to persons table
-- Description: Adds an optional description field to store additional information about a person
-- Author: AI Assistant
-- Date: 2024-03-19

-- Add description column to persons table
alter table public.persons
    add column description text;

-- Add comment to the new column
comment on column public.persons.description is 'Optional description field for storing additional information about a person'; 