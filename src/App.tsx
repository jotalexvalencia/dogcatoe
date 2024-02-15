import React, { useState, useEffect  } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,  
  View,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';;
import Sound from 'react-native-sound';

let globalSound: Sound | null = null; // Variable global para rastrear la instancia de sonido

function App(): React.JSX.Element {
  const [isCat, setIsCat] = useState<boolean>(false)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty',0,9)) // llenar con 'empty' ,desde la posición 0, hasta la posición 9 sin incluirlo
  const [catSound, setCatSound] = useState<Sound | null>(null);
  const [dogSound, setDogSound] = useState<Sound | null>(null);
  const [gameSound, setGameSound] = useState<Sound | null>(null);
  const [globalSound, setGlobalSound] = useState<Sound | null>(null); 

   useEffect(() => {
    const loadSounds = async () => {
      try {
        const catSoundInstance = new Sound('cat.mp3', Sound.MAIN_BUNDLE);
        await catSoundInstance.play();
        const dogSoundInstance = new Sound('dog.mp3', Sound.MAIN_BUNDLE);
        await dogSoundInstance.play();
        const gameSoundInstance = new Sound('game.mp3', Sound.MAIN_BUNDLE);
        await gameSoundInstance.play();
        
        setCatSound(catSoundInstance);
        setDogSound(dogSoundInstance);
        setGameSound(gameSoundInstance);
      } catch (error) {
        console.log('Error al cargar los sonidos', error);
      }
    };

    loadSounds();
  }, []);


   useEffect(() => {
    return () => {
      catSound?.release();
      dogSound?.release();
      gameSound?.release();
    };
  }, [catSound, dogSound, gameSound]);

  const reloadGame = () => { 
   globalSound?.stop();    
    setIsCat(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty',0,9))
    
  }

  const checkIsWinner = () => {
  
    //  checking  winner of the game
   globalSound?.stop();
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
      if (gameState[0] === 'cat' && catSound) {        
        setGlobalSound(catSound);
        catSound.play();
      } else if (gameState[0] === 'dog' && dogSound) {
        setGlobalSound(dogSound);
        dogSound.play();
      }
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
       if (gameState[3] === 'cat' && catSound) {
        setGlobalSound(catSound);
        catSound.play();
      } else if (gameState[3] === 'dog' && dogSound) {
        setGlobalSound(dogSound);
        dogSound.play();
      }
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
       if (gameState[6] === 'cat' && catSound) {
       setGlobalSound(catSound);
        catSound.play();
      } else if (gameState[6] === 'dog' && dogSound) {
        setGlobalSound(dogSound);
        dogSound.play();
      }
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
 if (gameState[0] === 'cat' && catSound) {
        setGlobalSound(catSound);
        catSound.play();
      } else if (gameState[0] === 'dog' && dogSound) {
         setGlobalSound(dogSound);
        dogSound.play();
      }
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
       if (gameState[1] === 'cat' && catSound) {
        setGlobalSound(catSound);
        catSound.play();
      } else if (gameState[1] === 'dog' && dogSound) {
        setGlobalSound(dogSound);
        dogSound.play();
      }
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
       if (gameState[2] === 'cat' && catSound) {
        setGlobalSound(catSound);
        catSound.play();
      } else if (gameState[2] === 'dog' && dogSound) {
        setGlobalSound(dogSound);
        dogSound.play();
      }
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
       if (gameState[0] === 'cat' && catSound) {
        setGlobalSound(catSound);
        catSound.play();
      } else if (gameState[0] === 'dog' && dogSound) {
       setGlobalSound(dogSound);
        dogSound.play();
      }
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
 if (gameState[2] === 'cat' && catSound) {
        setGlobalSound(catSound);
        catSound.play();
      } else if (gameState[2] === 'dog' && dogSound) {
        setGlobalSound(dogSound);
        dogSound.play();
      }
    } else if (!gameState.includes('empty', 0)) { // para comenzar la busqueda desde el indice 0
      setGameWinner('Draw game... ⌛️');
    }
   
  }

  const onChangeItem = (itemNumber: number) => {
   globalSound?.stop();
   setGlobalSound(gameSound);
   gameSound?.play();
    if(gameWinner){ 
      
      if ((
  gameState[0] === 'cat' || gameState[1] === 'cat' || gameState[2] === 'cat' ||
  gameState[3] === 'cat' || gameState[4] === 'cat' || gameState[5] === 'cat' ||
  gameState[6] === 'cat' || gameState[7] === 'cat' || gameState[8] === 'cat') && catSound
) {
    setGlobalSound(catSound);
    catSound.play();
} else if ((
  gameState[0] === 'dog' || gameState[1] === 'dog' || gameState[2] === 'dog' ||
  gameState[3] === 'dog' || gameState[4] === 'dog' || gameState[5] === 'dog' ||
  gameState[6] === 'dog' || gameState[7] === 'dog' || gameState[8] === 'dog') && dogSound
) {
    setGlobalSound(dogSound);
    dogSound.play();
}


      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF'
      })

      
    }

    if(gameState[itemNumber]=== 'empty'){
      gameState[itemNumber] = isCat ? 'cat' : 'dog'
      setIsCat(!isCat)
            
    } else {
      Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "red",
        textColor: "#FFF"

      })
    }
    checkIsWinner()
  }

  

  
  return (
    <SafeAreaView >
      <StatusBar   />
      {gameWinner ?  ( 
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View 
        style={[
          styles.playerInfo,
          isCat ? styles.playerCat : styles.playerDog
        ]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCat ? '😺' : '🐶'}'s Turn
          </Text>

        </View>
      )}
      { /* Game Grid */ }
      <FlatList 
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item, index}) => (
        <Pressable
        key={index}
        style={styles.card}
        onPress={() => onChangeItem(index)}
        >
          <Icons name={item}  />
        </Pressable>
      )}
      />
      {/* game action */}
      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ?  'Start new game ' :  'reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerCat: {
    backgroundColor: '#EC4849',
  },
  playerDog: {
    backgroundColor: '#26ae60',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;