// this will load app which contains our main structure and logic
import app from "./app";
// use this line to get port from environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
      console.log("🦄  listening on port " + PORT);
});