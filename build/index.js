"use strict";

require("dotenv/config");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var _mock = require("./mock");

var _models = _interopRequireWildcard(require("./models"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(async (req, res, next) => {
  req.context = {
    models: _models.default,
    me: await _models.default.User.findByLogin(req.query.token || "Unauthorized")
  };
  next();
});
app.use("/users", _routes.default.users);
(0, _models.connectDb)().then(async () => {
  if (process.env.ERASE_DB_ON_SYNC_FOR) {
    await Promise.all(process.env.ERASE_DB_ON_SYNC_FOR.split(",").map(model => _models.default[model].deleteMany({})));
  }

  if (process.env.SEED_DB_WITH) {
    process.env.SEED_DB_WITH.split(",").map(model => (0, _mock.createMockModel)(model));
  }

  app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${process.env.PORT}...`));
});
//# sourceMappingURL=index.js.map