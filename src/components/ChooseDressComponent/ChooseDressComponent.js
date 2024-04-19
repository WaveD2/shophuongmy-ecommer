import React, {useEffect, useState} from "react";
import axios from "axios";
import {Select} from "antd";
import {Provinces} from "../../services/DresService";
import SelectOption from "../InputForm/SelectOption";

const ChooseDressComponent = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100"
      )
      .then(response => {
        setProvinces([{id: 0, name: "Chọn tỉnh/thành"}, ...response.data]);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince !== "0" || Number(selectedProvince) !== 0) {
      axios
        .get(
          `https://vnprovinces.pythonanywhere.com/api/districts/?province_id=${selectedProvince}&basic=true&limit=100`
        )
        .then(response => {
          if (response?.data.results?.length > 0) {
            setCities([
              {id: 0, name: "Chọn quận/huyện"},
              ...response?.data.results,
            ]);
          } else {
            setCities([{id: 0, name: "Chọn quận/huyện"}]);
          }
        });
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity !== "0" || Number(selectedCity) !== 0) {
      axios
        .get(
          `https://vnprovinces.pythonanywhere.com/api/wards/?district_id=${selectedCity}&basic=true&limit=100`
        )
        .then(response => {
          if (response?.data.results?.length > 0) {
            setDistricts([
              {id: 0, name: "Chọn xã/phường"},
              ...response?.data.results,
            ]);
          } else {
            setDistricts([{id: 0, name: "Chọn xã/phường"}]);
          }
        });
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  const handleProvinceChange = e => {
    setSelectedProvince(e.target.value);
    setDistricts([]);
  };

  const handleCityChange = e => {
    setSelectedCity(e.target.value);
  };

  const handleDistrictChange = e => {
    setSelectedDistrict(e.target.value);
  };
  return (
    <div>
      <SelectOption
        optionsItem={provinces}
        handleChange={handleProvinceChange}
        placeholder={"Tỉnh/thành"}
      />
      {provinces?.length > 0 && (
        <select onChange={handleProvinceChange}>
          {provinces?.map((item, index) => (
            <option
              value={item?.code}
              key={item?.code}
              defaultChecked='0'
              label={item?.name}>
              {item?.name}
            </option>
          ))}
        </select>
      )}
      {cities?.length > 1 && (
        <select onChange={handleCityChange}>
          {cities?.map((item, index) => (
            <option
              value={item?.code}
              label={item?.name}
              defaultChecked='0'
              key={item?.code}>
              {item?.name}
            </option>
          ))}
        </select>
      )}
      {districts?.length > 1 && (
        <select onChange={handleDistrictChange}>
          {districts?.map((item, index) => (
            <option value={item?.code} defaultChecked='0' key={item?.code}>
              {item?.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ChooseDressComponent;
