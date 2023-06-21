"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWardsHandler = exports.getStatesHandler = void 0;
const utils_service_1 = require("../services/utils.service");
const getStatesHandler = async (req, res, next) => {
    try {
        const states = await (0, utils_service_1.getStates)();
        return res.status(200).json({
            status: 'Success',
            states
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getStatesHandler = getStatesHandler;
// export const getLgaHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const state_id = Number(req.params) 
//     console.log(state_id)
//     const lgas = await getLGAs( state_id)
//       return res.status(200).json({
//       status: 'Success',
//       lgas
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };
const getWardsHandler = async (req, res, next) => {
    try {
        const states = await (0, utils_service_1.getWards)();
        return res.status(200).json({
            status: 'Success',
            states
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getWardsHandler = getWardsHandler;
//# sourceMappingURL=utils.controller.js.map