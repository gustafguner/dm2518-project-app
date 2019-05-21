import * as React from 'react';
import gql from 'graphql-tag';
import { View, Text, Button } from 'react-native';
import { Query } from 'react-apollo';

import { generateKeyPair, KeyPair } from '../../crypto';

const QUERY = gql`
  query User {
    user {
      username
      publicKey
    }
  }
`;

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        onPress={() => {
          navigation.navigate('Profile');
        }}
        title="Go to Profile"
      />

      <Query query={QUERY}>
        {({ data, error, loading }) => {
          console.log(data);
          return !loading && !error && data ? (
            <Text>{data.user.username}</Text>
          ) : (
            <Text>Loading...</Text>
          );
        }}
      </Query>
    </View>
  );
};

export default HomeScreen;
