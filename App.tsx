import React, { useMemo, useRef, useState } from 'react';
import { Alert, PanResponder, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';

type Pin = { id: string; latitude: number; longitude: number };
const initialRegion = { latitude: 35.6812, longitude: 139.7671, latitudeDelta: 0.12, longitudeDelta: 0.12 };

export default function App() {
  const [screen, setScreen] = useState<'home' | 'map'>('home');
  const [pins, setPins] = useState<Pin[]>([]);
  const pan = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 35 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.5,
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx < -70) setScreen('map');
    },
  })).current;

  const count = useMemo(() => pins.length, [pins]);
  const addPin = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setPins(previous => [...previous, { id: String(Date.now()) + '-' + previous.length, latitude, longitude }]);
  };
  const removePin = (id: string) => {
    Alert.alert('핀 삭제', '이 장소의 핀을 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: () => setPins(current => current.filter(pin => pin.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8F4" />
      {screen === 'home' ? (
        <View style={styles.home} {...pan.panHandlers}>
          <View style={styles.topBar}><Text style={styles.brand}>ROVIA</Text><Text style={styles.version}>V0.1</Text></View>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>THE WORLD, YOUR WAY</Text>
            <Text style={styles.heading}>계획하지 않은 길에도{'\n'}이야기는 있어.</Text>
            <Text style={styles.description}>당신만의 속도로 여행하고, 발견한 장소에 흔적을 남겨보세요.</Text>
            <TouchableOpacity accessibilityRole="button" style={styles.primary} onPress={() => setScreen('map')}>
              <Text style={styles.primaryText}>지도 탐험하기  →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}><Text style={styles.cardLabel}>MY PLACES</Text><Text style={styles.cardCount}>{count} <Text style={styles.cardUnit}>곳의 발견</Text></Text><Text style={styles.cardNote}>지도를 길게 누르지 말고, 빈 곳을 한 번 탭해 핀을 추가하세요.</Text></View>
          <Text style={styles.hint}>← 왼쪽으로 밀어서 지도 열기</Text>
        </View>
      ) : (
        <View style={styles.mapScreen}>
          <MapView style={StyleSheet.absoluteFillObject} initialRegion={initialRegion} onPress={addPin} showsCompass showsScale>
            {pins.map(pin => <Marker key={pin.id} coordinate={{ latitude: pin.latitude, longitude: pin.longitude }} title="내가 발견한 장소" description="탭하여 상세 보기" onCalloutPress={() => removePin(pin.id)} />)}
          </MapView>
          <View style={styles.mapHeader}>
            <TouchableOpacity accessibilityRole="button" style={styles.back} onPress={() => setScreen('home')}><Text style={styles.backText}>‹  홈</Text></TouchableOpacity>
            <View style={styles.badge}><Text style={styles.badgeText}>ROVIA  ·  {count} PINS</Text></View>
          </View>
          <View style={styles.mapFooter}><Text style={styles.footerTitle}>어디로 떠나볼까?</Text><Text style={styles.footerCaption}>지도 위 원하는 곳을 탭하면 핀이 추가돼요. 핀의 말풍선을 탭하면 삭제할 수 있어요.</Text></View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F8F4' },
  home: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: 25, fontWeight: '900', letterSpacing: 5, color: '#1F4539' },
  version: { fontSize: 11, letterSpacing: 2, color: '#81918A' },
  hero: { flex: 1, justifyContent: 'center', paddingBottom: 10 },
  eyebrow: { fontSize: 11, letterSpacing: 3, color: '#608572', fontWeight: '700', marginBottom: 26 },
  heading: { fontSize: 31, lineHeight: 45, fontWeight: '800', color: '#173A30' },
  description: { fontSize: 15, lineHeight: 25, color: '#6D7D73', marginTop: 19, maxWidth: 290 },
  primary: { backgroundColor: '#224D3D', paddingVertical: 19, paddingHorizontal: 25, borderRadius: 15, alignSelf: 'flex-start', marginTop: 35 },
  primaryText: { color: 'white', fontSize: 16, fontWeight: '700' },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 22, marginBottom: 22 },
  cardLabel: { color: '#7E9788', fontSize: 10, letterSpacing: 2, fontWeight: '800' },
  cardCount: { color: '#234C3A', fontSize: 34, fontWeight: '800', marginTop: 10 },
  cardUnit: { fontSize: 14, fontWeight: '500' },
  cardNote: { marginTop: 12, color: '#839187', fontSize: 12, lineHeight: 19 },
  hint: { textAlign: 'center', color: '#90A398', fontSize: 12, marginBottom: 24 },
  mapScreen: { flex: 1 },
  mapHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 14, alignItems: 'center' },
  back: { backgroundColor: '#FFFFFFF2', borderRadius: 30, paddingHorizontal: 17, paddingVertical: 12 },
  backText: { color: '#244A3C', fontWeight: '800', fontSize: 15 },
  badge: { backgroundColor: '#FFFFFFF2', borderRadius: 30, paddingHorizontal: 15, paddingVertical: 13 },
  badgeText: { color: '#244A3C', fontSize: 11, letterSpacing: 1, fontWeight: '800' },
  mapFooter: { marginTop: 'auto', marginHorizontal: 16, marginBottom: 20, borderRadius: 18, padding: 20, backgroundColor: '#FFFFFFF2' },
  footerTitle: { color: '#244A3C', fontSize: 17, fontWeight: '800' },
  footerCaption: { color: '#738678', fontSize: 12, lineHeight: 19, marginTop: 6 },
});
