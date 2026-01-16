import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onBackToLibrary: () => void;
}

function QuizResults({ score, totalQuestions, onRestart, onBackToLibrary }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto text-6xl">
            {percentage >= 70 ? '🎉' : '📚'}
          </div>
          <CardTitle className="text-3xl">
            {percentage >= 70 ? 'Отличная работа!' : 'Продолжайте учиться!'}
          </CardTitle>
          <CardDescription className="text-lg">
            Вы ответили правильно на {score} из {totalQuestions} вопросов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Результат</span>
              <span className="text-2xl font-bold text-primary">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={onRestart} 
              variant="outline" 
              className="flex-1 gap-2"
            >
              <Icon name="RotateCcw" size={18} />
              Пройти ещё раз
            </Button>
            <Button 
              onClick={onBackToLibrary} 
              className="flex-1 gap-2"
            >
              <Icon name="Library" size={18} />
              К видеотеке
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuizResults;
