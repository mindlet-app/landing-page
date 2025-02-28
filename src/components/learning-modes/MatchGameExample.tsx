import { AnswerCard } from "../ui/Card";

const MatchGameExample: React.FC = () => {
  const matchAssociations = [
    "Apple",
    "Computer",
    "Livre",
    "Avion",
    "Ordinateur",
    "Pomme",
    "Plane",
    "Book",
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {matchAssociations.map((association, index) => (
        <AnswerCard key={index} className="bg-blue-200">
          {association}
        </AnswerCard>
      ))}
    </div>
  );
};

export default MatchGameExample;
