https://medium.com/@khaledb.yahya/convert-your-existing-react-jsapp-to-android-app-using-the-ionic-capacitor-94046389ba53

troubleshooting
- https://stackoverflow.com/questions/38096225/automatically-accept-all-sdk-licences/48489942

rmdir /s /q android
npm run build
ionic capacitor add android 
cd android
echo sdk.dir=C\:\\Users\\flavi\\AppData\\Local\\Android\\Sdk >> local.properties
npx cap open android
IMPORTARE LE ICONE DA android_app_icon A \android\app\src\main\res