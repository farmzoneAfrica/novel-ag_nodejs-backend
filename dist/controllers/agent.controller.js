"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeHandler = void 0;
const getMeHandler = async (req, res, next) => {
    try {
        const agent = res.locals.agent;
        res.status(200).status(200).json({
            status: 'success',
            data: {
                agent,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getMeHandler = getMeHandler;
//# sourceMappingURL=agent.controller.js.map