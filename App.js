import React from 'react';
import { RefreshControl, FlatList, List, ListItem, Button, View, Text, StyleSheet, TextInput, Image, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

class Header extends React.Component {
	render() {
    return (
      <View style={styles.box1}>
            <Text style={styles.text} > Pendaftaran Anggota Perpustakaan </Text>
        </View>
    );
  }

}
class Header2 extends React.Component {
	render() {
    return (
      <View style={styles.box1}>
            <Text style={styles.text} > Perpustakaan Undiksha </Text>
        </View>
    );
  }

}
class Header3 extends React.Component {
	render() {
    return (
      <View style={styles.box1}>
            <Text style={styles.text} > Anggota Perpustakaan </Text>
        </View>
    );
  }

}

class HomeScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <Header2/>,
	};
  render() {
    return (
    	
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow' }}>
        
        <View style={{ flexDirection: 'row' }}>
        <Button
          title="Anggota"
          onPress={() => this.props.navigation.navigate('Anggota')}//menuju anggota screen
        />
        <Button
          title="Daftar"
          color="blue"
          onPress={() => this.props.navigation.navigate('Details')}//menuju detaiScreen
        />
      </View>
      </View>
    );
  }
}
class AnggotaScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <Header3/>,
	};

	constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}

  componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'https://agusyudi.000webhostapp.com/api/ambilData.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false, 

          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.nim;
  render() {
    
    return (
    	
        <View style={ styles.containerMain2 }>
      <View style={ styles.Header }>
        <Text style={ styles.TextHeader }> Daftar Anggota Perpustakaan </Text>
      </View>
         {
          this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null        
          }
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.BoxClass}>
              <Text>NIM 	: {item.nim}</Text>
              <Text>Nama 	: {item.nama}</Text>
              <Text>Jurusan : {item.jurusan}</Text>
              
            </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        /> 
        

   </View>   
      
    );
  }
}

class DataScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <Header/>,
	};
  render() {
    const { params } = this.props.navigation.state;
    const nama = params ? params.nama : null;
    return (
    	<View style={styles.box2}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Selamat{JSON.stringify(nama)} Sudah Terdaftar?</Text>
        <Button
          title="Selesai"
          onPress={() => this.props.navigation.navigate('Anggota')}
        />
      </View>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <Header/>,
	};
	 constructor()
    {
        super();
 
        this.state = { 
          nama: '',
          nim: '',
          jurusan: '',
          ActivityIndicator_Loading: false, 

        }
    }
    //fungsi mengirim data ke database
    Insert_Data_Into_MySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('https://agusyudi.000webhostapp.com/api/kirimData.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  nama : this.state.nama,
                  nim : this.state.nim,
                  jurusan : this.state.jurusan,
                  
                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                /*Alert.alert(
                  'Oops!',
                  'Something went wrong!',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )*/
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }
  render() {
    return (
      <View style={styles.containerMain}>

        <View style={styles.box2}>
            <Text style={styles.text} > Masukkan Nama Mahasiswa </Text>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
                onChangeText={(nama) => this.setState({ nama })}
              />
            </View>
            <Text style={styles.text} > Masukkan NIM Mahasiswa </Text>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
                onChangeText={(nim) => this.setState({ nim })}
              />
            </View>
            <Text style={styles.text} > Masukkan Jurusan </Text>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
                onChangeText={(jurusan) => this.setState({ jurusan })}
              />
            </View>

            <View style={{ marginTop: 10, marginLeft: 50, marginRight: 50, padding: 1 }}>
              

        		<TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle } 
                  onPress = { this.Insert_Data_Into_MySQL }>

                    <Text style = { styles.TextStyle }>KIRIM</Text>

                </TouchableOpacity>

                {
        
                this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null
                
                }
               </View>
        </View>



        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
          color="green"
        />
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Data: {
      screen: DataScreen,
    },
    Anggota: {
      screen: AnggotaScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {

  render() {
    return <RootStack />;
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#BBDEFB',
    flex: 1,
    flexDirection: 'column',
  },
  containerMain2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center'
  },
  box2: {
    flex: 2,
    backgroundColor: 'green',
    margin: 20
  },
  box3: {
    flex: 1,
    backgroundColor: 'green',
    margin: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  box4: {
    flex: 1,
    backgroundColor: 'green',
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },

  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    padding: 17,
    fontSize: 20
  },
  TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#2196F3',
      marginBottom: 20,
      width: '70%',
      borderRadius: 7 
 
    },
 
    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },

    ActivityIndicatorStyle:{
      
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    
  },
  BoxClass:
    {
      alignItems: 'flex-start',
      height: 100,
      width: 320,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      paddingTop: 5,
      paddingBottom: 5,

    },
    Header: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextHeader: {
        fontSize: 20,
        color: '#2196F3'
    }, 
});
