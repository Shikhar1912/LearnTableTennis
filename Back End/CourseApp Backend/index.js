const express = require("express");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const { jwtAuthorization } = require("./authorization/auth");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/appbar", jwtAuthorization, async (req, res) => {
  res.send(req.user.username);
});
app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
