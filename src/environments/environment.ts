// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig: {
    apiKey: "AIzaSyA6lczslNB3CF8OU22x0Mby1tS1mohwuMs",
    authDomain: "casestudy-codegym.firebaseapp.com",
    databaseURL:"https://casestudy-codegym.firebaseio.com",
    projectId: "casestudy-codegym",
    storageBucket: "casestudy-codegym.appspot.com",
    messagingSenderId: "1057467314459",
    appId: "1:1057467314459:web:03600a793862015464a3be",
    measurementId: "G-YW9B3GP0TG"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
