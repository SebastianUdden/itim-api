"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const router = (0, _express.Router)();
router.get("/", async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});
router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  return res.send(user);
});
router.post("/", async (req, res) => {
  const user = await req.context.models.User.create({
    username: req.body.username,
    tims: req.body.tims,
    createdAt: new Date()
  });
  return res.send(user);
});
router.put("/:userId", async (req, res) => {
  const updatedUser = await req.context.models.User.findByIdAndUpdate(req.params.userId, {
    $set: {
      username: req.body.username,
      tims: req.body.tims,
      updatedAt: new Date()
    }
  }, {
    new: true
  });
  return res.send(updatedUser);
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=user.js.map