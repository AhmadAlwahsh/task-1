"use client";
import styles from "../page.module.css";
import data from "../../data/countries.json";
import { useEffect, useRef, useState } from "react";
const Form = () => {
  const countries = data.countries;
  const [activeCountry, setActiveCountry] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [eduQualification, setEduQualification] = useState("");
  const [governorate, setGovernorate] = useState("");

  const governorateSelect = useRef();

  useEffect(() => {
    governorateSelect.current.selectedIndex = 0;
  } , [activeCountry]) 

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label className={styles.label}>اسم المستخدم</label>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>رقم الهاتف</label>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label className={styles.label}>المؤهل التعليمي</label>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setEduQualification(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label className={styles.label}>الدولة</label>
          <select
            className={styles.input}
            onChange={(e) => {
              setActiveCountry(e.target.value);
              setGovernorate(
                countries.filter((country) => country.name == e.target.value)[0]
                  .governorates[0]
              );
            }}
          >
            <option value="">اختر...</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>المحافظة</label>
          <select
            className={styles.input}
            disabled={activeCountry ? false : true}
            onChange={(e) => setGovernorate(e.target.value)}
            ref={governorateSelect}
          >
            {activeCountry &&
              countries
                .filter((country) => country.name == activeCountry)[0]
                .governorates.map((governorate) => (
                  <option value={governorate}>{governorate}</option>
                ))}
          </select>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <button
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              console.log({
                Username: username,
                PhoneNumber: phoneNumber,
                EduQualification: eduQualification,
                Country: activeCountry,
                Governorate: governorate,
              });
            }}
          >
            إرسال
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
