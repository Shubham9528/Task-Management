////*********************************************Original code do not change**************************** */
// //Server

import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import pg from "pg"
import pkg from 'pg';
import dotenv from 'dotenv'
const app = express()
const { Client } = pkg;
dotenv.config()
const port = process.env.PORT_NO;

const connectionString = process.env.RENDER_DB;

//Database connection
const db = new Client({
    connectionString, // Connection string includes user, host, database, password, and port
    ssl: {
      rejectUnauthorized: false, // Required for connecting to databases with SSL, like Render
    },
  });
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
        const data = await db.query("SELECT * FROM tasks ORDER BY id ASC");
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


////*********************************************Original code do not change**************************** */


////********************************************Swagger code    ************************************** */

// Server
// import express from 'express';
// import cors from 'cors';
// import bodyParser from "body-parser";
// import pg from "pg";
// import pkg from 'pg';
// import dotenv from 'dotenv';
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

// const app = express();
// const { Client } = pkg;
// dotenv.config();
// const port = process.env.PORT_NO;

// const connectionString = process.env.RENDER_DB;

// // Database connection
// const db = new Client({
//     connectionString, 
//     ssl: { rejectUnauthorized: false },
// });
// db.connect(); 

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(express.json());

// // Swagger Setup
// const swaggerOptions = {
//     swaggerDefinition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Task Manager API',
//             version: '1.0.0',
//             description: 'API documentation for the Task Manager application.',
//             contact: {
//                 name: 'API Support',
//                 email: 'support@example.com',
//             },
//         },
//         servers: [
//             { url: `http://localhost:${port}` }
//         ],
//     },
//     apis: ['./index.js'], // Path to the file where your routes are defined
// };

// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Root route
// app.get('/', (req, res) => {
//     res.send('<h1>VE3 Task Manager Backend Server is running</h1>');
// });

// /**
//  * @swagger
//  * /login:
//  *   post:
//  *     description: User login
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Login successful
//  *       400:
//  *         description: Username and password are required.
//  *       401:
//  *         description: Invalid username or password.
//  *       404:
//  *         description: User not found.
//  */
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
    
//     if (!username || !password) {
//         return res.status(400).json({ error: "Username and password are required." });
//     }

//     try {
//         const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const user = result.rows[0];
        
//         if (user.password !== password) {
//             return res.status(401).json({ error: "Invalid username or password" });
//         }

//         res.status(200).json({
//             message: "Login successful!",
//             userId: user.id,  
//             username: user.username,
//         });
//     } catch (err) {
//         console.error("Error logging in:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // Add similar Swagger annotations for other routes

// // Fetch all tasks route
// /**
//  * @swagger
//  * /fetchAll:
//  *   get:
//  *     description: Fetch all tasks
//  *     responses:
//  *       200:
//  *         description: A list of tasks
//  *       500:
//  *         description: Internal server error
//  */
// app.get('/fetchAll', async (req, res) => {
//     try {
//         const data = await db.query("SELECT * FROM tasks");
//         res.json({ data: data.rows });
//     } catch (err) {
//         console.error("Error fetching tasks:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // Register user route
// /**
//  * @swagger
//  * /register:
//  *   post:
//  *     description: User registration
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User registered successfully
//  *       400:
//  *         description: Username and password are required
//  *       409:
//  *         description: Username already exists
//  */
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
  
//     if (!username || !password) {
//         return res.status(400).json({ message: 'Username and password are required.' });
//     }
  
//     try {
//         const userExists = await db.query('SELECT * FROM users WHERE username = $1', [username]);
//         if (userExists.rows.length > 0) {
//             return res.status(409).json({ message: 'Username already exists.' });
//         }
//         await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
//         res.status(201).json({ message: 'User registered successfully!' });
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// /* @swagger
// * /fetchById/{id}:
// *   get:
// *     description: Fetch task by ID
// *     parameters:
// *       - in: path
// *         name: id
// *         required: true
// *         description: Task ID
// *         schema:
// *           type: integer
// *     responses:
// *       200:
// *         description: Task found
// *         content:
// *           application/json:
// *             schema:
// *               type: object
// *               properties:
// *                 id:
// *                   type: integer
// *                 name:
// *                   type: string
// *                 description:
// *                   type: string
// *                 status:
// *                   type: string
// *       404:
// *         description: Task not found
// *       500:
// *         description: Internal Server Error
// */
// app.get('/fetchById/:id', async (req, res) => {
//    try {
//        const { id } = req.params;
//        const data = await db.query("SELECT * FROM tasks WHERE id = $1", [id]); 

