import { Card, CardContent, Typography } from "@mui/material";
import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";

export default function Post({ id, title, content, authorName }) {
  return (
    <Card sx={{ backgroundColor: '#5a5a5a', borderRadius: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
          {authorName}
        </Typography>
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          {title}
        </Typography>
        <Typography sx={{ color: '#cccccc' }}>
          {content}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <DeletePostButton postId={id} />
          <EditPostButton postId={id} initialTitle={title} initialContent={content} />
        </div>
      </CardContent>
    </Card>
  );
}
