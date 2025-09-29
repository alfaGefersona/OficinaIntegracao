import React from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useBluetoothDevices } from "@/hooks/use-bluetooth-devices";

export default function BluetoothScreen() {
    const { devices, connectedDevice, startScan, connectToDevice, disconnectDevice } = useBluetoothDevices();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dispositivos Bluetooth</Text>

            <Button title="🔍 Escanear" onPress={startScan} />

            {connectedDevice ? (
                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.connected}>
                        ✅ Conectado a: {connectedDevice.name || connectedDevice.id}
                    </Text>
                    <Button title="Desconectar" onPress={disconnectDevice} color="red" />
                </View>
            ) : (
                <Text style={styles.status}>Nenhum dispositivo conectado</Text>
            )}

            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.device}
                        onPress={() => connectToDevice(item.id)}
                    >
                        <Text style={styles.deviceText}>{item.name || "Sem nome"}</Text>
                        <Text style={styles.deviceId}>{item.id}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    connected: { marginBottom: 10, color: "green", fontWeight: "600" },
    status: { marginVertical: 10, fontSize: 14, color: "#555" },
    device: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    deviceText: { fontSize: 16, fontWeight: "600" },
    deviceId: { fontSize: 12, color: "#666" },
});
