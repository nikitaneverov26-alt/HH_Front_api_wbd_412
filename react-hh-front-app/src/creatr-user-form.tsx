import { useState } from "react";
import { useCreateUser } from "./api-methods/create-users";
import { useGetUsers } from "./api-methods/get-users";
import type { CreateUserInput } from "./type";

export const CreateUserForm = () => {




    const [firstName, setFirstName] = useState<string>("");
    const [isFirstNameValid, setFirstNameValid] = useState<boolean>(false);

    const [lastName, setLastName] = useState<string>("");
    const [age, setAge] = useState<number>(17);
    const [iscitizen, setIsCitizen] = useState<boolean>(true);
    const [phone, setPhone] = useState<string>("");

    const [idAgeToched, setIsAgeTouched] = useState<boolean>(false)
    const [idAgeValid, setIsAgeValid] = useState<boolean>(false)
    

    const { mutate: createUser, isPending: isUserCreating } = useCreateUser();

    const { refetch: refetchUsers } = useGetUsers();

    const hadnleCreate = () => {
        const input = {
            firstName: firstName,
            lastName: lastName,
            age: 30,
            isCitizen: true,
            phone: "+7" + phone,
        } as CreateUserInput;

        createUser(input, { onSuccess: onCreateSuccess });
    };


    const onCreateSuccess = () => {
        refetchUsers();
        setFirstName("");
        setLastName("");
        setAge(18);
        setIsCitizen(false);
        setPhone(""); 

        setISFirstNameValid(isFirstNameValidionDefault);
        setISLastNameValid(isLastNameValidionDefault);
        setIsAgeTouched(false);
        setAge(true)
    };

    const handleOnNameChange = (text: string) => {

        setIsAgeValid(age >= 18 && age <=99);
        setIsAgeTouched(true);
        setAge(age);
        
    }

    const handleOnPhoneChage = (phone: string) => {

        setIsPhoneTouched(false);

        const cleanPhone = phone.replace{/\D/g, ""}
        setIsPhoneValid(/^\d(10)$/.test(cleanPhone));
        setPhone(cleanPhone);
    };


    return <div className="d-flex flex-column gap-2 p-2 w-50">'


        <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`form-control   ${isFirstNameValid ? "is-valid" : "is-invalid"}`}
            type="text"
            placeholder="Имя"
        />
        <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            type="text"
            placeholder="Фамилия"
            disabled={isUserCreating}
        />

        <input
            type="text"
            className="from-control"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => {
                setPhone(e.target.value);
            }}
            disabled={isUserCreating}
        />
        <div className="d-flex flex-row align-items-center gap-3 justify-content-between">
            <input
                className="from-control w-50"
                type="number"
                min={18}
                max={99}
                placeholder="Возраст"
            />


            <div className="d-flex flex-row gap-3">
                <span>Гражданин РФ</span>
                <input className="" type="checkbox" />
            </div>

        </div>


        <button
            disabled={isUserCreating}
            onClick={hadnleCreate}
            className="btn btn-success"
        >
            {isUserCreating ? "Создание..." : "Создать"}
        </button>
    </div>
}