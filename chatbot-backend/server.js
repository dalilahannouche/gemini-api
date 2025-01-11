require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env

const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Récupère la clé API depuis les variables d'environnement
const apiKey = process.env.API_KEY;

app.use(express.json());

app.post('/chat', (req, res) => {
  fetch('https://api.chatbot.com/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(req.body)
  })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: 'Erreur interne du serveur' }));
});

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});

const cors = require('cors');
app.use(cors({
  origin: 'https://portfolio2-webdev.wuaze.com'  // Remplacez par votre domaine en ligne
}));


//app.listen(3000, () => {
//  console.log('Serveur démarré sur http://localhost:3000');
//});

//const PORT = process.env.PORT || 3000; // Render fournit automatiquement le PORT via les variables d'environnement.
//app.listen(PORT, () => {
//  console.log(`Serveur démarré sur http://localhost:${PORT}`);
//});

//const cors = require('cors');
//app.use(cors({
//  origin: 'https://portfolio2-webdev.wuaze.com'  // Remplacez par votre domaine en ligne
//}));
