import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./signin.style";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  WidthSpacer,
  HeightSpacer,
  ReusableBtn,
  ReusableText,
} from "../../components";
import { useAuth } from "../../components/Provider/AuthProvider";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  username: Yup.string()
    .min(6, "Username must be at least 6 characters")
    .required("Required"),
});

const Signin = ({ navigation }) => {
  const { setUserName, setPassWord, isLoading, error, isAuth } = useAuth();
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);
  useEffect(() => {
    if (isAuth) {
      navigation.goBack();
      return;
    }
    if (error) {
      Alert.alert(
        "UserName or Password is incorrect",
        "",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }, [isAuth, error]);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(value) => {
          setUserName(value.username);
          setPassWord(value.password);
        }}
      >
        {({
          handleChange,
          touched,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldTouched,
        }) => (
          <View style={{ paddingTop: 30 }}>
            <View style={styles.wrapper}>
              <Text style={styles.label}>User Name</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.username ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                  />

                  <WidthSpacer width={10} />

                  <TextInput
                    placeholder="Enter username"
                    placeholderTextColor={COLORS.gray}
                    onFocus={() => {
                      setFieldTouched("username");
                    }}
                    onBlur={() => {
                      setFieldTouched("username", "");
                    }}
                    value={values.username}
                    onChangeText={handleChange("username")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={styles.errorMessage}>{errors.username}</Text>
                )}
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                  />

                  <WidthSpacer width={10} />

                  <TextInput
                    secureTextEntry={obsecureText}
                    placeholderTextColor={COLORS.gray}
                    placeholder="Enter password"
                    onFocus={() => {
                      setFieldTouched("password");
                    }}
                    onBlur={() => {
                      setFieldTouched("password", "");
                    }}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setObsecureText(!obsecureText);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={obsecureText ? "eye-outline" : "eye-off-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>
            </View>

            <HeightSpacer height={20} />

            <ReusableBtn
              onPress={handleSubmit}
              btnText={"SIGN IN"}
              width={SIZES.width - 40}
              backgroundColor={COLORS.green}
              borderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Signin;
