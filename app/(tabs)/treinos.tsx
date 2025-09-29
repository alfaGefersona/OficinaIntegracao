import { View, Text, StyleSheet, ScrollView } from "react-native";

const trainings = [
    { title: "Topspin", level: 1, color: "#FFA726" },   // laranja
    { title: "Backspin", level: 2, color: "#FFEB3B" }, // amarelo
    { title: "Recepção de saque", level: 3, color: "#29B6F6" }, // azul claro
    { title: "Batida", level: 1, color: "#EF5350" },   // vermelho
    { title: "Movimentação", level: 0, color: "#1E88E5" }, // azul escuro
];

export default function TreinosScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Treinos</Text>
            <ScrollView contentContainerStyle={styles.scroll}>
                {trainings.map((item, index) => (
                    <View key={index} style={[styles.card, { backgroundColor: item.color }]}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.levelText}>Nível</Text>
                        <View style={styles.levelContainer}>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.circle,
                                        { backgroundColor: i < item.level ? "#fff" : "transparent", borderColor: "#fff" },
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 50,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    scroll: {
        paddingBottom: 20,
    },
    card: {
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 12,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    levelText: {
        marginTop: 10,
        fontSize: 14,
        color: "#fff",
    },
    levelContainer: {
        flexDirection: "row",
        marginTop: 5,
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        marginRight: 6,
    },
});
