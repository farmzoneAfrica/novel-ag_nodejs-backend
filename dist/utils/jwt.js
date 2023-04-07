"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const signJwt = (payload, keyName, options) => {
    const privateKey = fs_1.default.readFileSync('private_key.pem');
    return jsonwebtoken_1.default.sign(payload, privateKey, {
        ...options,
        algorithm: 'RS256',
    });
};
exports.signJwt = signJwt;
const verifyJwt = (token, keyName) => {
    try {
        const publicKey = fs_1.default.readFileSync('public_key.pem');
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map