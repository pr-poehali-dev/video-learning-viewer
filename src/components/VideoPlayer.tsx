import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  progress: number;
  thumbnail: string;
}

interface VideoPlayerProps {
  video: Video;
  onBack: () => void;
  onWatchComplete: () => void;
}

function VideoPlayer({ video, onBack, onWatchComplete }: VideoPlayerProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={20} />
            Назад к курсам
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-8xl shadow-lg">
            {video.thumbnail}
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-3xl">{video.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {video.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {video.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={18} />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="PlayCircle" size={18} />
                  <span>Видео урок</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Прогресс обучения</span>
                  <span className="font-medium">{video.progress}%</span>
                </div>
                <Progress value={video.progress} className="h-2" />
              </div>

              <Button 
                onClick={onWatchComplete} 
                className="w-full gap-2"
                size="lg"
              >
                <Icon name="CheckCircle" size={20} />
                Завершить просмотр и пройти тест
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default VideoPlayer;
