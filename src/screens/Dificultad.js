import React from 'react';
import { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    FlatList,
    Image,
    LogBox,
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firebase from './../database/firebase';

const Dificultad = (props) => {
    LogBox.ignoreLogs(['Setting a timer']);
    const [dificultadSeleccionada, setDificultadSeleccionada] = useState(
        'Normal'
    );
    const [puntajes, setPuntajes] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getPuntajesFS(dificultadSeleccionada);
        Alert.alert(
            'Bienvenido',
            'El juego consiste en seleccionar el botón del color indicado en el texto que aparezca en pantalla; cuando el botón seleccionado sea el correcto, se sumarán 5 puntos, en caso contrario se restará 5 puntos.',
            [
                {
                    text: 'Entendido',
                },
            ]
        );
    }, []);

    const getPuntajesFS = async (dificultad) => {
        setRefresh(true);
        try {
            const query = await firebase.db
                .collection('puntajes')
                .where('dificultad', '==', dificultad)
                .get();

            const arrPuntajes = [];

            if (!query.empty) {
                query.docs.forEach((doc) => {
                    arrPuntajes.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                    arrPuntajes.sort((a, b) => {
                        return b.puntaje - a.puntaje;
                    });
                });
                setPuntajes(arrPuntajes);
                console.log(puntajes);
            }
        } catch (e) {
            console.warn(e.toString());
        }
        setRefresh(false);
    };

    const checkPosiciones = (index) => {
        switch (index) {
            case 0:
                return require('./../../assets/images/first.png');
            case 1:
                return require('./../../assets/images/second.png');
            case 2:
                return require('./../../assets/images/third.png');
            default:
                return require('./../../assets/images/otros.png');
                break;
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'space-around',
            }}
        >
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                }}
            >
                ¡A jugar!
            </Text>
            <Button
                title='Normal'
                color='blue'
                onPress={() =>
                    Alert.alert(
                        'Normal',
                        '2 colores (Rojo, Azul)\n60 segundos',
                        [
                            {
                                text: 'Comenzar',
                                onPress: () => {
                                    props.navigation.navigate('Normal');
                                },
                            },
                        ]
                    )
                }
            />
            <Button
                title='Dificil'
                color='red'
                onPress={() =>
                    Alert.alert(
                        'Díficil',
                        '3 colores (Rojo, Azul, Amarillo)\n60 segundos',
                        [
                            {
                                text: 'Comenzar',
                                onPress: () => {
                                    props.navigation.navigate('Dificil');
                                },
                            },
                        ]
                    )
                }
            />
            <View style={{ height: '60%' }}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                    }}
                >
                    Leaderboard
                </Text>
                <View
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        width: '95%',
                        borderWidth: 2,
                        borderColor: '#585858',
                        fontSize: 16,
                        borderRadius: 10,
                        marginVertical: 5,
                        alignSelf: 'center',
                    }}
                >
                    <Picker
                        selectedValue={dificultadSeleccionada}
                        onValueChange={(itemValue, itemIndex) => {
                            setDificultadSeleccionada(itemValue);
                            getPuntajesFS(itemValue);
                        }}
                    >
                        <Picker.Item label='Normal' value='Normal' />
                        <Picker.Item label='Díficil' value='Dificil' />
                    </Picker>
                </View>
                <FlatList
                    style={{ width: '95%', flexGrow: 0, alignSelf: 'center' }}
                    data={puntajes}
                    refreshing={refresh}
                    onRefresh={() => {
                        getPuntajesFS(dificultadSeleccionada);
                    }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                backgroundColor: '#fff',
                                padding: 20,
                                borderRadius: 10,
                                marginVertical: 5,
                                flex: 1,
                                shadowColor: '#535353',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                elevation: 2,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={checkPosiciones(index)}
                                    style={{
                                        resizeMode: 'contain',
                                        height: 50,
                                        flex: 1,
                                        marginRight: 10,
                                    }}
                                />
                                <View style={{ flex: 2 }}>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: '500',
                                        }}
                                    >
                                        {item.nombre}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: '500',
                                        }}
                                    >
                                        {item.fecha}
                                    </Text>
                                </View>

                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 15,
                                        fontWeight: '500',
                                    }}
                                >
                                    {item.puntaje} pts
                                </Text>
                            </View>
                        </View>
                    )}
                ></FlatList>
            </View>
        </SafeAreaView>
    );
};

export default Dificultad;
