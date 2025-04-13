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
          className="text-sm text-blue-500 hover:text-blue-700 mb-2 ascii-nav-link"
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

const CommentSkeleton = () => (
  <div className="pl-4 border-l-2 border-gray-200 mb-4">
    <div className="mb-2">
      <div className="h-4 w-32 bg-gray-700 rounded mb-2 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

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
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <CommentSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="ascii-error">{error}</div>;
  }

  if (commentIds.length === 0) {
    return <div className="ascii-text">No comments yet</div>;
  }

  return (
    <div className="space-y-4">
      {commentIds.map(id => {
        const comment = comments[id];
        if (!comment) return null;
        return (
          <CommentItem
            key={id}
            comment={comment}
            isExpanded={expandedComments.has(id)}
            onToggle={() => toggleComment(id)}
          />
        );
      })}
    </div>
  );
}; 