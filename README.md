# systems_design_main_client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve

```

<p>To enable SSL/TLS for authentication testing, uncomment
    <br />port: "443",
    <br />https: true,
    <br />server: {
        <br />type: "https",
        <br />options: {
            <br />minVersion: "TLSv1.1",
            <br />key: fs.readFileSync(
                <br />path.join(__dirname, "./localhostcerts/Expires04-08-2023.key")
                <br />),
                <br />cert: fs.readFileSync(
                    <br />path.join(__dirname, "./localhostcerts/Expires04-08-2023.crt")
                <br />),
                <br />ca: fs.readFileSync(
                    <br />path.join(__dirname, "./localhostcerts/Expires04-08-2023.pem")
                <br />),
                <br />passphrase: "localhost",
                <br />requestCert: true,
    <br />},
<br />in vue.config.json</p>

<p>Self-signed certificate in project repo is dated and has a 1 year expirey date. Add the certificate to local dev machine's certificate store and firefox should allow https://localhost:443.</p>

<p>Chrome based browsers are still funky about self-signed certs. When self-signed cert expires, delete from machine's cert store, make a new one, add it to cert store, edit vue.config.json paths to certs and accept cert in firefox to use.</p>

<p>src/store/authModule/index.ts - uncomment logging code to log to console</p>

<p>vue.config.json - uncomment configureWebpack: { devserver: { client: { logging: "verbose" } } } for general development logging</p>



### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
