https://medium.com/@khaledb.yahya/convert-your-existing-react-jsapp-to-android-app-using-the-ionic-capacitor-94046389ba53


rmdir /s /q android
npm run build
ionic capacitor add android 
cd android
echo sdk.dir=C\:\\Users\\flavi\\AppData\\Local\\Android\\Sdk >> local.properties
npx cap open android
IMPORTARE LE ICONE DA android_app_icon A \android\app\src\main\res