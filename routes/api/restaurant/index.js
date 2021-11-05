const express = require("express");
const controller = require("./restaurant.controller");
const auth = require("../auth/auth.service");

const router = express.Router();

router.get("/", auth.hasRole("user"), controller.index);
router.get("/:id", auth.hasRole("user"), controller.show);
router.post("/", auth.hasRole("manager"), controller.create);
router.post("/upload", auth.hasRole("manager"), controller.upload);
router.post("/rating", auth.hasRole("user"), controller.rating);
router.post("/image", auth.hasRole("user"), controller.image);
router.put("/:id", auth.hasRole("manager"), controller.update);
router.patch("/:id", auth.hasRole("manager"), controller.update);
router.delete("/:id", auth.hasRole("manager"), controller.destroy);


module.exports = router;
