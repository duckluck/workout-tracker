// src/iphone-app/components/WorkoutList.tsx
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { getWorkouts } from '../api/api';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const workoutsData = await getWorkouts();
        setWorkouts(workoutsData);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{`Workout #${item.id}: ${item.name}`}</Text>
            {/* Render other workout data here */}
            <Button title="View Details" onPress={() => {}} />
          </View>
        )}
      />
    </View>
  );
};

export default WorkoutList;
