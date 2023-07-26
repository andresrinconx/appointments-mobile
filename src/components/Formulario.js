import {
  View, 
  Text, 
  Modal, 
  Button, 
  SafeAreaView, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Pressable, 
  Alert 
} from 'react-native'
import React, {useState, useEffect} from 'react'
import DatePicker from 'react-native-date-picker'

// Los props son pasar variables o funciones de otros componentes
const Formulario = ({
  modalVisible, 
  cerrarModal,
  setPacientes, 
  pacientes, 
  paciente: pacienteObj, 
  setPaciente: setPacienteApp
}) => {

  const [paciente, setPaciente] = useState('')
  const [id, setId] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState(new Date())
  const [sintomas, setSintomas] = useState('')

  useEffect(() => {
    
    if(pacienteObj.paciente !== '') { // verifica si al menos tiene propiedades mayor a 0, es decir, al menos una propiedad
      setId(pacienteObj.id)
      setPaciente(pacienteObj.paciente)
      setPropietario(pacienteObj.propietario)
      setEmail(pacienteObj.email)
      setTelefono(pacienteObj.telefono)
      if (!isNaN(new Date(pacienteObj.fecha))) {
        setFecha(new Date(pacienteObj.fecha))
      }
      setSintomas(pacienteObj.sintomas)
    }
  }, [pacienteObj])

  const handleCita = () => {
    // Validar
    if([paciente, propietario, email, fecha, sintomas].includes('') ) { // si en este arreglo se incluye un '', devuelve true
      
      Alert.alert(
        'Error', // Titulo
        'Todos los campos son obligatorios', // mensaje
        // [{text: 'OK'}, {text: 'Cancelar'}] // botones
      )
      return;
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas
    };

    // Verificar si un registro es nuevo o editado
    if(id) {
      // Editando

      nuevoPaciente.id = id;

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState) // modifica de cierta forma cada elemento
      setPacientes(pacientesActualizados)
      setPacienteApp({})

    } else {
      // Nuevo

      nuevoPaciente.id = Date.now()
      setPacientes([...pacientes, nuevoPaciente]) // el setPacientes recibe un arreglo, entonces va a contener todos los pacientes que hallan y el nuevo, separados como objetos>
    }

    cerrarModal();
    setId('')
    setPaciente('')
    setPropietario('')
    setEmail('')
    setTelefono('')
    setFecha(new Date()) // fecha actual
    setSintomas('')
  }

  return (
    <Modal
        animationType='slide'
        visible={modalVisible}
    >
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>{pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable style={styles.btnCancelar}
            onLongPress={() => {
              cerrarModal()
              setPacienteApp({})
              setPaciente('')
              setId('')
              setPropietario('')
              setEmail('')
              setTelefono('')
              setFecha(new Date())
              setSintomas('')
            }}
          >
            <Text style={styles.btnCancelarTexto}>Cancelar</Text>
          </Pressable>


          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Paciente'
              placeholderTextColor='#666'
              value={paciente}
              onChangeText={setPaciente} // la funcion onChangeText se llama cuando el texto del input cambia
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Propietario'
              placeholderTextColor='#666'
              value={propietario}
              onChangeText={setPropietario}
              />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Email Propietario'
              placeholderTextColor='#666'
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Telefono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Telefono Propietario'
              placeholderTextColor='#666'
              keyboardType='number-pad'
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>

            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                locale='es'
                onDateChange={ (date) => setFecha(date)} // date se pasa automaticamente con el DatePicker
              />
            </View>
          </View>
          
          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder='Sintomas paciente'
              placeholderTextColor='#666'
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable
            style={styles.btnNuevaCita}
            onPress={handleCita}
          >
            <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
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
  btnCancelar: {
    marginTop: 20,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#5827A4',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 16,
  },
})

export default Formulario
