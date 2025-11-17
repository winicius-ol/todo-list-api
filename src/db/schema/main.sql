CREATE TABLE IF NOT EXISTS tasks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT,
  status      TEXT NOT NULL,
  due_date    DATE
);

CREATE TABLE IF NOT EXISTS due_date_dependencies (
  parent_id INTEGER NOT NULL,
  child_id INTEGER NOT NULL,
  delay INTEGER NOT NULL,
  PRIMARY KEY (parent_id, child_id),
  FOREIGN KEY (parent_id) REFERENCES tasks(id),
  FOREIGN KEY (child_id) REFERENCES tasks(id)
);
