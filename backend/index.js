//Server
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import pg from "pg"
import dotenv from 'dotenv'
const app = express()
dotenv.config()
const port = process.env.PORT_NO;



//Database connection
const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT_NO,
})
db.connect();

//midleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>VE3 Task Manager Backend Server is running</h1>')
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
    
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
      
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = result.rows[0];
        //  console.log(user.password,user)
        
        if (user.password !== password) {
            console.log("Invalid username or password");
            return res.status(401).json({ error: "Invalid username or password" });
        }

        
        res.status(200).json({
            message: "Login successful!",
            userId: user.id,  
            username: user.username,
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});










app.get('/fetchAll', async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM tasks");
        // console.log(data.rows); 
        res.json({ data: data.rows });
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
  
    try {
      const userExists = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  
      if (userExists.rows.length > 0) {
        return res.status(409).json({ message: 'Username already exists.' }); // 409 Conflict
      }
  
      await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/fetchById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await db.query("SELECT * FROM tasks WHERE id = $1", [id]); // Query the database
        // console.log(data.rows);

        if (data.rows.length === 0) {

            return res.status(404).json({ message: "Task not found" });
        }

        res.json(data.rows[0]);
    } catch (err) {
        console.error("Error fetching tasks:", err); // Log the error
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/AddNewTask', async (req, res) => {
    try {
        const { name, description, status } = req.body;


        if (!name || !description || !status) {
            return res.status(400).json({ error: "All fields (name, description, status) are required." });
        }


        const result = await db.query(
            "INSERT INTO tasks (name, description, status) VALUES ($1, $2, $3) ",//RETURNING * if required
            [name, description, status]
        );


        res.status(201).json({
            message: "Task added successfully!",
            // task: result.rows[0],
        });
    } catch (err) {
        console.error("Error adding task:", err);


        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status } = req.body;

      
        if (!name || !description || !status) {
            return res.status(400).json({ error: "All fields (name, description, status) are required." });
        }

       
        const existingTask = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
        if (existingTask.rows.length === 0) {
            return res.status(404).json({ error: "Task not found." });
        }

        // Update the task
        const result = await db.query(
            "UPDATE tasks SET name = $1, description = $2, status = $3 WHERE id = $4 RETURNING *",
            [name, description, status, id]
        );

        res.status(200).json({ message: "Task updated successfully.", task: result.rows[0] });
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length > 0) {
            res.status(200).json({ message: "Task deleted successfully" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})