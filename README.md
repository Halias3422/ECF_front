# Front-end ECF

1. Installation des dépendences requises

```
yarn
```

2. Lancer l'application en local (avec .env.development)

```
yarn dev
```

3. Pour simuler la production (avec .env.production)

```
yarn build && yarn start
```

## Autres commandes:

Formattage

```
yarn prettier
```

Lancer Cypress (le front et le back doivent être en cours d'exécution (yarn dev))

```
yarn test // ou yarn cypress open pour ouvrir l'interface web
```
