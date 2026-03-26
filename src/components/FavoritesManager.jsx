import React, { useState, useEffect } from 'react';
import { Star, Trash2, Edit3, Check } from 'lucide-react';

const STORAGE_KEY = 'gradient-favorites';

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const FavoritesManager = ({ currentGradient, onApply }) => {
  const [favorites, setFavorites] = useState(loadFavorites);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = () => {
    const newFav = {
      id: Date.now(),
      name: `그라디언트 ${favorites.length + 1}`,
      ...currentGradient,
      savedAt: new Date().toISOString(),
    };
    setFavorites((prev) => [newFav, ...prev]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const startEdit = (fav) => {
    setEditingId(fav.id);
    setEditName(fav.name);
  };

  const saveEdit = (id) => {
    setFavorites((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: editName } : f))
    );
    setEditingId(null);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          즐겨찾기
        </h3>
        <button
          onClick={addFavorite}
          className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
        >
          <Star className="w-3 h-3" />
          저장
        </button>
      </div>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          저장된 즐겨찾기가 없습니다
        </p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
          {favorites.map((fav) => (
            <div key={fav.id} className="flex items-center gap-2 group">
              <button
                onClick={() => onApply(fav)}
                className="flex-1 h-10 rounded-lg border-2 border-gray-700 hover:border-gray-500 transition-colors overflow-hidden"
                style={{ background: fav.css }}
                title="클릭해서 적용"
              />
              <div className="flex items-center gap-1 min-w-0">
                {editingId === fav.id ? (
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(fav.id)}
                      className="w-20 h-7 bg-gray-700 border border-gray-500 rounded px-1 text-xs focus:outline-none focus:border-purple-500"
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(fav.id)}
                      className="text-green-400 hover:text-green-300 p-0.5"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-gray-400 truncate max-w-[60px]" title={fav.name}>
                      {fav.name}
                    </span>
                    <button
                      onClick={() => startEdit(fav)}
                      className="text-gray-500 hover:text-gray-300 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="text-red-400 hover:text-red-300 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesManager;
