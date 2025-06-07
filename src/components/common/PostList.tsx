import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Comment as CommentIcon,
  PushPin as PushPinIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { BoardPost } from '@/types/board';

interface PostListProps {
  posts: BoardPost[];
  onPostClick: (post: BoardPost) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="5%">번호</TableCell>
            <TableCell width="5%"></TableCell>
            <TableCell width="50%">제목</TableCell>
            <TableCell width="15%">작성자</TableCell>
            <TableCell width="15%">작성일</TableCell>
            <TableCell width="5%">조회</TableCell>
            <TableCell width="5%">댓글</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              hover
              onClick={() => onPostClick(post)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{post.id}</TableCell>
              <TableCell>
                {post.isPinned && (
                  <Tooltip title="상단 고정">
                    <PushPinIcon color="primary" fontSize="small" />
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {post.title}
                  {post.tags && post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </TableCell>
              <TableCell>{post.author.name}</TableCell>
              <TableCell>
                {format(new Date(post.createdAt), 'yyyy-MM-dd')}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="조회수">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <VisibilityIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {post.viewCount}
                  </Box>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="댓글">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CommentIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {post.commentCount || 0}
                  </Box>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PostList; 