import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import styles from "./signin.style";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { WidthSpacer, HeightSpacer, ReusableBtn } from "../../components";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 8 characters")
    .required("Required"),

  username: Yup.string()
    .min(6, "Username must be at least 3 characters")
    .required("Required"),
  email: Yup.string().email("Provide a valid email").required("Required"),
});

const Registration = () => {
  const [loader, setLoader] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isRegisterFail, setIsRegisterFail] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);
  const handleRegister = (values) => {
    // setLoader(true);
    fetch("https://travel-app-tau-jet.vercel.app/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setLoader(false);
        setIsRegister(true);
        setResponseData(json);
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setIsRegisterFail(true);
      });
  };
  const closeModal = () => {
    setIsRegister(false);
    setIsRegisterFail(false);
    // setResponseData(null);
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
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
              <Text style={styles.label}>Username</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.username ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons
                    name="face-man-profile"
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
              <Text style={styles.label}>Email</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                  />

                  <WidthSpacer width={10} />

                  <TextInput
                    placeholder="Enter email"
                    placeholderTextColor={COLORS.gray}
                    onFocus={() => {
                      setFieldTouched("email");
                    }}
                    onBlur={() => {
                      setFieldTouched("email", "");
                    }}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
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
              btnText={"REGISTER"}
              width={SIZES.width - 40}
              backgroundColor={COLORS.green}
              borderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        )}
      </Formik>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isRegister}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Registration Successful!</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isRegisterFail}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Registration Fail!</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Registration;
