import { useEffect, useState } from "react";
import { useCreateUser } from "./api-methods/create-user";
import type { CreateUserInput, UserModel } from "./types";
import { useGetUsers } from "./api-methods/get-user";

interface TextValidation {
  isLenghtValid: boolean;
  isSpecialSymbolsValid: boolean;
  isTextEmptyValid: boolean;
  isFirstUpperCaseValid: boolean;
  isValid: boolean;
  isTouched: boolean;
}

interface PhoneValidation {
  isValid: boolean;
  isTouched: boolean;
}

const isFirstNameValidationDefault = {
  isLenghtValid: false,
  isSpecialSymbolsValid: false,
  isTextEmptyValid: false,
  isFirstUpperCaseValid: false,
  isValid: false,
  isTouched: false,
} as TextValidation;



interface CreateFormProps{
  editedUser: UserModel | null;
  OnClick: () => void;
}



const isLastNameValidationDefault = {
  isLenghtValid: false,
  isSpecialSymbolsValid: false,
  isTextEmptyValid: false,
  isFirstUpperCaseValid: false,
  isValid: false,
  isTouched: false,
} as TextValidation;

export const CreateUserForm = ({editedUser, OnClick}: CreateFormProps) => {
  const [firstName, setFirstName] = useState<string>(editedUser?.firstName ?? "");
  const [isFirstNameValid, setIsFirstNameValid] = useState<TextValidation>(
    isFirstNameValidationDefault,
  );

  const [lastName, setLastName] = useState<string>(editedUser?.lastName ?? "");
  const [isLastNameValid, setIsLastNameValid] = useState<TextValidation>(
    isLastNameValidationDefault,
  );

  const [age, setAge] = useState<number>(editedUser?.age ??  18);
  const [isAgeValid, setIsAgeValid] = useState<boolean>(true);
  const [isAgeTouched, setIsAgeTouched] = useState<boolean>(editedUser?.isCitizen ?? false);

  const [isCitizen, setIsCitizen] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>(editedUser?.phone ?? "");
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [isPhoneTouched, setIsPhoneTouched] = useState<boolean>(false);

  const { refetch: refetchUsers } = useGetUsers();
  const { mutate: createUser, isPending: isUserCreating } = useCreateUser();

  useEffect(() => {
    if (!editedUser){
      
      setFirstName("");
      setLastName("");
      setAge(18);
      setIsCitizen(false);
      setPhone("");

      setIsFirstNameValid(isFirstNameValidationDefault);
      setIsLastNameValid(isLastNameValidationDefault);
      setIsAgeTouched(true);
      setIsAgeValid(true);
      setIsPhoneTouched(true);
      setIsPhoneValid(true);

      return;

    }
    setFirstName(editedUser?.firstName ?? "");
    setLastName(editedUser?.lastName ?? "");
    setAge(editedUser?.age ?? 18);
    setPhone(editedUser?.phone.substring(2) ??"");
    setIsCitizen(editedUser?.isCitizen ?? false)

  const isValid= {
    isLenghtValid: true,
    isSpecialSymbolsValid: true,
    isTextEmptyValid: true,
    isFirstUpperCaseValid: true,
    isValid: true,
    isTouched: true,
    } as TextValidation;
    
    setIsFirstNameValid(isValid);
    setIsLastNameValid(isValid);
    setIsAgeTouched(true);
    setIsAgeValid(true);
    setIsPhoneTouched(true);
    setIsPhoneValid(true);
    

  }, [editedUser]);

  const hadnleCreate = () => {
    const input = {
      id: editedUser?.id ?? -1,
      firstName: firstName,
      lastName: lastName,
      age: age,
      isCitizen: isCitizen,
      phone: "+7" + phone,
    } as CreateUserInput;

    createUser(input, {
      onSuccess: onCreateSuccess,
    });
  };

  const onCreateSuccess = () => {
    refetchUsers();
    setFirstName("");
    setLastName("");
    setAge(18);
    setIsCitizen(false);
    setPhone("");

    setIsFirstNameValid(isFirstNameValidationDefault);
    setIsLastNameValid(isLastNameValidationDefault);
    setIsAgeTouched(false);
    setIsAgeValid(true);
    setIsPhoneTouched(false);

    OnClick();
  };

  const handleOnNameChange = (text: string) => {
    //текст не меньше 2
    const p1 = text.length >= 2;
    //текст не содержит спец символов
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text);
    //текст не пустой
    const p3 = text !== "";
    //текст с заглавной буквы
    const p4 =
      text !== undefined &&
      text.length > 0 &&
      text[0] === text[0].toUpperCase();

    const isNameValid = {
      isLenghtValid: p1,
      isSpecialSymbolsValid: p2,
      isTextEmptyValid: p3,
      isFirstUpperCaseValid: p4,

      isValid: p1 && p2 && p3 && p4,
      isTouched: true,
    } as TextValidation;

    setIsFirstNameValid(isNameValid);

    setFirstName(text);
  };

  const handleOnLastNameChange = (text: string) => {
    //текст не меньше 2
    const p1 = text.length >= 2;
    //текст не содержит спец символов
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text);
    //текст не пустой
    const p3 = text !== "";
    //текст с заглавной буквы
    const p4 =
      text !== undefined &&
      text.length > 0 &&
      text[0] === text[0].toUpperCase();

    const isLastNameValid = {
      isLenghtValid: p1,
      isSpecialSymbolsValid: p2,
      isTextEmptyValid: p3,
      isFirstUpperCaseValid: p4,

      isValid: p1 && p2 && p3 && p4,
      isTouched: true,
    } as TextValidation;

    setIsLastNameValid(isLastNameValid);

    setLastName(text);
  };

  const handleOnAgeChange = (age: number) => {
    setIsAgeValid(age >= 18 && age <= 99);
    setIsAgeTouched(true);
    setAge(age);
  };

  const handleOnPhoneChage = (phone: string) => {

    setIsPhoneTouched(true);

    const cleanPhone = phone.replace(/\D/g , "");

    setIsPhoneValid(/^\d{10}$/.test(cleanPhone));

    setPhone(cleanPhone);
  };

  const hasFirstName = firstName !== undefined && firstName.length > 0;
  const haslastName = lastName !== undefined && lastName.length > 0;

  return (
    <div className="d-flex flex-column gap-2 p-3 bg-light shadow rounded-3">
      <input
        value={firstName}
        onChange={(e) => handleOnNameChange(e.target.value)}
        className={`form-control  ${isFirstNameValid.isTouched ? (isFirstNameValid.isValid ? "is-valid" : "is-invalid") : ""}  `}
        type="text"
        placeholder="Имя"
        disabled={isUserCreating}
      />

      {isFirstNameValid.isTouched && !isFirstNameValid.isTextEmptyValid && (
        <span className="text-danger">Имя не может быть пустым</span>
      )}

      {hasFirstName &&
        isFirstNameValid.isTouched &&
        !isFirstNameValid.isFirstUpperCaseValid && (
          <span className="text-danger">
            Имя должно начинаться с заглавной буквы
          </span>
        )}

      {hasFirstName &&
        isFirstNameValid.isTouched &&
        !isFirstNameValid.isLenghtValid && (
          <span className="text-danger">
            Имя не может быть менее 2 символом
          </span>
        )}

      {hasFirstName &&
        isFirstNameValid.isTouched &&
        !isFirstNameValid.isSpecialSymbolsValid && (
          <span className="text-danger">
            Имя не может содержать спец символы и цифры
          </span>
        )}

      <input
        value={lastName}
        onChange={(e) => handleOnLastNameChange(e.target.value)}
        className={`form-control  ${isLastNameValid.isTouched ? (isLastNameValid.isValid ? "is-valid" : "is-invalid") : ""}  `}
        type="text"
        placeholder="Фамилия"
        disabled={isUserCreating}
      />

      {isLastNameValid.isTouched && !isLastNameValid.isTextEmptyValid && (
        <span className="text-danger">Фамилия не может быть пустым</span>
      )}

      {haslastName &&
        isLastNameValid.isTouched &&
        !isLastNameValid.isFirstUpperCaseValid && (
          <span className="text-danger">
            Фамилия должно начинаться с заглавной буквы
          </span>
        )}

      {haslastName &&
        isLastNameValid.isTouched &&
        !isLastNameValid.isLenghtValid && (
          <span className="text-danger">
            Фамилия не может быть менее 2 символом
          </span>
        )}

      {haslastName &&
        isLastNameValid.isTouched &&
        !isLastNameValid.isSpecialSymbolsValid && (
          <span className="text-danger">
            Фамилия не может содержать спец символы и цифры
          </span>
        )}

      <div className="d-flex flex-row align-items-center gap-3 justify-content-between">
        <input
          className={`form-control w-50 ${isAgeTouched ? (isAgeValid ? "is-valid" : "is-invalid") : ""}    `}
          type="number"
          value={age}
          onChange={(e) => handleOnAgeChange(Number(e.target.value))}
          min={18}
          max={99}
          placeholder="Возраст"
          disabled={isUserCreating}
        />

        <span className="text-nowrap">Гражданин РФ</span>

        <input
          className="form-check-input"
          type="checkbox"
          disabled={isUserCreating}
          checked={isCitizen}
          onChange={(e) => setIsCitizen(e.target.checked)}
        />
      </div>

      <div className="input-group">
        <span className="input-group-text">+7</span>

        <input
          type="text"
          className={`form-control  ${isPhoneTouched ? (isPhoneValid ? "is-valid" : "is-invalid") : ""}  `}
          placeholder="9998887766"
          value={phone}
          onChange={(e) => {
            handleOnPhoneChage(e.target.value);
          }}
          disabled={isUserCreating}
        />
      </div>

      <button
        onClick={hadnleCreate}
        disabled={
          isUserCreating ||
          !isFirstNameValid.isValid ||
          !isLastNameValid.isValid ||
          !isAgeValid ||
          !isPhoneValid
        }
        className= {`btn btn-${editedUser ? "primary" : "success"}`}
      >
        {isUserCreating ? `${editedUser ? "Сохранение..." : "Добавление..."}` : `${editedUser ? "Сохранить" : "Добавить"}`}
      </button>

      {editedUser && (<button onClick = {OnClick} disabled={isUserCreating} className = "btn btn-danger">
        Отмена
        </button>)}

      
    </div>
  );
};
