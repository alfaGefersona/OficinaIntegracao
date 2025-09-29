import { useCallback } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import * as Device from "expo-device";

export function useGetAndroidPermissions() {
    const requestAndroid31Permissions = useCallback(async () => {
        const bluetoothScanPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Permissão Bluetooth",
                message: "Bluetooth Low Energy precisa de acesso",
                buttonPositive: "OK",
            }
        );

        const bluetoothConnectPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Permissão Bluetooth",
                message: "Bluetooth Low Energy precisa de acesso",
                buttonPositive: "OK",
            }
        );

        const fineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Permissão Localização",
                message: "Bluetooth Low Energy precisa de localização",
                buttonPositive: "OK",
            }
        );

        console.log("Scan:", bluetoothScanPermission);
        console.log("Connect:", bluetoothConnectPermission);
        console.log("Location:", fineLocationPermission);

        return (
            bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
            bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
            fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
        );
    }, []);

    const requestPermissions = useCallback(async () => {
        if (Platform.OS === "android") {
            if ((Device.platformApiLevel ?? -1) < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Permissão Localização",
                        message: "Bluetooth Low Energy precisa de localização",
                        buttonPositive: "OK",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                return await requestAndroid31Permissions();
            }
        }
        return true;
    }, [requestAndroid31Permissions]);

    return { requestPermissions };
}
