import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Reply as ReplyIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { BoardComment } from '@/types/board';

interface CommentListProps {
  comments: BoardComment[];
  onReply?: (comment: BoardComment) => void;
  onEdit?: (comment: BoardComment) => void;
  onDelete?: (comment: BoardComment) => void;
  onAddComment?: (content: string, parentId?: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onReply,
  onEdit,
  onDelete,
  onAddComment,
}) => {
  const [newComment, setNewComment] = React.useState('');
  const [replyTo, setReplyTo] = React.useState<BoardComment | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment, replyTo?.id);
      setNewComment('');
      setReplyTo(null);
    }
  };

  const renderComment = (comment: BoardComment, isReply = false) => (
    <Box
      key={comment.id}
      sx={{
        pl: isReply ? 4 : 0,
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {comment.author.name[0]}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle2">
              {comment.author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm')}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {comment.content}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {onReply && !isReply && (
              <Button
                size="small"
                startIcon={<ReplyIcon />}
                onClick={() => setReplyTo(comment)}
              >
                답글
              </Button>
            )}
            {onEdit && (
              <IconButton size="small" onClick={() => onEdit(comment)}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(comment)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        댓글 {comments.length}개
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      {comments.map((comment) => (
        <React.Fragment key={comment.id}>
          {renderComment(comment)}
          {comment.replies?.map((reply) => renderComment(reply, true))}
        </React.Fragment>
      ))}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {replyTo && (
          <Box sx={{ mb: 2, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {replyTo.author.name}님에게 답글 작성 중
            </Typography>
            <Button
              size="small"
              onClick={() => setReplyTo(null)}
              sx={{ ml: 1 }}
            >
              취소
            </Button>
          </Box>
        )}
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="댓글을 작성하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            type="submit"
            disabled={!newComment.trim()}
          >
            댓글 작성
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CommentList; 