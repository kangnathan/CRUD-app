import { Card, CardContent, Typography, Divider, Container } from '@mui/material';
import DeletePostButton from './DeletePostButton';
import EditPostButton from './EditPostButton';
import { formatDateTime } from '@/utils/formatDateTime';

export default function Post({ id, title, content, authorName, createdAt, updatedAt, deletedAt }) {
  return (
    <Card sx={{ backgroundColor: '#5a5a5a', borderRadius: 5 }}>
      <CardContent>

        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          {title}
        </Typography>

        <Typography sx={{ color: '#cccccc', marginTop: '10px' }}>
          {content}
        </Typography>

        <Divider sx={{ marginY: '10px' }} />

       
          <div>
            <Typography variant="h5" component="div" sx={{ color: '#aaaaaa', fontSize: '13px' }}>
                Author: {authorName}
              </Typography>
  
              <Typography sx={{ color: '#aaaaaa', fontSize: '13px', paddingLeft: '0px', marginLeft: '0px' }}>
                Created at: {formatDateTime(createdAt)}
              </Typography>

            {updatedAt && (
              <Typography sx={{ color: '#aaaaaa', fontSize: '13px', paddingLeft: '0px', marginLeft: '0px' }}>
                  Updated at: {formatDateTime(updatedAt)}
              </Typography>
            )}

            {deletedAt && (
              <Typography sx={{ color: '#ff6b6b', marginTop: '10px', fontSize: '13px', paddingLeft: '0px', marginLeft: '0px' }}>
                  This post was deleted on {formatDateTime(deletedAt)}
              </Typography>
            )}
          </div>
        
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px', gap: '10px' }}>
                <DeletePostButton postId={id} />
                <EditPostButton postId={id} initialTitle={title} initialContent={content} />
            </div>

          

      </CardContent>
    </Card>
  );
}
