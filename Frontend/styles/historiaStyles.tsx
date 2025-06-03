import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 15 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#28a745', marginBottom: 5 },
  descripcion: { fontSize: 15, color: '#333', marginBottom: 15 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timeline: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  timelineFecha: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007b00',
    marginTop: 2,
  },
  flecha: {
    marginLeft: 6,
  },
});

export default styles;