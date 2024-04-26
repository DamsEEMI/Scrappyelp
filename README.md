# Scrappyelp
Recherche Top 10 restaurant d'une ville 

README pour le Projet de Scrapping Yelp et Envoi de SMS via Twilio
Description

Ce projet consiste en un script Node.js utilisant Puppeteer pour scraper des informations de restaurants sur Yelp selon les préférences de l'utilisateur et envoyer ces données via SMS en utilisant l'API Twilio.
Prérequis

    Node.js
    Puppeteer
    Twilio API
    readline

Assurez-vous d'avoir Node.js installé sur votre machine ainsi qu'un compte Twilio configuré avec un numéro de téléphone SMS activé.
Installation

    Clonez ce dépôt.
    Installez les dépendances en exécutant npm install dans le dossier du projet.
    Configurez les clés API et les numéros de téléphone dans le script.

Utilisation

Lancez le script en exécutant node index.js dans le terminal. Le script vous demandera le type de nourriture et le lieu de recherche. Après avoir entré ces informations, le script scrape Yelp pour trouver des restaurants correspondants et envoie un SMS pour chaque restaurant trouvé avec le nom, les avis et l'URL.
Structure du Script

    Le script commence par lancer un navigateur Puppeteer.
    Il visite Yelp et attend que la page soit complètement chargée.
    Utilise readline pour interroger l'utilisateur sur ses préférences de recherche.
    Effectue la recherche et récupère les informations des restaurants.
    Envoie un SMS pour chaque restaurant avec Twilio.
    Ferme le navigateur et termine le script après l'envoi des SMS.

Dépannage

    Assurez-vous que votre clé API Twilio et vos numéros de téléphone sont corrects.
    Vérifiez que vous avez suffisamment de crédit Twilio pour envoyer des SMS.
    Si le script ne parvient pas à trouver des éléments sur la page Yelp, vérifiez si Yelp n'a pas changé ses éléments ou sa structure de classe.
