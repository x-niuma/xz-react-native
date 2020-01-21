import AsyncStorage from "@react-native-community/async-storage"

export default {
  setItem: async (key, value) => {
    let val;
    if (typeof value === 'object') {
      val = JSON.stringify(value);
    } else {
      val = value;
    }
    try {
      await AsyncStorage.setItem(key, val);
    } catch (error) {
      // Error saving data
    }
  },

  getItem: async (key) => {
    try {
      let value = await AsyncStorage.getItem(key);
      if (value !== null) {
        try {
          value = JSON.parse(value);
        } catch (e) {}
        return value;
      }
    } catch (error) {
      Promise.reject(error);
      // Error retrieving data
    }
  }
};
