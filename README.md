
# Lendala Test

## Step 1: Install Dependencies

Run the following command to install dependencies:

```bash
yarn install
cd ios && pod install
```


## Step 2: Start the Metro Server

Run the following command from the root of the project:

```bash
yarn start 

   OR

react-native start
```

## Step 3: Start the Application

Open a _new_ terminal from the _root_ of the project. Run the following command to start the _iOS_ app:

```bash
yarn run ios --simulator="iPhone 14 Pro"

   OR

yarn run-ios --device
```

You can replace the selected simulator with any iPhone of your choice provided you have it installed. Eg: iPhone 11, iPhone 13 Pro.

This App should ideally be running on a physical device to showcase that Biometrics work


