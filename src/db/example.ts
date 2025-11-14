import Database from './Database';

async function exampleUsage() {
  const db = Database.getInstance();
  
  try {
    // Initialize the database
    await db.initialize();
    console.log('Database connected and schema initialized');

    const dbAccessor = db.getAccessor();

    // Insert a new task
    const insertResult = await dbAccessor.executeQuery(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      ['Complete project setup', 'Set up database and basic structure', 'pending']
    );
    console.log('Inserted task with ID:', insertResult.lastID);

    // Query all tasks
    const selectResult = await dbAccessor.executeQuery('SELECT * FROM tasks');
    console.log('All tasks:', selectResult.rows);

    // Update a task
    const updateResult = await dbAccessor.executeQuery(
      'UPDATE tasks SET status = ? WHERE id = ?',
      ['completed', insertResult.lastID]
    );
    console.log('Updated rows:', updateResult.changes);

    // Query updated tasks
    const updatedTasks = await dbAccessor.executeQuery('SELECT * FROM tasks WHERE status = ?', ['completed']);
    console.log('Completed tasks:', updatedTasks.rows);

  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await db.close();
    console.log('Database connection closed');
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  exampleUsage();
}

export { exampleUsage };
