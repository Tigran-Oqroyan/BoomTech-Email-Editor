import { JSX } from "react";
import {
  DataObjectRounded,
  DriveFileRenameOutlineOutlined,
  ScheduleRounded,
  Filter1Rounded,
  LocationOnOutlined,
  LinkRounded,
  InputOutlined,
  CommentOutlined,
  BadgeOutlined,
  MailOutlineOutlined,
  PhoneEnabledOutlined,
  LooksOneOutlined,
  PasswordOutlined,
  LocalOfferOutlined,
  HomeOutlined,
  CheckBoxOutlined,
  RadioButtonCheckedOutlined,
  KeyboardArrowDownOutlined,
  StarBorderOutlined,
  ContrastOutlined,
  ChecklistOutlined,
  CalendarMonthOutlined,
  AccessTimeOutlined,
  LanguageOutlined,
  TitleOutlined,
  DescriptionOutlined,
  AttachFileOutlined,
  EditOutlined,
} from "@mui/icons-material";

const editorFieldsTypes: Record<string, JSX.Element> = {
  INPUT_SINGLE_LINE_TEXT: <InputOutlined />,
  INPUT_MULTI_LINE_TEXT: <CommentOutlined />,
  INPUT_NAME: <BadgeOutlined />,
  INPUT_ADDRESS: <HomeOutlined />,
  INPUT_EMAIL: <MailOutlineOutlined />,
  INPUT_PHONE: <PhoneEnabledOutlined />,
  INPUT_NUMBER: <LooksOneOutlined />,
  INPUT_URL: <LinkRounded />,
  INPUT_PASSWORD: <PasswordOutlined />,
  INPUT_PRICE: <LocalOfferOutlined />,
  SELECT_CHECKBOX: <CheckBoxOutlined />,
  SELECT_RADIO: <RadioButtonCheckedOutlined />,
  SELECT_DROPDOWN: <KeyboardArrowDownOutlined />,
  SELECT_STAR_RATING: <StarBorderOutlined />,
  SELECT_SCALE_RATING: <ContrastOutlined />,
  SELECT_TERM_AND_CONDITION: <ChecklistOutlined />,
  DATE: <CalendarMonthOutlined />,
  TIME: <AccessTimeOutlined />,
  TIME_ZONE: <LanguageOutlined />,
  DESCRIPTION_TEXT: <DescriptionOutlined />,
  HEADING_TEXT: <TitleOutlined />,
  SIGNATURE: <EditOutlined />,
  FILE: <AttachFileOutlined />,
};

const wixFieldsTypes: Record<string, JSX.Element> = {
  text: <InputOutlined />,
  name: <BadgeOutlined />,
  email: <MailOutlineOutlined />,
  number: <LooksOneOutlined />,
  date: <CalendarMonthOutlined />,
  checkbox: <CheckBoxOutlined />,
  select: <KeyboardArrowDownOutlined />,
  price: <LocalOfferOutlined />,
  starrating: <StarBorderOutlined />,
  password: <PasswordOutlined />,
  textarea: <CommentOutlined />,
  address: <HomeOutlined />,
  phone: <PhoneEnabledOutlined />,
  website: <LinkRounded />,
  time: <AccessTimeOutlined />,
  radio: <RadioButtonCheckedOutlined />,
  scalerating: <ContrastOutlined />,
  file: <AttachFileOutlined />,
  signature: <EditOutlined />,
};

export const customButtonsConfig = [
  {
    label: "Form Name",
    icon: <DriveFileRenameOutlineOutlined />,
  },
  {
    label: "All Entries",
    icon: <DataObjectRounded />,
  },
  {
    label: "Entry Date",
    icon: <ScheduleRounded />,
  },
  {
    label: "Submission ID",
    icon: <Filter1Rounded />,
  },
  {
    label: "IP Address",
    icon: <LocationOnOutlined />,
  },
  {
    label: "Confirmation Link",
    icon: <LinkRounded />,
  },
];

const generateData = (label: string) => {
  return {
    style: {
      fontSize: label === "Form Name" ? 30 : 22,
      fontWeight: "normal",
      padding: { top: 16, bottom: 16, right: 24, left: 24 },
    },
    props: {
      text: `{${label}}`,
    },
  };
};

const generateBlock = (label: string) => ({
  type: "Text",
  data: generateData(label),
});

const generateButton = (label: string, icon: JSX.Element) => ({
  label,
  icon,
  block: () => {
    return generateBlock(label);
  },
});

export const getCustomButtons = () => {
  const customButtons = customButtonsConfig.map(({ label, icon }) => {
    const customButton = generateButton(label, icon);
    return customButton;
  });
  return customButtons;
};

export const getFieldsButtons = ({ fields, fieldsData, platform }: any) => {
  return fields.map((field: any) => {
    const fieldLabel =
      platform === "WIX" ? field.label : fieldsData[field._id]?.label?.value;
    const fieldType =
      platform === "WIX"
        ? wixFieldsTypes[field.type]
        : editorFieldsTypes[field.type];
    return generateButton(fieldLabel, fieldType);
  });
};
