import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f5e9',  // verde muy claro para fondo suave
  },

  headerImage: {
    width: '100%',
    height: 380,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 25,
    right: 25,
    zIndex: 20,
  },

  logoutButton: {
    backgroundColor: '#e74c3c', // rojo vibrante
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#e74c3c',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a4d3a', // verde oscuro elegante
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  userIcon: {
    marginRight: 8,
  },

  username: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1a3d1a',
    position: 'absolute',
    top: 400,
    alignSelf: 'center',
    zIndex: 5,
    textShadowColor: '#a3cfa3',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },

  buttonsContainer: {
    marginTop: 90,
    paddingHorizontal: 30,
    gap: 24,
  },

  optionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },

  optionIcon: {
    fontSize: 28,
    color: 'white',
  },

  optionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
    backgroundColor: '#f1f9f1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 15,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -5 },
    paddingVertical: 10,
  },

  navIcon: {
    fontSize: 32,
    color: '#2a4d3a',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
  },

  navItemActive: {
    borderBottomWidth: 4,
    borderColor: '#4CAF50',
  },

  navIconActive: {
    color: '#4CAF50',
  },
});

export default homeStyles;
