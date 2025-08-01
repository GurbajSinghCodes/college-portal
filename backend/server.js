import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from 'fs';
import session from "express-session";
import dotenv from "dotenv";
import path, { dirname } from "path";
import mongoose from "mongoose"
import dbRoutes from "./routes/db-routes.js";
import { fileURLToPath } from "url";
import User from "./models/user.js";
import MongoStore from 'connect-mongo'

dotenv.config();

const frontend = process.env.FRONT_END
const app = express();

const database = process.env.MONGO_DATABASE
mongoose.connect(database, {
    serverSelectionTimeoutMS: 5000
});
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});

app.use(express.json());

app.use(cors({
    origin: [frontend],
    credentials: true
}));



const otpStore = {};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
    app.set("trust proxy", 1);
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DATABASE,
    }),
    cookie: {
        httpOnly: true,
        secure: isProduction,              // true in production (HTTPS), false locally
        sameSite: isProduction ? "none" : "lax", // required for cross-origin cookies
        maxAge: 7 * 24 * 60 * 60 * 1000     // 7 days
    }
}));

app.get("/", (req, res) => {
    console.log("Server requested")
    res.send("done")
})
app.post("/send-otp", async (req, res) => {
    console.log("Send OTP requested")
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    setTimeout(() => {
        delete otpStore[email]
    }, 5 * 60 * 1000)
    await transporter.sendMail({
        from: `Verify App <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Your OTP Code : ${otp} `,
        text: `Thank you for logging into the HIET portal.

To ensure you continue receiving important updates, please consider adding this sender to your trusted contacts.

Your One-Time Password (OTP) is: ${otp}

This code is valid for 5 minutes. Please do not share it with anyone.`

    });
    console.log("Otp sent")
    res.json({ success: true, message: "OTP sent" });
});

app.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    const storedData = otpStore[email];

    if (!storedData || Date.now() > storedData.expiresAt) {
        console.log("otp expired")

        return res.status(400).json({ success: false, message: "OTP expired. Please request a new one.", expired: true });

    }

    if (storedData.otp == otp) {
        delete otpStore[email];
        console.log("otp verified")
        const existingUser = await User.findOne({ email });
        const exists = await User.exists({ email });

        if (!existingUser) {
            console.log("New user created");
        } else {
            req.session.user = { email }
            console.log("User already exists");
            const fullname = existingUser.fullname.toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            req.session.user = { ...req.session.user, fullname }
            return res.json({ success: true, fullname, exists, message: "OTP Verified!", sessionActive: true });
        }
        return res.json({ success: true, exists, message: "OTP Verified!" });


    }
    console.log("invalid otp")
    res.status(400).json({ success: false, message: "Invalid OTP " });

});
app.post('/existinguser', async (req, res) => {
    const { email } = req.body;
    const exists = await User.exists({ email });
    return res.json({ success: true, exists })
})

app.post('/adddetails', async (req, res) => {
    try {
        const { email, fullname, password } = req.body;
        await User.create({ email, starredFiles: [] });
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.fullname = fullname;
        user.password = password;
        req.session.user = { email }

        await user.save();
        res.json({ success: true, fullname, message: "User details updated successfully", sessionActive: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
})

app.post('/updatepassword', async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email });
        const fullname = user.fullname
        user.password = password
        req.session.user = { email }
        return res.json({ success: true, message: "Password updated successfully", fullname, sessionActive: true })
    }
    catch {
        return res.json({ success: false, message: "Error updating password. Please try again later !" })
    }

})
app.post('/passwordlogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Incorrect password" })
        }
        const fullname = user.fullname?.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        req.session.user = { email, fullname }
        return res.json({ success: true, fullname, message: "Logged In successfully", sessionActive: true })
    }
    catch {
        res.status(500).json({ success: false, message: "server error" })
    }
})

const requireLogin = (req, res, next) => {

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: "You must log in with OTP first!" });
    }

    next();
};

app.get("/loggedin", requireLogin, (req, res) => {
    const { fullname } = req.session.user || {}

    res.json({ success: true, fullname, message: "User is logged in" });
});
app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ success: true, message: "Logged out successfully" });
    });
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NOTES_DIR = path.join(__dirname, "notes");
const QPS_DIR = path.join(__dirname, "qps")

function readFolderStructure(dirPath) {
    const structure = {};
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            structure[item] = readFolderStructure(fullPath);
        } else {
            structure[item] = "file";
        }
    });

    return structure;
}

app.get("/getfiles", (req, res) => {
    try {
        const structure = readFolderStructure(NOTES_DIR);
        res.json(structure);
    } catch (error) {
        res.status(500).json({ error: "Unable to read folder structure" });
    }
});

app.get("/getqps", (req, res) => {
    try {
        const structure = readFolderStructure(QPS_DIR);
        res.json(structure);
    } catch (error) {
        res.status(500).json({ error: "Unable to read folder structure" });
    }
});

function getFolderStructure(basePath, webPath = '') {
    const entries = fs.readdirSync(basePath, { withFileTypes: true });
    const result = [];
    for (const entry of entries) {
        const fullPath = path.join(basePath, entry.name);
        const webFullPath = path.join(webPath, entry.name).replace(/\\/g, '/');

        if (entry.isDirectory()) {
            const children = getFolderStructure(fullPath, webFullPath); // Get inner structure
            result.push({ type: 'folder', name: entry.name, path: webFullPath, children });
        } else if (entry.isFile()) {
            result.push({ type: 'file', name: entry.name, path: webFullPath });
        }
    }

    return result;
}

function flattenFolderData(data, basePath = "") {
    let result = [];

    data.forEach(item => {
        const currentPath = `${basePath}/${item.name}`;

        if (item.type === "file") {
            result.push({ name: item.name, path: currentPath });
        } else if (item.type === "folder") {
            result = result.concat(flattenFolderData(item.children, currentPath));
        }
    });

    return result;
}


app.use("/resources", express.static(NOTES_DIR));
app.use("/resources", express.static(QPS_DIR));


app.post("/get-search", (req, res) => {
    try {
        const folderDataNotes = getFolderStructure(NOTES_DIR);
        const folderDataQPS = getFolderStructure(QPS_DIR);

        const notesData = flattenFolderData(folderDataNotes, "/notes");
        const qpsData = flattenFolderData(folderDataQPS, "/qps");

        res.json([...notesData, ...qpsData]);
    } catch (err) {
        console.error("Error in /get-search:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use("/api", dbRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT} `));
