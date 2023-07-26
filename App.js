import React, {useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView, 
  StyleSheet,
  Text
} from 'react-native'; // estos son componentes, piezas de interfaz que se utilizan en la app
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';

const App = () => {

  // los hooks se colocan en la parte superior
  const [modalVisible, setModalVisible] = useState(false) // modalVisible es una variable con info y setModalVisible es una funcion que modifica esa variable, y ya esta, sin mas complicacion
                                                          // Podemos pasar como argumento un valor inicial
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [modalPaciente, setModalPaciente] = useState(false)

  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id); // se queda solo con los elementos de la condicion
    setPaciente(pacienteEditar[0])
  }

  const pacienteEliminar = id => {
    Alert.alert(
      'Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        { text: 'Si, Eliminar', onPress: () => {
          const pacientesActualizados = pacientes.filter( pacientesState => pacientesState.id !== id )
          setPacientes(pacientesActualizados)
        }}
      ]
    )
  }

  const cerrarModal = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de {''}
        <Text style={styles.tituloBold}>Citas</Text>
      </Text>

      

      <Pressable
        onPress={ () => setModalVisible(true) }
        style={styles.btnNuevaCita}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {pacientes.length === 0 ? // Devuelve el numero de elementos
        <Text style={styles.noPacientes}>No hay pacientes aun</Text> : 
        <FlatList
          style={styles.listado}
          data={pacientes} // Datos que va a renderizar, un arreglo de objetos (en este caso)
          keyExtractor={(item) => item.id} // identifica de manera única cada elemento
          renderItem={({item}) => { // define cómo se renderizará cada elemento
            return ( // cada item va a ser x
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
                setPaciente={setPaciente}
              />
            )
          }}
        />
      }

      {modalVisible && ( // si modalVisible es verdadera se renderiza el parentesis, si no no se renderiza nada
        <Formulario
          cerrarModal={cerrarModal} // la parte de la izquierda es el nombre del prop, la de la derecha el valor, como en un objeto
          setPacientes={setPacientes}
          pacientes={pacientes}
          setPaciente={setPaciente}
          paciente={paciente}
        />
      )}

      

      <Modal
        visible={modalPaciente}
        animationType='slide'
      >
        <InformacionPaciente 
          paciente={paciente}
          setModalPaciente={setModalPaciente}
          setPaciente={setPaciente}
        />
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
    marginHorizontal: 60
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6028D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
