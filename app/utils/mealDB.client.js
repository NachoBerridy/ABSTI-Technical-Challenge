import { BASE_FOOD_API_URL } from '../assets/consts.js';

export const getCategoryList = async () => {
  const response = await fetch(`${BASE_FOOD_API_URL}/categories.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  } else {
    const data = await response.json();
    return data.categories;
  }
};

export const  getIngredientList = async () => {
  const response = await fetch(`${BASE_FOOD_API_URL}/list.php?i=list`);
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  } else {
    const data = await response.json();
    return data.meals;
  }
};

export const getAreaList = async () => {
  const response = await fetch(`${BASE_FOOD_API_URL}/list.php?a=list`);
  if (!response.ok) {
    throw new Error('Failed to fetch areas');
  } else {
    const data = await response.json();
    return data.meals;
  }
};

export const getMealsByCategory = async (category) => {
  const response = await fetch(`${BASE_FOOD_API_URL}/filter.php?c=${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch meals by category');
  } else {
    const data = await response.json();
    return data.meals;
  }
};

export const getMealsByMainIngredient = async (ingredient) => {
  const response = await fetch(`${BASE_FOOD_API_URL}/filter.php?i=${ingredient}`);
  if (!response.ok) {
    throw new Error('Failed to fetch meals by ingredient');
  } else {
    const data = await response.json();
    return data.meals;
  }
};

export const getMealsByArea = async (area) => {
  const response = await fetch(`${BASE_FOOD_API_URL}/filter.php?a=${area}`);
  if (!response.ok) {
    throw new Error('Failed to fetch meals by area');
  } else {
    const data = await response.json();
    return data.meals;
  }
}

export const getMealById = async (id) => {
  const response = await fetch(`${BASE_FOOD_API_URL}/lookup.php?i=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch meal by id');
  } else {
    const data = await response.json();
    return data.meals[0];
  }
}

export const getAllMeals = async () => {
  const categories = await getCategoryList();
  const allMeals = new Map();
  const getMealsAndAddToMap = async (category) => {
    const meals = await getMealsByCategory(category.strCategory);
    meals.forEach(meal => {
      meal.category = category.strCategory;
      allMeals.set(meal.idMeal, meal)
    });
  };
  const promises = categories.map(category => getMealsAndAddToMap(category));
  await Promise.all(promises);
  const uniqueMeals = Array.from(allMeals.values())
  return uniqueMeals;
};

