-- Migration: 20240916152430_create_initial_schema.sql
-- Description: Initial schema creation for Prezentex app
-- Tables: persons, presents, persons_presents
-- Note: The 'users' table is managed by Supabase Auth and not created here

-- create persons table to store information about gift recipients
create table if not exists persons (
    id serial primary key,
    name varchar not null,
    user_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

-- add index on user_id for faster querying by user
create index if not exists persons_user_id_idx on persons(user_id);
-- add index on name for faster search by name
create index if not exists persons_name_idx on persons(name);

-- presents table to store gift ideas
create table if not exists presents (
    id serial primary key,
    name varchar not null,
    price numeric(10,2) check (price >= 0),
    link varchar,
    description varchar,
    tag varchar,
    user_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

-- add indexes for faster querying
create index if not exists presents_user_id_idx on presents(user_id);
create index if not exists presents_name_idx on presents(name);
create index if not exists presents_tag_idx on presents(tag);

-- junction table for many-to-many relationship between persons and presents
create table if not exists persons_presents (
    person_id integer not null references persons(id) on delete cascade,
    present_id integer not null references presents(id) on delete cascade,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    primary key (person_id, present_id)
);

-- create function to update the updated_at column
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- create triggers to automatically update updated_at
create trigger set_persons_updated_at
before update on persons
for each row execute function update_updated_at_column();

create trigger set_presents_updated_at
before update on presents
for each row execute function update_updated_at_column();

create trigger set_persons_presents_updated_at
before update on persons_presents
for each row execute function update_updated_at_column();

-- enable row level security
alter table persons enable row level security;
alter table presents enable row level security;
alter table persons_presents enable row level security;

-- policies for persons table
-- select policy for authenticated users
create policy "authenticated users can select their own persons"
on persons for select
to authenticated
using (auth.uid() = user_id);

-- insert policy for authenticated users
create policy "authenticated users can insert their own persons"
on persons for insert
to authenticated
with check (auth.uid() = user_id);

-- update policy for authenticated users
create policy "authenticated users can update their own persons"
on persons for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- delete policy for authenticated users
create policy "authenticated users can delete their own persons"
on persons for delete
to authenticated
using (auth.uid() = user_id);

-- policies for presents table
-- select policy for authenticated users
create policy "authenticated users can select their own presents"
on presents for select
to authenticated
using (auth.uid() = user_id);

-- insert policy for authenticated users
create policy "authenticated users can insert their own presents"
on presents for insert
to authenticated
with check (auth.uid() = user_id);

-- update policy for authenticated users
create policy "authenticated users can update their own presents"
on presents for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- delete policy for authenticated users
create policy "authenticated users can delete their own presents"
on presents for delete
to authenticated
using (auth.uid() = user_id);

-- policies for persons_presents junction table
-- select policy based on person ownership
create policy "authenticated users can select their persons_presents"
on persons_presents for select
to authenticated
using (exists (
    select 1 from persons
    where persons.id = persons_presents.person_id
    and persons.user_id = auth.uid()
));

-- insert policy based on person ownership
create policy "authenticated users can insert their persons_presents"
on persons_presents for insert
to authenticated
with check (exists (
    select 1 from persons
    where persons.id = persons_presents.person_id
    and persons.user_id = auth.uid()
));

-- update policy based on person ownership
create policy "authenticated users can update their persons_presents"
on persons_presents for update
to authenticated
using (exists (
    select 1 from persons
    where persons.id = persons_presents.person_id
    and persons.user_id = auth.uid()
))
with check (exists (
    select 1 from persons
    where persons.id = persons_presents.person_id
    and persons.user_id = auth.uid()
));

-- delete policy based on person ownership
create policy "authenticated users can delete their persons_presents"
on persons_presents for delete
to authenticated
using (exists (
    select 1 from persons
    where persons.id = persons_presents.person_id
    and persons.user_id = auth.uid()
)); 