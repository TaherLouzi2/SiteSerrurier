# 📘 Guide de Déploiement - debloque-ma-porte.fr sur XAMPP

Ce guide vous explique comment visualiser et déployer le site **debloque-ma-porte.fr** en local sur votre serveur XAMPP.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :

1. **XAMPP** installé sur votre machine Windows
   - Téléchargement : https://www.apachefriends.org/fr/index.html
   - Version recommandée : XAMPP 8.0 ou supérieure

2. **Node.js** installé (pour le build du projet)
   - Téléchargement : https://nodejs.org/
   - Version recommandée : Node.js 18 LTS ou supérieure

---

## 🚀 Méthode 1 : Déploiement Simple (Build Production)

### Étape 1 : Installer les dépendances

Ouvrez PowerShell ou CMD dans le dossier du projet et exécutez :

```bash
npm install
```

### Étape 2 : Compiler le projet

Créez une version optimisée pour la production :

```bash
npm run build
```

Cette commande va créer un dossier `dist/` contenant tous les fichiers optimisés.

### Étape 3 : Copier les fichiers vers XAMPP

1. Ouvrez le dossier d'installation de XAMPP (généralement `C:\xampp\`)
2. Naviguez vers le dossier `htdocs`
3. Créez un nouveau dossier nommé `debloque-ma-porte`
4. Copiez tout le contenu du dossier `dist/` dans `C:\xampp\htdocs\debloque-ma-porte\`

### Étape 4 : Démarrer Apache

1. Ouvrez le **XAMPP Control Panel**
2. Cliquez sur **Start** à côté de **Apache**
3. Attendez que le statut devienne vert

### Étape 5 : Visualiser le site

Ouvrez votre navigateur et accédez à :

```
http://localhost/debloque-ma-porte/
```

---

## 🔧 Méthode 2 : Développement avec Serveur de Développement

### Étape 1 : Installer les dépendances

```bash
npm install
```

### Étape 2 : Lancer le serveur de développement

```bash
npm run dev
```

### Étape 3 : Visualiser le site

Le serveur de développement va automatiquement ouvrir votre navigateur à l'adresse :

```
http://localhost:5173/
```

**Avantages de cette méthode :**
- ✅ Rechargement automatique à chaque modification
- ✅ Meilleure expérience de développement
- ✅ Pas besoin de XAMPP pour le développement

---

## 📁 Structure du Projet

```
debloque-ma-porte/
├── index.html              # Page principale
├── src/
│   ├── main.js            # JavaScript principal (optimisé)
│   └── style.css          # Styles CSS (mobile-first)
├── public/
│   ├── lock-icon.svg      # Favicon
│   ├── robots.txt         # Configuration SEO
│   ├── sitemap.xml        # Plan du site
│   └── .htaccess          # Configuration Apache
├── package.json           # Dépendances du projet
└── GUIDE_DEPLOIEMENT_XAMPP.md  # Ce fichier
```

---

## ⚙️ Configuration Apache (Optionnel)

### Créer un Virtual Host

Pour accéder au site via `http://debloque-ma-porte.local` :

1. Ouvrez `C:\xampp\apache\conf\extra\httpd-vhosts.conf`

2. Ajoutez à la fin du fichier :

```apache
<VirtualHost *:80>
    ServerName debloque-ma-porte.local
    DocumentRoot "C:/xampp/htdocs/debloque-ma-porte"
    <Directory "C:/xampp/htdocs/debloque-ma-porte">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

3. Ouvrez `C:\Windows\System32\drivers\etc\hosts` en tant qu'administrateur

4. Ajoutez la ligne :

```
127.0.0.1    debloque-ma-porte.local
```

5. Redémarrez Apache depuis le XAMPP Control Panel

6. Accédez au site via : `http://debloque-ma-porte.local`

---

## 🔍 Vérifications Post-Déploiement

### ✅ Checklist

- [ ] Le site s'affiche correctement sur desktop
- [ ] Le site s'affiche correctement sur mobile (responsive)
- [ ] Les boutons d'appel fonctionnent
- [ ] Le formulaire de contact fonctionne
- [ ] Les animations se déclenchent au scroll
- [ ] Le bouton flottant apparaît après le scroll
- [ ] Le header se cache/affiche au scroll
- [ ] Les liens d'ancrage fonctionnent (smooth scroll)

