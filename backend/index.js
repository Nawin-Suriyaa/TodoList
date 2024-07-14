const express = require("express");
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const app = express();

const port = 4500;
const connection_url = "mongodb+srv://pjsuriyaa08:L7LXizqWhjKe5Mfv@cluster0.ymctw6c.mongodb.net/Personal?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    next();
});

app.post("/createtask/:id", async (req, res) => {
    const client = new MongoClient(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db("test");
        const usersCollection = db.collection("users");
        const tasksCollection = db.collection("tasks");

        const userId = req.params.id;
        const taskData = req.body;

        const objectId = new ObjectId(userId);
        const findUser = await usersCollection.findOne({ _id: objectId });

        if (findUser) {
            // Create the task object dynamically
            const task = {
                userId: objectId,
                task: taskData.task || "",
                isComplete: taskData.isComplete || false,
                createdAt: new Date()
            };

            await tasksCollection.insertOne(task);

            return res.status(200).json({
                message: "Task created successfully",
                task
            });
        }

        return res.status(400).json({
            message: "Access Denied"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

app.get("/gettasks/:id", async (req, res) => {
    const client = new MongoClient(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db("test");
        const usersCollection = db.collection("users");
        const tasksCollection = db.collection("tasks");

        const userId = req.params.id;
        const objectId = new ObjectId(userId);

        const findUser = await usersCollection.findOne({ _id: objectId });

        if (findUser) {
            const tasks = await tasksCollection.find({ userId: objectId }).sort({ createdAt: -1 }).toArray();

            return res.status(200).json({
                message: "Fetched successfully",
                tasks
            });
        }

        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

app.patch("/updatetask/:id", async (req, res) => {
    const client = new MongoClient(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db("test");
        const tasksCollection = db.collection("tasks");

        const taskId = req.params.id;
        const taskData = req.body;
        const objectId = new ObjectId(taskId);

        const updatedTask = await tasksCollection.updateOne({ _id: objectId }, { $set: taskData });

        res.status(200).json({
            message: "Task updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

app.delete("/deletetask/:id", async (req, res) => {
    const client = new MongoClient(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db("test");
        const tasksCollection = db.collection("tasks");

        const taskId = req.params.id;
        const objectId = new ObjectId(taskId);

        await tasksCollection.deleteOne({ _id: objectId });

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

app.post("/registeruser", async (req, res) => {
    const client = new MongoClient(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db("test");
        const usersCollection = db.collection("users");

        const user = req.body;
        const findUser = await usersCollection.findOne({ email: user.email });

        if (!findUser) {
            await usersCollection.insertOne(user);
            return res.status(200).json({ message: "User created successfully" });
        }

        res.status(400).json({ message: "User already present." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

app.post('/login', async (req, res) => {
    const client = new MongoClient(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db("test");
        const usersCollection = db.collection("users");

        const { email, password } = req.body;
        const findUser = await usersCollection.findOne({ email: email });

        if (findUser) {
            if (findUser.password === password) {
                return res.status(200).json({ message: "Login successful", user: findUser });
            }
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.status(404).json({ message: "User not found." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

app.listen(port, () => {
    console.log(`Server started to listen on port ${port}`);
});
