importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCr95lLjLgbeLHGnaHXV8pO45GwHOU0HIo",
  authDomain: "bangladesh-emergency-ale-b20aa.firebaseapp.com",
  projectId: "bangladesh-emergency-ale-b20aa",
  storageBucket: "bangladesh-emergency-ale-b20aa.firebasestorage.app",
  messagingSenderId: "409539260860",
  appId: "1:409539260860:web:d4043fe16a1061d9953bb9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  console.log(
    "[firebase-messaging-sw.js] Background message:",
    payload
  );

  const notificationTitle =
    payload.notification?.title || "Bangladesh Emergency Alert";

  const notificationOptions = {
    body:
      payload.notification?.body ||
      "নতুন জরুরি সতর্কতা এসেছে।",
    icon: "/bangladesh-emergency-alert/icon.png"
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
