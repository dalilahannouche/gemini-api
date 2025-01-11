// server.js (Côté serveur)
require('dotenv').config();  // Charger les variables d'environnement

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

const apiKey = process.env.API_KEY;  // Récupérer la clé API depuis les variables d'environnement

app.use(cors({
  origin: 'https://portfolio2-webdev.wuaze.com'  // Autoriser cette origine
}));

app.use(express.json());

// Route pour tester l'API
app.get('/', (req, res) => {
  res.send('API fonctionne correctement !');
});

// Route POST pour le chatbot
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});



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
