import { Form, Formik } from "formik";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { View, Text, Image, Modal, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getCategories } from "../lib/api/category";
import PrimaryLoading from "../components/PrimaryLoaing";
import commonStyle from "../lib/commonStyle";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import * as Yup from "yup";
import { createTutorial } from "../lib/api/tutorial";

const TutorialUploadScreen = ({ navigation }) => {
  const [thumbnail, setThumbnail] = useState(null);
  // 모달 보이는지
  const [visible, setVisible] = useState(false);
  // 같이 올리는 강의들
  const [lectures, setLectrues] = useState([]);

  // 업로드할 tutorial 관리
  const [tutorial, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case "SET_INFO":
        return action.me;
      case "SET_THUMBNAIL":
        return {
          ...prevState,
          thumbnail: action.thumbnail,
        };
      case "SET_NICKNAME":
        return {
          ...prevState,
          nickname: action.nickname,
        };
      case "SET_MESSAGE":
        return {
          ...prevState,
          message: action.message,
        };
      default:
        return prevState;
    }
  }, null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!result.cancelled) {
      setThumbnail(result.uri);
    }
  };

  const checkPermissionThenPick = useCallback(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status != "granted") {
        return alert("이미지 파일 접근 권한을 허용해주세요");
      }
      await pickImage();
    })();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  // 카테고리들 fetch 해오기
  useMemo(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result.data);
      } catch (err) {
        alert("예기치 못한 문제가 발생했습니다");
      }
    };
    fetchCategories();
  }, []);

  // 폼 유효성
  const TutorialSchema = Yup.object().shape({
    title: Yup.string()
      .max(100, "100자 이하로 작성해주세요")
      .required("필수 항목입니다"),
    content: Yup.string()
      .max(500, "500자 이하로 작성해주세요")
      .required("필수 항목입니다"),
  });

  // jsx
  return !categories ? (
    <PrimaryLoading />
  ) : (
    <ScrollView>
      <Formik
        initialValues={{
          title: "",
          content: "",
          thumbnail: null,
          category_id: 1,
        }}
        validationSchema={TutorialSchema}
        onSubmit={async (values) => {
          try {
            await createTutorial({ ...values, thumbnail });
            alert("튜토리얼이 생성됐습니다");
            navigation.goBack();
          } catch (err) {
            alert("예상치 못한 문제가 발생했습니다");
            console.error(err);
          }
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          handleChange,
          isValid,
          isSubmitting,
        }) => (
          <View style={commonStyle.padding20}>
            {/* 카테고리 선택 */}
            <View style={commonStyle.marginVertical10}>
              <Text style={commonStyle.h1}>카테고리</Text>
              <View>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(value, index) => setSelectedCategory(value)}
                >
                  {categories.map((item) => (
                    <Picker.Item
                      label={item.name}
                      value={item.id}
                      key={item.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* 제목 */}
            <Text style={commonStyle.h1}>제목</Text>
            {errors.title && (
              <Text style={commonStyle.warningText}>{errors.title}</Text>
            )}
            <TextInput
              style={commonStyle.input}
              multiline={true}
              value={values.title}
              onChangeText={handleChange("title")}
            />

            {/* 내용 */}
            <Text style={commonStyle.h1}>내용</Text>
            {errors.content && (
              <Text style={commonStyle.warningText}>{errors.content}</Text>
            )}
            <TextInput
              style={commonStyle.input}
              multiline={true}
              value={values.content}
              onChangeText={handleChange("content")}
            />

            {/* 썸네일 */}
            <View style={commonStyle.marginVertical10}>
              <Text style={commonStyle.h1}>썸네일</Text>
              {!thumbnail ? (
                // 썸네일 선택 안 했으면
                <TouchableOpacity
                  style={[
                    commonStyle.imageSelectBox,
                    commonStyle.marginVertical10,
                  ]}
                  onPress={() => {
                    checkPermissionThenPick();
                  }}
                >
                  <AntDesign name="picture" size={24} color="black" />
                </TouchableOpacity>
              ) : (
                // 썸네일 선택 후
                <TouchableOpacity
                  onPress={() => {
                    checkPermissionThenPick();
                  }}
                >
                  <Image
                    source={{ uri: thumbnail }}
                    style={[
                      commonStyle.thumbnail,
                      commonStyle.marginVertical10,
                    ]}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Button
              title="등록"
              onPress={handleSubmit}
              disabled={isSubmitting || !isValid}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );

  // 같이 등록하는 강의들
  {
    /* <View>
        <Text style={commonStyle.h1}>강의 영상</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LectureUpload")}>
          <Text>추가하기</Text>
        </TouchableOpacity>
        {lectures.map((lecture) => {
          <View>
            <Text>{lecture.title}</Text>
            <WebView source={{ uri: lecture.embed }} />;
          </View>;
        })}
      </View> */
  }

  {
    /* 모달 */
  }
  {
    /* <View>
        <Modal
          visible={visible}
          // transparent={true}
          onRequestClose={() => setVisible(false)}
          presentationStyle="overFullScreen"
        >
          {/* 강의 입력 폼 */
  }
  {
    /* <View style={commonStyle.screenCenter}>
            <Text style={commonStyle.h1}>제목</Text>

            <Text style={commonStyle.h1}>영상 id</Text>
            <Image
              source={{
                uri: "https://tuto-bucket.s3.ap-northeast-2.amazonaws.com/ref-image.png",
              }}
              style={{ width: 100, height: 200, resizeMode: "cover" }}
            />
            <Text>
              공유 버튼을 누른 뒤 클립보드에 있는 내용을 아래에 붙여넣어주세요
            </Text>
            <TextInput placeholder="유튜브 링크" />
          </View> */
  }

  {
    /* 버튼 그룹 */
  }
  {
    /* <View style={[commonStyle.buttonGroup, { marginBottom: 40 }]}>
            <Pressable onPress={() => setVisible(!visible)}>
              <Text style={commonStyle.h1}>취소</Text>
            </Pressable>

            <Pressable>
              <Text style={commonStyle.h1}>등록</Text>
            </Pressable>
          </View>
        </Modal>
      </View> */
  }
};

export default TutorialUploadScreen;
