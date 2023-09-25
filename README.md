# Kune - A service for showing Zimbabwean digital services. 

This is a website I created for showing which services that are available is Zimbabwe, my home country. 

## Introduction 

### Challenge

My initial challenge is that I wanted to created apps to fill a need in Zimbabwe. My assumption was that there aren't many digital services available. This assumption turned out to be the wrong the more I researched this.  However with the research I did I discovered that it's a lot of work to find digital services, especially if you don't know what you're for. 

### Solution

My solution was to build a website the basically shows websites that  available in Zimbabwe. In addition I wanted to make core information easily available so that you wont have to look for it. 

To sum up kune provides:

- A list of services available
- Core information about the services, like phone numbers and a link to the website. 
- Websites manually added and vetted for functionality
- **Future Feature** Users can add services they know or own
- **Future Feature** Users can save favourites as the list of services get bigger. 

### Link
- Live Site URL: [Live Site ](https://kune.co.zw)

## Implementation

### Built with
- Vuejs
- **Future Feature** Mongodb and Express


### Project setup

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

### Compiles and hot-reloads for development
```bash
npm run dev
```

### Compiles and minifies for production
```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## Linting 
create a file .vscode/setting.json with the following

````
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  }
}
```

create a .eslintrc file with the following


````
{
	"extends": "@antfu"
}
```

## Author

- Name - George Mushore
- Website - [Author website](https://www.georgemushore.com/)
