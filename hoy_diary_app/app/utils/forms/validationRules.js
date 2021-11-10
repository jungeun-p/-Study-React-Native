const validation = (value, rules, form) => {
  let valid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = valid && validateRequired(value);
        // console.log(valid);
        break;
      case 'isEmail':
        valid = valid && validateEmail(value);
        // console.warn(valid);
        break;
      case 'minLength':
        valid = valid && validateMinLength(value, rules[rule]); // rules[rule]: minLength:6
        // console.warn(valid);
        break;
      case 'confirmPassword':
        valid =
          valid &&
          validateConfirmPassword(value, form[rules.confirmPassword].value);
        // 비밀번호 재입력, 비밀번호 입력값 form[password].value
        //   rules: {
        //     confirmPassword: 'password',
        //   },
        console.log(valid);
        break;
      default:
        valid = true;
    }
  }
  return valid;
};

const validateConfirmPassword = (confirmPassword, password) => {
  return confirmPassword === password;
  // 같으면 true, 틀리면 false
};

const validateMinLength = (value, ruleValue) => {
  if (value.length >= ruleValue) {
    return true;
  } else {
    return false;
  }
};

const validateRequired = value => {
  if (value !== '') {
    return true;
  } else {
    return false;
  }
};

const validateEmail = value => {
  const expression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(String(value).toLocaleLowerCase()); // value를 string -> 소문자로 변경 -> test: 정규표현식 판별
};

export default validation;
