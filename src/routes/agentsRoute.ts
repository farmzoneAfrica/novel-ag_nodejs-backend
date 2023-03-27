import { Router } from "express";
import {
	registerAgent,
	verifyAgent,
	loginUser,
    getAgents,
    getAgent,
    updateAgent,
	deleteAgent,
	forgotPassword
} from "../controllers/agentsController";
import {auth} from "../utils/auth";

const agentRouter = Router();

/* register agent  */
agentRouter.post("/", async (req, res) => {
	try {
		const data = req.body;
		const response = await registerAgent(data);
		return res.status(200).json({
			message: "Success",
			response,
		});
	} catch (error) {
		return res.status(500).json({ 
			msg: error
		});
	}
});
/* verify agent registration  */
agentRouter.post("/verify", async (req, res) => {
	// swagger.tags = ['Users']
	try {
		const data = req.body;
		const response = await verifyAgent(data);
		return res.status(200).json({
			message: "Success",
			response,
		});
	} catch (error) {
		return res.status(500).json({ 
			msg: error
		});
	}
});

/* POST Login users */
/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
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
agentRouter.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
		const data = req.body;
		console.log("94", data);
		
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

agentRouter.post("/forgot-password", async (req, res) => {
	try {
		const data = req.body;
		const response = await forgotPassword(data);
		return res.status(200).json({
			msg: "Check your email to reset your password",
			response,
		});
	} catch (error) {
		return res.status(400).json({ message: error });
	}
});

// agentRouter.post("/reset-password", async (req, res) => {
// 	const token = req.body.token;
// 	const newPassword: string = req.body.password;
// 	try {
// 		await resetPassword(token, newPassword);
// 		return res.status(200).json({ message: "Success" });
// 	} catch (error) {
// 		return res.status(400).json(error);
// 	}
// });

export default agentRouter;