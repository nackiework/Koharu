import Link from 'next/link';
import { ArrowLeft, MessageSquare, Calendar, FileText } from 'lucide-react';
import { ProgressBar } from '@/components/progress-bar';
import { queueData, notesData } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function QueueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queueItem = queueData.find(item => item.id === parseInt(id));

  if (!queueItem) {
    notFound();
  }

  const statusColors = {
    doing: 'bg-[#81C784] text-white',
    waiting: 'bg-[#FFD54F] text-[#3D3D3D]',
    done: 'bg-muted text-muted-foreground',
  };

  const statusLabels = {
    doing: 'In Progress',
    waiting: 'Waiting',
    done: 'Completed',
  };

  // Get recent admin notes (simplified for demo)
  const recentNotes = notesData.filter(note => note.sender === 'admin').slice(0, 2);

  return (
    <main className="min-h-screen pb-12">
      <div className="max-w-md mx-auto px-6 pt-6">
        {/* Back Button */}
        <Link 
          href="/queue"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Queue
        </Link>

        {/* Project Header */}
        <div className="bg-card rounded-3xl p-6 shadow-sm mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">
                {queueItem.artworkType}
              </h1>
              <p className="text-muted-foreground text-sm">{queueItem.name}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[queueItem.status]}`}>
              {statusLabels[queueItem.status]}
            </span>
          </div>

          {/* Project Details */}
          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Start Date:</span>
              <span className="font-medium">
                {queueItem.startDate 
                  ? new Date(queueItem.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'TBD'
                }
              </span>
            </div>
            
            <div className="flex items-start gap-3 text-sm">
              <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-muted-foreground block mb-1">Description:</span>
                <p className="text-foreground leading-relaxed">
                  {queueItem.description || 'No description provided.'}
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          {queueItem.status === 'doing' && queueItem.progress !== undefined && (
            <div className="mt-6">
              <ProgressBar value={queueItem.progress} />
            </div>
          )}
        </div>

        {/* Admin Notes */}
        <div className="bg-card rounded-3xl p-6 shadow-sm mb-6">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Updates
          </h2>
          
          {recentNotes.length > 0 ? (
            <div className="space-y-4">
              {recentNotes.map(note => (
                <div key={note.id} className="border-l-2 border-primary/30 pl-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {new Date(note.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-foreground">{note.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No updates yet.</p>
          )}
        </div>

        {/* Contact Button */}
        <Link
          href="/notes"
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-2xl shadow-sm transition-all font-medium w-full"
        >
          <MessageSquare className="w-5 h-5" />
          Contact Admin
        </Link>
      </div>
      

    </main>
  );
}
