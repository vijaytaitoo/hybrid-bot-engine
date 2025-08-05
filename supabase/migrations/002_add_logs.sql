create table if not exists logs (
  id uuid default gen_random_uuid() primary key,
  error text,
  location text,
  created_at timestamp default now()
);

create table if not exists ai_logs (
  id uuid default gen_random_uuid() primary key,
  prompt text,
  response text,
  user_id text,
  created_at timestamp default now()
); 