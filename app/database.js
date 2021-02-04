const { Pool } = require('pg');

// Les informations de connexion sont récupérées dans l'environnement
// PGDATABASE pour la base de données
// PGHOST pour l'hôte
// PGUSER pour l'utilisateur
// PGPASSWORD pour le mot de passe
const db = new Pool();

module.exports = db;