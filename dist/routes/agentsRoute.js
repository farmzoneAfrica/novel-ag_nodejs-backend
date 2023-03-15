"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agentsController_1 = require("../controllers/agentsController");
const auth_1 = require("../utils/auth");
const agentRouter = (0, express_1.Router)();
/* POST register agent */
agentRouter.post("/", async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, agentsController_1.registerAgent)(data);
        return res.status(200).json({
            message: "Success",
            response,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
/* GET  agents */
agentRouter.get("/", async (req, res) => {
    try {
        const response = await (0, agentsController_1.getAgents)();
        return res.status(200).json({
            message: "Success",
            response,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
/* GET single agent */
agentRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const agent = await (0, agentsController_1.getAgent)(id);
        return res.status(200).json({
            message: "Success",
            agent,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
/* PATCH update agent */
agentRouter.patch("/:id", auth_1.auth, async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const user = await (0, agentsController_1.updateAgent)(id, data);
        return res.status(200).json({
            message: "Success",
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
/* DELETE deleter agent */
agentRouter.delete("/:id", auth_1.auth, async (req, res) => {
    try {
        const { id } = req.params;
        const response = await (0, agentsController_1.deleteAgent)(id);
        return res.status(200).json({
            msg: "Delete Success",
            response
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.default = agentRouter;
//# sourceMappingURL=agentsRoute.js.map