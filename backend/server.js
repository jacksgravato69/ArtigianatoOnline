const app = require('./app');
const port = 3000;

//Quando viene creato il server, stampo un messaggio del link di dove si trova
app.listen(port,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});



