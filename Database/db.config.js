const config = {
    database: 'my-atm-app',
    server: 'DESKTOP-OMPTOBA',
    driver: 'msnodesqlv8',
    port: 1433,
    options: {
        trustedConnection: true,
        instanceName: "MYATM",
        encrypt:false
    },
    
}

module.exports = config;