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

| Ressource | URL |
|-----------|-----|
| **GitHub** | https://github.com/Mamady10/safepit |
| **Vercel (prod)** | https://safepit.vercel.app |
| **Dashboard Vercel** | https://vercel.com/konadata/safepit |

Variable d'environnement production :
```
NEXT_PUBLIC_APP_URL=https://safepit.com
```

### Domaine safepit.com (DNS à configurer)

Le domaine est ajouté sur Vercel. Chez votre registrar (actuellement nameservers Afternic), configurez :

| Type | Nom | Valeur |
|------|-----|--------|
| **A** | `@` | `76.76.21.21` |
| **A** | `www` | `76.76.21.21` |

Ou basculez les nameservers vers Vercel : `ns1.vercel-dns.com` / `ns2.vercel-dns.com`.

Après propagation DNS (5 min à 48 h), `https://safepit.com` pointera vers SafePit — **pas** vers KonaData.

## KonaData (konadata.com)

Le projet ERP reste dans `C:\Users\Administrator\Projects\guinea-pwa`.  
SafePit n'y apparaît plus — deux produits, deux déploiements, deux domaines.
