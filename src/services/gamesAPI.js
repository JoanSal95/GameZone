const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

if (!API_KEY) {
  console.error('⚠️ VITE_RAWG_API_KEY no está configurada. Por favor revisa tu archivo .env');
}

export const gamesAPI = {
  getPopularGames: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7&page_size=6&ordering=-rating`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener los juegos');
      }
      
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error en getPopularGames:', error);
      return [];
    }
  },

  getAllGames: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=12&ordering=-rating`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener los juegos');
      }
      
      const data = await response.json();
      return {
        games: data.results,
        totalCount: data.count,
        hasNext: !!data.next,
        hasPrevious: !!data.previous
      };
    } catch (error) {
      console.error('Error en getAllGames:', error);
      return {
        games: [],
        totalCount: 0,
        hasNext: false,
        hasPrevious: false
      };
    }
  },

  searchGames: async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=12`
      );
      
      if (!response.ok) {
        throw new Error('Error al buscar juegos');
      }
      
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error en searchGames:', error);
      return [];
    }
  },

  getGameDetails: async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/games/${id}?key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener detalles del juego');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en getGameDetails:', error);
      return null;
    }
  }
};

export const formatReleaseDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getRatingColor = (rating) => {
  if (rating >= 4.5) return '#4caf50';
  if (rating >= 4.0) return '#8bc34a';
  if (rating >= 3.5) return '#ffeb3b';
  if (rating >= 3.0) return '#ff9800';
  return '#f44336';
};

export const generatePrice = (game) => {
  const basePrice = 15.99;
  const ratingMultiplier = game.rating ? (game.rating / 5) : 0.7;
  const popularityMultiplier = game.ratings_count ? Math.min(game.ratings_count / 1000, 3) : 1;
  
  const releaseYear = game.released ? new Date(game.released).getFullYear() : 2020;
  const currentYear = new Date().getFullYear();
  const ageMultiplier = Math.max(0.4, 1 - (currentYear - releaseYear) * 0.08);
  
  const gameId = game.id || 1;
  const pseudoRandom = (gameId * 9301 + 49297) % 233280 / 233280;
  
  let finalPrice = basePrice * ratingMultiplier * popularityMultiplier * ageMultiplier;
  
  if (finalPrice < 5) finalPrice = 5 + pseudoRandom * 5;
  else if (finalPrice < 15) finalPrice = Math.ceil(finalPrice);
  else if (finalPrice < 35) finalPrice = Math.ceil(finalPrice / 5) * 5;
  else finalPrice = Math.ceil(finalPrice / 10) * 10;
  
  return Math.max(5, Math.min(finalPrice, 79.99));
};

export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const getDiscount = (game) => {
  const gameId = game.id || 0;
  const hasDiscount = (gameId % 10) < 3;
  if (!hasDiscount) return null;
  
  const discountPercentages = [10, 15, 20, 25, 30, 40, 50, 75];
  const discountIndex = gameId % discountPercentages.length;
  
  return discountPercentages[discountIndex];
};

export const calculateDiscountedPrice = (originalPrice, discountPercent) => {
  if (!discountPercent) return originalPrice;
  const discountedPrice = originalPrice * (1 - discountPercent / 100);
  return Math.max(5, discountedPrice);
};
