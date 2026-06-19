import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.username },
        { receiver: req.params.username },
        { receiver: "GROUP" }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

export default router;

