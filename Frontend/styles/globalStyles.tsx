
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Layout Containers
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentBox: {
    flex: 1,
    width: '96%',
    marginTop: -40,
    backgroundColor: '#30ab50',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  // Image
  imageHeader: {
    width: '97%',
    height: 410,
    resizeMode: 'cover',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  // Typography
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
  },

  // Inputs
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 10,
    marginVertical: 10,
  },
  inputError: {
    borderBottomColor: 'red',
  },

  // Buttons
  buttonGreen: {
    backgroundColor: '#23803b',
    paddingVertical: 12,
    paddingHorizontal: 55,
    borderRadius: 25,
    marginVertical: 15,
    width: '90%',
    alignItems: 'center',
    
  },
  buttonWhite: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonGray: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 20, // puedes aumentar o reducir
    borderRadius: 20,
    alignItems: 'center',

  },  
  buttonSecondary: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: -2,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonAbsoluteCenter: {
  position: 'absolute',
  top: '45%',
  left: '25%',
  width: 200,
  backgroundColor: '#5da562',
  paddingVertical: 12,
  borderRadius: 25,
  alignItems: 'center',
},
buttonTextWhite: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

});

