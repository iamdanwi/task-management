import React, { useState, useEffect } from 'react';
import { Comment, User } from '@prisma/client';
import { useSession } from 'next-auth/react';

interface TaskCommentsProps {
    taskId: string;
}

interface CommentWithUser extends Comment {
    user: User;
}

export function TaskComments({ taskId }: TaskCommentsProps) {
    const { data: session } = useSession();
    const [comments, setComments] = useState<CommentWithUser[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComments();
    }, [taskId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/tasks/${taskId}/comments`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !session?.user) return;

        try {
            const response = await fetch(`/api/tasks/${taskId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newComment }),
            });

            if (response.ok) {
                setNewComment('');
                fetchComments();
            }
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };

    if (loading) return <div>Loading comments...</div>;

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {comments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                            <span className="font-medium">{comment.user.name}</span>
                            <span className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <p className="mt-1 text-gray-700">{comment.content}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-2 border rounded-md"
                    rows={2}
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={!newComment.trim()}
                >
                    Post Comment
                </button>
            </form>
        </div>
    );
}
