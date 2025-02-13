import { Router } from "express";
import authService from "../services/authService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.get("/register", (req, res) => {
  res.render("auth/register");
});

authController.post("/register", async (req, res) => {
  const userData = req.body;

  try {
    const token = await authService.register(userData);
    res.cookie("auth", token, { httpOnly: true });

    res.redirect("/auth/login");
  } catch (err) {
    res.render('auth/register', {error: getErrorMessage(err)});
  }
});

authController.get("/login", (req, res) => {
  res.render("auth/login");
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token, { httpOnly: true });

    res.redirect('/');
  } catch (err) {
    res.render('auth/login', {error: getErrorMessage(err)});    
  }
});

authController.get("/logout", isAuth, (req, res) => {
  res.clearCookie('auth', { httpOnly: true });
  res.redirect("/");
});

export default authController;
