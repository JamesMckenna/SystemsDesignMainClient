# systems_design_main_client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

<p>To enable SSL/TLS for authentication testing, uncomment in vue.config.json</p>

```
    port: "443",
    https: true,
    server: {
        type: "https",
        options: {
            minVersion: "TLSv1.1",
            key: fs.readFileSync(
                    path.join(__dirname, "./localhostcerts/Expires04-08-2023.key")
                ),
                cert: fs.readFileSync(
                    path.join(__dirname, "./localhostcerts/Expires04-08-2023.crt")
                ),
                ca: fs.readFileSync(
                    path.join(__dirname, "./localhostcerts/Expires04-08-2023.pem")
                ),
                passphrase: "localhost",
                requestCert: true,
    },
```



<p>Self-signed certificate in project repo is dated and has a 1 year expirey date. Add the certificate to local dev machine's certificate store and firefox should allow https://localhost:443.</p>

<p>Chrome based browsers are still funky about self-signed certs. When self-signed cert expires, delete from machine's cert store, make a new one, add it to cert store, edit vue.config.json paths to certs and accept cert in firefox to use.</p>

<p>src/store/authModule/index.ts - uncomment logging code to log to console</p>

<p>in vue.config.json uncomment for general development logging</p>

```
 configureWebpack: { 
    devserver: { 
        client: { 
            logging: "verbose" 
        } 
    } 
}
```


### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
<p>linting happens on commit hook</p> 

```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
