import { Router } from "express";
import {
	registerAgent,
	loginUser,
    getAgents,
    getAgent,
    updateAgent,
    deleteAgent
} from "../controllers/agentsController";
import {auth} from "../utils/auth";

const agentRouter = Router();

/* POST register agent */
agentRouter.post("/", async (req, res) => {
	try {
        const data = req.body;
		const response = await registerAgent(data);
		return res.status(200).json({
			message: "Success",
			response,
		});
    } catch (error) {
		return res.status(500).json({ message: error });
	}
});

/* POST Login users */
agentRouter.post("/login", async (req, res) => {
	try {
		const data = req.body;
		const response = await loginUser(data);
		return res.status(200).json({
			message: "Success",
			response,
		});
	} catch (error) {
		return res.status(500).json({ message: error });
	}
});

/* GET  agents */
agentRouter.get("/", async (req, res) => {
	try {
		const response = await getAgents();
		return res.status(200).json({
			message: "Success",
			response,
		});
    } catch (error) {
		return res.status(500).json({ message: error });
	}
});
/* GET single agent */
agentRouter.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const agent = await getAgent(id);
		return res.status(200).json({
			message: "Success",
			agent,
		})
	} catch (error) {
		return res.status(500).json({
			message: error,
		})
	}
})
/* PATCH update agent */
agentRouter.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
		const data = req.body;
		const user = await updateAgent(id, data);
		return res.status(200).json({
			message: "Success",
			user,
		})
	} catch (error) {
		return res.status(500).json({
			message: error,
		})
	}
})
/* DELETE deleter agent */
agentRouter.delete("/:id", auth, async (req, res) => {
	try {
		const {id} = req.params;
		const response = await deleteAgent(id);
		return res.status(200).json({
      msg: "Delete Success",
      response
		})
	} catch (error) {
		return res.status(500).json({
			message: error,
		})
	}
})

export default agentRouter;