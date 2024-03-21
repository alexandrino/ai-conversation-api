const app = require("./app");

const { API_PORT: port = 3001 } = process.env;

init();

async function init() {
  try {
    app.listen(port, () => {
      console.log("Express App Listening on Port 3001");
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
