const { Router } = require("express");
const router = Router();
const { createNewUser, userLogin, userDataController } = require("../../controllers/userController");

router.post("/register", createNewUser);
router.post("/login", userLogin);
router.post("/userdata", userDataController);

module.exports = router;
