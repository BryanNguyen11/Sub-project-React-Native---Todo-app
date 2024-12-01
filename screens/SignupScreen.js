import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  AccessibilityInfo,
  Keyboard,
} from 'react-native';


const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Platform.OS === 'ios'
      ? Keyboard.addListener('keyboardWillShow', () => setKeyboardVisible(true))
      : Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    
    const keyboardDidHideListener = Platform.OS === 'ios'
      ? Keyboard.addListener('keyboardWillHide', () => setKeyboardVisible(false))
      : Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSignup = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.navigate('Login');  // Navigate to Login screen after signup
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignup = (provider) => {
    AccessibilityInfo.announceForAccessibility(`Signing up with ${provider}`);
  };

  const handleLoginPress = () => {
    AccessibilityInfo.announceForAccessibility('Navigating to login screen');
    navigation.navigate('Login');  // Navigate to Login screen
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6d612c86e661823973460065e7fc994eaf7402fb940ce1ec2eccef5342d8b363' }}
            style={styles.logo}
            accessibilityLabel="Company logo"
            accessible={true}
          />
          
          <Text style={styles.welcomeText} accessibilityRole="header">
            Let's get started!
          </Text>
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                inputMode="email"
                accessibilityLabel="Email input field"
                accessibilityHint="Enter your email address"
                accessible={true}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessibilityLabel="Password input field"
                accessibilityHint="Enter your password"
                accessible={true}
              />
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.signupButton,
              pressed && styles.signupButtonPressed
            ]}
            onPress={handleSignup}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityLabel="Sign up button"
            accessibilityState={{ disabled: isSubmitting }}>
            <Text style={styles.signupButtonText}>
              {isSubmitting ? 'Signing up' : 'Sign up'}
            </Text>
          </Pressable>

          <Text style={styles.dividerText} accessibilityRole="text">
            or sign up with
          </Text>

          <View style={styles.socialContainer}>
            <Pressable
              onPress={() => handleSocialSignup('Google')}
              accessibilityRole="button"
              accessibilityLabel="Sign up with Google">
              <Image
                resizeMode="contain"
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8d24b3b35d6b6faa0ba11cf52819ee7224b25189c8abfacd8cf3fdb389a1a159' }}
                style={styles.socialIcon}
              />
            </Pressable>
            
            <Pressable
              onPress={() => handleSocialSignup('Facebook')}
              accessibilityRole="button"
              accessibilityLabel="Sign up with Facebook">
              <Image
                resizeMode="contain"
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a37dd1de1bebdbc3f08bcd51ae0e643a03b0d586ffd1c6627f4c9b416ecb63ab' }}
                style={styles.socialIcon}
              />
            </Pressable>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
            </Text>
            <Pressable
              onPress={handleLoginPress}
              accessibilityRole="button"
              accessibilityLabel="Go to login screen"
              accessibilityHint="Navigate to login screen">
              <Text style={styles.loginLink}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 'auto',
    maxWidth: 480,
    width: '100%',
    paddingHorizontal: 54,
    paddingTop: 100,
    paddingBottom: 33,
    alignItems: 'center',
  },
  logo: {
    width: 151,
    maxWidth: '100%',
    aspectRatio: 1,
  },
  welcomeText: {
    fontSize: 26,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '700',
    marginTop: 40,
  },
  formContainer: {
    width: '100%',
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: 'rgba(137, 137, 137, 1)',
    fontSize: 16,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '300',
    marginBottom: 12,
  },
  input: {
    borderRadius: 10,
    borderColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    width: '100%',
  },
  signupButton: {
    backgroundColor: '#00A8E8',
    borderRadius: 10,
    marginTop: 40,
    width: 260,
    maxWidth: '100%',
    paddingHorizontal: 43,
    paddingVertical: 10,
  },
  signupButtonPressed: {
    opacity: 0.8,
  },
  signupButtonText: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontSize: 26,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '700',
    textAlign: 'center',
  },
  dividerText: {
    color: 'rgba(216, 219, 220, 1)',
    fontSize: 16,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 17,
  },
  socialContainer: {
    flexDirection: 'row',
    width: 119,
    maxWidth: '100%',
    justifyContent: 'space-between',
  },
  socialIcon: {
    width: 50,
    aspectRatio: 1,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: 'rgba(213, 222, 225, 1)',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontSize: 16,
    fontWeight: '700',
  },
  loginLink: {
    color: 'rgba(0, 168, 232, 1)',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SignupScreen;
