-- Judge -> Admin handoff fields for final passation results
-- Apply this after the base schema.sql file.

alter table if exists passations
  add column if not exists final_result_status text,
  add column if not exists judge_score numeric,
  add column if not exists judge_time_seconds integer,
  add column if not exists judge_notes text,
  add column if not exists signature_image_data_url text,
  add column if not exists finalized_by_judge_at timestamptz,
  add column if not exists finalized_by_judge_name text;

alter table if exists passations
  drop constraint if exists passation_final_result_status_check;

alter table if exists passations
  add constraint passation_final_result_status_check
  check (
    final_result_status is null
    or final_result_status in ('Finished', 'Absent', 'Delayed')
  );

comment on column passations.final_result_status is 'Final action sent by judge to admin: Finished, Absent, or Delayed.';
comment on column passations.judge_score is 'Score entered by the judge when the run is finished.';
comment on column passations.judge_time_seconds is 'Recorded time in seconds entered by the judge.';
comment on column passations.judge_notes is 'Judge notes, penalties, retry notes, or observations.';
comment on column passations.signature_image_data_url is 'Captured signature image for the current team, stored as a data URL in the prototype phase.';
comment on column passations.finalized_by_judge_at is 'Timestamp when the judge sent the result to admin.';
comment on column passations.finalized_by_judge_name is 'Judge name or identifier that finalized the result.';
