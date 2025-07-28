import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '../store/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

const allGyms = [
  {
    id: '1',
    name: "Gold’s Gym",
    logo: require('../assets/logos/goldgym.png'),
    rating: 4.5,
    price: 100,
    distance: 1.5,
    crowd: 'LOW',
    plan: 800,
    images: [
      require('../assets/images/gym1.png'),
      require('../assets/images/gym2.png'),
      require('../assets/images/gym3.png'),
      require('../assets/images/gym4.png'),
      require('../assets/images/gym5.png'),
    ],
  },
  {
    id: '2',
    name: 'FitLife Gym',
    logo: require('../assets/logos/fitlifegym.png'),
    rating: 4.0,
    price: 150,
    distance: 0.8,
    crowd: 'LOW',
    plan: 800,
    images: [
      require('../assets/images/gym1.png'),
      require('../assets/images/gym2.png'),
      require('../assets/images/gym3.png'),
      require('../assets/images/gym4.png'),
      require('../assets/images/gym5.png'),
    ],
  },
  {
    id: '3',
    name: 'Pro Fitness',
    logo: require('../assets/logos/profitnessgym.png'),
    rating: 4.2,
    price: 180,
    distance: 1.9,
    crowd: 'MODERATE',
    plan: 1000,
    images: [
      require('../assets/images/gym1.png'),
      require('../assets/images/gym2.png'),
      require('../assets/images/gym3.png'),
      require('../assets/images/gym4.png'),
      require('../assets/images/gym5.png'),
    ],
  },
  {
    id: '4',
    name: 'Fitness Center',
    logo: require('../assets/logos/fitnesscenter.png'),
    rating: 4.5,
    price: 170,
    distance: 1.0,
    crowd: 'MODERATE',
    plan: 1000,
    images: [
      require('../assets/images/gym1.png'),
      require('../assets/images/gym2.png'),
      require('../assets/images/gym3.png'),
      require('../assets/images/gym4.png'),
      require('../assets/images/gym5.png'),
    ],
  },
  {
    id: '5',
    name: 'Fitness Club',
    logo: require('../assets/logos/fitnessclub.png'),
    rating: 4.2,
    price: 150,
    distance: 1.9,
    crowd: 'HIGH',
    plan: 1000,
    images: [
      require('../assets/images/gym1.png'),
      require('../assets/images/gym2.png'),
      require('../assets/images/gym3.png'),
      require('../assets/images/gym4.png'),
      require('../assets/images/gym5.png'),
    ],
  },
];

const filtersList = ['Location', 'Price', 'Flexibility', 'Rating'];

export default function ExploreScreen() {
  const { theme } = useTheme();
  const { colors } = theme;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [gyms, setGyms] = useState(allGyms);

  useEffect(() => {
    applySearchAndFilter();
  }, [searchQuery, activeFilter]);

  const applySearchAndFilter = () => {
    let filtered = [...allGyms];

    switch (activeFilter) {
      case 'Price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'Location':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'Flexibility':
        filtered.sort((a, b) => a.plan - b.plan);
        break;
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((gym) =>
        gym.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setGyms(filtered);
  };

  const resetFilters = () => {
    setActiveFilter('');
    setSearchQuery('');
    setGyms(allGyms);
  };

  const renderGymCard = ({ item }: { item: typeof gyms[0] }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Image source={item.logo} style={styles.logo} />
      <View style={styles.cardContent}>
        <Text style={[styles.gymName, { color: colors.text }]}>{item.name}</Text>
        <View style={styles.row}>
          <FontAwesome5 name="star" size={14} color="#FFD700" />
          <Text style={[styles.ratingText, { color: colors.text }]}> {item.rating}</Text>
          <Text style={[styles.priceText, { color: colors.secondary }]}>₹{item.price}/day</Text>
          <Text style={[styles.distanceText, { color: colors.secondary }]}> · {item.distance} km</Text>
        </View>

        <Text style={[styles.crowdText, { color: colors.text }]}>
          <Text
            style={[
              styles.dot,
              item.crowd === 'LOW'
                ? styles.lowDot
                : item.crowd === 'MODERATE'
                ? styles.moderateDot
                : { color: '#FF4C4C' },
            ]}
          >
            ●
          </Text>{' '}
          Currently: {item.crowd}
        </Text>

        <Text style={[styles.planText, { color: colors.secondary }]}>
          Plans start at ₹{item.plan}/month
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.viewButton, { borderColor: colors.text }]}
        onPress={() =>
            navigation.navigate('GymDetail', {
    name: item.name,
    logo: item.logo,
    rating: item.rating,
    price: item.price,
    distance: item.distance,
    crowd: item.crowd,
    plan: item.plan,
    images: item.images,
  })
}

      >
        <Text style={[styles.viewButtonText, { color: colors.text }]}>View Gym</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Explore</Text>

      {/* Search Box */}
      <View style={[styles.searchBox, { backgroundColor: colors.card }]}>
        <Ionicons name="search" size={20} color={colors.secondary} />
        <TextInput
          placeholder="Search gyms"
          placeholderTextColor={colors.secondary}
          style={[styles.searchInput, { color: colors.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        {filtersList.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeFilter === filter ? colors.primary : colors.card,
              },
            ]}
            onPress={() =>
              setActiveFilter(activeFilter === filter ? '' : filter)
            }
          >
            <Text
              style={[
                styles.chipText,
                { color: activeFilter === filter ? '#000' : colors.text },
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.chip, { backgroundColor: '#FF6666' }]}
          onPress={resetFilters}
        >
          <Text style={[styles.chipText, { color: '#fff' }]}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Gym List */}
      <FlatList
        data={gyms}
        renderItem={renderGymCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    marginVertical: 30,
    marginTop: 30,
  },
  searchBox: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
  },
  card: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardContent: {
    marginBottom: 8,
  },
  gymName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  ratingText: {
    fontSize: 14,
  },
  priceText: {
    fontSize: 14,
    marginLeft: 8,
  },
  distanceText: {
    fontSize: 14,
    marginLeft: 8,
  },
  crowdText: {
    fontSize: 14,
    marginVertical: 2,
  },
  dot: {
    fontSize: 16,
    marginRight: 4,
  },
  lowDot: {
    color: '#00E676',
  },
  moderateDot: {
    color: '#FFA500',
  },
  planText: {
    fontSize: 13,
    marginTop: 4,
  },
  viewButton: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 6,
  },
  viewButtonText: {
    fontSize: 14,
  },
});
