// server.js (Côté serveur)
require('dotenv').config();  // Charger les variables d'environnement

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

const apiKey = process.env.API_KEY;  // Récupérer la clé API depuis les variables d'environnement

// CORS configuration
app.use(cors({
  origin: 'https://portfolio2-webdev.wuaze.com'  // Autoriser le domaine de votre site en ligne
}));

app.use(express.json());

// Route pour tester l'API
app.get('/', (req, res) => {
  res.send('API fonctionne correctement !');
});

// Route POST pour le chatbot
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  // Exemple d'appel à un modèle externe (Gemini API ou autre)
  fetch('https://api.chatbot.com/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}` // Utiliser la clé API pour authentifier la requête
    },
    body: JSON.stringify({
      input: message // Passer le message de l'utilisateur à l'API
    })
  })
    .then(response => response.json())
    .then(data => {
      // Retourner la réponse du modèle
      res.json({ message: data.reply || 'Désolé, je n\'ai pas compris votre demande.' });
    })
    .catch(error => {
      console.error("Erreur lors de l'appel à l'API:", error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
