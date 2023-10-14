import React, { useState } from "react";

const AgeCalculator = () => {
  //define states to manage user input and calculate age
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState(null);

  //to calculate age
  const calculateAge = () => {
    const birthDate = new Date(birthdate); //convert to Date object
    const today = new Date(); //for the current date

    if (birthDate > today) {
      // Disable the age calculator if the birthdate is in the future
      setAge(null);

      // Display a message to the user informing them that their birthdate is in the future
      alert("Birthdate is in the future");
    } else {
      const yearsDiff = today.getFullYear() - birthDate.getFullYear(); //returns years
      const monthsDiff = today.getMonth() - birthDate.getMonth();
      const daysDiff = today.getDate() - birthDate.getDate();

      let ageYears = yearsDiff;
      let ageMonths = monthsDiff;
      let ageDays = daysDiff;

      //the case where day or  month of birthday is ahead of todays day
      if (daysDiff < 0) {
        const lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          birthDate.getDate()
        );
        ageMonths -= 1;
        ageDays = Math.floor((today - lastMonth) / (24 * 60 * 60 * 1000));
      }
      if (monthsDiff < 0) {
        ageYears -= 1;
        ageMonths += 12;
      }
      if (today.getMonth() === birthDate.getMonth()) {
        ageYears -= 1;
        ageMonths += 12;
      }
      if (today.getMonth() === birthDate.getMonth()) {
        if (today.getFullYear() === birthDate.getFullYear()) {
          ageYears = 0;
          ageMonths = 0;
        }
      }
      if (
        today.getMonth() === birthDate.getMonth() &&
        today.getFullYear() !== birthDate.getFullYear()
      ) {
        if (daysDiff > 0) {
          ageYears += 1;
          ageMonths = 0;
        }
      }
      if (ageMonths === 12) {
        ageYears += 1;
        ageMonths = 0;
      }

      //set the calculated age in the status
      setAge({
        years: ageYears,
        months: ageMonths,
        days: ageDays,
      });
    }
  };
  return (
    <div className="age_calculator">
      <h1>Age Calculator</h1>
      <h3>Enter your date of birth</h3>
      <input
        type="date"
        value={birthdate}
        onChange={(e) => {
          //input should not be loner than 10 char
          if (e.target.value.length <= 10) {
            setBirthdate(e.target.value);
          }
        }}
        max="9999-12-31"
        min="0000-01-01"
      />

      {/*button to trigger age calculation function */}
      <button onClick={calculateAge}>Calculate Age</button>

      {/*structure to display the results */}
      {age && (
        <div className="result">
          <p>
            You are {age.years} years, {age.months} months, and {age.days} days
            old.
          </p>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;