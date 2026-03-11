-- ── Consensus (world-wide game parameters) ────────────────────────────────────
INSERT OR IGNORE INTO consensus (key, value, value_type, name, purpose) VALUES
  ('CAT.COOLDOWN_HOUR_BETWEEN_CARE',  '1',  'NUMBER', 'Care cooldown',     'Minimum cooldown time (in hours) between caring for your cat'),
  ('CAT.GROWTH_PER_CARE',     '1',  'NUMBER', 'Growth stat gained per care', 'Growth stat gained when caring for your cat'),
  ('CAT.EMOTION_PER_CARE',    '5',  'NUMBER', 'Emotion stat gained per care', 'Emotion stat gained when caring for your cat'),
  ('CAT.EMOTION_DECAY_PER_DAY','10', 'NUMBER', 'Emotion stat lost per day without a care', 'Emotion stat lost per day when you do not care for your cat'),
  ('CAT.MAX_GROWTH',          '100', 'NUMBER', 'Maximum growth stat', 'Maximum growth stat your cat can have')
;
