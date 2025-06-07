import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Comment as CommentIcon,
  PushPin as PushPinIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { BoardPost } from '@/types/board';

interface PostDetailProps {
  post: BoardPost;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onEdit, onDelete }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {post.isPinned && (
            <Chip
              icon={<PushPinIcon />}
              label="상단 고정"
              color="primary"
              size="small"
            />
          )}
          {post.category && (
            <Chip
              label={post.category}
              color="secondary"
              size="small"
            />
          )}
        </Box>
        <Typography variant="h5" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
          <Typography variant="body2">
            작성자: {post.author.name}
          </Typography>
          <Typography variant="body2">
            작성일: {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="조회수">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <VisibilityIcon fontSize="small" sx={{ mr: 0.5 }} />
                {post.viewCount}
              </Box>
            </Tooltip>
            <Tooltip title="댓글">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CommentIcon fontSize="small" sx={{ mr: 0.5 }} />
                {post.commentCount || 0}
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body1"
          component="div"
          sx={{ whiteSpace: 'pre-wrap' }}
        >
          {post.content}
        </Typography>
      </Box>
      {post.tags && post.tags.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      )}
      {(onEdit || onDelete) && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          {onEdit && (
            <Tooltip title="수정">
              <IconButton onClick={onEdit} size="small">
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="삭제">
              <IconButton onClick={onDelete} color="error" size="small">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default PostDetail; 