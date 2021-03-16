import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Dialog from 'react-native-dialog';
import firebase from './../database/firebase';

import { MaterialIcons } from '@expo/vector-icons';

const Normal = (props) => {
    const [dialogoVisible, setDialogoVisible] = useState(false);
    const [tiempo, setTiempo] = useState(60);
    const colores = ['#dc3545', '#007bff'];
    const opciones = ['ROJO', 'AZUL'];
    const [nombre, setNombre] = useState('');
    const [color, setColor] = useState();
    const [texto, setTexto] = useState();
    const [puntaje, setPuntaje] = useState(0);

    /**
     * Creamos un hook para inicializar un intervalo de tiempo que espere
     * siempre un segundo, a diferencia de los hooks que habíamos realizado
     * con anterioridad, esta ocasión enganchamos el efecto para que se
     * realice cada vez que se actualice el tiempo, de esta manera
     * logramos que se actualice cada segundo
     */
    useEffect(() => {
        setColor(colores[Math.floor(Math.random() * 2)]);
        setTexto(opciones[Math.floor(Math.random() * 2)]);
    }, []);

    useEffect(() => {
        if (tiempo == 0) {
            setDialogoVisible(true);
        } else {
            const temporizador = setTimeout(() => {
                setTiempo(tiempo - 1);
            }, 1000);
        }
    }, [tiempo]);

    const tapBoton = (opcion) => {
        if (opcion != texto) {
            setPuntaje(puntaje - 5);
        } else {
            setPuntaje(puntaje + 5);
        }
        setColor(colores[Math.floor(Math.random() * 2)]);
        setTexto(opciones[Math.floor(Math.random() * 2)]);
    };

    const guardarFirestore = async () => {
        try {
            let fecha = new Date();
            let dd = fecha.getDate();
            let mm = fecha.getMonth() + 1;
            let yyyy = fecha.getFullYear();
            const puntajeFS = await firebase.db.collection('puntajes').add({
                puntaje: puntaje,
                nombre: nombre,
                dificultad: 'Normal',
                fecha: `${dd} - ${mm} - ${yyyy}`,
            });
        } catch (e) {
            Alert.alert('ERROR', 'Intentalo más tarde', [
                {
                    text: 'Salir',
                },
            ]);
        }
        props.navigation.navigate('Dificultad');
        setDialogoVisible(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Dialog.Container visible={dialogoVisible}>
                    <Dialog.Title>Juego terminado</Dialog.Title>
                    <Dialog.Description>
                        Introduce tu nombre para guardarlo en la tabla de
                        puntuaciones
                    </Dialog.Description>
                    <Dialog.Input
                        placeholder='Nombre'
                        value={nombre}
                        onChangeText={(val) => {
                            setNombre(val);
                        }}
                    />
                    <Dialog.Button
                        label='Salir'
                        onPress={() => {
                            props.navigation.navigate('Dificultad');
                        }}
                    />
                    <Dialog.Button
                        label='Volver a jugar'
                        onPress={() => {
                            setPuntaje(0);
                            setTiempo(60);
                            setDialogoVisible(false);
                        }}
                    />
                    <Dialog.Button
                        label='Guardar puntaje'
                        onPress={guardarFirestore}
                    />
                </Dialog.Container>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                }}
            >
                <Text style={{ flex: 1, textAlign: 'center' }}>
                    <MaterialIcons name='timer' size={64} color='#000' />
                </Text>
                <Text
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 30,
                    }}
                >
                    {tiempo}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                }}
            >
                <Text style={{ flex: 1, textAlign: 'center' }}>
                    <MaterialIcons name='adjust' size={64} color='#000' />
                </Text>
                <Text
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 30,
                    }}
                >
                    {puntaje}
                </Text>
            </View>
            <View>
                <Text
                    style={{
                        fontSize: 40,
                        alignSelf: 'center',
                        marginVertical: 10,
                        color: color,
                    }}
                >
                    {texto}
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                }}
            >
                <TouchableOpacity
                    style={{
                        margin: 5,
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#dc3545',
                        overflow: 'hidden',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        tapBoton('ROJO');
                    }}
                >
                    <Image
                        source={require('./../../assets/images/rojo.png')}
                        style={{ resizeMode: 'contain', height: 200 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        margin: 5,
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#007bff',
                        overflow: 'hidden',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        tapBoton('AZUL');
                    }}
                >
                    <Image
                        source={require('./../../assets/images/azul.png')}
                        style={{ resizeMode: 'contain', height: 200 }}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Normal;
