// importer l'application BE
const app = require("./backend/app");

app.listen(3000, () => {
  console.log("Express Application is running on Port 3000");
});
