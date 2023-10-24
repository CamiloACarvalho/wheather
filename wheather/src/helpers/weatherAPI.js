// Remova os comentários a medida que for implementando as funções
import { Swal } from 'sweetalert2';

const token = import.meta.env.VITE_TOKEN;

export const searchCities = async (term) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=${term}`);
    const data = await response.json();
    if (data.length === 0) {
      throw new Error('Nenhuma cidade encontrada');
    }
    return data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error.message}`,
    });
  }
};

export const getWeatherByCity = async (cityURL) => {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${token}&q=${cityURL}`);
  const data = await response.json();
  const objctAnsewer = {
    city: data.location.name,
    country: data.location.country,
    temperature: `${data.current.temp_c}`,
    condition: data.current.condition.text,
    precitation: `${data.current.precip_mm} mm`,
    humidity: `${data.current.humidity} %`,
    icon: data.current.condition.icon,
  };
  return objctAnsewer;
};
