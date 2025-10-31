const admin = require("firebase-admin");

// Initialize with service account
const serviceAccount = require("/Users/mtsrdr/Library/Mobile Documents/com~apple~CloudDocs/Development/Keys/EditForce/Firebase/editforce-4834f-firebase-adminsdk-9x9sn-71673608ee.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Example query
async function runQuery() {
  try {
    console.log("Running query...");

    const snapshot = await db
      .collection("users")
      .where("subscription_status", "==", "active")
      .where("subscription_cancel_at_period_end", "==", false) // Only check subscriptions set to cancel at period end
      .where("subscription_type", "==", "manual") // Only check manual subscriptions
      .get();

    console.log("Query results:");

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });

    console.log("Query completed.");
  } catch (error) {
    console.error("Error:", error);
  }
}

runQuery();
