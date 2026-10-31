import type { Question } from '../data/questions';

interface Props {
  question: Question;
  selected: number | null;
  onSelect: (optionIndex: number) => void;
}

export default function QuestionCard({ question, selected, onSelect }: Props) {
  return (
    <section>
      <h2 className="question-text">{question.text}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={option.point + index}
            type="button"
            className={`option${selected === index ? ' selected' : ''}`}
            onClick={() => onSelect(index)}
          >
            <span className="option-key">{String.fromCharCode(65 + index)}</span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
