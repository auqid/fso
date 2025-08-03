import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
          );
          setCountry({
            found: true,
            data: {
              name: response.data.name.common,
              capital: response.data.capital[0],
              population: response.data.population,
              flag: response.data.flags.png,
            },
          });
        } catch (error) {
          setCountry({
            found: false,
            data: null,
          });
        }
      };

      fetchCountry();
    }
  }, [name]);

  return country;
};
