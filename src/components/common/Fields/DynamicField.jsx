/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonTextField from "./TextField";
import CommonSelect from "./Select";
import CommonNumberField from "./NumberField";
import CommonDescriptionField from "./DescriptionField";
import CommonCheckbox from "./Checkbox";
import CommonRadioButton from "./RadioButton";
import CommonDatePicker from "./DatePicker";
import CommonToggleSwitch from "./CommonToggleSwitch";

const CommonDynamicField = ({ fieldType, ...props }) => {
  const type = fieldType?.toLowerCase()?.trim() || "text";

  switch (type) {
    case "text":
    case "email":
    case "url":
    case "password":
    case "tel":
      return <CommonTextField type={type} {...props} />;

    case "number":
    case "integer":
    case "decimal":
    case "float":
    case "number_range":
      return <CommonNumberField {...props} />;

    case "select":
    case "dropdown":
    case "date_select":
    case "relative_date":
      return <CommonSelect {...props} />;

    // case 'multiselect':
    // case 'multi_select':
    // case 'multi_text':
    //   return <CommonMultiSelect {...props} />;

    case "textarea":
    case "description":
    case "longtext":
      return <CommonDescriptionField {...props} />;

    case "checkbox":
    case "boolean":
      return <CommonCheckbox {...props} />;

    case "switch":
    case "toggle":
      return <CommonToggleSwitch {...props} />;

    case "radio":
      return <CommonRadioButton {...props} />;

    case "date":
    case "datetime":
    case "date_range":
      return <CommonDatePicker {...props} mt={0} mb={0} />;

    default:
      return <CommonTextField {...props} />;
  }
};

export default CommonDynamicField;
