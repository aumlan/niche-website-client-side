const firebaseConfig = {
  // apiKey: "AIzaSyBg_ZceQI3iWXXq8WvtmqA9PHrBHvDMIDw",
  // authDomain: "drone-ecommerce.firebaseapp.com",
  // projectId: "drone-ecommerce",
  // storageBucket: "drone-ecommerce.appspot.com",
  // messagingSenderId: "1050648295408",
  // appId: "1:1050648295408:web:707758c4a80440c6604f35"
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export default firebaseConfig;
