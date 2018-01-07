<h1>Fashion Frau</h1>

Build Project for Production run: `npm run build`

Start Project for Development run: `npm i && npm start`

Deploy locally: `cp -R dist/ /usr/local/var/www`

Start nginx locally: `brew services start nginx`


TODO: open look at modal in look list

TODO: Double click look list generates error


Concepts:
components -> view -> something which generates html code
reducer -> is a function that returns a piece of application state
container -> is a component with access/connection directly the state of redux / change the state of app / needs to talk with redux
middlewares -> functions where actions passthrough them before hitting the reducer
