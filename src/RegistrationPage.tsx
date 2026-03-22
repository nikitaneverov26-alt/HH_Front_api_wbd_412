import { useState } from "react";

export const RegistrationPage = () => {
  //тут какая то логика на JS

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleRegistation = () => {
    console.log("Копка регистрации нажата");
    setLoading(!isLoading);
  };

  //а в резултате возвращается HTML

  return (
    <div className="d-flex flex-column align-items-center gap-5">
      <div className="h1 mt-4">Регистрация</div>
      <div className="fs-4">Введите основную информацию</div>

      {isLoading ? <p>Загружаем...</p> : ""}

      {isLoading ? (
        ""
      ) : (
        <>
          <div className="d-flex flex-column gap-1 w-25">
            <div className="d-flex flex-row justify-content-between">
              <div>Имя</div>
              <input type="text" />
            </div>
            <div className="d-flex flex-row justify-content-between">
              <div>Фамили</div>
              <input type="text" />
            </div>
            <div className="d-flex flex-row justify-content-between">
              <div>Возраст</div>
              <input type="number" />
            </div>
          </div>

          <div className="d-flex flex-column gap-1 w-25">
            <div className="d-flex flex-row justify-content-between">
              <div>Логин</div>
              <input type="text" />
            </div>

            <div className="d-flex flex-row justify-content-between">
              <div>Пароль</div>
              <input type="password" />
            </div>

            <div className="d-flex flex-row justify-content-between">
              <div>Повторите пароль</div>
              <input type="password" />
            </div>
          </div>
        </>
      )}

      <button
        onClick={handleRegistation}
        className={`btn  ${isLoading ? "btn-warning" : "btn-primary"}`}
      >
        {isLoading ? "Отмена" : "Регистрация"}
      </button>
    </div>
  );
};
