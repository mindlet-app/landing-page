import React, { useState, useEffect } from "react";
import { AnswerCard } from "../ui/Card";
import Button from "../ui/Button";
import { LucideRefreshCw } from "lucide-react";
import Paragraph from "../ui/Paragraph";

interface MatchPair {
  id: number;
  term: string;
  match: string;
}

interface CardItem {
  id: number;
  text: string;
  isPaired: boolean;
}

interface SelectedCard extends CardItem {
  index: number;
}

const MatchGameExample: React.FC = () => {
  // Définition des paires de correspondance
  const matchPairs: MatchPair[] = [
    { id: 1, term: "Apple", match: "Pomme" },
    { id: 2, term: "Computer", match: "Ordinateur" },
    { id: 3, term: "Livre", match: "Book" },
    { id: 4, term: "Avion", match: "Plane" },
  ];

  // Création d'un tableau plat avec tous les termes
  const allTerms: CardItem[] = matchPairs.flatMap((pair) => [
    { id: pair.id, text: pair.term, isPaired: false },
    { id: pair.id, text: pair.match, isPaired: false },
  ]);

  // État de toutes les cartes (mélangées)
  const [cards, setCards] = useState<CardItem[]>([]);
  // État des sélections actuelles
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  // État des paires trouvées
  const [foundPairs, setFoundPairs] = useState<number[]>([]);
  // État pour suivre le nombre d'essais
  const [attempts, setAttempts] = useState<number>(0);
  // État pour suivre si le jeu est terminé
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  // Mélange des cartes au chargement initial et lors de la réinitialisation
  const initializeGame = () => {
    setCards(shuffleArray([...allTerms]));
    setSelectedCards([]);
    setFoundPairs([]);
    setAttempts(0);
    setGameCompleted(false);
  };

  // Initialisation du jeu au chargement
  useEffect(() => {
    initializeGame();
  }, []);

  // Vérification de fin de jeu
  useEffect(() => {
    if (foundPairs.length === matchPairs.length && foundPairs.length > 0) {
      setGameCompleted(true);
    }
  }, [foundPairs, matchPairs.length]);

  // Fonction de mélange
  const shuffleArray = (array: CardItem[]): CardItem[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Gestion de la sélection d'une carte
  const handleCardClick = (card: CardItem, index: number): void => {
    // Si la carte est déjà appariée ou déjà sélectionnée, ne rien faire
    if (
      foundPairs.includes(card.id) ||
      selectedCards.some((c) => c.index === index)
    ) {
      return;
    }

    // Si moins de 2 cartes sont sélectionnées
    if (selectedCards.length < 2) {
      const newSelectedCards: SelectedCard[] = [
        ...selectedCards,
        { ...card, index },
      ];
      setSelectedCards(newSelectedCards);

      // Si 2 cartes sont sélectionnées, vérifier la correspondance
      if (newSelectedCards.length === 2) {
        const [first, second] = newSelectedCards;

        // Incrémenter le nombre d'essais
        setAttempts((prev) => prev + 1);

        // Si les IDs correspondent (mais pas la même carte)
        if (first.id === second.id && first.index !== second.index) {
          setFoundPairs((prev) => [...prev, first.id]);
        }

        // Réinitialiser la sélection après un délai
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // Vérifier si une carte est sélectionnée
  const isSelected = (index: number): boolean => {
    return selectedCards.some((card) => card.index === index);
  };

  // Vérifier si une carte fait partie d'une paire trouvée
  const isPaired = (card: CardItem): boolean => {
    return foundPairs.includes(card.id);
  };

  // Déterminer la classe CSS pour une carte
  const getCardClassName = (card: CardItem, index: number): string => {
    if (isPaired(card)) {
      return "bg-emerald-100 border-emerald-500 transform transition-all";
    } else if (isSelected(index)) {
      return "bg-blue-100 border-blue-500 transform transition-all scale-105";
    } else {
      return "hover:-translate-y-1 transform transition-all";
    }
  };

  return (
    <div className="relative flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Paragraph className="font-semibold">Essais: {attempts}</Paragraph>

        <Button variant="neutral" onClick={initializeGame}>
          <LucideRefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(card, index)}
            disabled={isPaired(card)}
          >
            <AnswerCard
              className={getCardClassName(card, index)}
              style={{
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <span className="font-medium">{card.text}</span>
            </AnswerCard>
          </button>
        ))}
      </div>

      {gameCompleted && (
        <div className="p-4 text-center font-semibold bg-emerald-100 rounded-md mt-4">
          <Paragraph className="text-emerald-600">
            Bravo ! Vous avez trouvé toutes les correspondances en {attempts}{" "}
            essais.
          </Paragraph>
          <Button className="mt-3" onClick={initializeGame}>
            <p className="text-white">Rejouer</p>
          </Button>
        </div>
      )}

      <div className="match-progress mt-4 flex justify-center space-x-2">
        {matchPairs.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              index < foundPairs.length ? "bg-emerald-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchGameExample;
