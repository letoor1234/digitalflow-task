const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, ".env") });

/**SETINGS */
app.set("port", process.env.PORT || 5000);
/**End SETINGS */

/**MIDDLEWARES */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/**End MIDDLEWARES */

/**DB */
mongoose.connect(
    process.env.DEVELOP_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (db) => {
        console.log("database connected");
    }
);

/**End DB */

/**STATICS */
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
/**End Statics */

/**ROUTES */
app.use("/api", routes);
/**End ROUTES */

/**SERVER */
app.listen(app.get("port"), () => {
    console.log("Server on port:  ", app.get("port"));
});
/**End SERVER */
