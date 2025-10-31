Test Firestore queries easily.

## Setup

First, you'll need:
1. **Service Account Key**: Download from Firebase Console → Project Settings → Service Accounts → Generate New Private Key
2. **Firebase Admin SDK**: Install the necessary tools

## Method 1: Using Node.js Script (Recommended)

Install the Firebase Admin SDK:
```bash
npm install firebase-admin
```

Create a script (e.g., `query-firestore.js`):

```javascript
const admin = require('firebase-admin');

// Initialize with service account
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Example query
async function runQuery() {
  try {
    const snapshot = await db.collection('your-collection')
      .where('field', '==', 'value')
      .get();
    
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

runQuery();
```

Run it:
```bash
node query-firestore.js
```
