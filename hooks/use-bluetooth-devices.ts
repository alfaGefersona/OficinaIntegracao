import { useEffect, useState, useCallback, useRef } from "react";
import { BleManager, Device } from "react-native-ble-plx";
import { useGetAndroidPermissions } from "./use-get-android-permissions";

export function useBluetoothDevices() {
    const { requestPermissions } = useGetAndroidPermissions();
    const [devices, setDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
    const manager = useRef(new BleManager()).current;

    const addDevice = useCallback((newDevice: Device) => {
        setDevices((prevDevices) => {
            const exists = prevDevices.find((d) => d.id === newDevice.id);
            if (!exists) {
                return [...prevDevices, newDevice];
            }
            return prevDevices;
        });
    }, []);

    const startScan = useCallback(async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            console.log("Permissões negadas!");
            return;
        }

        setDevices([]);
        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log("Erro ao escanear:", error);
                return;
            }
            if (device) addDevice(device);
        });

        setTimeout(() => {
            manager.stopDeviceScan();
        }, 10000);
    }, [manager, requestPermissions, addDevice]);

    const connectToDevice = useCallback(
        async (deviceId: string) => {
            try {
                const device = await manager.connectToDevice(deviceId);
                await device.discoverAllServicesAndCharacteristics();
                setConnectedDevice(device);
                console.log("Conectado a:", device.name || device.id);
                return device;
            } catch (error) {
                console.log("Erro ao conectar:", error);
                return null;
            }
        },
        [manager]
    );

    const disconnectDevice = useCallback(async () => {
        if (connectedDevice) {
            try {
                await manager.cancelDeviceConnection(connectedDevice.id);
                console.log("Desconectado de:", connectedDevice.name || connectedDevice.id);
                setConnectedDevice(null);
            } catch (error) {
                console.log("Erro ao desconectar:", error);
            }
        }
    }, [manager, connectedDevice]);

    useEffect(() => {
        return () => {
            manager.destroy();
        };
    }, [manager]);

    return { devices, connectedDevice, startScan, connectToDevice, disconnectDevice };
}
