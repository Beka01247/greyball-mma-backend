/*
  # Initial Schema and Data Setup

  1. Tables Created
    - weight_class: UFC weight divisions
    - fighter: Fighter profiles with stats
    - event: UFC events
    - fight: Fight records
    - ranking: Fighter rankings

  2. Data Population
    - Real UFC weight classes
    - Active UFC fighters
    - Recent UFC events
    - Notable fights
*/

-- Create weight classes table and populate with UFC divisions
CREATE TABLE IF NOT EXISTS weight_class (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  min_weight DECIMAL(5,2) NOT NULL,
  max_weight DECIMAL(5,2) NOT NULL
);

INSERT INTO weight_class (name, min_weight, max_weight) VALUES
  ('Flyweight', 115.00, 125.00),
  ('Bantamweight', 125.01, 135.00),
  ('Featherweight', 135.01, 145.00),
  ('Lightweight', 145.01, 155.00),
  ('Welterweight', 155.01, 170.00),
  ('Middleweight', 170.01, 185.00),
  ('Light Heavyweight', 185.01, 205.00),
  ('Heavyweight', 205.01, 265.00);

-- Create fighters table and populate with current UFC fighters
CREATE TABLE IF NOT EXISTS fighter (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  nickname VARCHAR(50),
  birth_date DATE NOT NULL,
  nationality VARCHAR(50) NOT NULL,
  height DECIMAL(5,2) NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  weight_class_id INTEGER REFERENCES weight_class(id),
  total_wins INTEGER DEFAULT 0,
  total_losses INTEGER DEFAULT 0,
  total_draws INTEGER DEFAULT 0,
  total_knockouts INTEGER DEFAULT 0,
  total_submissions INTEGER DEFAULT 0
);

INSERT INTO fighter (first_name, last_name, nickname, birth_date, nationality, height, weight, weight_class_id) VALUES
  ('Islam', 'Makhachev', NULL, '1991-10-27', 'Russia', 177.80, 155.00, 4),
  ('Alexander', 'Volkanovski', 'The Great', '1988-09-29', 'Australia', 168.00, 145.00, 3),
  ('Jon', 'Jones', 'Bones', '1987-07-19', 'USA', 193.00, 248.00, 8),
  ('Leon', 'Edwards', 'Rocky', '1991-08-25', 'United Kingdom', 183.00, 170.00, 5),
  ('Sean', 'O''Malley', 'Sugar', '1994-10-24', 'USA', 180.34, 135.00, 2),
  ('Alexandre', 'Pantoja', 'The Cannibal', '1990-04-16', 'Brazil', 165.00, 125.00, 1);

-- Create events table and populate with recent UFC events
CREATE TABLE IF NOT EXISTS event (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL
);

INSERT INTO event (name, location, event_date) VALUES
  ('UFC 294', 'Abu Dhabi, UAE', '2023-10-21'),
  ('UFC 293', 'Sydney, Australia', '2023-09-09'),
  ('UFC 292', 'Boston, Massachusetts', '2023-08-19');

-- Create fights table
CREATE TABLE IF NOT EXISTS fight (
  id SERIAL PRIMARY KEY,
  fighter1_id INTEGER REFERENCES fighter(id),
  fighter2_id INTEGER REFERENCES fighter(id),
  winner_id INTEGER REFERENCES fighter(id),
  event_id INTEGER REFERENCES event(id),
  fight_date DATE NOT NULL,
  method VARCHAR(50),
  fight_result_details TEXT DEFAULT ''
);

-- Create rankings table
CREATE TABLE IF NOT EXISTS ranking (
  id SERIAL PRIMARY KEY,
  fighter_id INTEGER REFERENCES fighter(id),
  weight_class_id INTEGER REFERENCES weight_class(id),
  points DECIMAL(10,4) NOT NULL DEFAULT 0.01,
  consecutive_wins INTEGER DEFAULT 0,
  consecutive_losses INTEGER DEFAULT 0,
  last_fight_date DATE,
  is_former_champion BOOLEAN DEFAULT false,
  UNIQUE(fighter_id, weight_class_id)
);

-- Insert some initial rankings
INSERT INTO ranking (fighter_id, weight_class_id, points, last_fight_date)
SELECT f.id, f.weight_class_id, 0.01, CURRENT_DATE
FROM fighter f;