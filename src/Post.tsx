import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {reqPost} from './Api/reqPost';
import {DatosListado} from './Api/Interfaces/reqRespDatos';
import {StackScreenProps} from '@react-navigation/stack';
import {mmkv} from './Login';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {modalContext} from './context/modalContext';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props extends StackScreenProps<any, any> {}

export const Post = ({navigation}: Props) => {
  const [datos, setDatos] = useState<DatosListado[]>([]);
  const [favoritos, setFavoritos] = useState<DatosListado[]>([]);

  const {open, setOpen} = useContext(modalContext);

  const isFocused = useIsFocused();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reqPost.get<DatosListado[]>('/posts');
        mmkv.setMapAsync('Datos', response.data);
        const datosFromStorage = await mmkv.getMapAsync('Datos');
        setDatos(datosFromStorage as DatosListado[]);

        await mmkv.setMapAsync('Favoritos', favoritos);
        setisLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Favoritos en el POST:', JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    ActualizarFavoritos();
  }, [isFocused]);

  const ActualizarFavoritos = async () => {
    const favoritosFromStorage = await mmkv.getMapAsync('Favoritos');
    setFavoritos(favoritosFromStorage as unknown as any);
  };

  const showToast = (type: string, text1: string) => {
    Toast.show({

      // type:'tomatoToast',
      // props: { uuid: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70' }

       type: type,
       text1: text1,
       visibilityTime:2000,
      //text2: 'This is some something 👋'
      
    });
  }
  const [icon, setIcon] = useState<number>(0)

  const handleAddFavorito = async (item: DatosListado) => {
    const isFavorite = favoritos.some(favorite => favorite.id === item.id);

    try {
      if (!isFavorite) {
        setFavoritos([...favoritos, item]);
        await mmkv.setMapAsync('Favoritos', [...favoritos, item]);
        showToast('success', '¡ Item añadido con exito !');
        setIcon(item.id)

      } else {
        showToast('error', '¡ Este item ya está añadido a favoritos !');
        //setOpen(true)
        await mmkv.setMapAsync('Favoritos', favoritos);
        // Alert.alert("","Este item ya existe...")
      }
    } catch (error) {
      console.error('Error al manejar la adición de favoritos:', error);
    }
  };

 

  useEffect(() => {
    console.log('Open', open);
    //setOpen(false)
  }, [open]);

  const navegarFavoritos = () => {
    navigation.navigate('FavoritosScreen');
  };

  useEffect(() => {
   console.log("favoritos",favoritos.some(favoritos => favoritos.id === 1))
  }, [favoritos])
  

  return (
    <>
    
      <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          className="h-full w-full absolute"
          source={{
            uri: 'https://cdn.pixabay.com/photo/2017/01/24/03/54/plants-2004492_1280.jpg',
          }}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={datos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '95%',
                    margin: 10,
                    backgroundColor: 'white',
                    borderRadius: 30,
                    elevation: 10,
                    paddingHorizontal: 10,
                    alignSelf: 'center',
                  }}>
                  <View style={{width: '75%'}} className='space-y-4'>
                    <Text  className="text-black text-center font-extrabold	text-base">
                      {item.title}
                    </Text>

                    <Text className="text-black text-justify	">
                      {item.body}
                    </Text>
                  </View>

                  <View style={ {}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'transparent',
                        padding: 15,
                        borderRadius: 15,
                        margin: 10,
                      }}
                      onPress={() => handleAddFavorito(item)}>
                      {/* <Text className="text-center">Añadir a favoritos</Text> */}
                      <MaterialCommunityIcons  
                        name={ favoritos.some(favoritos => favoritos.id === item.id) ?  "check-bold" : "heart-plus"} 
                        color={ favoritos.some(favoritos => favoritos.id === item.id) ?  "#257a04" : "#eb4034"} 
                        size={40}
                       />
                      
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            initialNumToRender={20} // Ajusta según tus necesidades
            windowSize={15} // Ajusta según tus necesidades
          />
        )}

        {/* <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
          <TouchableOpacity
            style={{backgroundColor: 'purple', padding: 15, borderRadius: 15}}
            onPress={navegarFavoritos}>
            <Text>Ir a favoritos</Text>
          </TouchableOpacity>
        </View> */}

      </SafeAreaView>
    </>
  );
};
