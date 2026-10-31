# CLAUDE.md — theme.park (fork)

Fork personnel de [GilbN/theme.park](https://github.com/GilbN/theme.park) :
thèmes CSS injectés dans des applications auto-hébergées (Sonarr, Jellyfin…).

Les consignes de travail du projet amont sont dans AGENTS.md, importé
ci-dessous. Les règles de cette section **priment** sur lui quand elles
divergent.

@AGENTS.md

## Spécificités du fork

- Branche principale : `master`. Il n'y a ni `develop` ni `testing` dans ce
  fork : partir de `origin/master` à jour et cibler `master` pour les PR
  (AGENTS.md parle de `develop`, cela vaut pour le dépôt amont).
- Les jobs de publication amont (`auto-build`, `docker-build`,
  `minify-and-deploy`) sont sautés dans les forks (`if: !github.event.repository.fork`). Ne pas les réactiver.
- Synchronisation avec l'amont : fusion de `GilbN/theme.park` `master` dans
  notre `master`, dans une PR dédiée, sans mélanger d'autres changements.

## Commandes

```bash
npm ci && npm test        # tests Playwright (chaque thème × sonarr-base)
python3 dev/serve.py      # sert le dossier courant sur :8000 sans cache (setups dev/)
```

Dans une session cloud Claude Code, Chromium est préinstallé :
`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium npm test`, sans
`playwright install`.

CI : `.github/workflows/tests.yml` lance les mêmes tests sur chaque PR.

## Repères

- `.claude/skills/unslop/` : le skill `unslop` qu'AGENTS.md demande
  d'appliquer à tout texte, copié de la source citée dans AGENTS.md (seul
  changement : Claude peut l'appeler de lui-même). Le rafraîchir depuis
  cette source plutôt que de modifier ses règles.
- CSS propre à une app : `css/base/<app>/<app>-base.css`.
- Variables de thème : `css/theme-options/`, `css/community-theme-options/`.
- Wrappers `<app>/<theme>.css` générés par `themes.py` : ne pas les éditer
  ni les commiter.

## Tenir ce fichier à jour

Ce fichier ne décrit que ce qui est propre au fork. Toute modification des
branches, de la CI ou des commandes ci-dessus le met à jour **dans le même
commit**. Les leçons sur une app vont dans `dev/<app>/README.md`, comme le
demande AGENTS.md.
