import {
  View, 
  Text, 
  SafeAreaView, 
  Pressable, 
  StyleSheet 
} from 'react-native'
import React from 'react'
import { formatearFecha } from '../helpers'

const InformacionPaciente = ({
    paciente: pacienteObj, 
    setModalPaciente,
    setPaciente,
}) => {

  const { paciente, propietario, email, telefono, fecha, sintomas } = pacienteObj;

  return (
    <SafeAreaView
        style={styles.contenedor}
    >
        <View>
            <Text style={styles.titulo}>Informacion {''}
                <Text style={styles.tituloBold}>Paciente</Text>
            </Text>

            <Pressable
                style={styles.btnCerrar}
                onLongPress={() => {
                    setModalPaciente(false)
                    setPaciente({})
                }}
            >
                <Text
                    style={styles.btnCerrarTexto}
                >Cerrar</Text>
            </Pressable>
        </View>

        <View
            style={styles.contenido}
        >
            <View style={styles.campo}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.valor}>{paciente}</Text>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Propietario:</Text>
                <Text style={styles.valor}>{propietario}</Text>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.valor}>{email}</Text>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Telefono:</Text>
                <Text style={styles.valor}>{telefono}</Text>
            </View>
            
            <View style={styles.campo}>
                <Text style={styles.label}>Fecha Alta:</Text>
                <Text style={styles.valor}>{formatearFecha(fecha)}</Text>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Sintomas:</Text>
                <Text style={styles.valor}>{sintomas}</Text>
            </View>

        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F59E8B',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCerrar: {
    marginTop: 20,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCerrarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  contenido: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 25,
  },
  campo: {
    marginBottom: 10,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 3,
  },
  valor: {
    fontWeight: '700',
    fontSize: 20,
    color: '#334155',
  },
})

export default InformacionPaciente