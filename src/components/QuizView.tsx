import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizViewProps {
  quiz: Quiz[];
  currentQuestion: number;
  selectedAnswer: number | null;
  score: number;
  onAnswerSelect: (answerIndex: number) => void;
  onNextQuestion: () => void;
}

function QuizView({ quiz, currentQuestion, selectedAnswer, score, onAnswerSelect, onNextQuestion }: QuizViewProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">
              Вопрос {currentQuestion + 1} из {quiz.length}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Правильных ответов: {score}
            </span>
          </div>
          <Progress 
            value={((currentQuestion + 1) / quiz.length) * 100} 
            className="h-2 mb-4"
          />
          <CardTitle className="text-2xl">
            {quiz[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {quiz[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-4 px-6"
                onClick={() => onAnswerSelect(index)}
              >
                <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>

          <Button
            onClick={onNextQuestion}
            disabled={selectedAnswer === null}
            className="w-full gap-2"
            size="lg"
          >
            {currentQuestion + 1 < quiz.length ? (
              <>
                Следующий вопрос
                <Icon name="ArrowRight" size={18} />
              </>
            ) : (
              <>
                Завершить тест
                <Icon name="CheckCircle" size={18} />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuizView;
