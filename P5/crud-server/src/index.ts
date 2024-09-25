import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;

app.use(express.json());

// Configuração da conexão com o MySQL
const dbConfig = {
  host: 'localhost',
  user: 'your_username', // Substitua pelo seu nome de usuário do MySQL
  password: 'your_password', // Substitua pela sua senha do MySQL
  database: 'mydb', // Nome do banco de dados que você criou
};

const pool = mysql.createPool(dbConfig);

// Rota para testar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// CRUD routes
// Create a resource (POST)
app.post('/items', async (req, res) => {
  const { name } = req.body;
  const [result] = await pool.execute('INSERT INTO items (name) VALUES (?)', [name]);
  res.status(201).json({ id: (result as any).insertId });
});

// List resources (GET)
app.get('/items', async (req, res) => {
  const [items] = await pool.execute('SELECT * FROM items');
  res.json(items);
});

// Get details of a resource (GET)
app.get('/items/:id', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM items WHERE id = ?', [req.params.id]);
  const item = rows[0];
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Resource not found');
  }
});

// Update a resource (PUT)
app.put('/items/:id', async (req, res) => {
  const { name } = req.body;
  await pool.execute('UPDATE items SET name = ? WHERE id = ?', [name, req.params.id]);
  res.send('Resource updated successfully');
});

// Delete a resource (DELETE)
app.delete('/items/:id', async (req, res) => {
  await pool.execute('DELETE FROM items WHERE id = ?', [req.params.id]);
  res.send('Resource deleted successfully');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
