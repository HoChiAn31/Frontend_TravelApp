import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import {
  AppBar,
  AssetImage,
  HeightSpacer,
  ReusableText,
  SettingTile,
} from "../../components/index";
import Modal from "react-native-modal";
import ReusableOption from "../../components/Reusable/ReusableOption";

const Settings = ({ navigation }) => {
  const [isModalCountry, setIsModalCountry] = useState(false);
  const [isModalLanguage, setIsModalLanguage] = useState(false);
  const [isCurrency, setIsCurrency] = useState(false);
  const handleCountry = () => {
    setIsModalCountry(!isModalCountry);
  };
  const handleLanguage = () => {
    setIsModalLanguage(!isModalLanguage);
  };
  const handleCurrency = () => {
    setIsCurrency(!isCurrency);
  };
  return (
    <View style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
      <View style={{ height: 120 }}>
        <AppBar
          top={50}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <ReusableText
          text={"Account Settings"}
          family={"regular"}
          size={SIZES.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />

        <SettingTile title={"Language"} onPress={handleLanguage} />

        <HeightSpacer height={3} />

        <SettingTile title={"Country"} title1={"USA"} onPress={handleCountry} />

        <HeightSpacer height={3} />

        <SettingTile
          title={"Currency"}
          title1={"USD"}
          onPress={handleCurrency}
        />

        <HeightSpacer height={40} />

        <ReusableText
          text={"Support"}
          family={"regular"}
          size={SIZES.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />

        <SettingTile
          title={"Get Help"}
          title1={""}
          onPress={() => navigation.navigate("GetHelp")}
        />

        <HeightSpacer height={3} />

        <SettingTile
          title={"Give a feedback"}
          // title1={""}
          onPress={() => navigation.navigate("feedback")}
        />

        <HeightSpacer height={40} />

        <ReusableText
          text={"Legal"}
          family={"regular"}
          size={SIZES.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />

        <SettingTile
          title={"Terms of Service"}
          title1={""}
          onPress={() => navigation.navigate("TermsOfService")}
        />

        <HeightSpacer height={3} />

        <SettingTile
          title={"Privacy Policy"}
          title1={""}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        />
      </View>
      {/* Modal Country*/}
      <Modal
        isVisible={isModalCountry}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        // onSwipeComplete={this.close}
        swipeDirection={["up", "left", "right", "down"]}
        onBackdropPress={handleCountry}
        backdropOpacity={0.7}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View style={{}}>
          <View
            style={{
              backgroundColor: "white",
              paddingBottom: 200,
              borderRadius: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                backgroundColor: COLORS.blueFacilities,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <ReusableText
                text={"Country"}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.white}
              />
              <TouchableOpacity
                onPress={handleCountry}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 32,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <ReusableOption
                title={"1. Vietnam"}
                image={require("../../assets/images/vietnam.png")}
              />
              <ReusableOption
                title={"2. USA"}
                image={require("../../assets/images/USA.png")}
                isActive
              />
              <ReusableOption
                title={"3. Singapore"}
                image={require("../../assets/images/singapore.jpg")}
              />
              <ReusableOption
                title={"4. Indonesia"}
                image={require("../../assets/images/indonesia.png")}
              />
              <ReusableOption
                title={"5. Thailand"}
                image={require("../../assets/images/thailand.jpg")}
              />
              <ReusableOption
                title={"6. Malaysia"}
                image={require("../../assets/images/malaysia.png")}
              />
              <ReusableOption
                title={"7. Philippines"}
                image={require("../../assets/images/philip.png")}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal Language*/}
      <Modal
        isVisible={isModalLanguage}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        // onSwipeComplete={this.close}
        swipeDirection={["up", "left", "right", "down"]}
        onBackdropPress={handleLanguage}
        backdropOpacity={0.7}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View style={{}}>
          <View
            style={{
              backgroundColor: "white",
              paddingBottom: 200,
              borderRadius: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                backgroundColor: COLORS.blueFacilities,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <ReusableText
                text={"Language"}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.white}
              />
              <TouchableOpacity
                onPress={handleLanguage}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 32,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <ReusableOption
                title={"1. Vietnam"}
                image={require("../../assets/images/vietnam.png")}
              />
              <ReusableOption
                title={"2. English"}
                image={require("../../assets/images/USA.png")}
                isActive
              />
              <ReusableOption
                title={"3. Singapore"}
                image={require("../../assets/images/singapore.jpg")}
              />
              <ReusableOption
                title={"4. Indonesia"}
                image={require("../../assets/images/indonesia.png")}
              />
              <ReusableOption
                title={"5. Thailand"}
                image={require("../../assets/images/thailand.jpg")}
              />
              <ReusableOption
                title={"6. Malaysia"}
                image={require("../../assets/images/malaysia.png")}
              />
              <ReusableOption
                title={"7. Philippines"}
                image={require("../../assets/images/philip.png")}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal Currency*/}
      <Modal
        isVisible={isCurrency}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        // onSwipeComplete={this.close}
        swipeDirection={["up", "left", "right", "down"]}
        onBackdropPress={handleCurrency}
        backdropOpacity={0.7}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View style={{}}>
          <View
            style={{
              backgroundColor: "white",
              paddingBottom: 600,
              borderRadius: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                backgroundColor: COLORS.blueFacilities,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <ReusableText
                text={"Currency"}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.white}
              />
              <TouchableOpacity
                onPress={handleCurrency}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 32,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <ReusableOption
                title={"1. USD"}
                image={require("../../assets/images/USA.png")}
                isActive
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
