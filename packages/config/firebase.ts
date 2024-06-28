const projectId = process.env.FIREBASE_PROJECT_ID;

const firebaseConfig = {
	projectId,
	appId: process.env.FIREBASE_APP_ID,
	appName: "podcodar-webapp",
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: `${projectId}.firebaseapp.com`,
	storageBucket: `${projectId}.appspot.com`,
	messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export default firebaseConfig;
