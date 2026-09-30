const STORAGE_KEY = 'orbit_todo_app_todos';

/**
 * Retrieves the list of todos from LocalStorage.
 * Falls back to an empty array if storage is empty, inaccessible, or corrupted.
 * 
 * @returns {Array<{ id: string, title: string, completed: boolean, createdAt: number }>}
 */
export const getTodos = () => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (!serializedData) {
      return [];
    }
    const parsedData = JSON.parse(serializedData);
    if (Array.isArray(parsedData)) {
      return parsedData;
    }
    return [];
  } catch (error) {
    console.error('Failed to load todos from LocalStorage:', error);
    return [];
  }
};

/**
 * Saves the given list of todos to LocalStorage.
 * Handles storage exceptions gracefully (e.g., quota exceeded, private browsing restrictions).
 * 
 * @param {Array<{ id: string, title: string, completed: boolean, createdAt: number }>} todos
 */
export const saveTodos = (todos) => {
  try {
    const serializedData = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (error) {
    console.error('Failed to save todos to LocalStorage:', error);
  }
};