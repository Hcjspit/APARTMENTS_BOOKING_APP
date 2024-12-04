import express from "express";
import {
  register,
  me,
  confirmEmail,
  updatePassword,
  list,
} from "../controllers/user.controller";
import { RegisterUserDTO } from "../dto/user.dto";
import { validate } from "../../utils/validation-middleware";
import { isAuthenticated } from "../../utils/middlewares/authenticated-middelware";

const router = express.Router();

router.post("/register", validate(RegisterUserDTO, "body"), register);
router.post("/email-confirmation", (req, res, next) => {
  confirmEmail(req, res, next).catch(next);
});
router.patch("/updatePassword", isAuthenticated, updatePassword);
router.get("/me", isAuthenticated, me);
router.get("/users", list);

export default router;
