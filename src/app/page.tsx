// File: pages/index.js
"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';

// Sample data - in a real app, this would come from a database or API
const initialMeals: { [key: string]: { name: string; category: string; isFavorite: boolean; }[] } = {
  lunch: [
    { name: 'Grilled Chicken Salad', category: 'Healthy', isFavorite: false },
    { name: 'Vegetable Stir Fry', category: 'Vegetarian', isFavorite: false },
    { name: 'Tuna Sandwich', category: 'Quick', isFavorite: false },
  ],
  dinner: [
    { name: 'Spaghetti Bolognese', category: 'Comfort Food', isFavorite: false },
    { name: 'Baked Salmon', category: 'Healthy', isFavorite: false },
    { name: 'Vegetable Curry', category: 'Vegetarian', isFavorite: false },
  ],
};

export default function Home() {
  const [meals, setMeals] = useState(initialMeals);
  const [currentMeal, setCurrentMeal] = useState('');
  const [suggestion, setSuggestion] = useState<{ name: string; category: string; isFavorite: boolean; } | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');

  // Determine current meal based on time
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setCurrentMeal(hour >= 17 ? 'dinner' : 'lunch');
  }, []);

  // Get random suggestion
  const getRandomSuggestion = () => {
    const mealList = meals[currentMeal];
    const randomIndex = Math.floor(Math.random() * mealList.length);
    setSuggestion(mealList[randomIndex]);
  };

  // Add new meal item
  const addNewItem = () => {
    if (newItemName && newItemCategory) {
      setMeals(prevMeals => ({
        ...prevMeals,
        [currentMeal]: [
          ...prevMeals[currentMeal],
          { name: newItemName, category: newItemCategory, isFavorite: false }
        ],
      }));
      setNewItemName('');
      setNewItemCategory('');
    }
  };

  // Toggle favorite status
  const toggleFavorite = (mealName: string) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [currentMeal]: prevMeals[currentMeal].map(meal => 
        meal.name === mealName ? { ...meal, isFavorite: !meal.isFavorite } : meal
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Meal Suggestion App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">Meal Suggestion App</h2>
                <p className="text-xl">Current Meal: {currentMeal.charAt(0).toUpperCase() + currentMeal.slice(1)}</p>
                
                {suggestion && (
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold">{suggestion.name}</h3>
                    <p className="text-gray-600">Category: {suggestion.category}</p>
                    <button
                      onClick={() => toggleFavorite(suggestion.name)}
                      className={`mt-2 px-4 py-2 border rounded-md ${
                        suggestion.isFavorite ? 'bg-yellow-400 text-yellow-800' : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {suggestion.isFavorite ? 'Favorited' : 'Add to Favorites'}
                    </button>
                  </div>
                )}

                <button
                  onClick={getRandomSuggestion}
                  className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Get Suggestion
                </button>

                <div className="mt-6">
                  <h3 className="text-lg font-medium">Add New Meal</h3>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Meal name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    placeholder="Category"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    onClick={addNewItem}
                    className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add Meal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}