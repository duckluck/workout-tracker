// src/iphone-app/pages/WorkoutsPage.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import WorkoutList from '../components/WorkoutList';

const WorkoutsPage = () => {
  return (
    <ScrollView>
      <WorkoutList />
    </ScrollView>
  );
};

export default WorkoutsPage;
