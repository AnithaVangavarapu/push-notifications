import admin from "firebase-admin";
import path from "path";

//Initialize Firebase admin once
if (!admin.apps.length) {
  const serviceAccountPath = path.join(
    __dirname,
    "../../firebase_json/clinion-dy-epro-firebase-adminsdk-fbsvc-78e3163da2.json"
  );
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase initialized successfully");
}

interface PushNotificationProps {
  deviceToken: string;
  title: string;
  bodyContent: string;
}
export const pushNotification = async ({
  deviceToken,
  title,
  bodyContent,
}: PushNotificationProps) => {
  try {
    const message = {
      token: deviceToken,
      notification: {
        title,
        body: bodyContent,
      },
    };
    const result = await admin.messaging().send(message);
    console.log("Notification Result:", result);

    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to send  notification:", error);

    return {
      success: false,
      error: {
        code: 500,
        message: "Failed to send notification",
      },
    };
  }
};
