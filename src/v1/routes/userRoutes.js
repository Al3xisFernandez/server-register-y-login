const { Router } = require("express");
const router = Router();
const { createNewUser, userLogin } = require("../../controllers/userController");

router.post("/register", createNewUser);
router.post("/login", userLogin);

module.exports = router;
