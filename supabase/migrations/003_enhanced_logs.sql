-- Enhanced logging system for Hybrid Bot Engine

-- Drop existing logs table if exists
drop table if exists logs;

-- Create enhanced logs table
create table logs (
  id uuid default gen_random_uuid() primary key,
  level text not null check (level in ('info', 'warn', 'error', 'debug')),
  message text not null,
  user_id text,
  context text,
  metadata jsonb,
  timestamp timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Create indexes for better performance
create index logs_level_idx on logs(level);
create index logs_user_id_idx on logs(user_id);
create index logs_context_idx on logs(context);
create index logs_timestamp_idx on logs(timestamp desc);
create index logs_created_at_idx on logs(created_at desc);

-- Enable RLS
alter table logs enable row level security;

-- Create policies
create policy "Allow all operations on logs" on logs
  for all
  to authenticated, anon
  using (true)
  with check (true);

-- Create function to clean old logs (older than 30 days)
create or replace function clean_old_logs()
returns void as $$
begin
  delete from logs 
  where created_at < now() - interval '30 days';
end;
$$ language plpgsql;

-- Create function to get logs by level
create or replace function get_logs_by_level(log_level text, limit_count int default 100)
returns table (
  id uuid,
  level text,
  message text,
  user_id text,
  context text,
  metadata jsonb,
  timestamp timestamp with time zone
) as $$
begin
  return query
  select l.id, l.level, l.message, l.user_id, l.context, l.metadata, l.timestamp
  from logs l
  where l.level = log_level
  order by l.timestamp desc
  limit limit_count;
end;
$$ language plpgsql; 