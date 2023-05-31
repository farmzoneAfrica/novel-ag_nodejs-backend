"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const signJwt = (payload, keyName, options) => {
    // const privateKey = fs.readFileSync('private_key.pem').toString('ascii');
    const privateKey = 'ab1234';
    console.log("jwt", 10, privateKey);
    return jsonwebtoken_1.default.sign(payload, privateKey, {
    // ...options,
    // algorithm: 'RS256',
    });
};
exports.signJwt = signJwt;
const verifyJwt = (token, keyName) => {
    try {
        const publicKey = 'ab1234';
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map