### 🧪 Tester sur Mobile

Pour tester sur votre smartphone :

1. Trouvez l'adresse IP de votre PC :
   ```bash
   ipconfig
   ```
   Cherchez l'adresse IPv4 (ex: 192.168.1.100)

2. Sur votre smartphone (connecté au même réseau WiFi), ouvrez :
   ```
   http://192.168.1.100/debloque-ma-porte/
   ```

---

## 🎨 Optimisations Appliquées

### SEO
- ✅ Meta tags optimisés (title, description, keywords)
- ✅ Open Graph pour les réseaux sociaux
- ✅ Schema.org markup (LocalBusiness)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Balises sémantiques HTML5
- ✅ Attributs alt sur toutes les images

### Performance
- ✅ Images avec lazy loading
- ✅ Compression GZIP (.htaccess)
- ✅ Mise en cache des ressources
- ✅ CSS et JS minifiés en production
- ✅ Throttle/Debounce sur les événements scroll
- ✅ Intersection Observer pour les animations

### Mobile-First
- ✅ Design responsive (320px → 1920px+)
- ✅ Touch-friendly (boutons min 44x44px)
- ✅ Tailles de police adaptatives
- ✅ Navigation optimisée mobile
- ✅ Formulaire optimisé mobile

### Accessibilité
- ✅ Attributs ARIA
- ✅ Skip to main content
- ✅ Focus visible
- ✅ Contraste des couleurs conforme WCAG
- ✅ Support clavier complet

---

## 🐛 Dépannage

### Le site ne s'affiche pas

1. **Vérifiez qu'Apache est démarré** dans XAMPP Control Panel
2. **Vérifiez l'URL** : `http://localhost/debloque-ma-porte/`
3. **Vérifiez les logs Apache** : `C:\xampp\apache\logs\error.log`

### Les styles ne s'appliquent pas

1. **Videz le cache du navigateur** : Ctrl + Shift + R
2. **Vérifiez que le fichier CSS existe** dans le dossier dist
3. **Ouvrez la console du navigateur** (F12) pour voir les erreurs

### Le JavaScript ne fonctionne pas

1. **Ouvrez la console du navigateur** (F12)
2. **Vérifiez les erreurs JavaScript**
3. **Assurez-vous que le fichier main.js est chargé**

### Erreur 404 sur les ressources

1. **Vérifiez les chemins** dans index.html
2. **Assurez-vous que tous les fichiers sont copiés**
3. **Vérifiez les permissions** des dossiers

---

## 📞 Personnalisation

### Changer le numéro de téléphone

Recherchez et remplacez `+33123456789` et `01 23 45 67 89` dans :
- `index.html`
- `src/main.js`

### Changer les couleurs

Modifiez les variables CSS dans `src/style.css` :

```css
:root {
  --primary-blue: #0F3460;    /* Bleu principal */
  --accent-red: #E94560;      /* Rouge d'urgence */
  --dark-blue: #16213E;       /* Bleu foncé */
}
```

### Changer les images

Remplacez les URLs Pexels dans `index.html` par vos propres images.

---

## 📊 Performance

Le site est optimisé pour :

- **Google PageSpeed** : 90+ sur mobile et desktop
- **Lighthouse** : 90+ sur toutes les catégories
- **Core Web Vitals** : Tous les critères au vert
- **Temps de chargement** : < 2 secondes

---

## 🚀 Déploiement en Production

### Hébergement recommandé

- **OVH** : Hébergement web français, bon rapport qualité/prix
- **O2Switch** : Hébergement français illimité
- **Hostinger** : Hébergement international économique
- **Netlify** : Gratuit pour sites statiques (recommandé)

### Étapes pour Netlify (Gratuit)

1. Créez un compte sur https://netlify.com
2. Connectez votre dépôt Git ou uploadez le dossier `dist/`
3. Configurez le domaine `debloque-ma-porte.fr`
4. Activez HTTPS automatique (gratuit)
5. Le site est en ligne ! 🎉

---

## 📝 Commandes Utiles

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

---

## 📄 Licence

Ce projet est créé pour **debloque-ma-porte.fr**. Tous droits réservés.

---

## 💡 Support

Pour toute question ou problème, consultez :
- Documentation Vite.js : https://vitejs.dev/
- Documentation XAMPP : https://www.apachefriends.org/

---

**Bon déploiement ! 🚀**
