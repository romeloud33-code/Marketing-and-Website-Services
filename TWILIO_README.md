# Twilio Integration & API Keys

This guide contains the credentials and setup instructions for your Web Phone dialer's Twilio Serverless backend.

## 🔑 API Credentials
- **API SID:** `SK70c86c443ddbb7cc5e5f06d60a309c92`
- **API Secret:** `gbbStOG35lx3I6Crldw88AAs6oplBhnl`

## ⚙️ Environment Variables
Add these key-value pairs to your **Twilio Functions > Services > Settings > Environment Variables** tab:

1. `API_KEY` = `SK70c86c443ddbb7cc5e5f06d60a309c92`
2. `API_SECRET` = `gbbStOG35lx3I6Crldw88AAs6oplBhnl`
3. `MY_CELL_PHONE` = `+14695045883`
4. `TWILIO_NUMBER` = *(Your purchased Twilio phone number)*
5. `TWIML_APP_SID` = *(Your TwiML App SID from Step 5)*
