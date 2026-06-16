// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  wordpressWS: 'http://proempresa.test/proempresa-server',
  proempresaFormsWS: {
    URL: 'https://gw-qa-wso2.proempresa.com.pe:443',
    tokenURL: 'https://token-dev-wso2.proempresa.com.pe:443',
    credentials: {
      cliend_id: 'RnDui5KkwHKiJP3hz9sOjAzFQkAa',
      client_secret: '_noJl8QPLh13jb3f00vAiq_txNca'
    }
  },
  recaptcha: {
    siteKey: '6LfKNi0cAAAAACeYwFRY9_d_qjGhpiwYUo5gNW5-',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
