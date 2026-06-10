# SafePit

Plateforme HSE indépendante pour **mines et sites industriels** (inspections, incidents, actions correctives, rapports).

**Domaine production :** [safepit.com](https://safepit.com)  
**Projet séparé de KonaData** ([konadata.com](https://konadata.com)) — aucun code partagé en production.

## Démarrage local

```bash
cd C:\Users\Administrator\Projects\safepit
npm install
npm run dev
```

Ouvrir **http://localhost:3001** (port 3001 pour ne pas conflit avec KonaData sur 3000).

**Identifiants démo :**

- Email : `hse@demo.safepit.com`
- Mot de passe : `demo1234`

## Déploiement safepit.com (Vercel)

1. Créer un **nouveau projet Vercel** depuis le dépôt `safepit` (pas `guinea-pwa`).
2. Domaine personnalisé : `safepit.com` + `www.safepit.com`.
3. Variable d'environnement :
   ```
   NEXT_PUBLIC_APP_URL=https://safepit.com
   ```

## KonaData (konadata.com)

Le projet ERP reste dans `C:\Users\Administrator\Projects\guinea-pwa`.  
SafePit n'y apparaît plus — deux produits, deux déploiements, deux domaines.
