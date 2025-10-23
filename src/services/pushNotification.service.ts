import apn from "apn";
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
  //APNs provider options
  const options = {
    pfx: process.env.APNS_P12_PATH!, //Path to p12 file
    passphrase: process.env.APNS_P12_PASSPHRASE!, //Password for p12 file
    production: process.env.APNS_PRODUCTION === "true",
  };

  const apnProvider = new apn.Provider(options);

  //Build notification

  const notification = new apn.Notification({
    alert: {
      title,
      body: bodyContent,
    },
    sound: "default",
    topic: process.env.APNS_BUNDLE_ID,
  });
  try {
    const result = await apnProvider.send(notification, deviceToken);
    console.log("APNs Result:", result);
    apnProvider.shutdown();
    if (result.failed.length > 0) {
      return {
        success: false,
        error: {
          code: 500,
          message:
            result.failed[0].response?.reason || "Failed to send notification",
        },
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to send apns notification:", error);
    apnProvider.shutdown();
    return {
      success: false,
      error: {
        code: 500,
        message: "Failed to send notification",
      },
    };
  }
};
