'use client'
import React, { useState, useEffect } from 'react';
import { Comment } from '@/shared/types/news';
import { fetchCommentById, fetchNewsComments } from '@/store/comments/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface CommentItemProps {
  comment: Comment;
  isExpanded: boolean;
  onToggle: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, isExpanded, onToggle }) => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.comments);

  useEffect(() => {
    if (isExpanded && comment.kids) {
      comment.kids.forEach(id => dispatch(fetchCommentById(id)));
    }
  }, [isExpanded, comment.kids, dispatch]);

  return (
    <div className="pl-4 border-l-2 border-gray-200">
      <div className="mb-2">
        <div className="text-sm text-gray-600 mb-1">
          {comment.by} • {new Date(comment.time * 1000).toLocaleDateString()}
        </div>
        <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: comment.text }} />
      </div>
      {comment.kids && comment.kids.length > 0 && (
        <button
          onClick={onToggle}
          className="text-sm text-blue-500 hover:text-blue-700 mb-2"
        >
          {isExpanded ? 'Hide replies' : `Show ${comment.kids.length} replies`}
        </button>
      )}
      {isExpanded && comment.kids && (
        <div className="space-y-4">
          {comment.kids.map(id => {
            const childComment = comments[id];
            if (!childComment) return null;
            return (
              <CommentItem
                key={id}
                comment={childComment}
                isExpanded={false}
                onToggle={() => {}}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

interface CommentTreeProps {
  newsId: string;
}

export const CommentTree: React.FC<CommentTreeProps> = ({ newsId }) => {
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const dispatch = useAppDispatch();
  const { comments, commentIds, loading, error } = useAppSelector((state) => state.comments);

  useEffect(() => {
    if (newsId) {
      console.log('Fetching comments for newsId:', newsId);
      dispatch(fetchNewsComments(parseInt(newsId)));
    }
  }, [newsId, dispatch]);

  useEffect(() => {
    if (commentIds.length > 0) {
      console.log('Fetching comments with ids:', commentIds);
      commentIds.forEach(id => dispatch(fetchCommentById(id)));
    }
  }, [commentIds, dispatch]);

  const toggleComment = (commentId: number) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  console.log('Comments state:', comments);
  console.log('Comment IDs:', commentIds);

  const rootComments = commentIds
    .map(id => comments[id])
    .filter((comment): comment is Comment => comment !== undefined);

  console.log('Root comments:', rootComments);

  return (
    <div className="space-y-4">
      {rootComments.map((comment: Comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isExpanded={expandedComments.has(comment.id)}
          onToggle={() => toggleComment(comment.id)}
        />
      ))}
    </div>
  );
}; 