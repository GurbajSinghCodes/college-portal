import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/toggle-star", async (req, res) => {
    const { filePath } = req.body;
    const sessionUser = req.session.user
    if (!sessionUser || !sessionUser.email) {
        return res.status(401).json({ success: false, message: "You must log in first" });
    }

    const userEmail = sessionUser.email;
    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const index = user.starredFiles.indexOf(filePath);
        if (index === -1) {
            user.starredFiles.push(filePath);
        } else {
            user.starredFiles.splice(index, 1);
        }

        await user.save();
        res.json({ success: true });
    } catch (err) {
        console.error("Toggle star failed:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/starred-files", async (req, res) => {
    const user = req.session.user;
    if (!user || !user.email) {
        return res.status(401).json({ success: false, message: "Not logged in" });
    }

    try {
        const foundUser = await User.findOne({ email: user.email });
        res.json({ success: true, starredFiles: foundUser.starredFiles || [] });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;
