/*
=====================================================
BANGLADESH EMERGENCY ALERT
Firebase Cloud Messaging Service Worker
=====================================================
*/

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);


/*
=====================================================
FIREBASE CONFIG
=====================================================
*/

firebase.initializeApp({

  apiKey:
    "AIzaSyCr95lLjLgbeLHGnaHXV8pO45GwHOU0HIo",

  authDomain:
    "bangladesh-emergency-ale-b20aa.firebaseapp.com",

  projectId:
    "bangladesh-emergency-ale-b20aa",

  storageBucket:
    "bangladesh-emergency-ale-b20aa.firebasestorage.app",

  messagingSenderId:
    "409539260860",

  appId:
    "1:409539260860:web:d4043fe16a1061d9953bb9",

  measurementId:
    "G-MN3PMPLZXY"

});


/*
=====================================================
FIREBASE MESSAGING
=====================================================
*/

const messaging =
  firebase.messaging();



/*
=====================================================
BACKGROUND MESSAGE
=====================================================
*/

messaging.onBackgroundMessage(
  function(payload) {

    console.log(
      "[firebase-messaging-sw.js] Background message:",
      payload
    );


    const notificationTitle =
      payload.notification?.title ||
      "🚨 Bangladesh Emergency Alert";


    const notificationBody =
      payload.notification?.body ||
      "আপনার জেলার জন্য নতুন জরুরি সতর্কতা এসেছে।";


    const notificationOptions = {

      body:
        notificationBody,

      icon:
        "/bangladesh-emergency-alert/icon.png",

      badge:
        "/bangladesh-emergency-alert/icon.png",

      data:
        payload.data || {}

    };


    self.registration.showNotification(

      notificationTitle,

      notificationOptions

    );

  }
);



/*
=====================================================
NOTIFICATION CLICK
=====================================================
*/

self.addEventListener(
  "notificationclick",
  function(event) {

    event.notification.close();


    const targetUrl =
      "https://honestentities-web.github.io/bangladesh-emergency-alert/";


    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      }).then(
        function(clientList) {

          /*
           If app is already open,
           focus it.
          */

          for (
            const client of clientList
          ) {

            if (
              "focus" in client
            ) {

              return client.focus();

            }

          }


          /*
           Otherwise open the app.
          */

          if (
            clients.openWindow
          ) {

            return clients.openWindow(
              targetUrl
            );

          }

        }
      )

    );

  }
);