//        if (data.rows.length === 0) {
//            return res.status(404).json({ message: "Task not found" });
//        }

//        res.json(data.rows[0]);
//    } catch (err) {
//        console.error("Error fetching tasks:", err);
//        res.status(500).json({ error: "Internal Server Error" });
//    }
// });

// // 2. Add New Task
// /**
// * @swagger
// * /AddNewTask:
// *   post:
// *     description: Add a new task
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             properties:
// *               name:
// *                 type: string
// *               description:
// *                 type: string
// *               status:
// *                 type: string
// *     responses:
// *       201:
// *         description: Task added successfully
// *       400:
// *         description: Missing required fields (name, description, status)
// *       500:
// *         description: Internal Server Error
// */
// app.post('/AddNewTask', async (req, res) => {
//    try {
//        const { name, description, status } = req.body;

//        if (!name || !description || !status) {
//            return res.status(400).json({ error: "All fields (name, description, status) are required." });
//        }

//        const result = await db.query(
//            "INSERT INTO tasks (name, description, status) VALUES ($1, $2, $3)",
//            [name, description, status]
//        );

//        res.status(201).json({ message: "Task added successfully!" });
//    } catch (err) {
//        console.error("Error adding task:", err);
//        res.status(500).json({ error: "Internal Server Error" });
//    }
// });

// // 3. Update Task
// /**
// * @swagger
// * /update/{id}:
// *   put:
// *     description: Update task details
// *     parameters:
// *       - in: path
// *         name: id
// *         required: true
// *         description: Task ID to update
// *         schema:
// *           type: integer
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             properties:
// *               name:
// *                 type: string
// *               description:
// *                 type: string
// *               status:
// *                 type: string
// *     responses:
// *       200:
// *         description: Task updated successfully
// *       400:
// *         description: Missing required fields (name, description, status)
// *       404:
// *         description: Task not found
// *       500:
// *         description: Internal Server Error
// */
// app.put('/update/:id', async (req, res) => {
//    try {
//        const { id } = req.params;
//        const { name, description, status } = req.body;

//        if (!name || !description || !status) {
//            return res.status(400).json({ error: "All fields (name, description, status) are required." });
//        }

//        const existingTask = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
//        if (existingTask.rows.length === 0) {
//            return res.status(404).json({ error: "Task not found." });
//        }

//        const result = await db.query(
//            "UPDATE tasks SET name = $1, description = $2, status = $3 WHERE id = $4 RETURNING *",
//            [name, description, status, id]
//        );

//        res.status(200).json({ message: "Task updated successfully.", task: result.rows[0] });
//    } catch (err) {
//        console.error("Error updating task:", err);
//        res.status(500).json({ error: "Internal Server Error" });
//    }
// });

// // 4. Delete Task
// /**
// * @swagger
// * /delete/{id}:
// *   delete:
// *     description: Delete a task by ID
// *     parameters:
// *       - in: path
// *         name: id
// *         required: true
// *         description: Task ID to delete
// *         schema:
// *           type: integer
// *     responses:
// *       200:
// *         description: Task deleted successfully
// *       404:
// *         description: Task not found
// *       500:
// *         description: Internal Server Error
// */
// app.delete('/delete/:id', async (req, res) => {
//    try {
//        const { id } = req.params;
//        const result = await db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);

//        if (result.rows.length > 0) {
//            res.status(200).json({ message: "Task deleted successfully" });
//        } else {
//            res.status(404).json({ message: "Task not found" });
//        }
//    } catch (err) {
//        console.error("Error deleting task:", err);
//        res.status(500).json({ error: "Internal Server Error" });
//    }
// });













// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
