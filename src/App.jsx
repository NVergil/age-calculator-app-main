import { useState } from "react";

const App = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [lapsedYears, setLapsedYears] = useState("");
  const [lapsedMonths, setLapsedMonths] = useState("");
  const [lapsedDays, setLapsedDays] = useState("");

  // White inputs error
  const [clearInputsError, setClearInputsError] = useState(false);

  const [inputsError, setInputsError] = useState(false);
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");

  const calBirth = (year, month, day) => {
    if (!year.trim("") && !month.trim("") && !day.trim("")) {
      setClearInputsError(true);
      setInputsError(true);
      return;
    } else {
      setClearInputsError(false);
      setInputsError(false);
    }

    let validateDaysInMonth = [year, month, day];

    const birthday = validateDaysInMonth.join("-");
    const actualDate = new Date();
    const birth = new Date(birthday);

    let years = actualDate.getFullYear() - birth.getFullYear();
    let months = actualDate.getMonth() - birth.getMonth();
    let days = actualDate.getDate() - birth.getDate();

    // Si los días son negativos, restamos un mes y ajustamos los días
    if (days < 0) {
      months--;
      const lastDayOnLastMonth = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth(),
        0
      ).getDate();
      days += lastDayOnLastMonth;
    }

    // Si los meses son negativos, restamos un año y ajustamos los meses
    if (months < 0) {
      years--;
      months += 12;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if ((day > daysInMonth || day <= 0) && (month > 12 || month < 1)) {
      setInputsError(true);
      setDayError(`Must be a valid day`);
      setMonthError("Must be a valid month");
      return;
    }
    if (day > daysInMonth || day <= 0) {
      setInputsError(true);
      return setDayError(`Must be a valid day`);
    } else {
      setDayError("");
    }
    if (month > 12 || month < 1) {
      setInputsError(true);
      return setMonthError("Must be a valid month");
    } else {
      setMonthError("");
    }
    if (year.length < 4) {
      setInputsError(true);
      return setYearError("Please use a valid year format YYYY");
    } else {
      setYearError("");
    }
    if (years < 0) {
      setInputsError(true);
      return setYearError("Must be in the past");
    }
    if (years > 120) {
      setInputsError(true);
      return setYearError("Holy molly you're a fossil");
    }

    setLapsedYears(years);
    setLapsedMonths(months);
    setLapsedDays(days);
  };

  function restrictToNumbers(event) {
    const input = event.target;
    const inputValue = input.value;

    // Eliminar cualquier carácter que no sea un número
    const cleanedValue = inputValue.replace(/\D/g, "");

    // Actualizar el valor del campo de entrada
    input.value = cleanedValue;
  }

  return (
    <main>
      <section>
        <div className="container">
          <div className="date-input">
            <div>
              <label
                className={inputsError ? "input-label-error" : undefined}
                htmlFor="day"
              >
                day
              </label>
              <input
                className={inputsError ? "input-error" : undefined}
                placeholder="DD"
                maxLength="2"
                id="day"
                type="text"
                inputMode="numeric"
                onInput={(e) => restrictToNumbers(e)}
                onChange={(e) => setDay(e.target.value)}
              />
              {clearInputsError && (
                <p className="input-error-p">This field is required</p>
              )}
              {inputsError && <p className="input-error-p">{dayError}</p>}
            </div>
            <div>
              <label
                className={inputsError ? "input-label-error" : undefined}
                htmlFor="month"
              >
                month
              </label>
              <input
                className={inputsError ? "input-error" : undefined}
                placeholder="MM"
                maxLength="2"
                id="month"
                type="text"
                inputMode="numeric"
                onInput={(e) => restrictToNumbers(e)}
                onChange={(e) => setMonth(e.target.value)}
              />
              {clearInputsError && (
                <p className="input-error-p">This field is required</p>
              )}
              {inputsError && <p className="input-error-p">{monthError}</p>}
            </div>
            <div>
              <label
                className={inputsError ? "input-label-error" : undefined}
                htmlFor="year"
              >
                year
              </label>
              <input
                className={inputsError ? "input-error" : undefined}
                placeholder="YYYY"
                maxLength="4"
                id="year"
                type="text"
                inputMode="numeric"
                onInput={(e) => restrictToNumbers(e)}
                onChange={(e) => setYear(e.target.value)}
              />
              {clearInputsError && (
                <p className="input-error-p">This field is required</p>
              )}
              {inputsError && <p className="input-error-p">{yearError}</p>}
            </div>
          </div>
          <div className="border-button">
            <button
              className="date-button"
              onClick={() => calBirth(year, month, day)}
            >
              <img src="/icon-arrow.svg" alt="arrow-submit" />
            </button>
          </div>
          <div className="time-lapsed">
            <p>
              <span className={lapsedYears ? "counter" : "line-counter"}>
                {lapsedYears ? lapsedYears : "--"}
              </span>
              years
            </p>
            <p>
              <span className={lapsedMonths ? "counter" : "line-counter"}>
                {lapsedMonths ? lapsedMonths : "--"}
              </span>
              months
            </p>
            <p>
              <span className={lapsedDays ? "counter" : "line-counter"}>
                {lapsedDays ? lapsedDays : "--"}
              </span>
              days
            </p>
          </div>
        </div>
      </section>
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/NVergil" target="_blank" rel="noreferrer">VerDanT</a>.
      </div>
    </main>
  );
};

export default App;
